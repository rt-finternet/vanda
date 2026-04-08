/**
 * VANDA Reading Progress Hook
 *
 * Tracks which portal sections the user has visited for the active persona.
 * Persists to localStorage. Resets when persona changes.
 *
 * NO AMBITION DECAY.
 */
import { useState, useEffect, useCallback, useMemo } from "react";
import { useIPE } from "@/contexts/IPEContext";

const STORAGE_KEY = "vanda_ipe_reading_progress";

interface ReadingProgressData {
  personaId: string;
  visitedSections: string[];
  startedAt: number;
  lastActivityAt: number;
}

interface ReadingProgressResult {
  /** Array of visited section routes */
  visitedSections: string[];
  /** The current section route */
  currentSection: string;
  /** Mark a section as visited */
  markVisited: (route: string) => void;
  /** Reset progress (e.g., on persona change) */
  resetProgress: () => void;
  /** Progress summary */
  progress: {
    visited: number;
    total: number;
    percentage: number;
  };
}

function loadProgress(personaId: string): ReadingProgressData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: ReadingProgressData = JSON.parse(raw);
    // Only return if it matches the current persona
    if (data.personaId === personaId) return data;
    return null;
  } catch {
    return null;
  }
}

function saveProgress(data: ReadingProgressData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently ignore storage errors
  }
}

export function useReadingProgress(): ReadingProgressResult {
  const { activePersona, currentPage } = useIPE();

  const [visitedSections, setVisitedSections] = useState<string[]>(() => {
    if (!activePersona) return [];
    const saved = loadProgress(activePersona.id);
    return saved?.visitedSections ?? [];
  });

  // Reset when persona changes
  useEffect(() => {
    if (!activePersona) {
      setVisitedSections([]);
      return;
    }
    const saved = loadProgress(activePersona.id);
    setVisitedSections(saved?.visitedSections ?? []);
  }, [activePersona?.id]);

  // Auto-mark current page as visited
  useEffect(() => {
    if (!activePersona || !currentPage) return;
    // Only track pages in the persona's sectionOrder
    if (!activePersona.sectionOrder.includes(currentPage)) return;

    setVisitedSections((prev) => {
      if (prev.includes(currentPage)) return prev;
      const next = [...prev, currentPage];
      // Persist
      saveProgress({
        personaId: activePersona.id,
        visitedSections: next,
        startedAt: loadProgress(activePersona.id)?.startedAt ?? Date.now(),
        lastActivityAt: Date.now(),
      });
      return next;
    });
  }, [activePersona, currentPage]);

  const markVisited = useCallback(
    (route: string) => {
      if (!activePersona) return;
      setVisitedSections((prev) => {
        if (prev.includes(route)) return prev;
        const next = [...prev, route];
        saveProgress({
          personaId: activePersona.id,
          visitedSections: next,
          startedAt: loadProgress(activePersona.id)?.startedAt ?? Date.now(),
          lastActivityAt: Date.now(),
        });
        return next;
      });
    },
    [activePersona]
  );

  const resetProgress = useCallback(() => {
    setVisitedSections([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const progress = useMemo(() => {
    const total = activePersona?.sectionOrder.length ?? 0;
    const visited = activePersona
      ? visitedSections.filter((s) =>
          activePersona.sectionOrder.includes(s)
        ).length
      : 0;
    return {
      visited,
      total,
      percentage: total > 0 ? Math.round((visited / total) * 100) : 0,
    };
  }, [activePersona, visitedSections]);

  return {
    visitedSections,
    currentSection: currentPage,
    markVisited,
    resetProgress,
    progress,
  };
}
