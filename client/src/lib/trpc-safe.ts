/**
 * Safe tRPC hooks that gracefully degrade when tRPC context is unavailable.
 * 
 * In Vercel deployment mode (IS_VERCEL=true), the app renders without
 * the tRPC Provider. Any component calling trpc.*.useMutation() or
 * trpc.*.useQuery() will crash with "Unable to find tRPC Context".
 * 
 * This module provides safe wrappers that return no-op stubs in Vercel mode.
 * 
 * NO AMBITION DECAY.
 */
import { IS_VERCEL } from "@/lib/useApi";

/**
 * Returns true if tRPC is available (Manus deployment).
 * Components should check this before rendering tRPC-dependent UI.
 */
export const isTRPCAvailable = !IS_VERCEL;

/**
 * Minimal interface for a mutation-like object.
 * Both tRPC mutations and the no-op stub satisfy this.
 */
export interface SafeMutation {
  mutate: (...args: any[]) => void;
  mutateAsync?: (...args: any[]) => Promise<any>;
}

/**
 * A no-op mutation stub that matches the SafeMutation interface.
 * Used as a drop-in replacement when tRPC is not available.
 */
export function useNoOpMutation(): SafeMutation {
  return {
    mutate: () => {},
  };
}
