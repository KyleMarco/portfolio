# Kyle Marco Cabiling Portfolio

A responsive portfolio site for a senior frontend developer. The repository also includes a storefront demo page and its cart data flow.

## What is in the app

- The home page presents selected projects, professional experience, technical skills, education, and contact links. Portfolio content is defined in [`portfolioData.ts`](./src/routes/portfolioData.ts); English and Filipino copy is in [`src/app/locales/`](./src/app/locales/).
- The site supports light and dark themes, follows the system theme until the visitor chooses one, and saves a manual theme choice in local storage.
- The storefront page in [`ShopPage.tsx`](./src/routes/ShopPage/ShopPage.tsx) includes a product catalog, availability filters, pagination, quantity selection, and a cart dialog. It fetches catalog data from DummyJSON and uses the local Redux store for cart state. API mutation failures fall back to local cart behavior. Cart contents are in memory and reset on page reload.

### Routes

The [router](./src/app/router/index.tsx) currently registers `/` for the portfolio and a catch-all not-found page. [`ShopPage`](./src/routes/ShopPage/ShopPage.tsx) and [`AboutPage`](./src/routes/AboutPage/AboutPage.tsx) are exported components, but neither is registered as a route. Visiting `/demo` therefore displays the not-found page.

## Stack

- React 19 and TypeScript
- Vite 8 and Tailwind CSS 4
- React Router DOM 7
- Redux Toolkit and React Redux for cart state
- TanStack Query and Axios for catalog and cart API requests
- i18next and react-i18next for English and Filipino translations
- `@kylemarco/shared-ui` for shared buttons, dialogs, and toast notifications
- Vitest, Testing Library, Oxlint, and Prettier

## Local development

Use Node.js 22, matching the GitHub Actions workflow. The `@kylemarco/shared-ui` dependency is hosted on GitHub Packages. Before installing, set `NODE_AUTH_TOKEN` in your shell to a GitHub token with permission to read packages. The repository's [`.npmrc`](./.npmrc) reads this environment variable; do not add a token to the repository.

```bash
npm ci
npm run dev
```

Vite prints the local development URL when the server starts.

## Project scripts

| Command                | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start the Vite development server                 |
| `npm run build`        | Create the production build in `dist/`            |
| `npm run preview`      | Serve the production build locally                |
| `npm run lint`         | Run Oxlint                                        |
| `npm run test`         | Run the Vitest suite once                         |
| `npm run format`       | Format files with Prettier                        |
| `npm run format:check` | Check Prettier formatting without writing changes |

Follow [AGENTS.md](./AGENTS.md) and the [frontend skill](./.github/skills/frontend/SKILL.md) for repository conventions and frontend workflow guidance.

## Project layout

```text
src/
  app/
    providers/       # Redux, TanStack Query, i18n, theme, and toast providers
    router/          # BrowserRouter and registered routes
    store/           # Redux store and application types
    styles/          # Global Tailwind CSS styles
  features/
    cart/            # Cart slice, API calls, and TanStack Query hooks
  routes/
    AboutPage/       # About page component (not currently routed)
    HomePage/        # Portfolio home page and its test
    NotFoundPage/    # Fallback route
    ShopPage/        # Storefront component (not currently routed)
    portfolioData.ts # Portfolio content data
  main.tsx           # Application entry point
public/              # Static assets, including the resume PDF
.github/workflows/   # GitHub Actions validation and Pages deployment
```

Shared UI components are imported from `@kylemarco/shared-ui` rather than maintained under `src/shared/` in this repository.

## Data and state

The storefront catalog is read from `https://dummyjson.com/carts`. Add and clear operations also call DummyJSON endpoints, but the visible cart is managed by Redux Toolkit in the browser. If a mutation request fails, the UI still applies the add or clear locally. The catalog query is managed by TanStack Query. This is a frontend demonstration and does not provide persistent shopping-cart or checkout services.

There are no runtime environment variables for the portfolio. `NODE_AUTH_TOKEN` is required during dependency installation so npm can download the private shared UI package.

## Deployment

The Vite base path is `/portfolio/`, matching GitHub Pages project-site hosting. The [workflow](./.github/workflows/deploy.yml) runs lint, tests, and the production build on pull requests and updates to `main`. Pushes to `main` and manual workflow runs also deploy the build to GitHub Pages. The workflow uses the `NODE_AUTH_TOKEN` repository secret to install the private package and adds a `404.html` copy of the app entry point to support client-side routing on Pages.
