# Kyle Marco Cabiling — frontend monorepo

An npm-workspaces monorepo orchestrated by Turborepo, containing a portfolio, a standalone storefront demo, and a Storybook catalog for the shared UI package. The portfolio and storefront use React, TypeScript, Vite, Tailwind CSS, React Router, and English/Filipino translations. They share TypeScript settings and have access to the local UI package, with separate entry points, application providers, styles, dependencies, and builds.

## Workspace layout

```text
apps/
  portfolio/                  # @portfolio/site
    public/                   # Résumé, profile photo, and portfolio images
    src/
      app/                    # Router, theme provider, translations, app styles
      routes/                 # Home, about, and not-found components
      main.tsx
    index.html
    package.json
    tsconfig.json
    vite.config.js
  storefront/                 # @portfolio/storefront
    src/
      app/                    # Router, Redux store, Query/i18n/toast providers
      features/cart/          # Cart reducer, API adapter, query/mutation hooks
      routes/ShopPage/        # Catalog, filters, pagination, and cart dialog
      main.tsx
    index.html
    package.json
    tsconfig.json
    vite.config.js
  storybook/                  # @portfolio/storybook
    .storybook/               # Storybook configuration
    package.json
packages/
  ui/                         # @portfolio/ui: component source, tests, styles, and stories
  tsconfig/                   # @portfolio/tsconfig: shared compiler settings
docs/                         # Architecture, behavior, deployment, and validation guidance
.github/workflows/            # Validation and GitHub Pages deployment
AGENTS.md                     # Repository guidance for coding agents
package.json                  # Workspace scripts and repository tooling
package-lock.json             # One lockfile for every workspace
turbo.json                    # Task dependencies, cache outputs, and persistent tasks
```

Keep app-specific features, APIs, state, tests, and translations inside their owning app. Apps must not import another app's source. Shared buttons, dialogs, toast notifications, and virtualized views come from the private `@portfolio/ui` workspace at `packages/ui`. The Storybook app at `apps/storybook` catalogs stories stored alongside those components.

## Current app state

- Portfolio: a personal landing page at `/portfolio/` on the deployed GitHub Pages project site. Its root route renders the home screen and a catch-all 404 view. The light/dark theme toggle and English/Filipino language selector are handled by the portfolio app shell. The `AboutPage` component remains in the codebase for future routing, but the app shell does not register it.
- Storefront: a standalone product catalog at `/portfolio/demo/` with product filters, pagination, and a cart drawer. It uses Redux for cart state, React Query for catalog fetches, and local fallback behavior when demo mutations fail. It registers its catalog at its own base URL and provides its own not-found screen.
- Storybook: a component catalog for the shared UI package, used to review buttons, text, form fields, dialogs, toasts, and virtualized lists, grids, and tables in context.

## Install

Use Node.js 22.22.2+ on the Node 22 release line, or a compatible newer LTS release. CI uses Node 22.

The root `package.json` declares the npm version in `packageManager`. Use that version and the committed root lockfile for reproducible installs. In Windows PowerShell, use `npm.cmd` and `npx.cmd` if the execution policy blocks the corresponding `.ps1` launchers.

Run installation commands from the repository root:

```sh
npm ci
```

npm links local workspace packages automatically. Maintain only the root lockfile and use `npm install <dependency> --workspace=<workspace-name>` to add a dependency to its owning workspace.

## Development

Run all three development servers together:

```sh
npm run dev
```

To run only one app, start its server:

```sh
npm run dev:portfolio
npm run dev:storefront
npm run dev:storybook
```

| App        | Workspace               | Development URL                         |
| ---------- | ----------------------- | --------------------------------------- |
| Portfolio  | `@portfolio/site`       | `http://localhost:5173/`                |
| Storefront | `@portfolio/storefront` | `http://localhost:5174/portfolio/demo/` |
| Storybook  | `@portfolio/storybook`  | `http://localhost:6006/`                |

The root `dev` command starts all three workspaces through Turbo. Vite requires the configured ports to be available; Storybook requests port 6006. Development links open the other app's server, so both app servers need to be running before following those links. Turbo keeps development and preview tasks running without caching them. Cross-app navigation uses normal links because these are separate applications.

## Checks and builds

| Command                      | Purpose                                                   |
| ---------------------------- | --------------------------------------------------------- |
| `npm run lint`               | Run Oxlint across the repository                          |
| `npm run typecheck`          | Type-check all apps, stories, and shared UI through Turbo |
| `npm run test`               | Run app and shared UI Vitest suites through Turbo         |
| `npm run build`              | Build both apps and Storybook through Turbo               |
| `npm run build:portfolio`    | Build the portfolio and its workspace dependencies        |
| `npm run build:storefront`   | Build the storefront and its workspace dependencies       |
| `npm run build:storybook`    | Build Storybook and its workspace dependencies            |
| `npm run preview`            | Preview the portfolio build at `http://localhost:4173/`   |
| `npm run preview:storefront` | Preview the storefront build on port 4174                 |
| `npm run format`             | Format repository files                                   |
| `npm run format:check`       | Check formatting without modifying files                  |

For a focused change, format only the changed files with `npx prettier --write <changed-files>` instead of `npm run format`.

Turbo caches each app's `dist/` build output locally. Build before previewing. Each preview server serves only its own app. Production links use paths on the same origin and do not switch between preview ports. Use the development servers to check development navigation and the combined Pages site to check production navigation; see the [release checks](./docs/deployment.md#release-checks).

To run a command for one app:

```sh
npm run test --workspace=@portfolio/storefront
npm run build --workspace=@portfolio/site
```

The apps compile any imports from the source-first `@portfolio/ui` package directly. All three apps import Tailwind once, import `@portfolio/ui/styles.css` and `@portfolio/ui/base.css`, and explicitly register shared component sources for Tailwind. Shared tokens, document defaults, and opt-in motion utilities live in the UI package. The portfolio's `globals.css` only loads those styles and registers component sources; page layout, scroll observation, and scoped theme-button token overrides stay in its React components. Shared UI edits update through Vite without a package prebuild. Components, tests, and stories live in `packages/ui/src/components/`. TypeScript settings are inherited through the configuration workspace. See [packages/ui/README.md](./packages/ui/README.md) for entry points, stylesheet imports, and theme integration.

Follow [AGENTS.md](./AGENTS.md) for essential repository rules and required reading in the [architecture](./docs/architecture.md), [behavior](./docs/behavior.md), [deployment](./docs/deployment.md), and [validation](./docs/validation.md) guides.

## App behavior

The portfolio includes professional experience, skills, education, contact links, a résumé, and light/dark themes. Content lives in [`portfolioData.ts`](./apps/portfolio/src/routes/portfolioData.ts); translations live in its [locales folder](./apps/portfolio/src/app/locales/). A manual theme preference is saved in local storage; otherwise, the theme follows the system preference.

The storefront fetches catalog data from DummyJSON carts using Axios and TanStack Query. Redux owns the visible cart, which resets on reload. Add and clear operations still apply locally when demo mutation requests fail. Catalog request failures currently return an empty catalog. This is a demonstration without persistent carts, checkout, or real purchases. Its translations and providers belong to the storefront, and the portfolio does not depend on Redux, Axios, or TanStack Query.

## Deployment

`npm run build` creates outputs under `apps/portfolio/dist/`, `apps/storefront/dist/`, and `apps/storybook/dist/`. The private UI package has no separate build output. After a successful CI run for a push to `main`, the deployment workflow stages the app outputs into this GitHub Pages artifact layout and deploys it:

```text
dist/
  index.html                  # Portfolio at /portfolio/ on GitHub Pages
  404.html                    # GitHub Pages fallback
  assets/
  images/
  Marco_Senior_Frontend_Developer_Resume.pdf
  demo/
    index.html                # Storefront at /portfolio/demo/
    assets/
  storybook/
    index.html                # Storybook at /portfolio/storybook/
    assets/
```

The [CI workflow](./.github/workflows/ci.yml) installs dependencies, lints, tests, type-checks, and builds on pull requests and pushes to `main`. After CI succeeds for a push to `main`, the [deployment workflow](./.github/workflows/deploy.yml) checks out the exact commit validated by CI, builds both apps and Storybook (with `STORYBOOK_BASE_PATH=/portfolio/storybook/`), stages the Pages artifact, and deploys it. Turbo declares that variable as a build input so the default Storybook build and the Pages build have different cache keys. Shared packages are local workspaces and do not require a registry token. Configure the repository's Pages source as GitHub Actions and satisfy any `github-pages` environment protection rules before releasing. See the [deployment guide](./docs/deployment.md) for release checks and rollback.

This repository is deployed as the GitHub Pages project site `https://kylemarcoc.github.io/portfolio/`. The portfolio uses `/portfolio/`, the storefront uses `/portfolio/demo/`, and the Storybook build uses `/portfolio/storybook/`. The artifact is staged at the site root; GitHub Pages serves it under the repository's `/portfolio/` prefix. GitHub Pages provides one site-level custom 404 document, so unmatched direct URLs, including deep links under `/portfolio/demo/` and `/portfolio/storybook/`, fall back to the portfolio. The storefront's only content route is its root; adding nested content routes later requires a corresponding hosting rewrite or routing strategy.

This is a monorepo with two independently buildable apps and one combined Pages deployment. It does not use runtime microfrontend composition.
