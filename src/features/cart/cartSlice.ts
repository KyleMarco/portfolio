import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CatalogItem = {
  id: string
  productId: number
  name: string
  price: number
  discountedPrice?: number
  discountPercentage?: number
  category: string
  description: string
  available: boolean
  image: string
  quantity: number
}

export type CartLine = {
  itemId: string
  quantity: number
}

export let catalogItems: CatalogItem[] = []

export const setCatalogItems = (items: CatalogItem[]) => {
  catalogItems = items
}

const getMaxQuantity = (itemId: string) =>
  catalogItems.find((item) => item.id === itemId)?.quantity ?? 0

const initialState: { items: CartLine[] } = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return
      }

      const requestedQuantity = Math.floor(quantity)

      if (requestedQuantity <= 0) {
        return
      }

      const maxQuantity = getMaxQuantity(itemId)
      const existingItem = state.items.find((item) => item.itemId === itemId)

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + requestedQuantity,
          maxQuantity,
        )
        return
      }

      state.items.push({ itemId, quantity: Math.min(requestedQuantity, maxQuantity) })
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.itemId !== action.payload)
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload
      const existingItem = state.items.find((item) => item.itemId === itemId)

      if (!existingItem) {
        return
      }

      if (!Number.isFinite(quantity)) {
        return
      }

      const requestedQuantity = Math.floor(quantity)

      if (requestedQuantity <= 0) {
        state.items = state.items.filter((item) => item.itemId !== itemId)
        return
      }

      existingItem.quantity = Math.min(requestedQuantity, getMaxQuantity(itemId))
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
