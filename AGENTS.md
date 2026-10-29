# Repository guidance

## Frontend guidance

Follow [`.github/skills/frontend/SKILL.md`](.github/skills/frontend/SKILL.md) for frontend architecture, implementation, and validation.

## General practices

- Read relevant code and tests before changing behavior.
- Prefer focused changes; avoid new dependencies or architectural patterns without a clear need.
- Preserve existing behavior, accessibility, and loading and error states.
- Add or update tests for meaningful behavior changes.
- Report the checks run and any relevant limitations.

## Project checks

- `npm run test` runs the unit test suite.
- `npm run lint` runs Oxlint.
- `npm run build` creates the production build.
