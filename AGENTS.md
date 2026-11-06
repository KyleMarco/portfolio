# Repository guidance

This npm-workspaces monorepo uses Turborepo to manage the portfolio, storefront,
Storybook, and shared packages. Run commands from the repository root.

Codex also loads personal defaults from `AGENTS.md` in its home directory
(`~/.codex` by default, or `CODEX_HOME` when set). These repository instructions
take precedence over those defaults where they conflict.

## Required reading

Before changing files, read and follow every guide that applies to the task.
These linked documents contain repository instructions; they are not automatically
loaded with this file.

| Guide                                | Read when                                                                               |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| [Architecture](docs/architecture.md) | Changing application code, shared packages, workspace dependencies, or frontend tooling |
| [Behavior](docs/behavior.md)         | Changing application code or shared UI that affects application behavior                |
| [Deployment](docs/deployment.md)     | Changing routes, navigation, base paths, builds, hosting, or deployment workflows       |
| [Validation](docs/validation.md)     | Making any repository change; use the checks appropriate to the change                  |

See [README.md](README.md) for installation, development commands, URLs, and
deployment details. See [packages/ui/README.md](packages/ui/README.md) for shared
component integration.

## Essential rules

- Apps must not import another app's source. Consume shared UI through its public
  entry points.
- Keep the single root `package-lock.json` and use the installed dependency
  versions. Do not upgrade React or related dependencies unless asked.
- Preserve existing app behavior, English/Filipino translations, and deployment
  bases. Read the relevant guides before changing them.

## Agents and skills

- Keep durable repository rules in this file and the linked guides. Keep reusable
  personal preferences in the global file. Add a nested `AGENTS.md` only when a
  subtree needs distinct instructions, and do not repeat repository rules there.
- Repository skills live in `.agents/skills/<name>/SKILL.md` and are chosen by their
  descriptions. They hold task procedures and validation steps; do not copy
  repository rules into them.
- Custom agents live in `.codex/agents`. Keep each to its role and defer to this
  file and the linked guides for repository rules.
