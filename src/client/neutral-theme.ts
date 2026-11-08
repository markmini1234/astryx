import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Astryx Neutral grayscale ramp, indexed by the stops used below. */
const n = {
  0: '#000000',
  5: '#111111',
  10: '#1b1b1b',
  15: '#262626',
  20: '#303030',
  25: '#3b3b3b',
  30: '#474747',
  35: '#525252',
  40: '#5e5e5e',
  45: '#6a6a6a',
  50: '#777777',
  55: '#848484',
  60: '#919191',
  65: '#9e9e9e',
  70: '#ababab',
  75: '#b9b9b9',
  80: '#c6c6c6',
  85: '#d4d4d4',
  90: '#e2e2e2',
  95: '#f1f1f1',
  100: '#ffffff',
} as const

const blue = {
  45: '#0067ce',
  50: '#0074e2',
  75: '#88bcff',
  80: '#a1caff',
  85: '#b9d7ff',
} as const

const green = {
  45: '#2f7d33',
  55: '#4a984c',
  70: '#85bb85',
  75: '#90ca90',
  85: '#bce0bb',
} as const

const red = {
  45: '#c0262c',
  55: '#de4745',
  65: '#fa6762',
  75: '#ff9890',
} as const

const yellow = {
  45: '#836700',
  80: '#e3c36c',
  90: '#fae19e',
} as const

const purple = {
  30: '#6b187c',
  80: '#eaacf8',
} as const

const both = (value: string): { light: string; dark: string } => ({ light: value, dark: value })
const pair = (light: string, dark: string): { light: string; dark: string } => ({ light, dark })

/**
 * Astryx Neutral's portable roles projected onto DSH's semantic aliases.
 * Values come from Astryx's reviewed neutral ramp and status-role mappings;
 * surface-role choices preserve the intent of DSH's existing token names.
 */
export const ASTRYX_NEUTRAL_TOKENS: ThemeTokenOverrides = {
  '--dsw-font-family': both(
    'var(--dsh-font-family-text, "Astryx Figtree"), Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  ),
  '--dsw-font-family-brand': both('"Astryx Figtree", Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'),

  '--dsw-radius-xs': both('6px'),
  '--dsw-radius-sm': both('10px'),
  '--dsw-radius-md': both('12px'),
  '--dsw-radius-lg': both('16px'),
  '--dsw-radius-xl': both('20px'),
  '--dsw-radius-panel': both('28px'),

  '--dsw-alias-bg-base': pair(n[95], n[10]),
  '--dsw-alias-bg-layer-1': pair(n[100], n[15]),
  '--dsw-alias-bg-layer-2': pair(n[95], n[20]),
  '--dsw-alias-bg-layer-3': pair(n[90], n[25]),
  '--dsw-alias-bg-layer-4': pair(n[85], n[30]),
  '--dsw-alias-bg-l1': pair(n[100], n[20]),
  '--dsw-alias-bg-l2': pair(n[95], n[25]),
  '--dsw-alias-bg-overlay': pair(n[100], n[15]),
  '--dsw-alias-bg-module-platform': pair(n[100], n[15]),
  '--dsw-alias-bg-multi-select': pair(n[95], n[20]),
  '--dsw-alias-bg-skeleton': pair(n[90], n[35]),
  '--dsw-alias-bg-document-selection': both('rgba(0, 116, 226, 0.40)'),
  '--dsw-alias-bg-mask-1': pair('rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.56)'),
  '--dsw-alias-bg-mask-2': pair('rgba(0, 0, 0, 0.10)', 'rgba(0, 0, 0, 0.28)'),
  '--dsw-alias-bg-mask-3': pair('rgba(0, 0, 0, 0.46)', 'rgba(0, 0, 0, 0.66)'),
  '--dsw-alias-bg-mask-drop': pair('rgba(241, 241, 241, 0.72)', 'rgba(27, 27, 27, 0.72)'),
  '--dsw-alias-bg-mask-photo': both('rgba(0, 0, 0, 0.88)'),
  '--dsw-alias-bg-document-preview': pair(n[95], n[10]),
  '--dsw-alias-label-document-preview': pair(n[50], n[65]),

  '--dsw-alias-border-inverted': pair('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.06)'),
  '--dsw-alias-border-inverted2': pair('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)'),
  '--dsw-alias-border-l1': pair('rgba(0, 0, 0, 0.055)', 'rgba(255, 255, 255, 0.10)'),
  '--dsw-alias-border-l2-darkmode-thin': pair('rgba(0, 0, 0, 0.09)', 'rgba(255, 255, 255, 0.10)'),
  '--dsw-alias-border-l2': pair('rgba(0, 0, 0, 0.09)', 'rgba(255, 255, 255, 0.14)'),
  '--dsw-alias-border-l3': pair(n[85], n[35]),
  '--dsw-alias-border-l4': pair(n[80], n[40]),

  '--dsw-alias-fg': pair(n[0], n[100]),
  '--dsw-alias-fill-l1': pair(n[95], n[20]),
  '--dsw-alias-fill-l2': pair(n[90], n[25]),
  '--dsw-alias-fill-tertiary': pair('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.10)'),
  '--dsw-alias-fill-tsp-secondary': pair('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.06)'),
  '--dsw-alias-label-primary': pair(n[0], n[100]),
  '--dsw-alias-label-secondary': pair(n[30], n[65]),
  '--dsw-alias-label-tertiary': pair(n[45], n[65]),
  '--dsw-alias-label-caption': pair(n[60], n[60]),
  '--dsw-alias-label-quaternary': pair(n[60], n[55]),
  '--dsw-alias-label-dimmed': pair(n[75], n[45]),
  '--dsw-alias-label-error': pair(red[45], red[75]),
  '--dsw-alias-label-primary-bluish': pair(n[10], n[90]),
  '--dsw-alias-label-primary-dimmed': pair(n[20], n[95]),
  '--dsw-alias-label-primary-inverted': pair(n[100], n[15]),
  '--dsw-alias-label-primary-foreground': pair(n[100], n[5]),
  '--dsw-alias-label-deep-diving': pair(blue[45], blue[80]),
  '--dsw-alias-label-deep-diving-shimmer': pair('rgba(0, 103, 206, 0.30)', 'rgba(161, 202, 255, 0.45)'),
  '--dsw-alias-label-shimmer': pair('rgba(0, 0, 0, 0.30)', 'rgba(255, 255, 255, 0.45)'),
  '--dsw-alias-menu-icon': pair(n[30], n[80]),
  '--dsw-alias-link': pair(n[10], n[90]),
  '--dsw-alias-separator-primary': pair(n[85], n[35]),

  '--dsw-alias-brand-primary': pair(n[10], n[95]),
  '--dsw-alias-brand-text': pair(n[0], n[100]),
  '--dsw-alias-brand-primary-invert': pair(n[100], n[10]),
  '--dsw-alias-brand-primary-new-colorprimary-new-color': pair(blue[50], '#6d9cfe'),

  '--dsw-alias-state-business-primary': pair(blue[50], '#6d9cfe'),
  '--dsw-alias-state-business-tertiary': pair(blue[85], 'rgba(136, 188, 255, 0.24)'),
  '--dsw-alias-state-done-primary': pair(purple[30], purple[80]),
  '--dsw-alias-state-error-primary': pair('#c9303a', '#ff705d'),
  '--dsw-alias-state-error-secondary': pair(red[65], red[75]),
  '--dsw-alias-state-idle-primary': pair(n[60], n[55]),
  '--dsw-alias-state-success-primary': pair('#198100', '#64af4c'),
  '--dsw-alias-state-success-secondary': pair(green[55], green[70]),
  '--dsw-alias-state-success-tertiary': pair(green[85], 'rgba(144, 202, 144, 0.24)'),
  '--dsw-alias-state-warn-label': pair(yellow[45], yellow[80]),
  '--dsw-alias-state-warn-primary': pair('#ffce2f', '#ffce2f'),
  '--dsw-alias-state-warn-secondary': pair('#eec448', yellow[80]),
  '--dsw-alias-state-warn-tertiary': pair(yellow[90], 'rgba(226, 182, 35, 0.24)'),

  '--dsw-alias-button-contrast-fill': pair(n[20], n[95]),
  '--dsw-alias-button-elevated-fill': pair(n[100], n[20]),
  '--dsw-alias-button-floating-fill': pair(n[100], n[20]),
  '--dsw-alias-button-floating-hover': pair(n[95], n[25]),
  '--dsw-alias-button-ghost-active-border': pair(n[60], n[45]),
  '--dsw-alias-button-ghost-active-fill': pair(n[95], n[20]),
  '--dsw-alias-button-ghost-active-hover': pair(n[90], n[25]),
  '--dsw-alias-button-info-fill': pair(blue[50], '#6d9cfe'),
  '--dsw-alias-button-info-hover': pair(blue[45], blue[75]),
  '--dsw-alias-button-primary-dimmed': pair(n[85], n[30]),
  '--dsw-alias-button-primary-fill': pair(n[10], n[95]),
  '--dsw-alias-button-primary-hover': pair(n[20], n[100]),
  '--dsw-alias-button-tool-bar-fill-invisible': pair('rgba(0, 0, 0, 0.32)', 'rgba(255, 255, 255, 0.18)'),
  '--dsw-alias-button-tool-bar-fill': pair('rgba(48, 48, 48, 0.52)', 'rgba(0, 0, 0, 0.52)'),
  '--dsw-alias-button-tool-bar-hover': pair('rgba(48, 48, 48, 0.66)', 'rgba(0, 0, 0, 0.66)'),

  '--dsw-alias-interactive-bg-active': pair('rgba(0, 0, 0, 0.10)', 'rgba(255, 255, 255, 0.10)'),
  '--dsw-alias-interactive-bg-hover-accent': pair('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)'),
  '--dsw-alias-interactive-bg-hover-danger': pair('rgba(201, 48, 58, 0.06)', 'rgba(255, 112, 93, 0.14)'),
  '--dsw-alias-interactive-bg-hover-solid': pair(n[95], n[20]),
  '--dsw-alias-interactive-bg-hover': pair('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)'),

  '--dsw-alias-code-diff-added': pair('rgba(25, 129, 0, 0.08)', 'rgba(100, 175, 76, 0.12)'),
  '--dsw-alias-code-diff-deleted': pair('rgba(201, 48, 58, 0.08)', 'rgba(255, 112, 93, 0.12)'),
  '--dsw-alias-file-diff-added-bg': pair('#defadd', '#223622'),
  '--dsw-alias-file-diff-added-gutter': pair('#cbeeca', '#192b19'),
  '--dsw-alias-file-diff-added-marker': pair(green[45], '#97c897'),
  '--dsw-alias-file-diff-deleted-bg': pair('#ffece9', '#4c221f'),
  '--dsw-alias-file-diff-deleted-gutter': pair('#ffd8d4', '#3d1917'),
  '--dsw-alias-file-diff-deleted-marker': pair(red[45], red[75]),

  '--dsw-alias-illustration-background': pair(n[95], n[25]),
  '--dsw-alias-illustration-backing': pair(n[85], n[40]),
  '--dsw-alias-illustration-detail': pair(n[75], n[45]),
  '--dsw-alias-illustration-surface': pair(n[90], n[30]),
  '--dsw-alias-illustration-inset': pair(n[90], n[30]),
  '--dsw-alias-illustration-shadow': pair(n[90], n[30]),

  '--dsw-alias-markdown-citation': pair(n[95], n[20]),
  '--dsw-alias-markdown-code-block': pair(n[95], n[10]),
  '--dsw-alias-markdown-code-block-banner': pair(n[90], n[15]),
  '--dsw-alias-markdown-code-segment-selected': pair(n[100], n[20]),
  '--dsw-alias-markdown-code-segment-unselected': pair(n[95], n[10]),
  '--dsw-alias-markdown-inline-code': pair(n[90], n[25]),
  '--dsw-alias-markdown-placeholder': pair(n[95], n[20]),
  '--dsw-alias-markdown-tag': pair(n[90], n[20]),

  '--dsw-alias-scrollbar-bg-l1': pair(n[75], n[45]),
  '--dsw-alias-scrollbar-bg-l2': pair(n[70], n[40]),
  '--dsw-alias-scrollbar-hover-l1': pair(n[65], n[50]),
  '--dsw-alias-scrollbar-hover-l2': pair(n[60], n[55]),

  '--dsw-alias-toast-bg': pair(n[20], n[20]),
  '--dsw-alias-toast-label': pair(n[100], n[95]),
  '--dsw-alias-tooltip-bg': pair(n[15], n[20]),
  '--dsw-alias-tooltip-key-bg': pair(n[25], n[30]),
  '--dsw-alias-turn-trigger-bg': pair(n[95], n[20]),
  '--dsw-alias-turn-trigger-bg-hover': pair(n[90], n[25]),
  '--dsw-alias-switch-thumb': pair(n[100], n[80]),

  '--dsw-alias-settings-card-fill': pair(n[95], n[20]),
  '--dsw-alias-settings-card-stroke': pair(n[85], n[30]),
  '--dsw-alias-menu-group-header-fill': pair('rgba(241, 241, 241, 0.94)', 'rgba(38, 38, 38, 0.94)'),
  '--dsw-alias-onboarding-accent': pair(blue[50], '#6d9cfe'),
  '--dsw-alias-onboarding-card-fill': pair('rgba(255, 255, 255, 0.80)', 'rgba(48, 48, 48, 0.80)'),
  '--dsw-alias-onboarding-checkbox-border': pair('rgba(0, 0, 0, 0.20)', n[35]),
  '--dsw-alias-onboarding-secondary-fill': pair(n[100], n[25]),
  '--dsw-specific-bubble': pair(n[95], n[25]),
  '--dsw-specific-bubble-highlight': pair(n[90], n[30]),
  '--dsw-specific-input-major': pair(n[100], n[20]),
  '--dsw-specific-login-input': pair(n[95], n[15]),
  '--dsw-specific-menu': pair('rgba(255, 255, 255, 0.94)', 'rgba(38, 38, 38, 0.94)'),
  '--dsw-specific-selector': pair(n[95], n[25]),
  '--dsw-specific-sidebar-fill': pair(n[95], n[10]),
  '--dsw-specific-sidebar-nav-item-active-accent': pair(n[85], n[30]),
  '--dsw-specific-sidebar-nav-item-active': pair(n[90], n[20]),
  '--dsw-specific-sidebar-nav-item-hover': pair('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.08)'),
  '--dsw-specific-tip': pair(n[95], n[20]),

  '--dsw-menu-surface-fill': pair('rgba(255, 255, 255, 0.94)', 'rgba(38, 38, 38, 0.94)'),
  '--dsw-elevation-stroke-color': pair(n[85], n[35]),
  '--dsw-focus-ring-color': pair(blue[50], '#6d9cfe'),
  '--dsw-focus-ring-width': both('2px'),
  '--dsw-linear-gradient-think': pair(
    'linear-gradient(180deg, #ffffff 20.19%, rgba(255, 255, 255, 0) 100%)',
    'linear-gradient(180deg, #1b1b1b 20.19%, rgba(27, 27, 27, 0) 100%)',
  ),
  '--dsw-linear-think-select': pair(
    'linear-gradient(180deg, #f1f1f1 20.19%, rgba(241, 241, 241, 0) 100%)',
    'linear-gradient(180deg, #303030 20.19%, rgba(48, 48, 48, 0) 100%)',
  ),
  '--dsw-gradient-onboarding-violet-stops': pair(
    '#6b187c 33.102%, #d885eb 50.954%, #f3bfff 85.326%, #6b187c',
    '#4a2f51 33.102%, #eaacf8 50.954%, #f3bfff 85.326%, #4a2f51',
  ),
  '--dsw-gradient-onboarding-blue-stops': pair(
    '#0074e2 18.75%, #5aa0f8 51.78%, #a1caff 86.252%, #0074e2',
    '#0067ce 18.75%, #5aa0f8 51.78%, #a1caff 86.252%, #0067ce',
  ),
  '--dsw-gradient-onboarding-cyan-stops': pair(
    '#00859d 21.154%, #49adc4 50.954%, #9ae2f4 85.326%, #00859d',
    '#274046 21.154%, #71c7dd 50.954%, #9ae2f4 85.326%, #274046',
  ),
  '--dsw-shadow-lv1': pair(
    '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.10)',
    '0 2px 4px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.40), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
  ),
  '--dsw-shadow-lv1-blur': pair(
    '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.10)',
    '0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.50), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
  ),
  '--dsw-shadow-lv2': pair(
    '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.10)',
    '0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.50), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
  ),
  '--dsw-shadow-lv3': pair(
    '0 4px 6px rgba(0, 0, 0, 0.10), 0 12px 24px rgba(0, 0, 0, 0.15)',
    '0 4px 6px rgba(0, 0, 0, 0.50), 0 12px 24px rgba(0, 0, 0, 0.70), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
  ),
}
