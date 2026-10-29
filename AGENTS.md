# Repository guidance

## Frontend skill

For frontend work, consult and follow [`.github/skills/frontend/SKILL.md`](.github/skills/frontend/SKILL.md). It documents this app's architecture and workflow; use it alongside the relevant code and tests.

## Project structure

- `src/app/` contains the Redux store, route definitions, and global providers.
- `src/features/` contains feature-specific state, API logic, hooks, and components.
- `src/pages/` contains route-level page composition.
- `src/shared/components/` contains reusable UI components.
- `src/api/` contains shared API utilities.

Keep changes in the layer that owns the behavior and follow nearby patterns. Use Redux Toolkit for client state and TanStack Query for remote, cached data. Keep API and component data flow typed.

## Implementation practices

- Read the related implementation and tests before changing behavior.
- Prefer focused changes; avoid introducing dependencies or new architectural patterns without a demonstrated need.
- Preserve accessible native controls, loading and error states, and existing visual conventions.
- Add or update focused tests for meaningful behavior changes.

## Validation

Use the repository scripts relevant to the change:

- `npm run test` for unit tests
- `npm run lint` for linting
- `npm run build` for a production build
