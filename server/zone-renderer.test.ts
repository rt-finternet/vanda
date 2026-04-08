/**
 * ZoneRenderer Tests
 * Tests the zone-to-route mapping and order calculation logic.
 */
import { describe, it, expect } from "vitest";

// Replicate the mapping logic from ZoneRenderer (can't import React components in vitest server tests)
const ZONE_ROUTE_MAP: Record<string, string> = {
  problem: "/sg/problem",
  solution: "/sg/architecture",
  "what-changes": "/sg/capabilities",
  assets: "/sg/assets",
  funding: "/sg/funding",
  "why-works": "/sg",
};

const ROUTE_ZONE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(ZONE_ROUTE_MAP).map(([zone, route]) => [route, zone])
);

function getZoneOrder(
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

describe("Zone-to-Route Mapping", () => {
  it("maps all 6 Executive Summary zones to routes", () => {
    expect(Object.keys(ZONE_ROUTE_MAP)).toHaveLength(6);
    expect(ZONE_ROUTE_MAP["problem"]).toBe("/sg/problem");
    expect(ZONE_ROUTE_MAP["solution"]).toBe("/sg/architecture");
    expect(ZONE_ROUTE_MAP["what-changes"]).toBe("/sg/capabilities");
    expect(ZONE_ROUTE_MAP["assets"]).toBe("/sg/assets");
    expect(ZONE_ROUTE_MAP["funding"]).toBe("/sg/funding");
    expect(ZONE_ROUTE_MAP["why-works"]).toBe("/sg");
  });

  it("reverse maps routes back to zone IDs", () => {
    expect(ROUTE_ZONE_MAP["/sg/problem"]).toBe("problem");
    expect(ROUTE_ZONE_MAP["/sg/architecture"]).toBe("solution");
    expect(ROUTE_ZONE_MAP["/sg/capabilities"]).toBe("what-changes");
    expect(ROUTE_ZONE_MAP["/sg/assets"]).toBe("assets");
    expect(ROUTE_ZONE_MAP["/sg/funding"]).toBe("funding");
    expect(ROUTE_ZONE_MAP["/sg"]).toBe("why-works");
  });
});

describe("Zone Order Calculation", () => {
  it("returns natural index when no persona (linear mode)", () => {
    expect(getZoneOrder(null, "problem", 0)).toBe(0);
    expect(getZoneOrder(null, "solution", 1)).toBe(1);
    expect(getZoneOrder(null, "assets", 3)).toBe(3);
  });

  it("returns 99 for unknown zone IDs", () => {
    const sectionOrder = ["/sg", "/sg/problem", "/sg/architecture"];
    expect(getZoneOrder(sectionOrder, "unknown-zone", 0)).toBe(99);
  });

  // MAS Board: /sg, /sg/problem, /sg/architecture, /sg/assets, /sg/funding, /sg/deep-dive/regulatory
  it("reorders for MAS Board persona", () => {
    const masBoard = [
      "/sg",
      "/sg/problem",
      "/sg/architecture",
      "/sg/assets",
      "/sg/funding",
      "/sg/deep-dive/regulatory",
    ];

    // problem → /sg/problem → index 1
    expect(getZoneOrder(masBoard, "problem", 0)).toBe(1);
    // solution → /sg/architecture → index 2
    expect(getZoneOrder(masBoard, "solution", 1)).toBe(2);
    // assets → /sg/assets → index 3
    expect(getZoneOrder(masBoard, "assets", 3)).toBe(3);
    // funding → /sg/funding → index 4
    expect(getZoneOrder(masBoard, "funding", 4)).toBe(4);
    // why-works → /sg → index 0 (conclusion first!)
    expect(getZoneOrder(masBoard, "why-works", 5)).toBe(0);
  });

  // Bank C-Suite: /sg, /sg/assets, /sg/deep-dive/collateral-highway, /sg/workflows/institutional-fx, ...
  it("reorders for Bank C-Suite persona (assets first)", () => {
    const bankCSuite = [
      "/sg",
      "/sg/assets",
      "/sg/deep-dive/collateral-highway",
      "/sg/workflows/institutional-fx",
      "/sg/workflows/cdp-bridge",
      "/sg/funding",
    ];

    // assets → /sg/assets → index 1 (first content section!)
    expect(getZoneOrder(bankCSuite, "assets", 3)).toBe(1);
    // funding → /sg/funding → index 5
    expect(getZoneOrder(bankCSuite, "funding", 4)).toBe(5);
    // problem → /sg/problem → NOT in sectionOrder → 99
    expect(getZoneOrder(bankCSuite, "problem", 0)).toBe(99);
    // what-changes → /sg/capabilities → NOT in sectionOrder → 99
    expect(getZoneOrder(bankCSuite, "what-changes", 2)).toBe(99);
    // why-works → /sg → index 0
    expect(getZoneOrder(bankCSuite, "why-works", 5)).toBe(0);
  });

  // SFA/Builders: /sg, /sg/deep-dive/token-programs, /sg/deep-dive/units, ...
  it("reorders for SFA/Builders persona (deep dives first)", () => {
    const sfaBuilders = [
      "/sg",
      "/sg/deep-dive/token-programs",
      "/sg/deep-dive/units",
      "/sg/deep-dive/cross-ledger",
      "/sg/capabilities",
      "/sg/workflows",
    ];

    // what-changes → /sg/capabilities → index 4
    expect(getZoneOrder(sfaBuilders, "what-changes", 2)).toBe(4);
    // problem → /sg/problem → NOT in sectionOrder → 99
    expect(getZoneOrder(sfaBuilders, "problem", 0)).toBe(99);
    // assets → /sg/assets → NOT in sectionOrder → 99
    expect(getZoneOrder(sfaBuilders, "assets", 3)).toBe(99);
    // why-works → /sg → index 0
    expect(getZoneOrder(sfaBuilders, "why-works", 5)).toBe(0);
  });

  it("preserves natural order when persona sectionOrder matches natural", () => {
    // A hypothetical persona whose order matches the natural layout
    const naturalOrder = [
      "/sg/problem",
      "/sg/architecture",
      "/sg/capabilities",
      "/sg/assets",
      "/sg/funding",
      "/sg",
    ];

    expect(getZoneOrder(naturalOrder, "problem", 0)).toBe(0);
    expect(getZoneOrder(naturalOrder, "solution", 1)).toBe(1);
    expect(getZoneOrder(naturalOrder, "what-changes", 2)).toBe(2);
    expect(getZoneOrder(naturalOrder, "assets", 3)).toBe(3);
    expect(getZoneOrder(naturalOrder, "funding", 4)).toBe(4);
  });

  it("handles empty sectionOrder", () => {
    const empty: string[] = [];
    // All zones should get 99 since nothing is in the order
    expect(getZoneOrder(empty, "problem", 0)).toBe(99);
    expect(getZoneOrder(empty, "assets", 3)).toBe(99);
  });
});

describe("Reorder Diversity", () => {
  // Verify that different personas produce different orderings
  it("MAS Board and Bank C-Suite produce different orders for assets", () => {
    const masBoard = ["/sg", "/sg/problem", "/sg/architecture", "/sg/assets", "/sg/funding"];
    const bankCSuite = ["/sg", "/sg/assets", "/sg/deep-dive/collateral-highway"];

    const masBoardAssetsOrder = getZoneOrder(masBoard, "assets", 3);
    const bankCSuiteAssetsOrder = getZoneOrder(bankCSuite, "assets", 3);

    // MAS Board: assets at index 3, Bank C-Suite: assets at index 1
    expect(masBoardAssetsOrder).not.toBe(bankCSuiteAssetsOrder);
    expect(bankCSuiteAssetsOrder).toBeLessThan(masBoardAssetsOrder);
  });

  it("linear mode preserves natural order for all zones", () => {
    const zones = ["problem", "solution", "what-changes", "assets", "funding", "why-works"];
    zones.forEach((zone, i) => {
      expect(getZoneOrder(null, zone, i)).toBe(i);
    });
  });
});
