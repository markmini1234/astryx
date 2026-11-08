import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { ASTRYX_NEUTRAL_TOKENS } from './neutral-theme.ts'

/** Browser plugin id shown by Cordis diagnostics. */
export const name = 'dsh-plugin-astryx-client'

/** Theme overrides are the only client service this plugin consumes. */
export const inject = ['theme']

/** Source label used by the ThemeRuntime override stack. */
const OVERRIDE_SOURCE = 'dsh-plugin-astryx'

/** Style element carrying the bundled Figtree face. */
const FONT_STYLE_ID = 'dsh-plugin-astryx-figtree'

/**
 * Apply the Astryx Neutral theme. Both registrations are owned by one effect:
 * unloading or disabling the plugin retracts every token and removes the font
 * face, restoring the stock DSH surface without a reload.
 */
export function apply(ctx: Context): void {
  ctx.effect(() => {
    const disposer = ctx.theme.overrideTokens(OVERRIDE_SOURCE, ASTRYX_NEUTRAL_TOKENS)
    const style = document.createElement('style')
    style.id = FONT_STYLE_ID
    style.dataset.plugin = OVERRIDE_SOURCE
    style.textContent = [
      '@font-face {',
      '  font-family: "Astryx Figtree";',
      '  src: url("' + __ASTRYX_FIGTREE_DATA_URL__ + '") format("truetype");',
      '  font-style: normal;',
      '  font-weight: 300 900;',
      '  font-display: swap;',
      '}',
    ].join('\n')
    document.head.append(style)
    return () => {
      disposer()
      style.remove()
    }
  }, 'dsh-plugin-astryx: Neutral theme')
}
