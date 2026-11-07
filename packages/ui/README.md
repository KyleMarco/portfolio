# Shared UI

This private, source-first workspace contains reusable React components, theme tokens, tests, and colocated Storybook stories. The Vite apps compile its TypeScript and CSS directly; no UI build or watcher is required.

## Entry points

| Import                      | Exports                                                                               | Optional peer    |
| --------------------------- | ------------------------------------------------------------------------------------- | ---------------- |
| `@portfolio/ui`             | `Button`, `Text`, `TextArea`, `TextInput`, `PopupDialog`, `ToastProvider`, `useToast` | None             |
| `@portfolio/ui/router`      | `LinkButton`                                                                          | React Router     |
| `@portfolio/ui/virtualized` | `VirtualizedList`, `VirtualizedGrid`, `VirtualizedTable`, their hooks and types       | TanStack Virtual |

```tsx
import {
  Button,
  PopupDialog,
  Text,
  TextArea,
  TextInput,
  ToastProvider,
  useToast,
} from '@portfolio/ui';
import { LinkButton } from '@portfolio/ui/router';
import { VirtualizedList } from '@portfolio/ui/virtualized';
```

React and React DOM are peers; see `package.json` for the supported ranges. React Router is needed only for the router entry point, and TanStack Virtual only for the virtualized entry point. The root entry point imports neither. `Button` and `LinkButton` share primary and secondary styles and accept native element props, including refs; `LinkButton` also accepts router props. `TextInput` and `TextArea` accept native field props, including refs, and use shared theme tokens for their field, focus, disabled, and invalid states.

## Styling

Each consuming app imports Tailwind once, followed by the UI stylesheet, and registers component sources with `@source`:

```css
/* apps/storefront/src/app/styles/globals.css */
@import 'tailwindcss';
@import '@portfolio/ui/styles.css';
/* Optional: document defaults and shared interactive-card behavior */
@import '@portfolio/ui/base.css' layer(base);

/* Relative to this stylesheet; adjust the depth for each app */
@source '../../../../../packages/ui/src/components';
```

The main stylesheet provides tokens, semantic Tailwind mappings, themes, and motion/scrollbar utilities. The optional base stylesheet applies document defaults and shared interactive-card behavior. JavaScript imports never apply global styles implicitly, and page-level styling stays in the app.

Set `data-ui-theme="light"` or `data-ui-theme="dark"` on the document root. Both shared component colors and the Tailwind `dark:` variant follow that attribute. Tokens also support themed subtrees; portaled dialogs inherit their theme from the document root. Override semantic `--ui-*` variables in app styles to customize a brand.

The storefront and Storybook already include these imports. The portfolio uses its own stylesheet; add the shared styles and source registration when integrating shared components there.

## Accessibility responsibilities

`TextInput` and `TextArea` provide field styling and native props. Consumers supply a visible label, a stable `id`, and any help or error text. Connect messages with `aria-describedby` and set `aria-invalid` for invalid values; the components do not generate labels or validate input.

`PopupDialog` renders into `document.body` and manages keyboard focus, Escape dismissal, and body scroll locking. Supply a heading whose `id` matches `labelledBy`, a translated `closeLabel`, and an `onClose` handler. Use `initialFocusRef` and `returnFocusRef` when the default focus targets do not fit the interaction. Keep a visible close control in the dialog content and verify focus restoration when its trigger can unmount.

## Structure and checks

Public exports live in `src/index.ts`; components, tests, and stories live in `src/components/`; tokens, themes, and utilities live in `src/styles/`. Import public package entry points from apps rather than reaching into package internals.

Run `npm run dev:storybook` from the repository root for the component catalog. Its Theme toolbar switches document themes, including portaled dialogs and toasts.

Run `npm run test --workspace=@portfolio/ui` for component tests and `npm run lint` for Oxlint. `npm run typecheck` checks UI source, tests, apps, and stories; `npm run build` builds the consuming apps and Storybook. The package is intended for this workspace's bundler-based consumers; publishing would require a separate distribution strategy.
