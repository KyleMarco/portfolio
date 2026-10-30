# Kyle Marco Cabiling — Portfolio

A minimal portfolio website for a Senior Frontend Developer, with an interactive storefront demo.

## Overview

The home page presents selected work, professional experience, technical expertise, and contact details. It also includes:

- A responsive React and TypeScript portfolio
- An interactive storefront at `/demo` demonstrating catalog and cart behavior
- An About URL redirect and a not-found route

## Tech stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- TanStack Query
- React Router DOM
- Tailwind CSS
- Axios
- Oxlint
- Prettier

## Coding standards

- Keep TypeScript strict and use explicit types for component props, state, and API data. Avoid `any` and unsafe casts.
- Use React function components and hooks; keep hooks within the Rules of Hooks.
- Keep code in its owning layer: app setup in `src/app/`, feature behavior in `src/features/`, route-level screens in `src/routes/`, and reusable UI in `src/shared/ui/`.
- Organize feature-owned APIs, hooks, and types with their feature; use shared UI or API utilities only when needed. See [the frontend skill](.github/skills/frontend/SKILL.md) for the frontend architecture and workflow.
- Prefer semantic, accessible HTML and preserve loading, empty, and error states. Add or update tests for meaningful behavior changes.
- Use Prettier for consistent formatting: two-space indentation, single quotes, and semicolons. Run `npm run format` to format the project and `npm run format:check` to verify formatting.
- Run `npm run lint` before submitting changes. Oxlint treats correctness issues as errors and suspicious patterns as warnings. Also run `npm run test` for behavior changes and `npm run build` when changing application code.

## Features

### Portfolio

- Selected project previews link to the live storefront demo and this repository.
- Professional experience and technical expertise are sourced from `src/routes/portfolioData.ts`.
- Contact links include email, phone, LinkedIn, and a résumé request by email.

### Storefront demo

- Product catalog rendered from DummyJSON cart data
- Availability filters: All, Available, and Unavailable
- Quantity selection before adding products to the cart
- Cart summary with total items and total price
- Clear cart action with graceful API fallback handling
- Redux Toolkit cart state, TanStack Query catalog fetching, and toast feedback

### Routing

- Portfolio home page with project, about, experience, and contact sections
- `/demo` storefront page for catalog browsing and cart operations
- `/about` redirects to the portfolio home page
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
    App.tsx
    providers/
      AppProviders.tsx
    router/
      index.tsx
    store/
      index.ts
    styles/
      globals.css
  features/
    cart/
      cartSlice.ts
      api/
        cartApi.ts
      hooks/
        useCartCatalog.ts
        useCartMutations.ts
  routes/
    AboutPage.tsx
    HomePage.tsx
    NotFoundPage.tsx
    ShopPage.tsx
    index.ts
  shared/
    ui/
      Button.tsx
      Toast.tsx
  main.tsx
```

## Data sources

- Product catalog: DummyJSON carts endpoint

The storefront demonstrates common frontend patterns and is not intended as a production e-commerce implementation.

## Notes

- The cart API requests are wrapped in a fallback strategy so the UI still works even when the remote API is unavailable.
- The app uses a Redux store for cart state and a central React Query client configured in the app providers.
- Styling follows the project’s dark utility-class based approach and keeps the design intentionally minimal and modern.
