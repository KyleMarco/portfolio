# Routing and deployment

Read this guide before changing routes, navigation, base paths, builds, hosting,
or deployment workflows. See [AGENTS.md](../AGENTS.md) for the repository entry
point and other required guides. See [README.md](../README.md#deployment) for build
outputs and the deployment artifact layout.

- The apps are served under separate Vite/router bases: portfolio `/portfolio/`,
  storefront `/portfolio/demo/`, and Storybook `/portfolio/storybook/`. Preserve
  these bases and cross-app links. The apps are separate, so cross-app navigation
  uses normal links, not router links.
- GitHub Pages has one site-level 404 fallback, which serves the portfolio, so deep
  links under `/portfolio/demo/` or `/portfolio/storybook/` will not reach their own
  app. Do not add a nested route without a hosting solution for that path, and flag
  it in your summary.
- For Pages build changes, inspect
  [the deployment workflow](../.github/workflows/deploy.yml): it stages the
  portfolio at the artifact root, storefront under `demo/`, and Storybook under
  `storybook/`, with `STORYBOOK_BASE_PATH=/portfolio/storybook/` during the build.
