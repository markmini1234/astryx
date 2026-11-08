# Design notes

## Source review

The plugin was designed against the current `meta/astryx` repository and the DeepSeek Harness plugin, theme, and skill APIs.

Astryx is not a drop-in theme package alone. Its public design describes one system shared by humans and agents:

- a React 19 component library built with StyleX;
- a theme layer expressed through portable CSS variable roles and theme-local overrides;
- a self-describing CLI that is the primary source of component, template, token, theme, and migration knowledge;
- canonical `AGENTS.md` guidance that tells coding agents to bootstrap from the CLI before changing component code.

The closest useful DSH analogue therefore has two halves rather than one:

1. **Visual integration** through DSH's existing `ctx.theme.overrideTokens()` extension, which is the supported way for a third-party theme to remap semantic aliases without replacing DSH components.
2. **Agent integration** through DSH's skill registry, which keeps the Astryx workflow available without permanently spending prompt tokens or inventing a second tool protocol.

## Astryx problem being solved

Astryx's documentation makes a strong distinction between capability and restraint:

- components give capability instead of enforcing opinions;
- conventions are documented so unfamiliar components remain predictable;
- docs, CLI, API, and agent instructions are one product surface;
- conventions are measured and revised instead of asserted forever.

DSH has a similar "everything is a plugin" architecture. A DSH plugin that merely imported Astryx React components would fight DSH's primitive and styling ownership. It would also duplicate a large component runtime inside the shell. The integration point that preserves both systems' boundaries is DSH's theme service for appearance and DSH's skill service for agent knowledge.

## Theme mapping

The first release ports Astryx Neutral because its theme specification contains reviewed mappings and pinned palette values. The source values come from:

- `packages/themes/neutral/src/neutralTheme.ts`;
- `packages/themes/neutral/src/neutralPalettes.generated.ts`;
- `packages/themes/neutral/neutral.spec.md`.

The mapping uses Astryx's neutral ramp and portable roles:

| Astryx role | DSH consumer |
| --- | --- |
| `--color-background-body` | `--dsw-alias-bg-base` |
| `--color-background-surface` | `--dsw-alias-bg-layer-1` |
| `--color-background-muted` | `--dsw-alias-bg-layer-2` |
| `--color-text-primary` | `--dsw-alias-label-primary` |
| `--color-text-secondary` | `--dsw-alias-label-secondary` |
| `--color-border` | `--dsw-alias-border-l1/l2` |
| `--color-info` | `--dsw-alias-state-business-primary` |
| `--color-success` | `--dsw-alias-state-success-primary` |
| `--color-warning` | `--dsw-alias-state-warn-primary` |
| `--color-error` | `--dsw-alias-state-error-primary` |
| `--color-accent` | brand and primary-button roles |
| Astryx radius scale | `--dsw-radius-*` |
| Astryx shadow scale | `--dsw-shadow-lv*` |

Neutral's exact status fills are preserved:

- info `#0074e2` / `#6d9cfe`;
- success `#198100` / `#64af4c`;
- warning `#ffce2f`;
- error `#c9303a` / `#ff705d`.

Figtree is self-hosted from the Google Fonts variable TTF under the SIL Open Font License. The browser bundle embeds it as a data URL so package installation does not need a DSH asset route or a third-party network request.

## Why not register seven themes

Astryx ships several themes, but DSH's third-party theme id mechanism switches a complete theme definition and resolves one color scheme at a time. A multi-theme selector would need another persistent settings surface, product-choice UX, and expanded visual review. The safer first release keeps one reviewed theme and exposes the rest as explicit deferred work rather than shipping unreviewed approximations.

## Why use a skill instead of a bespoke tool

DSH's skill registry was designed for reusable instructions that should be discovered only when needed. Astryx's own agent contract is mostly workflow and documentation discipline, not an operation that must run inside DSH's Host process. A skill:

- keeps the Astryx catalog out of every request until relevant;
- inherits DSH's `/name` and model-loading behavior;
- lets the agent use the normal shell tool to call the Astryx CLI;
- avoids wrapping every CLI command in another typed DSH API before the workflow is proven.

If future usage demonstrates a stable, frequently repeated operation that benefits from typed arguments and structured results, that can be added as a separate tool plugin without changing the theme.

## Behavioral contract

- Loading the plugin registers one skill and one theme override.
- Disabling or unloading the plugin disposes both effects.
- The browser half makes no network request for fonts or styles.
- The skill reports CLI failures explicitly. It does not silently substitute invented component knowledge.
- A project-local Astryx CLI is preferred over the pinned fallback.

## Known differences

- DSH's Web shell remains DSH. Astryx component anatomy and composition rules are not injected into DSH primitives.
- Astryx product icon replacements are not ported; DSH's icon sprite remains unchanged.
- The map does not claim conformance to every Astryx component contrast receipt. It preserves the reviewed Neutral token values, but DSH's component matrix must be reviewed independently.
- The Astryx theme can be overridden by DSH user font settings or by later theme layers. That ordering belongs to DSH.

## Verification

Checked against a real `@deepseek-ai/dsh@0.2.2-rc.1` Web profile, not only unit mocks:

- `npm run typecheck`, `npm run build`, and `npm test` pass.
- The package installs through `dsh plugin --profile web add` and appears as `dsh-plugin-astryx` in the composed profile and in `window.__DSH_BOOT__`.
- The served client bundle registers through `window.__ModuleLoader__`, materializes its effect, and injects the Figtree face.
- All 157 declared tokens resolve on the live `body` element; none are dead names.
- 130 of the 136 semantic tokens DSH defines are remapped. The six remaining names are the `--dsw-elevation-*` composites, which intentionally inherit: they are declared per element as `var(--dsw-elevation-stroke-color)`, and overriding them on `body` would break the menu/input rebinding that DSH relies on. The stroke color itself is mapped.
- Light and dark modes were both read from the running UI and matched the mapped values.
- Disabling the entry removes the override layer and the font style, and DSH's stock tokens return without a reload.
- The host half registers `astryx` with the real `SkillRegistry`: source `bundled`, provider `runtime`, model- and user-invocable, with the authored instruction body.

The smoke check ran under an isolated `DSH_HOME`, so no real user profile was touched.
