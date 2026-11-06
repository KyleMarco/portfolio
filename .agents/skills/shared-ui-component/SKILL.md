---
name: shared-ui-component
description: Use when adding or changing a shared component, variant, Storybook story, token, stylesheet, or public export in packages/ui, or changing how an app consumes it. Not for app-local components.
---

# Shared UI component changes

- For a simple control, use [Button](../../../packages/ui/src/components/Button/Button.tsx), its [tests](../../../packages/ui/src/components/Button/Button.test.tsx), and its [stories](../../../packages/ui/src/components/Button/Button.stories.tsx) as a reference. For composites or hook-based components, follow the closest existing example. Keep tests and stories colocated in the existing layout.
- Put each component behind the right entry point: core in `@portfolio/ui`, router-dependent in `@portfolio/ui/router`, virtualized in `@portfolio/ui/virtualized`. A core export must not import React Router or TanStack Virtual, directly or indirectly.
- Add stories for new variants or changed public behavior and tests for changed behavior. Preserve native props and refs.
- When a change affects stylesheet, Tailwind `@source`, or theme integration, follow [packages/ui/README.md](../../../packages/ui/README.md) and update it in the same change.
- Before changing or removing a public prop or export, find its in-repo consumers and prefer a backward-compatible path. For an explicitly requested breaking change, describe the replacement or deprecation path. This private workspace has no changelog or changeset workflow; do not invent versioning steps.

## Validation

- Run `npm run typecheck` for every shared component, story, export, or integration change.
- Run `npm run test --workspace=@portfolio/ui` for behavior changes.
- Run `npm run lint` and `npm run build` when changing public exports or app integration.
- For visible changes, start Storybook from the repository root with `npm run dev:storybook` and inspect the affected stories in light and dark themes at relevant viewport sizes. Report the checks and inspection performed.