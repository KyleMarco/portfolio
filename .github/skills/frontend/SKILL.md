---
name: frontend
description: "Use when implementing, debugging, refactoring, or reviewing this Vite + React + TypeScript app, including pages, routes, state, API data flow, and shared UI."
---

# Frontend workflow

Use this workflow for frontend changes in this repository. Follow the general repository practices in [AGENTS.md](../../../AGENTS.md); this file covers frontend-specific decisions and validation.

## Architecture map

| Concern | Location and pattern |
|---|---|
| Store, routes, providers | `src/app/store.ts`, `src/app/router.tsx`, `src/app/providers.tsx` |
| Feature behavior and state | `src/features/<feature>/` |
| Route-level composition | `src/pages/<Page>/` |
| Reusable UI | `src/shared/components/` |
| Shared API utilities | `src/api/` |

Use the established layer and follow the closest existing example. Do not introduce a new pattern based on assumptions; inspect the code first.

## Procedure

1. **Understand the change.** Identify the affected user-visible behavior and trace the relevant component, route, state, API, and tests. Clarify only if an unresolved requirement changes the implementation.
2. **Choose the owning layer.**
   - Put route composition in `src/pages/` and route registration in `src/app/router.tsx`.
   - Keep feature-specific behavior in `src/features/`.
   - Put genuinely reusable UI in `src/shared/components/`.
   - Use Redux Toolkit for client state and TanStack Query for remote, cached data.
3. **Implement consistently.** Preserve existing data flow, visual conventions, accessible native controls, and loading/error states. Keep TypeScript types explicit; avoid unnecessary dependencies and unrelated refactors.
4. **Test the behavior.** Add or update focused tests for meaningful changes, following nearby test patterns.
5. **Validate and review.** Run the checks appropriate to the change, inspect the final diff for regressions and unrelated edits, and report checks and any gaps.

## Validation commands

- `npm run test` — run the unit test suite.
- `npm run lint` — run Oxlint.
- `npm run build` — verify the production build.

Run the smallest relevant checks first; use lint and build when the change affects application behavior, types, or structure. Do not claim checks that were not run.
