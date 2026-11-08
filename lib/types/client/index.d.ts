import type { Context } from '@deepseek-ai/cordis';
/** Browser plugin id shown by Cordis diagnostics. */
export declare const name = "dsh-plugin-astryx-client";
/** Theme overrides are the only client service this plugin consumes. */
export declare const inject: string[];
/**
 * Apply the Astryx Neutral theme. Both registrations are owned by one effect:
 * unloading or disabling the plugin retracts every token and removes the font
 * face, restoring the stock DSH surface without a reload.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map