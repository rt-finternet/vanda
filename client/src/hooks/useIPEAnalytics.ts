/**
 * useIPEAnalytics -- Frontend hook for tracking IPE engagement events.
 * 
 * Fire-and-forget: all tracking calls are non-blocking and silently fail.
 * This hook reads the session token from localStorage to link events to sessions.
 */
import { useCallback, useRef } from "react";
import { trpc } from "@/lib/trpc";

const SESSION_KEY = "units_sg_session";

export function useIPEAnalytics() {
  const trackMutation = trpc.ipeAnalytics.trackEvent.useMutation();
  
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
      trackMutation.mutate({
        eventType: "persona_select",
        personaId,
        sectionPath,
        sessionToken: getSessionToken(),
      });
    },
    [trackMutation, getSessionToken]
  );

  const trackCrossPersonaClick = useCallback(
    (fromPersona: string, toPersona: string, sectionPath: string) => {
      trackMutation.mutate({
        eventType: "cross_persona_click",
        personaId: fromPersona,
        sectionPath,
        targetPersonaId: toPersona,
        sessionToken: getSessionToken(),
      });
    },
    [trackMutation, getSessionToken]
  );

  const trackAiGuideQuery = useCallback(
    (personaId: string, sectionPath: string, queryText: string) => {
      trackMutation.mutate({
        eventType: "ai_guide_query",
        personaId,
        sectionPath,
        queryText: queryText.slice(0, 500),
        sessionToken: getSessionToken(),
      });
    },
    [trackMutation, getSessionToken]
  );

  const trackNextSectionClick = useCallback(
    (personaId: string, sectionPath: string, targetSection: string) => {
      trackMutation.mutate({
        eventType: "next_section_click",
        personaId,
        sectionPath,
        targetSection,
        sessionToken: getSessionToken(),
      });
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

      trackMutation.mutate({
        eventType: "page_view",
        personaId,
        sectionPath,
        sessionToken: getSessionToken(),
      });
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
