import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCatalogItems,
  updateCartQuantity,
  type CatalogItem,
} from './cartSlice';
import cartReducer from './cartSlice';

const catalogItem: CatalogItem = {
  id: 'item-1',
  productId: 1,
  name: 'Test item',
  price: 10,
  category: 'test',
  description: 'A test item',
  available: true,
  image: '',
  quantity: 5,
};

describe('cart reducer', () => {
  beforeEach(() => {
    setCatalogItems([catalogItem]);
  });

  afterEach(() => {
    setCatalogItems([]);
  });

  it.each([0, -1, 0.9, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'ignores an invalid addition of %s without changing existing lines',
    (quantity) => {
      const state = { items: [{ itemId: 'item-1', quantity: 2 }] };

      expect(cartReducer(state, addToCart({ itemId: 'item-1', quantity }))).toBe(state);
    },
  );

  it('floors each addition and caps a first addition at stock', () => {
    const state = cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 2.9 }));
    expect(state.items).toEqual([{ itemId: 'item-1', quantity: 2 }]);
    expect(cartReducer(state, addToCart({ itemId: 'item-1', quantity: 1.9 })).items).toEqual([
      { itemId: 'item-1', quantity: 3 },
    ]);
    expect(cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 99 })).items).toEqual([
      { itemId: 'item-1', quantity: 5 },
    ]);
    expect(state.items).toEqual([{ itemId: 'item-1', quantity: 2 }]);
  });

  it.each(['missing', 'sold-out'])('does not add a line for %s stock', (itemId) => {
    setCatalogItems([catalogItem, { ...catalogItem, id: 'sold-out', quantity: 0 }]);

    expect(cartReducer(undefined, addToCart({ itemId, quantity: 1 })).items).toEqual([]);
  });

  it.each([{ catalog: [] }, { catalog: [{ ...catalogItem, quantity: 0 }] }])(
    'removes a line when an update finds no remaining stock (%j)',
    ({ catalog }) => {
      const state = { items: [{ itemId: 'item-1', quantity: 2 }] };
      setCatalogItems(catalog);

      expect(
        cartReducer(state, updateCartQuantity({ itemId: 'item-1', quantity: 3 })).items,
      ).toEqual([]);
      expect(state.items).toEqual([{ itemId: 'item-1', quantity: 2 }]);
    },
  );

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'ignores a non-finite update of %s',
    (quantity) => {
      const state = { items: [{ itemId: 'item-1', quantity: 2 }] };

      expect(cartReducer(state, updateCartQuantity({ itemId: 'item-1', quantity }))).toBe(state);
    },
  );

  it.each([0, -1, 0.9])('removes only the selected line for an update of %s', (quantity) => {
    const state = {
      items: [
        { itemId: 'item-1', quantity: 2 },
        { itemId: 'other', quantity: 1 },
      ],
    };

    expect(cartReducer(state, updateCartQuantity({ itemId: 'item-1', quantity })).items).toEqual([
      { itemId: 'other', quantity: 1 },
    ]);
  });

  it('ignores unknown updates and preserves other lines when removing or clearing', () => {
    const state = {
      items: [
        { itemId: 'item-1', quantity: 2 },
        { itemId: 'other', quantity: 1 },
      ],
    };

    expect(cartReducer(state, updateCartQuantity({ itemId: 'missing', quantity: 2 }))).toBe(state);
    expect(cartReducer(state, removeFromCart('item-1')).items).toEqual([
      { itemId: 'other', quantity: 1 },
    ]);
    expect(cartReducer(state, removeFromCart('missing')).items).toEqual(state.items);
    expect(cartReducer(state, clearCart()).items).toEqual([]);
    expect(state.items).toHaveLength(2);
  });

  it('limits added quantities to available stock', () => {
    const state = cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 3 }));
    const updatedState = cartReducer(state, addToCart({ itemId: 'item-1', quantity: 4 }));

    expect(updatedState.items).toEqual([{ itemId: 'item-1', quantity: 5 }]);
  });

  it('ignores non-positive or non-finite quantities', () => {
    const state = [0, -1, Number.NaN, Number.POSITIVE_INFINITY].reduce(
      (currentState, quantity) =>
        cartReducer(currentState, addToCart({ itemId: 'item-1', quantity })),
      cartReducer(undefined, clearCart()),
    );

    expect(state.items).toEqual([]);
  });

  it('floors and caps updated quantities, and removes an item when set to zero', () => {
    const initialState = cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 2 }));
    const flooredState = cartReducer(
      initialState,
      updateCartQuantity({ itemId: 'item-1', quantity: 3.9 }),
    );
    const cappedState = cartReducer(
      flooredState,
      updateCartQuantity({ itemId: 'item-1', quantity: 20 }),
    );
    const removedState = cartReducer(
      cappedState,
      updateCartQuantity({ itemId: 'item-1', quantity: 0 }),
    );

    expect(flooredState.items).toEqual([{ itemId: 'item-1', quantity: 3 }]);
    expect(cappedState.items).toEqual([{ itemId: 'item-1', quantity: 5 }]);
    expect(removedState.items).toEqual([]);
  });

  it('ignores non-finite quantity updates', () => {
    const initialState = cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 2 }));
    const updatedState = cartReducer(
      initialState,
      updateCartQuantity({ itemId: 'item-1', quantity: Number.NaN }),
    );

    expect(updatedState.items).toEqual([{ itemId: 'item-1', quantity: 2 }]);
  });

  it('removes an item and clears all cart items', () => {
    const populatedState = cartReducer(undefined, addToCart({ itemId: 'item-1', quantity: 2 }));
    const removedState = cartReducer(populatedState, removeFromCart('item-1'));
    const clearedState = cartReducer(populatedState, clearCart());

    expect(removedState.items).toEqual([]);
    expect(clearedState.items).toEqual([]);
  });
});
