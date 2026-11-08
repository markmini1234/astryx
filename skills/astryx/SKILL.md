---
name: astryx
description: Build accessible product interfaces with the Meta Astryx design system and its component documentation.
whenToUse: Use when planning, building, reviewing, or theming a React interface that uses Astryx, or when evaluating whether Astryx is the right design system for a project.
---

# Astryx workflow

Astryx is Meta's open-source React 19 design system. Its API and documentation are designed to be used by people and coding agents through the same CLI. Treat the installed CLI as the source of truth for components, props, templates, themes, and migration steps. Do not invent an Astryx component or prop from memory.

## Choose the CLI entry

Inside an Astryx project, run the project-local CLI so the answer matches that project's installed versions:

```sh
pnpm exec astryx help
# or: npm exec astryx help
# or: yarn astryx help
```

When the project has no local CLI, run the current public package:

```sh
npx --yes @astryxdesign/cli@0.7.11 help
```

Use one entry consistently for a task. If the local CLI is broken, report the failure and ask before replacing it. Do not silently fall back to a different design system.

## Bootstrap before changing code

Run the small discovery set before the first Astryx edit on a branch:

```sh
astryx help
astryx docs --detail compact
astryx docs principles --dense
astryx docs tokens --dense
astryx docs theme --dense
astryx component --list
astryx template --list
```

Use `--json` when another command or script needs structured output. `astryx manifest --json` is the machine-readable capability manifest. Error envelopes carry a stable `code`; branch on that code, not on the human-readable error string.

## Find the exact API

Search first when the component or concept is uncertain:

```sh
astryx search "date range"
astryx search "date range" --json
```

Read the exact component before importing or modifying it:

```sh
astryx component Button --dense
astryx component DateRangeInput --json
```

The component result is authoritative for props, defaults, variants, anatomy, accessibility behavior, examples, and composition constraints. If a requested design needs a prop that the documentation does not list, stop and use a documented alternative rather than casting or patching internals.

For a long docs topic, inspect the section index and load only the section needed:

```sh
astryx docs principles --index
astryx docs principles accessibility
```

## Start from templates when possible

List the available page and block templates, then emit one before hand-writing a new composition:

```sh
astryx template --list
astryx template settings-page
astryx template settings-page --skeleton
```

Adapt the emitted source and keep its semantic structure. Templates encode layout, spacing, state, and accessibility decisions that are easy to lose when reconstructing a page from screenshots.

## Setup and theming

Astryx requires React 19 or later. A typical project installs the component core, a theme, StyleX, and the CLI:

```sh
npm install @astryxdesign/core @astryxdesign/theme-neutral @stylexjs/stylex
npm install -D @astryxdesign/cli
```

Read the current setup instructions from the installed CLI instead of copying an old README:

```sh
astryx docs getting-started
astryx docs theme
astryx theme --list
```

Use Astryx semantic tokens and the shipped theme variables. Do not hardcode a palette that duplicates a documented token. For a custom brand theme, use the theme authoring path and the CLI's validation/build commands.

## Build and review rules

1. Prefer an existing Astryx component over a custom primitive. Use `astryx component <Name> --dense` before deciding.
2. Prefer an Astryx template or documented composition over recreating a common page from visual memory.
3. Keep component source intact unless the task explicitly requires customization. Use supported props, tokens, or `swizzle` rather than patching package internals.
4. Preserve React 19, TypeScript, keyboard, focus, reduced-motion, and screen-reader behavior described by the component docs.
5. Test light and dark modes; do not assume a token value works in both.
6. After upgrading `@astryxdesign/core`, run the matching migration:

   ```sh
   astryx upgrade --from <old-version> --apply
   ```

7. When a component or feature is missing, use `astryx gap-report` with the owning package instead of silently forking the API.

## Useful commands

| Goal | Command |
| --- | --- |
| Discover every CLI command | `astryx help` |
| Read the machine manifest | `astryx manifest --json` |
| Search all domains | `astryx search "<query>"` |
| List components | `astryx component --list` |
| Read one component | `astryx component <Name> --dense` |
| Read design rules | `astryx docs principles --dense` |
| Read token roles | `astryx docs tokens --dense` |
| Read theming guidance | `astryx docs theme --dense` |
| List page templates | `astryx template --list` |
| Emit a page template | `astryx template <name>` |
| Copy a component for deep customization | `astryx swizzle <Name>` |
| Diagnose an integration | `astryx doctor` |

## Failure handling

If the CLI cannot start, report the exact command, exit status, and output. If a component or section is missing, report the returned error code and suggestions. Do not replace missing Astryx documentation with invented APIs, and do not mark UI work complete while the relevant component docs or checks remain unread.
