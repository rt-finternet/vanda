/**
 * useIPEAnalytics -- Frontend hook for tracking IPE engagement events.
 * 
 * Fire-and-forget: all tracking calls are non-blocking and silently fail.
 * This hook reads the session token from localStorage to link events to sessions.
 * 
 * Safe for Vercel mode: returns no-op functions when tRPC is unavailable.
 */
import { useCallback, useRef } from "react";
import { isTRPCAvailable, useNoOpMutation, type SafeMutation } from "@/lib/trpc-safe";
import { trpc } from "@/lib/trpc";

const SESSION_KEY = "units_sg_session";

// Use real tRPC mutation on Manus, no-op on Vercel
const useTRPCMutation: () => SafeMutation = isTRPCAvailable
  ? () => trpc.ipeAnalytics.trackEvent.useMutation()
  : useNoOpMutation;

export function useIPEAnalytics() {
  const trackMutation = useTRPCMutation();
  
  // Debounce page views to avoid flooding on rapid navigation
  const lastPageView = useRef<string>("");
  const lastPageViewTime = useRef<number>(0);

  const getSessionToken = useCallback((): string | undefined => {
    try {
      return localStorage.getItem(SESSION_KEY) ?? undefined;
    } catch {
      return undefined;
    }
  }, []);

  const trackPersonaSelect = useCallback(
    (personaId: string, sectionPath: string) => {
      try {
        trackMutation.mutate({
          eventType: "persona_select",
          personaId,
          sectionPath,
          sessionToken: getSessionToken(),
        });
      } catch {
        // Fire-and-forget
      }
    },
    [trackMutation, getSessionToken]
  );

  const trackCrossPersonaClick = useCallback(
    (fromPersona: string, toPersona: string, sectionPath: string) => {
      try {
        trackMutation.mutate({
          eventType: "cross_persona_click",
          personaId: fromPersona,
          sectionPath,
          targetPersonaId: toPersona,
          sessionToken: getSessionToken(),
        });
      } catch {
        // Fire-and-forget
      }
    },
    [trackMutation, getSessionToken]
  );

  const trackAiGuideQuery = useCallback(
    (personaId: string, sectionPath: string, queryText: string) => {
      try {
        trackMutation.mutate({
          eventType: "ai_guide_query",
          personaId,
          sectionPath,
          queryText: queryText.slice(0, 500),
          sessionToken: getSessionToken(),
        });
      } catch {
        // Fire-and-forget
      }
    },
    [trackMutation, getSessionToken]
  );

  const trackNextSectionClick = useCallback(
    (personaId: string, sectionPath: string, targetSection: string) => {
      try {
        trackMutation.mutate({
          eventType: "next_section_click",
          personaId,
          sectionPath,
          targetSection,
          sessionToken: getSessionToken(),
        });
      } catch {
        // Fire-and-forget
      }
    },
    [trackMutation, getSessionToken]
  );

  const trackPageView = useCallback(
    (personaId: string, sectionPath: string) => {
      // Debounce: skip if same page within 2 seconds
      const now = Date.now();
      if (
        sectionPath === lastPageView.current &&
        now - lastPageViewTime.current < 2000
      ) {
        return;
      }
      lastPageView.current = sectionPath;
      lastPageViewTime.current = now;

      try {
        trackMutation.mutate({
          eventType: "page_view",
          personaId,
          sectionPath,
          sessionToken: getSessionToken(),
        });
      } catch {
        // Fire-and-forget
      }
    },
    [trackMutation, getSessionToken]
  );

  return {
    trackPersonaSelect,
    trackCrossPersonaClick,
    trackAiGuideQuery,
    trackNextSectionClick,
    trackPageView,
  };
}
