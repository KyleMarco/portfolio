# Repository guidance

## Frontend guidance

Follow [`.github/skills/frontend/SKILL.md`](.github/skills/frontend/SKILL.md) for frontend architecture, implementation, and validation.

## Current repository state

- The portfolio app currently renders the home page and a catch-all 404 route at `/portfolio/`; the `AboutPage` component still exists in the codebase but is not registered in the active app shell.
- The storefront demo is the catalog app at `/portfolio/demo/` and includes product filters, cart state, and demo-data fallback behavior.
- The Storybook app catalogs the shared UI package at `/portfolio/storybook/` and serves the component documentation and examples used by the repo.

## General practices

- Read relevant code and tests before changing behavior.
- Prefer focused changes; avoid new dependencies or architectural patterns without a clear need.
- Preserve existing behavior, accessibility, and loading and error states.
- Add or update tests for meaningful behavior changes.
- Report the checks run and any relevant limitations.

## Project checks

- `npm run test` runs the unit test suite.
- `npm run lint` runs Oxlint.
- `npm run typecheck` checks both workspace apps.
- `npm run build` creates the production build.
