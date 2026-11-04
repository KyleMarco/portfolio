import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { AppProviders } from './providers/AppProviders';
import { cartApi } from '../features/cart/api/cartApi';

vi.mock('../features/cart/api/cartApi', () => ({
  cartApi: {
    getAllCarts: vi.fn().mockResolvedValue([
      {
        id: 'test-product',
        productId: 1,
        name: 'Test product',
        price: 10,
        quantity: 5,
        available: true,
        category: 'Test',
        description: 'A sample product',
        image: '/test-product.png',
      },
    ]),
    addToCart: vi.fn().mockRejectedValue(new Error('Demo API unavailable')),
    deleteCart: vi.fn().mockRejectedValue(new Error('Demo API unavailable')),
  },
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('standalone storefront', () => {
  it('loads its own providers and keeps cart actions working when mutations fail', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.history.replaceState(null, '', import.meta.env.BASE_URL);
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(screen.getByText('Loading products...')).toBeTruthy();
    await screen.findByText('Test product');
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Open cart, 1 items' }));

    const dialog = screen.getByRole('dialog', { name: 'Cart' });
    expect(within(dialog).getByText('Test product')).toBeTruthy();
    expect(vi.mocked(cartApi.addToCart).mock.calls[0][0]).toEqual({
      userId: 1,
      products: [{ id: 1, quantity: 1 }],
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Clear all' }));
    expect(await within(dialog).findByText('Your cart is empty.')).toBeTruthy();
    expect(vi.mocked(cartApi.deleteCart).mock.calls[0][0]).toBe(1);
  });

  it('renders a fallback within its own router base', () => {
    window.history.replaceState(null, '', `${import.meta.env.BASE_URL}missing`);
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Go home' }).getAttribute('href')).toBe(
      import.meta.env.BASE_URL,
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'fil' },
    });
    expect(screen.getByRole('heading', { name: 'Hindi makita ang pahina' })).toBeTruthy();
  });
});
