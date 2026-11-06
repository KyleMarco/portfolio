# Repository guidance

## Workspace and tooling

This is an npm-workspaces monorepo orchestrated by Turborepo. Run commands from the
repository root. Use `npm ci` for the locked installation; CI uses Node 22. Keep the
single root `package-lock.json`. Add dependencies to their owning workspace with
`npm install <dependency> --workspace=<workspace-name>`.

| Location            | Workspace               | Responsibility                                          |
| ------------------- | ----------------------- | ------------------------------------------------------- |
| `apps/portfolio`    | `@portfolio/site`       | Personal portfolio, content, theme, and translations    |
| `apps/storefront`   | `@portfolio/storefront` | Catalog demo, cart, API integration, and translations   |
| `apps/storybook`    | `@portfolio/storybook`  | Shared component documentation and previews             |
| `packages/ui`       | `@portfolio/ui`         | Reusable components, tokens, styles, tests, and stories |
| `packages/tsconfig` | `@portfolio/tsconfig`   | Shared TypeScript configuration                         |

See [README.md](README.md) for development URLs and deployment details, and
[packages/ui/README.md](packages/ui/README.md) for shared component integration.

## Frontend architecture

- Apps must not import another app's source. Keep application providers, routes,
  translations, state, and API code in their owning app.
- Follow the existing `src/app`, `src/routes`, and `src/features` organization.
  Keep feature APIs and hooks together and tests beside their implementation.
  Create additional folders or shared packages only when actual code needs them.
- Redux Toolkit, Axios, and TanStack Query belong to the storefront. Preserve the
  separation between Redux cart state and Query-managed remote data.
- Consume shared UI through public entry points: `@portfolio/ui`,
  `@portfolio/ui/router`, and `@portfolio/ui/virtualized`. Keep optional router and
  virtualization dependencies out of the core UI entry point.
- `@portfolio/ui` exports source directly; it has no separate build step. Shared
  components, tests, and stories live in `packages/ui/src/components`. Update
  relevant stories when adding component variants or changing public behavior.
- Use shared semantic `--ui-*` tokens for shared components. Consumers compile
  Tailwind once, import the UI stylesheet explicitly, and register component
  sources with `@source`. The optional UI base stylesheet applies document
  defaults. Keep portfolio-specific styling in the portfolio app. Preserve the
  document's `data-ui-theme` integration for shared UI and portaled components.

## Current repository state

- The portfolio renders home and catch-all 404 routes at `/portfolio/`.
  `AboutPage` exists but is not registered. Do not expose inactive routes or hidden
  sections incidentally while refactoring.
- Portfolio content lives in `apps/portfolio/src/routes/portfolioData.ts`.
  Keep English and Filipino UI translations in sync in each affected app's
  `src/app/locales` directory.
- Preserve the portfolio theme preference: follow the system until the user
  chooses a theme, persist that choice when storage is available, and tolerate
  unavailable local storage.
- The storefront at `/portfolio/demo/` includes filters, pagination, and a cart.
  Catalog fetch failures return an empty catalog; failed demo add/clear mutations
  still update the local cart. Preserve these distinct fallback behaviors and
  stock limits. The cart resets on reload.
- Storybook catalogs shared UI at `/portfolio/storybook/`. Stories live in the UI
  package; Storybook configuration lives in `apps/storybook/.storybook`.
- Preserve Vite/router bases and cross-app links. These are separate apps, so
  cross-app navigation uses normal links. GitHub Pages has one site-level 404
  fallback, which serves the portfolio; new nested routes need a hosting strategy.

## General practices

- Read relevant code and tests before changing behavior. Check the working tree
  and preserve unrelated user edits and deletions.
- Prefer focused changes; avoid new dependencies or architectural patterns without
  a clear need.
- Preserve accessibility, responsive layouts, loading, empty, and error states.
  Retain keyboard navigation, dialog focus trapping/restoration, and reduced-motion
  behavior when changing interactions.
- Add or update tests for meaningful behavior changes using existing Vitest and
  React Testing Library patterns. Prefer observable behavior and accessible
  queries; mock remote APIs for deterministic tests.
- For visible UI changes, inspect the affected app or stories at relevant viewport
  sizes and in both themes when supported. If browser verification is unavailable,
  report that limitation.

## Project checks

| Command                | Coverage                                                              |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run test`         | Portfolio, storefront, and shared UI Vitest suites                    |
| `npm run lint`         | Repository-wide Oxlint                                                |
| `npm run typecheck`    | Both Vite apps, Storybook, and shared UI, including tests and stories |
| `npm run build`        | Portfolio, storefront, and Storybook production builds                |
| `npm run format:check` | Repository-wide Prettier check                                        |

Start with affected checks. For a focused suite, use
`npm run test --workspace=@portfolio/site`,
`npm run test --workspace=@portfolio/storefront`, or
`npm run test --workspace=@portfolio/ui`. Storybook has no separate test script.

Run lint, tests, typecheck, and build for changes spanning apps, shared UI exports,
tooling, or deployment. For documentation-only changes, check formatting and local
links; application checks are unnecessary. Format only changed files rather than
running the repository-wide write command for a focused change.

For Pages build changes, inspect `.github/workflows/deploy.yml`: it stages the
portfolio at the artifact root, storefront under `demo/`, and Storybook under
`storybook/`, with `STORYBOOK_BASE_PATH=/portfolio/storybook/` during the build.

Report checks actually run, their results, and relevant limitations. Distinguish
existing failures from regressions caused by the change.

## Agents and skills

- Use a frontend implementation role for ordinary React/TypeScript work. Focused
  review roles can check shared UI accessibility and regressions; a build role can
  investigate workspace tooling and Pages artifacts when needed.
- Keep durable repository rules in this file. Add a nested `AGENTS.md` only when a
  subtree needs distinct instructions; avoid duplicating these rules.
- Add optional skills for repeatable workflows, with narrow triggers and concrete
  validation steps. Codex repository skills belong in `.agents/skills/<name>/SKILL.md`.
  Reference only skill files that exist; this guidance is self-contained.
