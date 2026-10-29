---
name: frontend
description: "Use when working on this Vite + React + TypeScript app: adding features, fixing route/store/API issues, refactoring components, updating pages, or reviewing frontend code for repo-standard architecture and quality."
---

# Frontend workflow for this repo

## When to use this skill

Use this skill when you need to:
- implement or refactor React components in the app shell or feature modules
- add or adjust pages, routes, and navigation in the router
- work with Redux Toolkit slices, app state, and typed store exports
- fetch or cache data with TanStack Query and REST API helpers
- fix async loading, error, or state-flow issues without changing the app structure
- review code for consistency with the project’s architecture and standards

## Project architecture to follow

This repository already has a clear structure:
- src/app/store.ts holds the Redux store and typed state exports
- src/app/router.tsx defines app routes and the top-level navigation shell
- src/app/providers.tsx composes global providers when needed
- src/features/* contains feature-level state, API logic, and components
- src/pages/* contains route-level composition and page views
- src/shared/components/* contains reusable UI

Keep changes aligned with those boundaries instead of creating unrelated patterns.

## Workflow

1. Identify the correct layer
   - UI and composition changes belong in src/pages or src/features
   - reusable visual components belong in src/shared/components
   - Redux logic belongs in a feature slice or app-level store wiring
   - async data fetching belongs in a feature or API module, usually with TanStack Query

2. Read the existing pattern before editing
   - inspect the related feature, page, or route
   - match naming, component structure, and dark utility-class styling
   - avoid introducing a new state or fetch pattern unless the repo already uses it

3. Keep data flow explicit and typed
   - prefer TypeScript types over implicit any
   - keep API/client logic near the feature or in the shared API layer
   - use Redux Toolkit for local or global client state, not handwritten reducers
   - use TanStack Query for server data, caching, and loading/error states

4. Make the smallest change that solves the problem
   - preserve the existing app intent and visual tone
   - avoid broad rewrites or extra dependencies
   - remove dead code, unused imports, and inconsistent naming

5. Validate before finishing
   - run the relevant project checks, especially npm run build and npm run lint when the change affects app behavior or file structure
   - confirm the fix matches the actual root cause, not just the symptom

## Decision points

- If the state is app/client-side and persists in store: use Redux Toolkit and update src/app/store.ts or a feature slice.
- If the data is fetched from a remote API or is cached/queried: use TanStack Query and keep the fetch logic close to the feature or API module.
- If the change is a route/view composition update: modify the page and route registration in src/app/router.tsx.
- If the change is reusable UI: put it in src/shared/components and compose it from the relevant page or feature.
- If the task is ambiguous: inspect the closest existing feature or page before deciding on structure.

## Quality bar

A task is complete only when all of the following are true:
- code follows the repo’s current architecture and conventions
- TypeScript is used correctly and no unnecessary any values were introduced
- React and route patterns match the app’s existing structure
- async data logic uses TanStack Query when appropriate
- state-management logic uses Redux Toolkit patterns where appropriate
- no dead code or unused imports remain
- the change is scoped and readable
- project checks pass when relevant

## Example prompts

- Refactor this component to match the repo’s current TypeScript and React patterns.
- Add a Redux Toolkit slice for this feature and connect it to the store.
- Fix the query loading/error state without changing the app structure.
- Integrate this REST API into the existing TanStack Query setup and keep it typed.
- Review this implementation for standards, correctness, and project consistency.
- Update this page to follow the current architecture and route conventions.

## Related context

This skill is intentionally scoped to the evidence already present in this repo: Vite + React 19, TypeScript, Redux Toolkit, TanStack Query, and route-based page composition. Use that evidence as the source of truth rather than inventing patterns not present in the project.
