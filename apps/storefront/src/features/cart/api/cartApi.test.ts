import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cartApi } from './cartApi';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('cartApi.getAllCarts', () => {
  it('maps products from separate carts, preserving cart-specific IDs and image priority', async () => {
    const get = vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        carts: [
          {
            id: 2,
            products: [
              {
                id: 7,
                title: 'Desk',
                price: 100,
                quantity: 3.9,
                images: ['/desk.png'],
                thumbnail: '/thumb.png',
              },
            ],
          },
          {
            id: 3,
            products: [{ id: 7, title: 'Desk', price: 100, quantity: 2, thumbnail: '/thumb.png' }],
          },
        ],
      },
    });

    const products = await cartApi.getAllCarts();

    expect(get).toHaveBeenCalledExactlyOnceWith('https://dummyjson.com/carts');
    expect(products).toEqual([
      {
        id: '2-7',
        productId: 7,
        name: 'Desk',
        price: 100,
        discountedPrice: undefined,
        discountPercentage: undefined,
        category: 'Cart Products',
        description: 'Desk is a product loaded from the DummyJSON carts API.',
        available: true,
        image: '/desk.png',
        quantity: 3,
      },
      expect.objectContaining({ id: '3-7', productId: 7, image: '/thumb.png', quantity: 2 }),
    ]);
  });

  it('uses stable fallback IDs, titles, totals, and images for incomplete products', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: { carts: [{ id: 4, products: [{ total: 75, images: [] }, {}] }, { id: 5 }] },
    });

    const products = await cartApi.getAllCarts();

    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({
      id: '4-4000',
      productId: 4000,
      name: 'Cart product 4000',
      price: 75,
      quantity: 0,
    });
    expect(products[0].image).toBe(
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    );
    expect(products[1]).toMatchObject({ id: '4-4001', productId: 4001, price: 49, quantity: 0 });
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'uses the fallback for an invalid price of %s',
    async (price) => {
      vi.spyOn(axios, 'get').mockResolvedValue({
        data: { carts: [{ id: 1, products: [{ id: 1, price }] }] },
      });

      expect((await cartApi.getAllCarts())[0].price).toBe(49);
    },
  );

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY, undefined])(
    'uses zero stock for an invalid quantity of %s',
    async (quantity) => {
      vi.spyOn(axios, 'get').mockResolvedValue({
        data: { carts: [{ id: 1, products: [{ id: 1, quantity }] }] },
      });

      expect((await cartApi.getAllCarts())[0].quantity).toBe(0);
    },
  );

  it.each([
    {
      discountPercentage: 25,
      discountedPrice: undefined,
      expectedPrice: 60,
      expectedPercentage: 25,
    },
    {
      discountPercentage: 100,
      discountedPrice: undefined,
      expectedPrice: 0,
      expectedPercentage: 100,
    },
    {
      discountPercentage: undefined,
      discountedPrice: 20,
      expectedPrice: 20,
      expectedPercentage: 75,
    },
    {
      discountPercentage: undefined,
      discountedPrice: 0,
      expectedPrice: 0,
      expectedPercentage: 100,
    },
    { discountPercentage: 10, discountedPrice: 50, expectedPrice: 50, expectedPercentage: 10 },
  ])(
    'normalizes discounts: %j',
    async ({ discountPercentage, discountedPrice, expectedPrice, expectedPercentage }) => {
      vi.spyOn(axios, 'get').mockResolvedValue({
        data: {
          carts: [{ id: 1, products: [{ id: 1, price: 80, discountPercentage, discountedPrice }] }],
        },
      });

      expect((await cartApi.getAllCarts())[0]).toMatchObject({
        discountedPrice: expectedPrice,
        discountPercentage: expectedPercentage,
      });
    },
  );

  it.each([0, -5, 101, Number.NaN, Number.POSITIVE_INFINITY])(
    'ignores an invalid discount percentage of %s',
    async (discountPercentage) => {
      vi.spyOn(axios, 'get').mockResolvedValue({
        data: {
          carts: [
            { id: 1, products: [{ id: 1, price: 80, discountPercentage, discountedPrice: -1 }] },
          ],
        },
      });

      expect((await cartApi.getAllCarts())[0]).toMatchObject({
        price: 80,
        discountedPrice: undefined,
        discountPercentage: undefined,
      });
    },
  );

  it('deduplicates repeated cart product IDs while keeping the latest record', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        carts: [
          {
            id: 1,
            products: [
              { id: 2, title: 'Old title', quantity: 1 },
              { id: 2, title: 'Updated title', quantity: 4 },
            ],
          },
        ],
      },
    });

    expect(await cartApi.getAllCarts()).toEqual([
      expect.objectContaining({ id: '1-2', name: 'Updated title', quantity: 4 }),
    ]);
  });

  it.each([{}, { carts: [] }, { carts: [{ id: 1 }] }])(
    'resolves an empty catalog for %j',
    async (data) => {
      vi.spyOn(axios, 'get').mockResolvedValue({ data });

      await expect(cartApi.getAllCarts()).resolves.toEqual([]);
    },
  );

  it('resolves an empty catalog on request failure rather than rejecting', async () => {
    const error = new Error('Offline');
    vi.spyOn(axios, 'get').mockRejectedValue(error);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(cartApi.getAllCarts()).resolves.toEqual([]);
    expect(warn).toHaveBeenCalledWith(expect.any(String), error);
  });
});

describe('cartApi mutations', () => {
  it('sends the requested user and products and returns the add response', async () => {
    const response = { id: 12 };
    const post = vi.spyOn(axios, 'post').mockResolvedValue({ data: response });
    const request = { userId: 3, products: [{ id: 7, quantity: 2 }] };

    await expect(cartApi.addToCart(request)).resolves.toBe(response);
    expect(post).toHaveBeenCalledExactlyOnceWith('https://dummyjson.com/carts/add', request);
  });

  it('deletes the requested cart and returns the delete response', async () => {
    const response = { id: 12, isDeleted: true };
    const remove = vi.spyOn(axios, 'delete').mockResolvedValue({ data: response });

    await expect(cartApi.deleteCart(12)).resolves.toBe(response);
    expect(remove).toHaveBeenCalledExactlyOnceWith('https://dummyjson.com/carts/12');
  });

  it('propagates mutation failures for the caller to handle locally', async () => {
    const error = new Error('Offline');
    vi.spyOn(axios, 'post').mockRejectedValue(error);
    vi.spyOn(axios, 'delete').mockRejectedValue(error);

    await expect(cartApi.addToCart({ userId: 1, products: [] })).rejects.toBe(error);
    await expect(cartApi.deleteCart(1)).rejects.toBe(error);
  });
});
