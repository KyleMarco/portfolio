import type { CatalogItem } from '../cartSlice'

export type DummyJsonCartProduct = {
  id: number
  quantity: number
}

type DummyJsonCartResponse = {
  carts?: Array<{
    id: number
    products?: Array<{
      id?: number
      title?: string
      price?: number
      quantity?: number
      total?: number
      discountPercentage?: number
      discountedPrice?: number
      thumbnail?: string
      images?: string[]
    }>
  }>
}

export const cartApi = {
  getAllCarts: async (): Promise<CatalogItem[]> => {
    try {
      const response = await fetch('https://dummyjson.com/carts')

      if (!response.ok) {
        throw new Error('Get all carts request failed')
      }

      const payload = (await response.json()) as DummyJsonCartResponse
      const carts = payload.carts ?? []

      const catalog = carts.flatMap((cart) =>
        (cart.products ?? []).map((product, productIndex) => {
          const productId = product.id ?? cart.id * 1000 + productIndex
          const name = product.title ?? `Cart product ${productId}`
          const productPrice = Number(product.price ?? product.total ?? 0)
          const price = Number.isFinite(productPrice) && productPrice > 0 ? productPrice : 49
          const image =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : product.thumbnail ??
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'

          return {
            id: productId,
            name,
            price,
            category: 'Cart Products',
            description: `${name} is a product loaded from the DummyJSON carts API.`,
            available: true,
            image,
          } satisfies CatalogItem
        }),
      )

      return catalog
    } catch (error) {
      console.warn('DummyJSON carts API unavailable, returning an empty catalog.', error)
      return []
    }
  },
  addToCart: async ({
    userId,
    products,
  }: {
    userId: number
    products: DummyJsonCartProduct[]
  }) => {
    const response = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, products }),
    })

    if (!response.ok) {
      throw new Error('Add-to-cart request failed')
    }

    return response.json()
  },
  deleteCart: async (cartId: number) => {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Delete-cart request failed')
    }

    return response.json()
  },
}
