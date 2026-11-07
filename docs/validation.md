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

## Choosing checks

| Change                                      | Required checks                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Documentation only                          | Prettier on changed files; verify relative file links and heading fragments                                          |
| One app's behavior                          | Affected tests, lint, that workspace's typecheck and build; inspect visible changes                                  |
| Shared UI, public exports, or multiple apps | Repository lint, tests, typecheck, and build; review affected stories and consumers                                  |
| Build tooling or deployment                 | Repository lint, tests, typecheck, and build; reproduce the Pages build when base paths or environment inputs change |

Use the installed formatter without fetching another version:

```sh
npx --no-install prettier --check <changed-files>
```

The file list is a placeholder; supply the actual paths. On PowerShell hosts that
block `.ps1` launchers, use `npm.cmd` and `npx.cmd`. Check local Markdown links
relative to each document's directory and verify that heading fragments exist in
their target documents. Documentation must describe the current source and scripts;
do not mark proposed behavior as implemented.

## CI coverage and handoff

[CI](../.github/workflows/ci.yml) runs lint, tests, typecheck, and build. It does not
currently run `format:check`, a Markdown link checker, browser smoke checks, or a
dedicated Storybook test suite. Complete the relevant local checks even when CI is
green. Pages builds use a different Storybook base; follow the
[deployment guide](deployment.md#reproduce-a-pages-build) when validating releases.

Before handing off:

- Review the diff for unintended changes, generated files, and unrelated user
  edits. Format only files changed by the task.
- Report commands actually run and their outcomes. Distinguish an assertion or
  compiler failure from a command that could not start because of the environment.
- Identify pre-existing failures separately from regressions. If a required check
  cannot run, state the limitation and the remaining verification clearly.
- Include any changes to public behavior, translations, package entry points, or
  deployment assumptions in the affected documentation and pull request.
