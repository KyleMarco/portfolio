# Kyle Marco Cabiling — frontend monorepo

An npm-workspaces monorepo containing a portfolio and a standalone storefront demo. Both apps use React, TypeScript, Vite, Tailwind CSS, React Router, and English/Filipino translations. They share global styles and TypeScript settings, with separate entry points, application providers, dependencies, and builds.

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
packages/
  styles/                     # @portfolio/styles: shared global CSS
  tsconfig/                   # @portfolio/tsconfig: shared compiler settings
scripts/                      # Deployment assembly and its tests
.github/workflows/            # Validation and GitHub Pages deployment
package.json                  # Workspace scripts and repository tooling
package-lock.json             # One lockfile for every workspace
```

Keep app-specific features, APIs, state, tests, and translations inside their owning app. Apps must not import another app's source. Extract a workspace package when both apps actually need the same code. Shared buttons, dialogs, and toast notifications continue to come from the published `@kylemarco/shared-ui` package; its source is not part of this repository.

## Install

Use Node.js 22.22.2+ on the Node 22 release line, or a compatible newer LTS release. CI uses Node 22.

The shared UI dependency is hosted on GitHub Packages. Set `NODE_AUTH_TOKEN` in your shell to a GitHub token with permission to read it. If you do not already have a local `.npmrc`, copy [`.npmrc.example`](./.npmrc.example) to `.npmrc`. The example reads the token from the environment. Keep credentials out of tracked files.

Run installation commands from the repository root:

```sh
npm ci
```

npm links the private workspace packages automatically. Maintain only the root lockfile and use `npm install <dependency> --workspace=<workspace-name>` to add a dependency to its owning app.

## Development

Run these in separate terminals to work on both apps:

```sh
npm run dev:portfolio
npm run dev:storefront
```

| App        | Workspace               | Development URL                         |
| ---------- | ----------------------- | --------------------------------------- |
| Portfolio  | `@portfolio/site`       | `http://localhost:5173/portfolio/`      |
| Storefront | `@portfolio/storefront` | `http://localhost:5174/portfolio/demo/` |

`npm run dev` starts the portfolio. Ports are fixed so cross-app links work consistently; Vite reports an error when a port is occupied. Development links open the other app's server, so start both servers before following those links.

The portfolio registers its home and not-found routes. The about component remains available but is not registered, preserving the previous route setup. The storefront registers its catalog at its own base URL and provides its own not-found screen. Cross-app navigation uses normal links because these are separate applications.

## Checks and builds

| Command                      | Purpose                                                                   |
| ---------------------------- | ------------------------------------------------------------------------- |
| `npm run lint`               | Run Oxlint across the repository                                          |
| `npm run typecheck`          | Check both apps against their TypeScript configuration                    |
| `npm run test`               | Run both apps' Vitest suites and deployment assembly tests                |
| `npm run build`              | Build both apps and assemble the deployable site                          |
| `npm run build:apps`         | Build apps without assembling the deployment                              |
| `npm run preview`            | Serve the assembled production site at `http://localhost:4173/portfolio/` |
| `npm run preview:storefront` | Preview only the storefront on port 4174                                  |
| `npm run format`             | Format repository files                                                   |
| `npm run format:check`       | Check formatting without modifying files                                  |

Build before previewing. Use the combined preview to verify navigation between apps. App-only previews serve only that app's build.

To run a command for one app:

```sh
npm run test --workspace=@portfolio/storefront
npm run build --workspace=@portfolio/site
```

Each app compiles Tailwind using its own source directory plus the published shared UI package. The styles workspace exports CSS without a separate build step. TypeScript settings are inherited through the configuration workspace.

Follow [AGENTS.md](./AGENTS.md) and the [frontend skill](./.github/skills/frontend/SKILL.md) for implementation and validation conventions. See the official [npm workspaces documentation](https://docs.npmjs.com/cli/using-npm/workspaces/) and [Tailwind source detection documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files) for the underlying configuration.

## App behavior

The portfolio includes professional experience, skills, education, contact links, a résumé, and light/dark themes. Content lives in [`portfolioData.ts`](./apps/portfolio/src/routes/portfolioData.ts); translations live in its [locales folder](./apps/portfolio/src/app/locales/). A manual theme preference is saved in local storage; otherwise, the theme follows the system preference.

The storefront fetches catalog data from DummyJSON carts using Axios and TanStack Query. Redux owns the visible cart, which resets on reload. Add and clear operations still apply locally when demo mutation requests fail. Catalog request failures currently return an empty catalog. This is a demonstration without persistent carts, checkout, or real purchases. Its translations and providers belong to the storefront, and the portfolio does not depend on Redux, Axios, or TanStack Query.

## Deployment

`npm run build` creates separate app outputs and assembles them into:

```text
dist/
  index.html                  # Portfolio at /portfolio/
  404.html                    # GitHub Pages fallback
  assets/
  images/
  Marco_Senior_Frontend_Developer_Resume.pdf
  demo/
    index.html                # Storefront at /portfolio/demo/
    assets/
```

The [workflow](./.github/workflows/deploy.yml) installs dependencies, lints, tests, type-checks, and builds on pull requests and updates to `main`. Pushes to `main` and manual runs deploy the assembled output to GitHub Pages. Installation uses the existing `NODE_AUTH_TOKEN` repository secret. No hosting changes or additional services are required.

The apps use `/portfolio/` and `/portfolio/demo/` as their Vite and router bases. Preserve these paths when deploying this repository to the existing Pages project site. GitHub Pages provides one site-level custom 404 document, so unmatched direct URLs fall back to the portfolio. The storefront's only content route is its root; adding nested content routes later requires a corresponding hosting rewrite or routing strategy.

This is a monorepo with two independently buildable apps and one combined Pages deployment. It does not use runtime microfrontend composition.
