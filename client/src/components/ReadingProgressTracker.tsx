/**
 * VANDA Reading Progress Tracker
 *
 * A compact vertical progress indicator that shows the persona's
 * recommended reading path with completion status. Lives in the
 * IPE floating rail, below the persona and AI Guide buttons.
 *
 * Features:
 * - Shows persona's sectionOrder as a sequence of dots
 * - Visited sections are filled (persona color)
 * - Current section is highlighted with a pulse
 * - Clicking a step navigates to that section
 * - Shows "X of Y" summary
 * - Persists to localStorage, resets on persona change
 *
 * NO AMBITION DECAY.
 */
import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { useIPE } from "@/contexts/IPEContext";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { SG } from "@/components/SGPortalNav";

// Short labels for portal routes
const ROUTE_LABELS: Record<string, string> = {
  "/sg": "Summary",
  "/sg/problem": "Problem",
  "/sg/architecture": "Architecture",
  "/sg/capabilities": "Capabilities",
  "/sg/assets": "Assets",
  "/sg/funding": "Funding",
};

export default function ReadingProgressTracker() {
  const { activePersona } = useIPE();
  const [, navigate] = useLocation();
  const { visitedSections, currentSection, progress } = useReadingProgress();

  if (!activePersona) return null;

  const sectionOrder = activePersona.sectionOrder;
  const color = activePersona.color;

  return (
    <div
      className="rounded-r-2xl shadow-2xl transition-all duration-300 overflow-hidden"
      style={{
        padding: "10px 12px",
        background: `linear-gradient(135deg, ${SG.card}f5, ${SG.surface}f5)`,
        border: `1px solid ${color}25`,
        borderLeft: `3px solid ${color}40`,
        backdropFilter: "blur(16px)",
        boxShadow: `4px 0 24px ${color}08, 0 4px 16px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
        />
        <span
          className="text-[9px] font-bold uppercase tracking-widest"
          style={{ color: `${color}80` }}
        >
          Progress
        </span>
        <span
          className="text-[9px] ml-auto"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {progress.visited}/{progress.total}
        </span>
      </div>

      {/* Vertical dot track */}
      <div className="flex flex-col items-center gap-0">
        {sectionOrder.map((route, idx) => {
          const isVisited = visitedSections.includes(route);
          const isCurrent = currentSection === route;
          const label = ROUTE_LABELS[route] || route.split("/").pop() || "";

          return (
            <React.Fragment key={route}>
              {/* Connecting line (not before first) */}
              {idx > 0 && (
                <div
                  className="w-px h-2.5"
                  style={{
                    background: isVisited
                      ? `${color}50`
                      : "rgba(255,255,255,0.08)",
                  }}
                />
              )}

              {/* Dot + label row */}
              <button
                onClick={() => navigate(route)}
                className="group flex items-center gap-2 w-full py-0.5 transition-all duration-200 hover:translate-x-0.5"
                title={`${label}${isVisited ? " (visited)" : isCurrent ? " (current)" : ""}`}
              >
                {/* Dot */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: isCurrent
                        ? color
                        : isVisited
                          ? `${color}90`
                          : "transparent",
                      border: `1.5px solid ${
                        isCurrent
                          ? color
                          : isVisited
                            ? `${color}70`
                            : "rgba(255,255,255,0.15)"
                      }`,
                      boxShadow: isCurrent
                        ? `0 0 6px ${color}40`
                        : "none",
                    }}
                  />
                  {/* Pulse ring for current */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: `${color}20`,
                        animationDuration: "2s",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-[10px] leading-tight transition-colors duration-200"
                  style={{
                    color: isCurrent
                      ? color
                      : isVisited
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-2 pt-1.5" style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
        <div
          className="h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress.percentage}%`,
              background: `linear-gradient(90deg, ${color}80, ${color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
