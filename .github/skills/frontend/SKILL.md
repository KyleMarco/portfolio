---
name: frontend
description: 'Use when implementing, debugging, refactoring, or reviewing this Vite + React + TypeScript app, including pages, routes, state, API data flow, and shared UI.'
---

# Frontend workflow

Use this workflow for frontend changes in this repository. Follow the general repository practices in [AGENTS.md](../../../AGENTS.md); this file covers frontend architecture, implementation, and validation.

## Recommended folder structure

For new modules, organize code by responsibility and keep feature-specific implementation together. Add optional folders only when they have real code to own; do not create empty or speculative folders.

```text
src/
  app/
    providers/
      AppProviders.tsx
      QueryProvider.tsx         # When query setup is composed separately
    router/
      index.tsx
    store/
      index.ts
      hooks.ts                  # Typed Redux hooks, when used
    styles/
      globals.css
    App.tsx

  routes/                       # Route-level screens and route registration
    <PageName>.tsx
    NotFoundPage.tsx
    index.ts

  features/
    <feature>/
      api/
      components/               # Feature-only UI, when needed
      hooks/
      schemas/                  # Runtime validation, when needed
      types/
      utils/                    # Feature-only helpers, when needed
      index.ts                  # Public feature exports, when useful

  shared/
    ui/                         # Reusable, domain-agnostic components
    hooks/
    api/                        # Shared API client and API types, when needed
    lib/
    utils/
    constants/
    types/

  assets/
  main.tsx

tests/
  integration/                  # Cross-feature or route-level tests, when needed
  fixtures/                     # Reusable test data, when needed
```

This repository uses `src/app/` for application setup, `src/routes/` for route-level screens, and `src/shared/ui/` for reusable components. Keep component and feature tests alongside their implementation. Keep feature-owned APIs, hooks, and types near their feature; share them only when needed across areas. The project includes Redux Toolkit, Axios, and TanStack Query; use them when they fit the existing data flow and the task, not as mandatory additions to every feature. Configure shared application providers in `src/app/providers/`.

## Procedure

1. **Understand the change.** Identify the affected user-visible behavior and trace the relevant component, route, state, API, and tests. Clarify only if an unresolved requirement changes the implementation.
2. **Choose the owning layer** using the recommended structure, the current repository layout, and nearby implementation patterns.
3. **Implement consistently.** Preserve existing data flow, visual conventions, accessible native controls, and loading/error states. Keep TypeScript types explicit; avoid unnecessary dependencies and unrelated refactors.
4. **Test the behavior.** Add or update focused tests for meaningful changes, following nearby test patterns.
5. **Validate and review.** Run the checks appropriate to the change, inspect the final diff for regressions and unrelated edits, and report checks and any gaps.

## Validation commands

- `npm run test` — run the unit test suite.
- `npm run lint` — run Oxlint.
- `npm run build` — verify the production build.

Run the smallest relevant checks first; use lint and build when a change affects application behavior, types, or structure. Do not claim checks that were not run.
