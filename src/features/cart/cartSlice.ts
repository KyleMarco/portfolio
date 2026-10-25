import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CatalogItem = {
  id: number
  name: string
  price: number
  category: string
  description: string
  available: boolean
  image: string
}

export type CartLine = {
  itemId: number
  quantity: number
}

export let catalogItems: CatalogItem[] = []

export const setCatalogItems = (items: CatalogItem[]) => {
  catalogItems = items
}

const initialState: { items: CartLine[] } = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ itemId: number; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload

      if (quantity <= 0) {
        return
      }

      const existingItem = state.items.find((item) => item.itemId === itemId)

      if (existingItem) {
        existingItem.quantity += quantity
        return
      }

      state.items.push({ itemId, quantity })
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.itemId !== action.payload)
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ itemId: number; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload
      const existingItem = state.items.find((item) => item.itemId === itemId)

      if (!existingItem) {
        return
      }

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.itemId !== itemId)
        return
      }

      existingItem.quantity = quantity
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
