# React Storefront Demo

A Vite + React + TypeScript application that demonstrates modern frontend patterns with Redux Toolkit, TanStack Query, and route-based page composition.

## Overview

This project is a lightweight storefront and demo app built to showcase:

- Redux Toolkit state management for the cart and counter examples
- TanStack Query for fetching and caching remote data
- React Router navigation across home, shop, about, and post detail pages
- Reusable UI patterns with dark-mode utility styling
- Client-side cart interactions with optimistic updates and toast feedback

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
- Counter example demonstrates standard Redux Toolkit patterns
- Posts are fetched with TanStack Query and linked to individual detail routes
- Toast notifications provide user feedback for cart actions

### Routing

- Home page with quick navigation to shop and about views
- Shop page for catalog browsing and cart operations
- About page for app description and overview
- Dynamic post detail route using route params
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
    counter/
      counterSlice.ts
      CounterPanel.tsx
    posts/
      api/
        postsApi.ts
      components/
        PostList.tsx
  pages/
    AboutPage/
    HomePage/
    NotFoundPage/
    PostDetailPage/
    ShopPage/
  shared/
    components/
      Button.tsx
      Card.tsx
      Toast.tsx
  App.tsx
  main.tsx
```

## Data sources

- Product catalog: DummyJSON carts endpoint
- Posts data: JSONPlaceholder posts API

The app intentionally mixes a small storefront workflow with query-based demo data, making it useful as a starter for app patterns rather than a production e-commerce implementation.

## Notes

- The cart API requests are wrapped in a fallback strategy so the UI still works even when the remote API is unavailable.
- The app uses a single Redux store with multiple slices and a central React Query client configured in the app providers.
- Styling follows the project’s dark utility-class based approach and keeps the design intentionally minimal and modern.
