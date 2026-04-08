/**
 * VANDA ZoneRenderer — Persona-Driven Content Reordering
 *
 * Wraps content sections and reorders them based on the active persona's
 * sectionOrder. Uses CSS `order` property for smooth, non-destructive reordering.
 *
 * Usage:
 *   <ZoneRenderer>
 *     <ZoneRenderer.Zone zoneId="problem">...content...</ZoneRenderer.Zone>
 *     <ZoneRenderer.Zone zoneId="architecture">...content...</ZoneRenderer.Zone>
 *   </ZoneRenderer>
 *
 * The zone IDs are mapped to persona sectionOrder routes via ZONE_ROUTE_MAP.
 *
 * NO AMBITION DECAY.
 */
import React, { useMemo } from "react";
import { useIPE } from "@/contexts/IPEContext";
import { SG } from "@/components/SGPortalNav";

// ─── Zone-to-Route Mapping ──────────────────────────────────────────────────
// Maps Executive Summary section zone IDs to the portal route paths
// used in each persona's sectionOrder array.

export const ZONE_ROUTE_MAP: Record<string, string> = {
  problem: "/sg/problem",
  solution: "/sg/architecture",
  "what-changes": "/sg/capabilities",
  assets: "/sg/assets",
  funding: "/sg/funding",
  "why-works": "/sg", // conclusion maps to the exec summary itself
};

// Reverse map: route → zone ID
export const ROUTE_ZONE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(ZONE_ROUTE_MAP).map(([zone, route]) => [route, zone])
);

/**
 * Given a persona's sectionOrder and a zone ID, return the CSS order value.
 * Lower order = appears first.
 * If the zone's route is not in the persona's sectionOrder, it gets order 99.
 * If no persona is active (linear mode), returns the natural order.
 */
export function getZoneOrder(
  sectionOrder: string[] | null,
  zoneId: string,
  naturalIndex: number
): number {
  if (!sectionOrder) return naturalIndex;

  const route = ZONE_ROUTE_MAP[zoneId];
  if (!route) return 99;

  const idx = sectionOrder.indexOf(route);
  return idx >= 0 ? idx : 99;
}

// ─── Zone Component ─────────────────────────────────────────────────────────

interface ZoneProps {
  /** Unique identifier for this content zone */
  zoneId: string;
  /** Natural order index (0-based) for fallback */
  naturalIndex?: number;
  /** Children content */
  children: React.ReactNode;
}

function Zone({ zoneId, naturalIndex = 0, children }: ZoneProps) {
  const { activePersona } = useIPE();

  const order = useMemo(() => {
    if (!activePersona) return naturalIndex;
    return getZoneOrder(activePersona.sectionOrder, zoneId, naturalIndex);
  }, [activePersona, zoneId, naturalIndex]);

  const isReordered = activePersona && order !== naturalIndex;

  return (
    <div
      data-zone-id={zoneId}
      data-zone-order={order}
      className="transition-all duration-500 ease-in-out"
      style={{
        order,
        // Subtle visual indicator when reordered
        ...(isReordered
          ? {
              borderLeft: `2px solid ${activePersona.color}20`,
              paddingLeft: "4px",
              marginLeft: "-6px",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

// ─── ZoneRenderer Container ─────────────────────────────────────────────────

interface ZoneRendererProps {
  children: React.ReactNode;
  /** Optional className for the container */
  className?: string;
}

/**
 * Container that enables CSS order-based reordering of its Zone children.
 * Uses flexbox with column direction so `order` property works.
 */
function ZoneRendererContainer({ children, className = "" }: ZoneRendererProps) {
  const { activePersona } = useIPE();

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Reorder indicator banner */}
      {activePersona && (
        <div
          className="mb-4 px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all duration-300"
          style={{
            background: `${activePersona.color}08`,
            border: `1px solid ${activePersona.color}15`,
            color: `${activePersona.color}90`,
          }}
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
            <path d="M7 3l-4 3 4 3" />
            <path d="M17 15l4 3-4 3" />
          </svg>
          <span>
            Content prioritised for{" "}
            <span className="font-semibold" style={{ color: activePersona.color }}>
              {activePersona.shortName}
            </span>
            {" "}— sections most relevant to you appear first
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Compound Component Export ───────────────────────────────────────────────

const ZoneRenderer = Object.assign(ZoneRendererContainer, { Zone });
export default ZoneRenderer;
