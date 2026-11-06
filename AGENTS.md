# Repository guidance

This file contains project-specific instructions. Codex also loads personal
defaults from `AGENTS.md` in its home directory (`~/.codex` by default, or
`CODEX_HOME` when set). These repository instructions take precedence over those
defaults where they conflict. Keep reusable personal preferences in the global
file and durable project rules here.

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
  Storybook configuration lives in `apps/storybook/.storybook`.
- Shared components use semantic `--ui-*` tokens. Keep portfolio-specific styling in
  the portfolio app.
- Styling integration (details in [packages/ui/README.md](packages/ui/README.md)):
  - Consumers compile Tailwind once, import the UI stylesheet explicitly, and
    register component sources with `@source`.
  - The optional UI base stylesheet applies document defaults.
  - Preserve the document's `data-ui-theme` integration for shared UI and portaled
    components.

## React

- Use the React version installed in this repo (check the workspace `package.json`
  files and `package-lock.json`) and the idioms current for it. Avoid deprecated APIs.
- Do not upgrade React or related dependencies unless asked.
- Before using a newer React API, confirm the installed version supports it.
  `@portfolio/ui` ships source directly to the apps, so shared components must work
  with the `react` peer range declared in `packages/ui/package.json`.
- Keep all workspaces on one React version, resolving to a single copy. When asked to
  upgrade React, upgrade it in every workspace together and check compatibility of
  `react-dom`, Redux Toolkit/`react-redux`, TanStack Query, and Testing Library.

## Routing and deployment

- The apps are served under separate Vite/router bases: portfolio `/portfolio/`,
  storefront `/portfolio/demo/`, and Storybook `/portfolio/storybook/`. Preserve
  these bases and cross-app links. The apps are separate, so cross-app navigation
  uses normal links, not router links.
- GitHub Pages has one site-level 404 fallback, which serves the portfolio, so deep
  links under `/portfolio/demo/` or `/portfolio/storybook/` will not reach their own
  app. Do not add a nested route without a hosting solution for that path, and flag
  it in your summary.
- For Pages build changes, inspect `.github/workflows/deploy.yml`: it stages the
  portfolio at the artifact root, storefront under `demo/`, and Storybook under
  `storybook/`, with `STORYBOOK_BASE_PATH=/portfolio/storybook/` during the build.

## Behavior to preserve

- Do not register inactive routes (such as unregistered page components) or expose
  hidden sections incidentally while refactoring.
- Portfolio content lives in `apps/portfolio/src/routes/portfolioData.ts`.
- Keep English and Filipino UI translations in sync in each affected app's
  `src/app/locales` directory.
- Portfolio theme: follow the system until the user chooses a theme, persist that
  choice when storage is available, and tolerate unavailable local storage.
- Storefront fallbacks: a catalog fetch failure returns an empty catalog, while a
  failed demo add/clear mutation still updates the local cart. Keep these distinct
  behaviors and the stock limits. The cart intentionally resets on reload.

## Frontend validation

- Add or update tests for meaningful behavior changes using existing Vitest and
  React Testing Library patterns. Prefer observable behavior and accessible
  queries; mock remote APIs for deterministic tests.
- For visible UI changes, inspect the affected app or stories at relevant viewport
  sizes and in both themes when supported. Start dev servers in the background, wait
  until they are ready, and stop them when finished. If browser verification is
  unavailable, report that limitation.

## Project checks

| Command                | Coverage                                                              |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run test`         | Portfolio, storefront, and shared UI Vitest suites                    |
| `npm run lint`         | Repository-wide Oxlint                                                |
| `npm run typecheck`    | Both Vite apps, Storybook, and shared UI, including tests and stories |
| `npm run build`        | Portfolio, storefront, and Storybook production builds                |
| `npm run format:check` | Repository-wide Prettier check                                        |

Start with affected checks:

- One workspace's tests: `npm run test --workspace=@portfolio/site`,
  `npm run test --workspace=@portfolio/storefront`, or
  `npm run test --workspace=@portfolio/ui`. Storybook has no separate test script.
- One test file: `npm run test --workspace=<workspace-name> -- <path-to-test-file>`.
- Format changed files only: `npx prettier --write <changed-files>`. Do not run the
  repository-wide write command for a focused change.
- Storybook dev server: `npm run dev:storybook`. See [README.md](README.md) for the
  app dev servers and URLs.

Run lint, tests, typecheck, and build for changes spanning apps, shared UI exports,
tooling, or deployment.

## Agents and skills

- Keep durable repository rules in this file. Add a nested `AGENTS.md` only when a
  subtree needs distinct instructions, and do not repeat these rules there.
- Repository skills live in `.agents/skills/<name>/SKILL.md` and are chosen by their
  descriptions. They hold task procedures and validation steps; do not copy rules
  from this file into them.
- Custom agents live in `.codex/agents`. Keep each to its role and defer to this file
  for repository rules.
