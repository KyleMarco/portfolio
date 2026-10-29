import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cartApi';

export function useCartMutations() {
  const addToCartMutation = useMutation({
    mutationFn: cartApi.addToCart,
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.deleteCart,
  });

  return {
    addToCartMutation,
    clearCartMutation,
  };
}
