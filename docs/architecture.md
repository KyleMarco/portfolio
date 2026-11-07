# Architecture

Read this guide before changing application code, shared packages, workspace
dependencies, or frontend tooling. See [AGENTS.md](../AGENTS.md) for the repository
entry point and other required guides.

## Workspace and tooling

This is an npm-workspaces monorepo orchestrated by Turborepo. Run commands from the
repository root. Follow [README.md](../README.md#install) for the locked
installation and Node version; CI uses Node 22. Keep the single root
`package-lock.json`. Add dependencies to their owning workspace with
`npm install <dependency> --workspace=<workspace-name>`.

| Location            | Workspace               | Responsibility                                          |
| ------------------- | ----------------------- | ------------------------------------------------------- |
| `apps/portfolio`    | `@portfolio/site`       | Personal portfolio, content, theme, and translations    |
| `apps/storefront`   | `@portfolio/storefront` | Catalog demo, cart, API integration, and translations   |
| `apps/storybook`    | `@portfolio/storybook`  | Shared component documentation and previews             |
| `packages/ui`       | `@portfolio/ui`         | Reusable components, tokens, styles, tests, and stories |
| `packages/tsconfig` | `@portfolio/tsconfig`   | Shared TypeScript configuration                         |

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
- Styling integration (details in [packages/ui/README.md](../packages/ui/README.md)):
  - Consumers compile Tailwind once, import the UI stylesheet explicitly, and
    register component sources with `@source`.
  - The optional UI base stylesheet applies document defaults.
  - Preserve the document's `data-ui-theme` integration for shared UI and portaled
    components.

## React

- Use the React version installed in this repo (check the workspace `package.json`
  files and `package-lock.json`) and the idioms current for it. Avoid deprecated APIs.
- Prefer JSX to create React elements, including intrinsic tags selected at runtime
  through a capitalized variable. Use `createElement` only when JSX cannot express
  the required operation.
- Components in this repo target React 19. Accept `ref` as a prop and do not use
  `forwardRef`.
- Do not upgrade React or related dependencies unless asked.
- Before using a newer React API, confirm the installed version supports it.
  `@portfolio/ui` ships source directly to the apps, so shared components must work
  with the `react` peer range declared in `packages/ui/package.json`.
- Keep all workspaces on one React version, resolving to a single copy. When asked to
  upgrade React, upgrade it in every workspace together and check compatibility of
  `react-dom`, Redux Toolkit/`react-redux`, TanStack Query, and Testing Library.
