# React Storefront Demo

A Vite + React + TypeScript portfolio and storefront application.

## Overview

This project includes:

- Redux Toolkit state management for the cart
- TanStack Query for fetching and caching the product catalog
- React Router navigation across home, shop, and about pages
- Reusable UI patterns with dark-mode utility styling
- Client-side cart interactions and toast feedback

## Tech stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- TanStack Query
- React Router DOM
- Tailwind CSS
- Oxlint

## Features

### Shop experience

- Product catalog rendered from DummyJSON cart data
- Availability filters: All, Available, and Unavailable
- Quantity selection before adding products to the cart
- Cart summary with total items and total price
- Clear cart action with graceful API fallback handling

### Global state and async data

- Cart state is managed in Redux via a dedicated slice
- Product catalog data is fetched and cached with TanStack Query
- Toast notifications provide user feedback for cart actions

### Routing

- Home page with quick navigation to shop and about views
- Shop page for catalog browsing and cart operations
- About page for app description and overview
- Not found route for unmatched paths

## Getting started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app runs with Vite in development mode and is available in the browser at the default local Vite port.

### Build for production

```bash
npm run build
```

### Lint the project

```bash
npm run lint
```

### Run unit tests

```bash
npm test
```

### Preview the production build

```bash
npm run preview
```

## Project structure

```text
src/
  app/
    providers.tsx
    router.tsx
    store.ts
  features/
    cart/
      cartSlice.ts
      api/
        cartApi.ts
      hooks/
        useCartCatalog.ts
        useCartMutations.ts
  pages/
    AboutPage/
    HomePage/
    NotFoundPage/
    ShopPage/
  shared/
    components/
      Button.tsx
      Toast.tsx
  App.tsx
  main.tsx
```

## Data sources

- Product catalog: DummyJSON carts endpoint

The storefront demonstrates common frontend patterns and is not intended as a production e-commerce implementation.

## Notes

- The cart API requests are wrapped in a fallback strategy so the UI still works even when the remote API is unavailable.
- The app uses a Redux store for cart state and a central React Query client configured in the app providers.
- Styling follows the project’s dark utility-class based approach and keeps the design intentionally minimal and modern.
