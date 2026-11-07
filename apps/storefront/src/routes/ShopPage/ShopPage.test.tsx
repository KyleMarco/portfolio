import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastProvider } from '@portfolio/ui';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import i18n from '../../app/i18n';
import cartReducer, { setCatalogItems, type CatalogItem } from '../../features/cart/cartSlice';
import { cartApi } from '../../features/cart/api/cartApi';
import ShopPage from './ShopPage';

vi.mock('../../features/cart/api/cartApi', () => ({
  cartApi: { getAllCarts: vi.fn(), addToCart: vi.fn(), deleteCart: vi.fn() },
}));

const product: CatalogItem = {
  id: 'desk',
  productId: 7,
  name: 'Desk',
  price: 80,
  discountedPrice: 60,
  discountPercentage: 25,
  quantity: 3,
  available: true,
  category: 'Furniture',
  description: 'A small desk',
  image: '/desk.png',
};

let queryClient: QueryClient;

function renderShop() {
  const store = configureStore({ reducer: { cart: cartReducer } });
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <ShopPage />
          </ToastProvider>
        </QueryClientProvider>
      </Provider>
    </I18nextProvider>,
  );
  return store;
}

beforeEach(async () => {
  vi.mocked(cartApi.getAllCarts).mockResolvedValue([product]);
  vi.mocked(cartApi.addToCart).mockResolvedValue({ id: 1 });
  vi.mocked(cartApi.deleteCart).mockResolvedValue({ id: 1, isDeleted: true });
  setCatalogItems([]);
  await i18n.changeLanguage('en');
});

afterEach(async () => {
  cleanup();
  queryClient.clear();
  setCatalogItems([]);
  vi.resetAllMocks();
  await i18n.changeLanguage('en');
});

describe('ShopPage', () => {
  it('shows loading until the catalog resolves, then renders the products', async () => {
    let resolveCatalog!: (items: CatalogItem[]) => void;
    vi.mocked(cartApi.getAllCarts).mockReturnValue(
      new Promise((resolve) => {
        resolveCatalog = resolve;
      }),
    );
    renderShop();

    expect(screen.getByText('Loading products...')).toBeTruthy();
    expect(screen.queryByRole('article')).toBeNull();
    await act(async () => {
      resolveCatalog([product]);
    });

    expect(await screen.findByRole('heading', { name: 'Desk' })).toBeTruthy();
    expect(screen.queryByText('Loading products...')).toBeNull();
    expect(cartApi.getAllCarts).toHaveBeenCalledOnce();
  });

  it('treats an empty catalog as a successful load and keeps the empty cart usable', async () => {
    vi.mocked(cartApi.getAllCarts).mockResolvedValue([]);
    renderShop();
    await waitFor(() => expect(screen.queryByText('Loading products...')).toBeNull());
    fireEvent.click(screen.getByRole('button', { name: 'Open cart, 0 items' }));

    const dialog = within(screen.getByRole('dialog', { name: 'Cart' }));
    expect(dialog.getByText('Your cart is empty.')).toBeTruthy();
    expect(dialog.queryByRole('button', { name: 'Clear all' })).toBeNull();
    expect(screen.queryByRole('article')).toBeNull();
    expect(screen.queryByText('Unable to load the product catalog.')).toBeNull();
  });

  it('renders the query error state when the catalog function rejects', async () => {
    vi.mocked(cartApi.getAllCarts).mockRejectedValue(new Error('Unexpected catalog failure'));
    renderShop();

    expect(await screen.findByText('Unable to load the product catalog.')).toBeTruthy();
    expect(screen.queryByText('Loading products...')).toBeNull();
    expect(screen.queryByRole('article')).toBeNull();
    expect(cartApi.getAllCarts).toHaveBeenCalledOnce();
  });

  it('keeps both pagination controls synchronized and resets the page on filter changes', async () => {
    vi.mocked(cartApi.getAllCarts).mockResolvedValue(
      Array.from({ length: 12 }, (_, index) => ({
        ...product,
        id: `item-${index + 1}`,
        name: `Product ${index + 1}`,
        available: index < 10,
      })),
    );
    renderShop();
    await screen.findByRole('heading', { name: 'Product 1' });
    const top = within(screen.getByRole('navigation', { name: 'Product pages top' }));
    const bottom = within(screen.getByRole('navigation', { name: 'Product pages bottom' }));
    expect(screen.getAllByRole('article')).toHaveLength(10);
    expect((top.getByRole('button', { name: 'Previous page' }) as HTMLButtonElement).disabled).toBe(
      true,
    );

    fireEvent.click(bottom.getByRole('button', { name: 'Next page' }));

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Product 11' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Product 1' })).toBeNull();
    for (const nav of [top, bottom]) {
      expect(nav.getByRole('button', { name: 'Page 2' }).getAttribute('aria-current')).toBe('page');
      expect((nav.getByRole('button', { name: 'Next page' }) as HTMLButtonElement).disabled).toBe(
        true,
      );
    }

    fireEvent.click(screen.getByRole('button', { name: 'Available' }));
    expect(screen.getAllByRole('article')).toHaveLength(10);
    expect(screen.getByRole('heading', { name: 'Product 1' })).toBeTruthy();
    expect(screen.queryByRole('navigation')).toBeNull();
    expect(screen.getByRole('button', { name: 'Available' }).getAttribute('aria-pressed')).toBe(
      'true',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Unavailable' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.queryByRole('button', { name: 'Add to cart' })).toBeNull();
    expect(
      screen.getAllByRole<HTMLSelectElement>('combobox').every((select) => select.disabled),
    ).toBe(true);
    expect(cartApi.addToCart).not.toHaveBeenCalled();
  });

  it('adds the selected quantity, applies discounted totals, and releases stock when removed', async () => {
    const store = renderShop();
    await screen.findByRole('heading', { name: 'Desk' });
    fireEvent.change(screen.getByRole('combobox', { name: 'Qty' }), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

    expect(await screen.findByRole('status')).toHaveProperty('textContent', 'Desk added to cart');
    expect(cartApi.addToCart).toHaveBeenCalledOnce();
    expect(vi.mocked(cartApi.addToCart).mock.calls[0][0]).toEqual({
      userId: 1,
      products: [{ id: 7, quantity: 3 }],
    });
    expect(
      (screen.getByRole('button', { name: 'Maximum reached' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect((screen.getByRole('combobox', { name: 'Qty' }) as HTMLSelectElement).disabled).toBe(
      true,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open cart, 3 items' }));
    const dialog = within(screen.getByRole('dialog', { name: 'Cart' }));
    expect(dialog.getAllByText('$240.00', { selector: 'del' })).toHaveLength(2);
    expect(dialog.getAllByText('$180.00')).toHaveLength(2);

    fireEvent.click(dialog.getByRole('button', { name: 'Remove' }));
    expect(dialog.getByText('Your cart is empty.')).toBeTruthy();
    expect(store.getState().cart.items).toEqual([]);
    expect(
      (screen.getByRole('button', { name: 'Add to cart' }) as HTMLButtonElement).disabled,
    ).toBe(false);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open cart, 0 items' }));
  });

  it('clears the local cart after a successful server mutation', async () => {
    const store = renderShop();
    await screen.findByRole('heading', { name: 'Desk' });
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Open cart, 1 items' }));
    const dialog = within(screen.getByRole('dialog', { name: 'Cart' }));

    fireEvent.click(dialog.getByRole('button', { name: 'Clear all' }));

    expect(await dialog.findByText('Your cart is empty.')).toBeTruthy();
    expect(cartApi.deleteCart).toHaveBeenCalledOnce();
    expect(vi.mocked(cartApi.deleteCart).mock.calls[0][0]).toBe(1);
    expect(store.getState().cart.items).toEqual([]);
  });
});
