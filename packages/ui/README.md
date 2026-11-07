# Shared UI

This private, source-first workspace contains reusable React components, theme tokens, tests, and colocated Storybook stories. The Vite apps compile its TypeScript and CSS directly; no UI build or watcher is required.

## Entry points

| Import                      | Exports                                                                                             | Optional peer    |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ---------------- |
| `@portfolio/ui`             | `Button`, `FileUpload`, `Text`, `TextArea`, `TextInput`, `PopupDialog`, `ToastProvider`, `useToast` | None             |
| `@portfolio/ui/router`      | `LinkButton`                                                                                        | React Router     |
| `@portfolio/ui/virtualized` | `VirtualizedList`, `VirtualizedGrid`, `VirtualizedTable`, their hooks and types                     | TanStack Virtual |

```tsx
import {
  Button,
  FileUpload,
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

### File selection

`FileUpload` renders a themed native `<input type="file">` and exports
`FileUploadProps`. It supports native props such as `accept`, `multiple`, `required`,
`disabled`, `name`, `form`, and `ref`. Read selected files from
`event.currentTarget.files` in `onChange`, or submit them through the owning form.
File inputs remain uncontrolled, so `type`, `value`, and `defaultValue` are excluded
from its props. The browser supplies the picker button text and selected file names.
The consuming app owns validation and uploading; `accept` is a picker hint.

```tsx
<label htmlFor="attachments">Attachments</label>
<FileUpload
  id="attachments"
  name="attachments"
  accept="image/*,.pdf"
  multiple
  aria-describedby="attachments-help"
  onChange={(event) => {
    const files = Array.from(event.currentTarget.files ?? []);
    console.log(files);
  }}
/>
<p id="attachments-help">Choose images or PDF documents.</p>
```

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

All three apps include these imports and source registration. The portfolio uses
the shared `Button` for its theme toggle and `LinkButton` for route actions. Its
theme button scopes token overrides with Tailwind arbitrary-property classes,
including `dark:` overrides. Page layout and scroll observation stay in the app.

`Button` defaults to `size="default"` and also supports `size="icon"` for a compact,
round icon control. Supply an accessible name with `aria-label` when its content
is only an icon. Both sizes share the same variant, focus, disabled, and
reduced-motion styles. `ButtonSize` is exported from `@portfolio/ui`.

### Motion utilities

Motion is opt-in through utility classes; importing the stylesheet does not
animate elements on its own. Storybook's **Shared UI / Motion** stories show the
drift, flip, and reveal effects in both themes.

| Utility                 | Behavior                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| `motion-enter`          | Content entry over 220ms                                            |
| `motion-backdrop-enter` | Backdrop fade over 180ms                                            |
| `motion-reveal`         | Fade and upward entry over 650ms, controlled by `data-reveal-state` |
| `motion-drift`          | Continuous drift and scale over an alternating 18s cycle            |
| `motion-flip`           | Continuous perspective rotation over a 2s cycle                     |

For `motion-reveal`, set `data-reveal-state="hidden"` only after observation is
available, then set it to `"visible"` when the element enters the viewport. An
unset state leaves content visible. The app owns its observer and cleanup; the
utility only supplies the styles. Reduced motion disables all of these effects
and keeps reveal content visible even if its state is still `"hidden"`.

Use `[animation-delay:-9s]` alongside `motion-drift` to offset a second element by
half a cycle. Animation definitions live in `src/styles/utilities/motion.css`;
app-specific positioning and colors stay with their consuming elements.

## Accessibility responsibilities

`TextInput`, `TextArea`, and `FileUpload` provide field styling and native props. Consumers supply a visible label, a stable `id`, and any help or error text. Connect messages with `aria-describedby` and set `aria-invalid` for invalid values; the components do not generate labels or validate input.

`PopupDialog` renders into `document.body` and manages keyboard focus, Escape dismissal, and body scroll locking. Supply a heading whose `id` matches `labelledBy`, a translated `closeLabel`, and an `onClose` handler. Use `initialFocusRef` and `returnFocusRef` when the default focus targets do not fit the interaction. Keep a visible close control in the dialog content and verify focus restoration when its trigger can unmount.

## Structure and checks

Public exports live in `src/index.ts`; components, tests, and stories live in `src/components/`; tokens, themes, and utilities live in `src/styles/`. Import public package entry points from apps rather than reaching into package internals.

Run `npm run dev:storybook` from the repository root for the component catalog. Its Theme toolbar switches document themes, including portaled dialogs and toasts.

Run `npm run test --workspace=@portfolio/ui` for component tests and `npm run lint` for Oxlint. `npm run typecheck` checks UI source, tests, apps, and stories; `npm run build` builds the consuming apps and Storybook. The package is intended for this workspace's bundler-based consumers; publishing would require a separate distribution strategy.
