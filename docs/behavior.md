# Behavior to preserve

Read this guide before changing application code or shared UI that affects
application behavior. See [AGENTS.md](../AGENTS.md) for the repository entry point
and other required guides.

- Do not register inactive routes (such as unregistered page components) or expose
  hidden sections incidentally while refactoring.
- Portfolio content lives in `apps/portfolio/src/routes/portfolioData.ts`.
- Keep English and Filipino UI translations in sync in each affected app's
  `src/app/locales` directory.
- Portfolio theme: follow the system until the user chooses a theme, persist that
  choice when storage is available, and tolerate unavailable local storage.
- Storefront fallbacks: a catalog fetch failure returns an empty catalog, while a
  failed demo add/clear mutation still updates the local cart. Keep these distinct
  behaviors and the stock limits. The cart intentionally resets on reload.
