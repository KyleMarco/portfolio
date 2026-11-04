# Shared UI

This private, source-first workspace contains reusable React components, theme tokens, tests, and colocated Storybook stories. The Vite apps compile its TypeScript and CSS directly; no UI build or watcher is required.

```tsx
import { Button, PopupDialog, ToastProvider, useToast } from '@portfolio/ui';
import { LinkButton } from '@portfolio/ui/router';
import { VirtualizedList } from '@portfolio/ui/virtualized';
```

React and React DOM are peers. React Router is needed only for the router entry point; TanStack Virtual is needed only for the virtualized entry point. The root entry point imports neither optional integration.

## Styling

Each consuming app imports Tailwind once, followed by the raw UI stylesheet, and registers component sources relative to its own stylesheet:

```css
/* apps/portfolio/src/app/styles/globals.css */
@import 'tailwindcss';
@import '@portfolio/ui/styles.css';
@import '@portfolio/ui/base.css' layer(base);

@source '../../../../../packages/ui/src/components';
```

The main stylesheet provides tokens, semantic Tailwind mappings, themes, and motion/scrollbar utilities. The optional base stylesheet applies document defaults and shared interactive-card behavior; JavaScript imports never apply global styles implicitly. Applications own page effects and application state.

Set `data-ui-theme="light"` or `data-ui-theme="dark"` on the document root. Both shared component colors and the Tailwind `dark:` variant follow that attribute. Tokens also support themed subtrees; portaled dialogs inherit their theme from the document root. Override semantic `--ui-*` variables in app styles to customize a brand. Button and LinkButton share primary/secondary styles; native element and router props, including refs, are forwarded.

## Structure and checks

Public exports live in `src/index.ts`; components, tests, and stories live in `src/components/`; tokens, themes, and utilities live in `src/styles/`. Import public package entry points from apps rather than reaching into package internals.

Run `npm run dev:storybook` from the repository root for the component catalog. Its Theme toolbar switches document themes, including portaled dialogs and toasts.

Run `npm run test --workspace=@portfolio/ui` for component tests. `npm run typecheck` checks UI source, tests, apps, and stories; `npm run build` builds the consuming apps and Storybook. The package is intended for this workspace's bundler-based consumers; publishing would require a separate distribution strategy.
