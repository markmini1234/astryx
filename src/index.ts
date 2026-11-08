import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-skill'
import skillSource from '../skills/astryx/SKILL.md'

/** Stable plugin id used by Cordis diagnostics and browser module loading. */
export const name = 'dsh-plugin-astryx'

/** The skill registry is the only host capability this plugin consumes. */
export const inject = ['skills']

/**
 * Remove the portable skill frontmatter from the authored SKILL.md. The
 * registry stores instruction bodies, while discovery metadata is declared
 * explicitly below so malformed YAML never becomes load-bearing at runtime.
 */
function skillBody(source: string): string {
  const opening = source.indexOf('---\n')
  const closing = source.indexOf('\n---\n', opening + 4)
  if (opening !== 0 || closing === -1) {
    throw new Error('skills/astryx/SKILL.md must start with YAML frontmatter')
  }
  return source.slice(closing + 5).trimStart()
}

/**
 * Register the Astryx workflow as an embedded DSH skill. The model can load
 * it on demand through the shared skill catalog; unloading this plugin removes
 * the registration with the owning Cordis effect.
 */
export function apply(ctx: Context): void {
  ctx.effect(
    () => ctx.skills.register({
      name: 'astryx',
      description: 'Build accessible product interfaces with the Meta Astryx design system and its component documentation.',
      whenToUse: 'Use when planning, building, reviewing, or theming a React interface that uses Astryx, or when evaluating whether Astryx is the right design system for a project.',
      source: 'bundled',
      content: skillBody(skillSource),
    }),
    'dsh-plugin-astryx: embedded Astryx skill',
  )
}
