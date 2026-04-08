/**
 * VANDA IPE Context -- The Brain
 *
 * Tracks active persona, current page, and provides all IPE data
 * to the component tree. Persists persona selection in localStorage.
 * Fires analytics events on persona selection (when tRPC is available).
 *
 * NO AMBITION DECAY.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  IPE_MANIFEST,
  getPersona,
  getCrossPersonaSuggestion,
  getNextSectionRecommendation,
  getNarrativeArc,
  getPersonasByGroup,
  type Persona,
  type CrossPersonaSuggestion,
  type NextSectionRecommendation,
  type NarrativeArc,
  type PersonaGroup,
} from "@/lib/ipe-manifest";
import { isTRPCAvailable, useNoOpMutation, type SafeMutation } from "@/lib/trpc-safe";

// Conditionally import trpc only when available
let useTRPCMutation: () => SafeMutation;
if (isTRPCAvailable) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { trpc } = require("@/lib/trpc") as typeof import("@/lib/trpc");
  useTRPCMutation = () => trpc.ipeAnalytics.trackEvent.useMutation();
} else {
  useTRPCMutation = useNoOpMutation;
}

// ---- Types ----

interface IPEState {
  /** Currently active persona (null = Linear/default mode) */
  activePersona: Persona | null;
  /** Current portal page route */
  currentPage: string;
  /** Whether the persona selector sidebar is open */
  selectorOpen: boolean;
  /** Whether the AI Guide panel is open */
  aiGuideOpen: boolean;
  /** Cross-persona suggestion for current persona + page (if any) */
  crossSuggestion: CrossPersonaSuggestion | null;
  /** Next-section recommendation for current persona + page (if any) */
  nextRecommendation: NextSectionRecommendation | null;
  /** Narrative arc for the active persona */
  narrativeArc: ReturnType<typeof getNarrativeArc> | null;
  /** All personas grouped */
  personaGroups: Map<PersonaGroup, Persona[]>;
  /** The full manifest */
  manifest: typeof IPE_MANIFEST;
}

interface IPEActions {
  /** Set the active persona (null to clear / go to Linear mode) */
  setPersona: (personaId: string | null) => void;
  /** Update the current page route */
  setCurrentPage: (page: string) => void;
  /** Toggle the persona selector sidebar */
  toggleSelector: () => void;
  /** Open/close the persona selector */
  setSelectorOpen: (open: boolean) => void;
  /** Toggle the AI Guide panel */
  toggleAiGuide: () => void;
  /** Open/close the AI Guide */
  setAiGuideOpen: (open: boolean) => void;
  /** Get section order for the active persona */
  getSectionOrder: () => string[];
  /** Check if a section should be highlighted for the active persona */
  isSectionHighlighted: (sectionRoute: string) => boolean;
}

type IPEContextValue = IPEState & IPEActions;

// ---- Context ----

const IPEContext = createContext<IPEContextValue | null>(null);

const STORAGE_KEY = "vanda_ipe_persona";
const SESSION_KEY = "units_sg_session";

// ---- Provider ----

export function IPEProvider({ children }: { children: ReactNode }) {
  // Restore persona from localStorage
  const [personaId, setPersonaId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  });
  const [currentPage, setCurrentPage] = useState("/sg");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [aiGuideOpen, setAiGuideOpen] = useState(false);

  // Analytics: fire-and-forget persona_select events (safe for Vercel mode)
  const trackMutation = useTRPCMutation();
  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // Derived state
  const activePersona = useMemo(
    () => (personaId ? getPersona(personaId) ?? null : null),
    [personaId]
  );

  const crossSuggestion = useMemo(
    () =>
      activePersona
        ? getCrossPersonaSuggestion(activePersona.id, currentPage) ?? null
        : null,
    [activePersona, currentPage]
  );

  const nextRecommendation = useMemo(
    () =>
      activePersona
        ? getNextSectionRecommendation(activePersona.id, currentPage) ?? null
        : null,
    [activePersona, currentPage]
  );

  const narrativeArc = useMemo(
    () => (activePersona ? getNarrativeArc(activePersona.id) ?? null : null),
    [activePersona]
  );

  const personaGroups = useMemo(() => getPersonasByGroup(), []);

  // Actions
  const setPersona = useCallback((id: string | null) => {
    setPersonaId(id);
    if (id) {
      localStorage.setItem(STORAGE_KEY, id);
      // Fire analytics event (no-op in Vercel mode)
      try {
        const sessionToken = localStorage.getItem(SESSION_KEY) ?? undefined;
        trackMutation.mutate({
          eventType: "persona_select",
          personaId: id,
          sectionPath: currentPageRef.current,
          sessionToken,
        });
      } catch {
        // Fire-and-forget: silently ignore analytics errors
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [trackMutation]);

  const toggleSelector = useCallback(
    () => setSelectorOpen((prev) => !prev),
    []
  );

  const toggleAiGuide = useCallback(
    () => setAiGuideOpen((prev) => !prev),
    []
  );

  const getSectionOrder = useCallback(() => {
    if (!activePersona) return [];
    return activePersona.sectionOrder;
  }, [activePersona]);

  const isSectionHighlighted = useCallback(
    (sectionRoute: string) => {
      if (!activePersona) return true; // Linear mode: everything highlighted
      return activePersona.sectionOrder.includes(sectionRoute);
    },
    [activePersona]
  );

  const value = useMemo<IPEContextValue>(
    () => ({
      activePersona,
      currentPage,
      selectorOpen,
      aiGuideOpen,
      crossSuggestion,
      nextRecommendation,
      narrativeArc,
      personaGroups,
      manifest: IPE_MANIFEST,
      setPersona,
      setCurrentPage,
      toggleSelector,
      setSelectorOpen,
      toggleAiGuide,
      setAiGuideOpen,
      getSectionOrder,
      isSectionHighlighted,
    }),
    [
      activePersona,
      currentPage,
      selectorOpen,
      aiGuideOpen,
      crossSuggestion,
      nextRecommendation,
      narrativeArc,
      personaGroups,
      setPersona,
      setCurrentPage,
      toggleSelector,
      toggleAiGuide,
      getSectionOrder,
      isSectionHighlighted,
    ]
  );

  return <IPEContext.Provider value={value}>{children}</IPEContext.Provider>;
}

// ---- Hook ----

export function useIPE(): IPEContextValue {
  const ctx = useContext(IPEContext);
  if (!ctx) {
    throw new Error("useIPE must be used within an IPEProvider");
  }
  return ctx;
}

// ---- Page Tracker Hook ----
/**
 * Call this at the top of every portal page to keep IPE in sync with routing.
 * Usage: useIPEPageTracker("/sg/architecture");
 */
export function useIPEPageTracker(page: string) {
  const { setCurrentPage } = useIPE();
  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);
}
