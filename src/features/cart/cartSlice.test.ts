import { beforeEach, describe, expect, it } from 'vitest';
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
