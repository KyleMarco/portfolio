# Shared UI

This private, source-first workspace contains reusable React components, theme tokens, tests, and colocated Storybook stories. The Vite apps compile its TypeScript and CSS directly; no UI build or watcher is required.

## Entry points

| Import                      | Exports                                                                   | Optional peer    |
| --------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `@portfolio/ui`             | `Button`, `Text`, `TextInput`, `PopupDialog`, `ToastProvider`, `useToast` | None             |
| `@portfolio/ui/router`      | `LinkButton`                                                              | React Router     |
| `@portfolio/ui/virtualized` | `VirtualizedList`                                                         | TanStack Virtual |

```tsx
import { Button, PopupDialog, Text, TextInput, ToastProvider, useToast } from '@portfolio/ui';
import { LinkButton } from '@portfolio/ui/router';
import { VirtualizedList } from '@portfolio/ui/virtualized';
```

React and React DOM are peers; see `package.json` for the supported ranges. React Router is needed only for the router entry point, and TanStack Virtual only for the virtualized entry point. The root entry point imports neither. `Button` and `LinkButton` share primary and secondary styles and forward native element props, including refs; `LinkButton` also forwards router props. `TextInput` forwards native input props, including refs, and uses shared theme tokens for its field, focus, disabled, and invalid states.

## Styling

Each consuming app imports Tailwind once, followed by the UI stylesheet, and registers component sources with `@source`:

```css
/* apps/portfolio/src/app/styles/globals.css */
@import 'tailwindcss';
@import '@portfolio/ui/styles.css';
/* Optional: document defaults and shared interactive-card behavior */
@import '@portfolio/ui/base.css' layer(base);

/* Relative to this stylesheet; adjust the depth for each app */
@source '../../../../../packages/ui/src/components';
```

The main stylesheet provides tokens, semantic Tailwind mappings, themes, and motion/scrollbar utilities. The optional base stylesheet applies document defaults and shared interactive-card behavior. JavaScript imports never apply global styles implicitly, and page-level styling stays in the app.

Set `data-ui-theme="light"` or `data-ui-theme="dark"` on the document root. Both shared component colors and the Tailwind `dark:` variant follow that attribute. Tokens also support themed subtrees; portaled dialogs inherit their theme from the document root. Override semantic `--ui-*` variables in app styles to customize a brand.

## Structure and checks

Public exports live in `src/index.ts`; components, tests, and stories live in `src/components/`; tokens, themes, and utilities live in `src/styles/`. Import public package entry points from apps rather than reaching into package internals.

Run `npm run dev:storybook` from the repository root for the component catalog. Its Theme toolbar switches document themes, including portaled dialogs and toasts.

Run `npm run test --workspace=@portfolio/ui` for component tests and `npm run lint` for Oxlint. `npm run typecheck` checks UI source, tests, apps, and stories; `npm run build` builds the consuming apps and Storybook. The package is intended for this workspace's bundler-based consumers; publishing would require a separate distribution strategy.
