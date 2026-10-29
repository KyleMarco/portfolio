# Repository guidance

## Project structure

- `src/app/` contains the store, routes, and global providers.
- `src/features/` contains feature-specific state, API logic, hooks, and components.
- `src/pages/` contains route-level page composition.
- `src/shared/components/` contains reusable UI components.
- `src/api/` contains shared API utilities.

Keep changes in the layer that owns the behavior, and follow nearby implementation and test patterns. Use Redux Toolkit for client state and TanStack Query for remote, cached data. Keep data flow typed.

## General practices

- Read relevant code and tests before changing behavior.
- Prefer focused changes; avoid new dependencies or architectural patterns without a clear need.
- Preserve existing behavior, accessibility, and loading and error states.
- Add or update tests for meaningful behavior changes.
- Report the checks run and any relevant limitations.

For frontend-specific architecture and workflow, follow [`.github/skills/frontend/SKILL.md`](.github/skills/frontend/SKILL.md).

## Project checks

- `npm run test` runs the unit test suite.
- `npm run lint` runs Oxlint.
- `npm run build` creates the production build.
