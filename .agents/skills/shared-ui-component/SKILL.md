---
name: shared-ui-component
description: Use when adding or changing a shared component, variant, Storybook story, or public export in packages/ui, or changing how an app consumes it. Not for app-local components.
---

# Shared UI component changes

- For a simple control, use [Button](../../../packages/ui/src/components/Button/Button.tsx), its [tests](../../../packages/ui/src/components/Button/Button.test.tsx), and its [stories](../../../packages/ui/src/components/Button/Button.stories.tsx) as a reference. For composites or hook-based components, follow the closest existing example. Keep tests and stories colocated in the existing layout.
- Keep optional integrations isolated: core components use `@portfolio/ui`, router-dependent components use `@portfolio/ui/router`, and virtualized components use `@portfolio/ui/virtualized`. These entry points keep optional React Router and TanStack Virtual peer dependencies out of consumers that do not need them.
- Add or update tests for changed behavior and stories for new variants or public behavior. Preserve accessible semantics, keyboard and focus behavior, native props and refs, and reduced-motion support where relevant.
- Use semantic `--ui-*` tokens. When changing styles or how an app consumes the package, consult [packages/ui/README.md](../../../packages/ui/README.md) for stylesheet, Tailwind source, and theme integration.
- Before changing or removing a public prop or export, find its in-repo consumers and prefer a backward-compatible path. For an explicitly requested breaking change, describe the replacement or deprecation path. This private workspace has no changelog or changeset workflow; do not invent versioning steps.

## Validation

- Run `npm run typecheck` for every shared component, story, export, or integration change.
- Run `npm run test --workspace=@portfolio/ui` for behavior changes.
- Run `npm run build` when changing public exports or app integration.
- For visible changes, start Storybook from the repository root with `npm run dev:storybook` and inspect the affected stories at relevant viewport sizes in light and dark themes. If you cannot run Storybook or inspect it visually, state that limitation instead of implying it was checked. Report the checks and inspection performed.
