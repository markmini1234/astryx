import type { Context } from '@deepseek-ai/cordis';
/** Stable plugin id used by Cordis diagnostics and browser module loading. */
export declare const name = "dsh-plugin-astryx";
/** The skill registry is the only host capability this plugin consumes. */
export declare const inject: string[];
/**
 * Register the Astryx workflow as an embedded DSH skill. The model can load
 * it on demand through the shared skill catalog; unloading this plugin removes
 * the registration with the owning Cordis effect.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map