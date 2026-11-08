# Astryx for DeepSeek Harness

English | [中文](README.zh.md)

`dsh-plugin-astryx` is a DSH bundle that brings two complementary parts of the [Meta Astryx design system](https://github.com/meta/astryx) into DeepSeek Harness:

- a Web theme that projects Astryx Neutral's reviewed color, type, radius, and elevation decisions onto DSH's `--dsw-*` tokens;
- an embedded `astryx` skill that gives DSH agents the same documentation-led workflow Astryx exposes through its CLI.

The plugin follows DSH's plugin contract rather than shipping a parallel component runtime. The DSH Web UI keeps its own React components and composition layer; the plugin supplies the visual tokens and the agent-facing Astryx knowledge.

## What it changes

**Web theme**

- Astryx Neutral light and dark surfaces, text, borders, states, controls, menus, code surfaces, and scrollbars.
- Figtree, self-hosted from the bundled OFL font, with a system fallback. No external font request is made.
- Astryx's `6 / 10 / 12 / 16 / 20 / 28px` shape scale mapped to DSH's control, panel, and page radii.
- Astryx's low, medium, and high elevation character translated into DSH's shadow ramp.
- The override is an effect: disabling the plugin or unloading it restores the stock DSH theme immediately.

**Agent skill**

- A model-invocable `astryx` skill registered into DSH's skill catalog.
- It teaches the agent to use the project-local Astryx CLI or `npx @astryxdesign/cli@0.7.11`, read component docs before editing, start from templates, respect tokens and accessibility, and handle CLI failures explicitly.
- The skill content is bundled; it does not require a network request to appear in the catalog.

## Requirements

- DeepSeek Harness `>= 0.2.2-rc.1 < 0.3.0`
- A Web profile for the visual theme
- The DSH skill registry (`@deepseek-ai/dsh-skill`) for the agent skill

The plugin does not install Astryx into your product project. When the agent uses the skill to build an Astryx app, it will install Astryx there according to the current CLI documentation.

## Install

Build a publishable tarball:

```sh
npm install
npm run build
npm pack
```

Install it into a DSH Web profile:

```sh
dsh plugin --profile web add ./dsh-plugin-astryx-0.1.0.tgz
```

The committed `lib/` means the repository can also be installed directly, no build step:

```sh
dsh plugin --profile web add github:markmini1234/astryx
```

For local plugin development, a linked checkout also works after building:

```sh
dsh plugin --profile web add /absolute/path/to/dsh-plugin-astryx
```

Reload the Web UI. The bundle is enabled by default and appears as **Astryx design system** in the Plugins page. Turning the plugin off removes both the theme override and the skill registration.

## Development

```sh
npm install
npm run typecheck
npm run build
npm test
```

`npm run build` emits:

- `lib/index.js`, the Cordis Host half that registers the skill;
- `lib/client.js`, the DSH browser closure-factory bundle that applies the theme;
- `lib/types`, declaration files for both halves.

The browser bundle embeds Figtree as a data URL, so the packed package has no runtime asset route dependency.

## Design

See [docs/DESIGN.md](docs/DESIGN.md) for the source review, token mapping, and known differences between Astryx's React surface and DSH's Web surface.

## Known limitations

- This release ports Astryx Neutral. Butter, Chocolate, Matcha, Stone, Gothic, and Y2K are not yet selectable.
- DSH's Web UI is not an Astryx component tree. Astryx component APIs, composition patterns, and product icons remain available to agents through the skill, but DSH's own primitives still render the shell.
- The theme maps documented semantic roles, not every static palette variable or every component override in Astryx Neutral.
- The skill pins its fallback CLI version for reproducibility. Change `skills/astryx/SKILL.md` when intentionally moving the plugin to a newer Astryx CLI.

## Licenses

The plugin code is MIT licensed. Figtree is distributed under the SIL Open Font License; its license text is in [`assets/Figtree-OFL.txt`](assets/Figtree-OFL.txt).
