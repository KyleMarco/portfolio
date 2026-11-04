import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../api/cartApi';
import type { CatalogItem } from '../cartSlice';

export function useCartCatalog() {
  return useQuery<CatalogItem[]>({
    queryKey: ['dummyjson-carts'],
    queryFn: cartApi.getAllCarts,
    staleTime: 60_000,
  });
}
