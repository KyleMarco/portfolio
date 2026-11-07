# Shared UI

This private, source-first workspace contains reusable React components, theme tokens, tests, and colocated Storybook stories. The Vite apps compile its TypeScript and CSS directly; no UI build or watcher is required.

## Entry points

| Import                      | Exports                                                                                                                 | Optional peer    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `@portfolio/ui`             | `Button`, `Dropdown`, `FileUpload`, `Link`, `Text`, `TextArea`, `TextInput`, `PopupDialog`, `ToastProvider`, `useToast` | None             |
| `@portfolio/ui/router`      | `LinkButton`                                                                                                            | React Router     |
| `@portfolio/ui/virtualized` | `VirtualizedDropdown`, `VirtualizedList`, `VirtualizedGrid`, `VirtualizedTable`, their hooks and types                  | TanStack Virtual |

```tsx
import {
  Button,
  Dropdown,
  FileUpload,
  Link,
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

UI icons use `lucide-react` with named imports. Decorative icons are hidden from
assistive technology; icon-only controls need an accessible name on the control.
Toast icons are decorative so live regions announce only the message.

### Links

`Link` renders a themed, underlined native `<a>` and exports `LinkProps`. It accepts
native anchor props, including `href`, `target`, `rel`, `download`, `className`,
`style`, and `ref`, with visible keyboard focus and reduced-motion support.
Use it for external URLs, cross-app navigation, fragment links, and downloads.
It uses browser navigation and needs no router provider. Use `LinkButton` from
`@portfolio/ui/router` for button-styled React Router navigation.

```tsx
<Link href="mailto:hello@example.com">Contact me</Link>
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit example.com (opens in a new tab)
</Link>
```

### Dropdown selection

`Dropdown` renders a themed native `<select>` and exports `DropdownProps`. It
accepts native select props, including `value`, `defaultValue`, `onChange`,
`required`, `disabled`, `multiple`, `name`, `form`, and `ref`. Supply `<option>`
and optional `<optgroup>` children; the browser handles keyboard navigation and
the picker. With `multiple` or a `size` greater than one, it renders a native
listbox. Use an empty-value option for a placeholder and `required` for native
validation. Consumers own labels, help text, and validation messages.

```tsx
<label htmlFor="language">Language</label>
<Dropdown id="language" name="language" defaultValue="" required>
  <option value="" disabled>Choose a language</option>
  <option value="en">English</option>
  <option value="fil">Filipino</option>
</Dropdown>
```

### Virtualized dropdown selection

`VirtualizedDropdown` from `@portfolio/ui/virtualized` provides a custom single-select
combobox for large, flat option arrays. It exports `VirtualizedDropdownProps` and
`VirtualizedDropdownOption`. Each option has a unique string `value`, a string
`label` used for display and typeahead, and an optional `disabled` flag. It uses
the existing optional TanStack Virtual peer and renders the visible options plus
overscan and the active option. The core `@portfolio/ui` entry point remains
independent of virtualization.

The shared `useVirtualizedList` hook also accepts TanStack's optional
`rangeExtractor` and `initialRect` settings for custom collection renderers.

```tsx
import { VirtualizedDropdown } from '@portfolio/ui/virtualized';

const records = Array.from({ length: 10000 }, (_, index) => ({
  value: String(index + 1),
  label: `Record ${index + 1}`,
}));

export function RecordPicker() {
  return (
    <div>
      <label htmlFor="record">Record</label>
      <VirtualizedDropdown
        id="record"
        name="record"
        options={records}
        defaultValue="5000"
        placeholder="Choose a record"
        required
      />
    </div>
  );
}
```

Use `value` and `onValueChange(value)` for controlled selection, or `defaultValue`
for internal state. Keep the options array stable when possible. Button props,
including `ref`, `className`, `style`, and accessible names/descriptions, apply to
the trigger. Supply a visible label and an `id`, or an accessible name through
ARIA. Translate `placeholder`, `emptyMessage`, and option labels in the consumer.
`height` caps the popup at 240px by default; `optionHeight` defaults to a fixed
40px and `overscan` to five rows. Long labels truncate visually but retain their
full accessible text and a native tooltip.

Arrow keys open and navigate the list, skipping disabled options. Home/End jump
to the first/last enabled option. Typing matches option labels; repeated letters
cycle matches, and the search buffer resets after 700ms. Enter, Space, or Tab
commits the active option; Tab continues normal focus navigation. Escape, clicking
the trigger again, or moving focus/clicking outside dismisses without committing.
DOM focus stays on the trigger, and the active option remains mounted for
`aria-activedescendant` even while pointer scrolling moves it outside the viewport.

`name` and `form` connect a visually hidden native select containing only the empty
and selected values to form submission. `required` uses native constraint
validation, focuses the visible trigger on failure, and displays the browser's
localized validation message. Use nonempty values for required choices. The form
proxy stays out of the accessibility tree and Tab order. Native form reset restores
an uncontrolled default, retains a controlled value, and respects canceled resets.
`onInvalid` receives the proxy select's validation event. Consumers can also supply
`aria-invalid` and `aria-describedby` for application validation.

The popup inherits the trigger's theme subtree, opens above when space below is
insufficient, and adjusts its height to the viewport. Its ancestors must allow
overflow because it renders in the component tree. Storybook includes 10,000-option,
controlled, form, disabled, invalid, empty, and long-label examples. Custom combobox
screen-reader behavior still needs manual verification with the assistive
technologies supported by the consuming application.

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

`TextInput`, `TextArea`, `Dropdown`, and `FileUpload` provide field styling and native props. Consumers supply a visible label, a stable `id`, and any help or error text. Connect messages with `aria-describedby` and set `aria-invalid` for invalid values; the components do not generate labels or validate input.

`PopupDialog` renders into `document.body` and manages keyboard focus, Escape dismissal, and body scroll locking. Supply a heading whose `id` matches `labelledBy`, a translated `closeLabel`, and an `onClose` handler. Use `initialFocusRef` and `returnFocusRef` when the default focus targets do not fit the interaction. Keep a visible close control in the dialog content and verify focus restoration when its trigger can unmount.

`onClose` can be an inline callback: updating it preserves the current dialog focus
and scroll lock. Escape and backdrop clicks use the latest callback. The
**Editable Content** story demonstrates typing into a controlled field while its
parent rerenders.

Default initial focus and Tab wrapping skip disabled, hidden, inert, and
negative-tab-index controls. When `initialFocusRef` targets a heading or focus is
on the panel, Tab moves to the first available control and Shift+Tab moves to the
last. With no available controls, Tab keeps focus on the panel. The **Keyboard
Focus** story demonstrates heading focus and a disabled action.

## Structure and checks

Public exports live in `src/index.ts`; components, tests, and stories live in `src/components/`; tokens, themes, and utilities live in `src/styles/`. Import public package entry points from apps rather than reaching into package internals.

Run `npm run dev:storybook` from the repository root for the component catalog. Its Theme toolbar switches document themes, including portaled dialogs and toasts.

Run `npm run test --workspace=@portfolio/ui` for component tests and `npm run lint` for Oxlint. `npm run typecheck` checks UI source, tests, apps, and stories; `npm run build` builds the consuming apps and Storybook. The package is intended for this workspace's bundler-based consumers; publishing would require a separate distribution strategy.
