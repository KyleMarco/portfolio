# Validation

Read this guide before making any repository change and use the checks appropriate
to the change. See [AGENTS.md](../AGENTS.md) for the repository entry point and other
required guides.

## Frontend validation

- Add or update tests for meaningful behavior changes using existing Vitest and
  React Testing Library patterns. Prefer observable behavior and accessible
  queries; mock remote APIs for deterministic tests.
- For visible UI changes, inspect the affected app or stories at relevant viewport
  sizes and in both themes when supported. Start dev servers in the background, wait
  until they are ready, and stop them when finished. If browser verification is
  unavailable, report that limitation.

## Project checks

See [README.md](../README.md#checks-and-builds) for the repository-wide check and
build commands and their coverage. Start with affected checks:

- One workspace's tests: `npm run test --workspace=@portfolio/site`,
  `npm run test --workspace=@portfolio/storefront`, or
  `npm run test --workspace=@portfolio/ui`. Storybook has no separate test script.
- One test file: `npm run test --workspace=<workspace-name> -- <path-to-test-file>`.
- Format changed files only: `npx prettier --write <changed-files>`. Do not run the
  repository-wide write command for a focused change.
- Storybook dev server: `npm run dev:storybook`. See
  [README.md](../README.md#development) for the app dev servers and URLs.

Run lint, tests, typecheck, and build for changes spanning apps, shared UI exports,
tooling, or deployment.

For documentation-only changes, check formatting and relative links. Application
checks are unnecessary unless the documentation changes executable examples or
configuration that needs verification.
