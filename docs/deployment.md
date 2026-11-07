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

## Release workflow

1. Configure the repository's Pages source as GitHub Actions. Check any protection
   rules on the `github-pages` environment and complete the checks in
   [Validation](validation.md).
2. Merge the reviewed change into `main`. [CI](../.github/workflows/ci.yml) runs on
   pull requests targeting `main` and pushes to `main`; it installs with `npm ci`,
   then runs lint, tests, typecheck, and build.
3. After a successful CI run for a push to `main`, deployment checks out that run's
   `head_sha`, rebuilds the site with the Pages Storybook base, and uploads the
   assembled `dist/` artifact. A successful pull request CI run does not deploy.
4. The deploy job publishes the artifact using the `github-pages` environment.
   Record the deployed commit and workflow result, then complete the release
   checks below against the environment's reported URL.

The build job has read access to repository contents. The deploy job has
`pages: write` and `id-token: write`; it does not require a personal access token.
Deployments share a branch concurrency group with `cancel-in-progress: false`.
Confirm the deployed commit when several changes reach `main` close together.

## Reproduce a Pages build

The default Storybook build uses `/`. A Pages build requires
`STORYBOOK_BASE_PATH=/portfolio/storybook/`. That variable is declared in
[turbo.json](../turbo.json) so Turbo forwards it in strict mode and includes its
value in the build cache key. Keep that declaration when editing task settings.

From the repository root in PowerShell, after installing dependencies:

```powershell
$env:STORYBOOK_BASE_PATH = '/portfolio/storybook/'
npm run build
Remove-Item Env:STORYBOOK_BASE_PATH
```

Use `npm.cmd` if PowerShell blocks `npm.ps1`. Clear the variable after the build
so later local Storybook builds use their default base. Outputs remain in each
app's `dist/` directory; the workflow assembles the combined artifact and copies
the portfolio's `index.html` to the site-level `404.html`.

## Release checks

Check the built site at its deployed base and record any verification that could
not be completed:

- Open `/portfolio/`, `/portfolio/demo/`, and `/portfolio/storybook/` directly and reload
  each. Check the browser console and network panel for missing scripts, styles,
  images, or base-path errors. Open a component story as well as the Storybook
  manager.
- Follow the storefront's home link. Open the résumé and verify portfolio images
  and contact links. Keep inactive portfolio sections hidden during these checks.
- Switch English/Filipino in both apps. Verify the portfolio theme toggle and
  persisted preference, and inspect narrow and wide layouts.
- Load the catalog, filter and paginate, add items up to stock limits, change
  quantities, remove items, and clear the cart. Check dialog keyboard behavior
  described in [Behavior](behavior.md#interaction-and-accessibility).
- Check the documented network fallbacks with controlled request failures. A
  failed catalog request resolves to an empty catalog; failed add/clear requests
  still update the local cart. These are demo behaviors, not confirmation of a
  persistent server cart.
- Open an unknown URL and verify the portfolio fallback. Direct nested storefront
  or Storybook URLs are subject to the same site-level fallback described above.

The two Vite preview servers validate their own app builds, but production
cross-app links stay on the same origin and do not switch preview ports. To check
the combined artifact locally, use a static host that mounts the staged directory
at `/` and supports the site's 404 behavior. A server that rewrites every unknown
URL to its own index can hide Pages routing failures.

## Failed releases and rollback

- If CI fails, fix the failing check before merging. If deployment fails after CI,
  inspect the build/deploy logs and the `github-pages` environment for configuration
  or approval requirements. For a transient failure, retry the failed workflow
  only after confirming its commit is still the intended release.
- For a published regression, create a revert of the responsible change on a new
  branch, open a pull request, and merge it through the normal CI process. The
  successful push to `main` triggers a new deployment. Preserve subsequent valid
  changes and follow the team's review policy when reverting a merge commit.
- After rollback, confirm the deployed commit and repeat the affected release
  checks. Avoid rerunning an old successful deployment as a rollback procedure;
  that workflow checks out its original CI commit and can publish stale code.
