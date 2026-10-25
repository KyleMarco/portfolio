import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store'
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCatalogItems,
  updateCartQuantity,
  catalogItems,
} from '../../features/cart/cartSlice'
import { useCartCatalog } from '../../features/cart/hooks/useCartCatalog'
import { useCartMutations } from '../../features/cart/hooks/useCartMutations'
import { Button } from '../../shared/components/Button'
import { useToast } from '../../shared/components/Toast'

type FilterValue = 'all' | 'available' | 'unavailable'

export default function ShopPage() {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const { success } = useToast()
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({})

  const { addToCartMutation, clearCartMutation } = useCartMutations()
  const { data: catalogData = [], isLoading, isError } = useCartCatalog()

  useEffect(() => {
    setCatalogItems(catalogData)
  }, [catalogData])

  const products = catalogData.length > 0 ? catalogData : catalogItems

  const visibleProducts = useMemo(() => {
    return products.filter((item) => {
      if (filter === 'available') {
        return item.available
      }

      if (filter === 'unavailable') {
        return !item.available
      }

      return true
    })
  }, [filter, products])

  const cartProducts = useMemo(
    () =>
      cartItems.flatMap((line) => {
        const item = products.find((product) => product.id === line.itemId)

        if (!item) {
          return []
        }

        return [{ ...item, quantity: line.quantity }]
      }),
    [cartItems, products],
  )

  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const handleQuantityChange = (itemId: number, value: string) => {
    const quantity = Number(value)
    setSelectedQuantities((current) => ({
      ...current,
      [itemId]: quantity,
    }))
  }

  const handleAddToCart = async (itemId: number) => {
    const product = products.find((item) => item.id === itemId)

    if (!product || !product.available) {
      return
    }

    const quantity = selectedQuantities[itemId] ?? 1

    try {
      await addToCartMutation.mutateAsync({
        userId: 1,
        products: [{ id: itemId, quantity }],
      })

      dispatch(addToCart({ itemId, quantity }))
      success(`${product.name} added to cart`)
    } catch (error) {
      console.error('Unable to add item to cart via API.', error)
      dispatch(addToCart({ itemId, quantity }))
      success(`${product.name} added to cart`)
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCartMutation.mutateAsync(1)
    } catch (error) {
      console.warn('Unable to clear the server-side cart.', error)
    } finally {
      dispatch(clearCart())
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
              Product catalog
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Shop available products
            </h1>
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
            {totalItems} items in cart • ${totalPrice.toFixed(2)}
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-slate-300">
          Loading products...
        </div>
      )}

      {isError && (
        <div className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200">
          Unable to load the product catalog.
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'available', 'unavailable'] as FilterValue[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={[
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              filter === option
                ? 'border-sky-400 bg-sky-500 text-slate-950'
                : 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800',
            ].join(' ')}
          >
            {option === 'all'
              ? 'All products'
              : option === 'available'
                ? 'Available'
                : 'Unavailable'}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <section className="grid gap-5 md:grid-cols-2">
          {visibleProducts.map((item) => {
            const quantity = selectedQuantities[item.id] ?? 1

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 shadow-lg shadow-slate-950/20"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />
                  <span
                    className={[
                      'absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold',
                      item.available
                        ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/40',
                    ].join(' ')}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {item.category}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        {item.name}
                      </h2>
                    </div>
                    <span className="text-lg font-bold text-sky-300">
                      ${item.price}
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>

                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      Qty
                      <select
                        value={quantity}
                        onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-slate-100 focus:border-sky-400"
                        disabled={!item.available}
                      >
                        {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Button
                      onClick={() => void handleAddToCart(item.id)}
                      variant="primary"
                      disabled={!item.available}
                      className="flex-1"
                    >
                      {item.available ? 'Add to cart' : 'Unavailable'}
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <aside className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-white">Cart</h2>
            {cartProducts.length > 0 && (
              <button
                type="button"
                onClick={() => void handleClearCart()}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Clear all
              </button>
            )}
          </div>

          {cartProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center text-slate-400">
              Your cart is empty.
            </div>
          ) : (
            <ul className="space-y-4">
              {cartProducts.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-slate-700 bg-slate-950/40 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-slate-400">${item.price} each</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-xs font-medium text-rose-300 hover:text-rose-200"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateCartQuantity({
                                itemId: item.id,
                                quantity: Math.max(item.quantity - 1, 0),
                              }),
                            )
                          }
                          className="h-8 w-8 rounded-full border border-slate-600 bg-slate-800 text-lg text-slate-200 hover:border-slate-500"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateCartQuantity({
                                itemId: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="h-8 w-8 rounded-full border border-slate-600 bg-slate-800 text-lg text-slate-200 hover:border-slate-500"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold text-sky-300">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 space-y-3 border-t border-slate-700 pt-5 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
