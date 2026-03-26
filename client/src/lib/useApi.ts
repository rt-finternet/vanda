/**
 * Deployment-Aware API Hooks
 *
 * Clean strategy pattern for dual deployment:
 * - On Manus: delegates to tRPC hooks (type-safe, batched, cached)
 * - On Vercel: uses fetch-based API client with React Query
 *
 * The deploy target is determined at build time via VITE_DEPLOY_TARGET.
 * Default is "manus" when the env var is not set.
 */

export const IS_VERCEL = import.meta.env.VITE_DEPLOY_TARGET === "vercel";
