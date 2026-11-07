# Behavior to preserve

Read this guide before changing application code or shared UI that affects
application behavior. See [AGENTS.md](../AGENTS.md) for the repository entry point
and other required guides.

- Do not register inactive routes (such as unregistered page components) or expose
  hidden sections incidentally while refactoring.
- Portfolio content lives in `apps/portfolio/src/routes/portfolioData.ts`.
- Portfolio header: show the profile name as a home link instead of section navigation.
  Keep the name, theme, and language controls available on both the home and not-found routes.
- Portfolio footer: show the profile, back-to-top link, and a translated “Powered By”
  label with React, TypeScript, Vite, and Tailwind CSS badges.
- Keep English and Filipino UI translations in sync in each affected app's
  `src/app/locales` directory.
- Portfolio theme: follow the system until the user chooses a theme, persist that
  choice when storage is available, and tolerate unavailable local storage.
- Storefront fallbacks: `cartApi.getAllCarts` catches catalog request failures and
  resolves to an empty array. This follows the empty catalog path rather than
  Query's error state. A failed demo add/clear mutation still updates the local
  cart; add also shows the success toast. Preserve these behaviors and the stock
  limits unless explicitly changing the demo contract. The cart resets on reload;
  it has no persistent cart, checkout, or payment flow.

## Interaction and accessibility

- Preserve loading, empty, error, disabled, and invalid states when changing UI.
  Keep controls usable with a keyboard and give fields and icon buttons accessible
  names. Associate validation messages with the affected field.
- Dialogs must keep an accessible title, initial focus, Tab/Shift+Tab containment,
  Escape dismissal, scroll locking, and focus restoration to the trigger. Shared
  dialogs render into `document.body`; verify their theme as well as their focus.
- Preserve responsive layouts and reduced-motion behavior. Portfolio reveal
  effects must keep content readable when reduced motion is requested or browser
  observation APIs are unavailable.
- Keep theme and language changes usable at narrow viewport widths. Shared UI
  uses `data-ui-theme` on the document root; the portfolio also maintains its
  `dark` class. The storefront currently presents a light theme.
