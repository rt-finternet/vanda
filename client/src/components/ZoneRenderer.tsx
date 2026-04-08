/**
 * VANDA ZoneRenderer — Persona-Driven Content Reordering
 *
 * Wraps content sections and reorders them based on the active persona's
 * priorities. Supports two modes:
 *
 * 1. Executive Summary mode (no pageId): Uses ZONE_ROUTE_MAP to map zone IDs
 *    to portal routes, deriving order from persona's sectionOrder array.
 *
 * 2. Deep-dive page mode (with pageId): Uses PAGE_ZONE_PRIORITIES from the
 *    manifest to get intra-page section ordering per persona.
 *
 * Usage:
 *   <!-- Executive Summary (existing) -->
 *   <ZoneRenderer>
 *     <ZoneRenderer.Zone zoneId="problem">...content...</ZoneRenderer.Zone>
 *   </ZoneRenderer>
 *
 *   <!-- Deep-dive page (new) -->
 *   <ZoneRenderer pageId="/sg/problem">
 *     <ZoneRenderer.Zone zoneId="depositories">...content...</ZoneRenderer.Zone>
 *   </ZoneRenderer>
 *
 * NO AMBITION DECAY.
 */
import React, { useMemo } from "react";
import { useIPE } from "@/contexts/IPEContext";
import { SG } from "@/components/SGPortalNav";
import { getPageZoneOrder } from "@/lib/ipe-manifest";

// ─── Zone-to-Route Mapping (Executive Summary only) ─────────────────────────
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
 * Used for Executive Summary mode (no pageId).
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

// ─── Zone Context ───────────────────────────────────────────────────────────
// Shared context so Zone children can read the parent's pageId

const ZoneRendererContext = React.createContext<{ pageId?: string }>({});

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
  const { pageId } = React.useContext(ZoneRendererContext);

  const order = useMemo(() => {
    if (!activePersona) return naturalIndex;

    // Deep-dive page mode: use PAGE_ZONE_PRIORITIES
    if (pageId) {
      return getPageZoneOrder(pageId, activePersona.id, zoneId, naturalIndex);
    }

    // Executive Summary mode: use ZONE_ROUTE_MAP
    return getZoneOrder(activePersona.sectionOrder, zoneId, naturalIndex);
  }, [activePersona, zoneId, naturalIndex, pageId]);

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
  /** Page path for deep-dive mode (e.g., "/sg/problem"). Omit for Executive Summary. */
  pageId?: string;
}

/**
 * Container that enables CSS order-based reordering of its Zone children.
 * Uses flexbox with column direction so `order` property works.
 */
function ZoneRendererContainer({ children, className = "", pageId }: ZoneRendererProps) {
  const { activePersona } = useIPE();

  return (
    <ZoneRendererContext.Provider value={{ pageId }}>
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
              {" "}, sections most relevant to you appear first
            </span>
          </div>
        )}
        {children}
      </div>
    </ZoneRendererContext.Provider>
  );
}

// ─── Compound Component Export ───────────────────────────────────────────────

const ZoneRenderer = Object.assign(ZoneRendererContainer, { Zone });
export default ZoneRenderer;
