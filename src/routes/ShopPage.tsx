import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCatalogItems,
  updateCartQuantity,
  catalogItems,
} from '../features/cart/cartSlice';
import { useCartCatalog } from '../features/cart/hooks/useCartCatalog';
import { useCartMutations } from '../features/cart/hooks/useCartMutations';
import { Button } from '../shared/ui/Button';
import { PopupDialog } from '../shared/ui/PopupDialog';
import { useToast } from '../shared/ui/Toast';

type FilterValue = 'all' | 'available' | 'unavailable';
const ITEMS_PER_PAGE = 10;

type ProductPaginationProps = {
  page: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  position: 'top' | 'bottom';
};

function ProductPagination({
  page,
  totalPages,
  totalProducts,
  onPageChange,
  position,
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={`Product pages ${position}`}
      className="flex w-full min-w-0 flex-col items-center justify-between gap-3 sm:flex-row md:col-span-2"
    >
      <p className="text-center text-sm text-stone-600 sm:text-left">
        Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, totalProducts)}{' '}
        of {totalProducts} products
      </p>
      <div className="inline-flex max-w-full items-center rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-l-md border border-stone-300 bg-[#fbfaf7] text-stone-900 transition hover:bg-[#f2f0eb] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="m12.5 4.5-5 5.5 5 5.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={page === pageNumber ? 'page' : undefined}
            aria-label={`Page ${pageNumber}`}
            className={[
              'relative -ml-px h-9 min-w-9 items-center justify-center border px-3 text-sm font-medium transition focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-stone-950',
              pageNumber === page ? 'inline-flex' : 'hidden sm:inline-flex',
              page === pageNumber
                ? 'z-10 border-stone-950 bg-stone-950 text-white'
                : 'border-stone-300 bg-[#fbfaf7] text-stone-900 hover:bg-[#f2f0eb]',
            ].join(' ')}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="relative -ml-px inline-flex h-9 w-9 items-center justify-center rounded-r-md border border-stone-300 bg-[#fbfaf7] text-stone-900 transition hover:bg-[#f2f0eb] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-stone-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="m7.5 4.5 5 5.5-5 5.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default function ShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { success } = useToast();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);
  const cartCloseRef = useRef<HTMLButtonElement>(null);

  const { addToCartMutation, clearCartMutation } = useCartMutations();
  const { data: catalogData = [], isLoading, isError } = useCartCatalog();

  useEffect(() => {
    setCatalogItems(catalogData);
  }, [catalogData]);

  const products = catalogData.length > 0 ? catalogData : catalogItems;

  const visibleProducts = useMemo(() => {
    return products.filter((item) => {
      if (filter === 'available') {
        return item.available;
      }

      if (filter === 'unavailable') {
        return !item.available;
      }

      return true;
    });
  }, [filter, products]);

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paginatedProducts = visibleProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const cartProducts = useMemo(
    () =>
      cartItems.flatMap((line) => {
        const item = products.find((product) => product.id === line.itemId);

        if (!item) {
          return [];
        }

        return [{ ...item, cartQuantity: line.quantity }];
      }),
    [cartItems, products],
  );

  const totalItems = cartProducts.reduce((sum, item) => sum + item.cartQuantity, 0);
  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  const discountedTotal = cartProducts.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price) * item.cartQuantity,
    0,
  );

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleQuantityChange = (itemId: string, value: string) => {
    const quantity = Number(value);
    setSelectedQuantities((current) => ({
      ...current,
      [itemId]: quantity,
    }));
  };

  const handleAddToCart = async (itemId: string) => {
    const product = products.find((item) => item.id === itemId);

    if (!product || !product.available) {
      return;
    }

    const currentQuantity = cartItems.find((item) => item.itemId === itemId)?.quantity ?? 0;
    const remainingQuantity = Math.max(product.quantity - currentQuantity, 0);
    const quantity = Math.min(selectedQuantities[itemId] ?? 1, remainingQuantity);

    if (quantity <= 0) {
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        userId: 1,
        products: [{ id: product.productId, quantity }],
      });

      dispatch(addToCart({ itemId, quantity }));
      success(`${product.name} added to cart`);
    } catch (error) {
      console.error('Unable to add item to cart via API.', error);
      dispatch(addToCart({ itemId, quantity }));
      success(`${product.name} added to cart`);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartMutation.mutateAsync(1);
    } catch (error) {
      console.warn('Unable to clear the server-side cart.', error);
    } finally {
      dispatch(clearCart());
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 rounded-3xl border border-stone-200 bg-[#f2f0eb] p-4 text-stone-950 shadow-lg shadow-stone-900/5 sm:mb-8 sm:rounded-[2rem] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-stone-500">
              Demo only · not a real shop
            </p>
            <h1 className="font-serif text-2xl font-medium leading-tight sm:text-4xl">
              Sample product catalog
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              This is a sample page using product and cart data from DummyJSON. No real products are
              sold and no purchases are processed.
            </p>
          </div>

          <div className="w-fit max-w-full break-words rounded-2xl border border-stone-300 bg-[#fbfaf7] px-4 py-3 text-sm text-stone-800">
            {totalItems} items in cart •{' '}
            {discountedTotal < totalPrice && (
              <span className="mr-1 line-through">${totalPrice.toFixed(2)}</span>
            )}
            <span>${discountedTotal.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="mb-6 rounded-2xl border border-stone-200 bg-[#fbfaf7] p-4 text-stone-700">
          Loading products...
        </div>
      )}

      {isError && (
        <div className="mb-6 rounded-2xl border border-rose-700/30 bg-rose-100 p-4 text-rose-900">
          Unable to load the product catalog.
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'available', 'unavailable'] as FilterValue[]).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => {
              setFilter(option);
              setCurrentPage(1);
            }}
            className={[
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              filter === option
                ? 'border-stone-950 bg-stone-950 text-white'
                : 'border-stone-300 bg-[#fbfaf7] text-stone-900 hover:bg-[#f2f0eb]',
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

      <div className="grid min-w-0 gap-4 sm:gap-6">
        <section className="grid min-w-0 gap-4 md:grid-cols-2 sm:gap-5">
          <ProductPagination
            page={page}
            totalPages={totalPages}
            totalProducts={visibleProducts.length}
            onPageChange={setCurrentPage}
            position="top"
          />
          {paginatedProducts.map((item) => {
            const cartQuantity =
              cartItems.find((cartItem) => cartItem.itemId === item.id)?.quantity ?? 0;
            const remainingQuantity = Math.max(item.quantity - cartQuantity, 0);
            const quantity = Math.min(
              selectedQuantities[item.id] ?? 1,
              Math.max(remainingQuantity, 1),
            );
            const hasDiscount =
              item.discountedPrice !== undefined && item.discountedPrice < item.price;

            return (
              <article
                key={item.id}
                data-interactive-card
                className="overflow-hidden rounded-3xl border border-stone-200 bg-[#fbfaf7] shadow-lg shadow-stone-900/5"
              >
                <div className="group relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <span
                    className={[
                      'absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold',
                      item.available
                        ? 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-700/30'
                        : 'bg-amber-100 text-amber-900 ring-1 ring-amber-700/30',
                    ].join(' ')}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        {item.category}
                      </p>
                      <h2 className="mt-2 break-words text-xl font-semibold text-stone-950 sm:text-2xl">
                        {item.name}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-2">
                        {hasDiscount && (
                          <del className="text-sm text-stone-500">${item.price.toFixed(2)}</del>
                        )}
                        <span className="text-lg font-bold text-stone-950">
                          ${(item.discountedPrice ?? item.price).toFixed(2)}
                        </span>
                      </div>
                      {hasDiscount && item.discountPercentage !== undefined && (
                        <span className="text-xs font-semibold text-emerald-800">
                          {item.discountPercentage.toFixed(2).replace(/\.?0+$/, '')}% off
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-stone-700">{item.description}</p>

                  <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                    <label className="flex items-center gap-2 text-sm text-stone-700">
                      Qty
                      <select
                        value={quantity}
                        onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                        className="rounded-lg border border-stone-300 bg-[#fbfaf7] px-2 py-1.5 text-stone-900 focus:border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-700/20"
                        disabled={!item.available || remainingQuantity === 0}
                      >
                        {Array.from(
                          { length: Math.max(remainingQuantity, 1) },
                          (_, index) => index + 1,
                        ).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Button
                      onClick={() => void handleAddToCart(item.id)}
                      variant="primary"
                      disabled={!item.available || remainingQuantity === 0}
                      className="w-full sm:flex-1"
                    >
                      {!item.available
                        ? 'Unavailable'
                        : remainingQuantity === 0
                          ? 'Maximum reached'
                          : 'Add to cart'}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
          <ProductPagination
            page={page}
            totalPages={totalPages}
            totalProducts={visibleProducts.length}
            onPageChange={setCurrentPage}
            position="bottom"
          />
        </section>
      </div>

      <button
        ref={cartTriggerRef}
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Open cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
        aria-haspopup="dialog"
        aria-expanded={isCartOpen}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-white shadow-xl shadow-stone-950/25 transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="10" cy="20" r="1" fill="currentColor" />
          <circle cx="18" cy="20" r="1" fill="currentColor" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white ring-2 ring-[#fbfaf7]">
            {totalItems}
          </span>
        )}
      </button>

      {isCartOpen && (
        <PopupDialog
          labelledBy="cart-dialog-title"
          closeLabel="Close cart"
          onClose={closeCart}
          initialFocusRef={cartCloseRef}
          returnFocusRef={cartTriggerRef}
          overlayClassName="flex justify-end"
          backdropClassName="bg-stone-950/50"
          panelClassName="flex h-full w-full max-w-xl flex-col bg-[#fbfaf7] shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 p-4 sm:p-6">
            <div>
              <h2
                id="cart-dialog-title"
                className="font-serif text-2xl font-semibold text-stone-950"
              >
                Cart
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {cartProducts.length > 0 && (
                <button
                  type="button"
                  onClick={() => void handleClearCart()}
                  className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
                >
                  Clear all
                </button>
              )}
              <button
                ref={cartCloseRef}
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-[#f2f0eb] hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-stone-950"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                  <path
                    d="m5 5 10 10M15 5 5 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.75"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            {cartProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-[#f2f0eb] p-6 text-center text-stone-600">
                Your cart is empty.
              </div>
            ) : (
              <ul className="space-y-4">
                {cartProducts.map((item) => (
                  <li
                    key={item.id}
                    data-interactive-card
                    className="flex gap-3 rounded-2xl border border-stone-200 bg-[#f2f0eb] p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="break-words font-medium text-stone-950">{item.name}</p>
                          <p className="text-sm text-stone-600">${item.price} each</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-xs font-medium text-rose-700 hover:text-rose-900"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  itemId: item.id,
                                  quantity: Math.max(item.cartQuantity - 1, 0),
                                }),
                              )
                            }
                            className="h-8 w-8 rounded-full border border-stone-300 bg-[#fbfaf7] text-lg text-stone-900 hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-stone-950"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold text-stone-900">
                            {item.cartQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  itemId: item.id,
                                  quantity: item.cartQuantity + 1,
                                }),
                              )
                            }
                            disabled={item.cartQuantity >= item.quantity}
                            className="h-8 w-8 rounded-full border border-stone-300 bg-[#fbfaf7] text-lg text-stone-900 hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        <span className="flex w-full flex-wrap items-center justify-end gap-x-2 font-semibold text-stone-950 sm:w-auto">
                          {item.discountedPrice !== undefined &&
                            item.discountedPrice < item.price && (
                              <del className="text-sm font-normal text-stone-500">
                                ${(item.price * item.cartQuantity).toFixed(2)}
                              </del>
                            )}
                          <span>
                            ${((item.discountedPrice ?? item.price) * item.cartQuantity).toFixed(2)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm text-stone-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-stone-950">
                <span>Total</span>
                <span className="flex items-center gap-2">
                  {discountedTotal < totalPrice && (
                    <del className="text-sm font-normal text-stone-500">
                      ${totalPrice.toFixed(2)}
                    </del>
                  )}
                  <span>${discountedTotal.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </div>
        </PopupDialog>
      )}
    </main>
  );
}
