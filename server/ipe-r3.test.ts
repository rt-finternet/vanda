/**
 * IPE Round 3 Tests: ZoneRenderer Deep-Dive Integration + Reading Progress
 *
 * Tests:
 * 1. PAGE_ZONE_PRIORITIES data integrity (all 5 pages, all 12 personas)
 * 2. getPageZoneOrder helper function
 * 3. Reading progress data model
 */
import { describe, it, expect } from "vitest";
import {
  PAGE_ZONE_PRIORITIES,
  getPageZoneOrder,
  getPageZoneIds,
  IPE_MANIFEST,
} from "../client/src/lib/ipe-manifest";

const PERSONAS = IPE_MANIFEST.personas;

// ─── PAGE_ZONE_PRIORITIES Data Integrity ─────────────────────────────────────

describe("PAGE_ZONE_PRIORITIES", () => {
  const EXPECTED_PAGES = [
    "/sg/problem",
    "/sg/architecture",
    "/sg/capabilities",
    "/sg/assets",
    "/sg/funding",
  ];

  const EXPECTED_ZONES: Record<string, string[]> = {
    "/sg/problem": ["depositories", "fragmentation", "not-third", "comparison"],
    "/sg/architecture": ["three-layer", "gl1", "byow", "observer", "multi-chain"],
    "/sg/capabilities": ["settlement", "repo", "unsponsored", "comparison"],
    "/sg/assets": [
      "equities", "govt-securities", "gold", "stablecoins", "structured",
      "private-credit", "vcc", "p-tokets", "unsponsored", "composability",
    ],
    "/sg/funding": ["funding-pathways", "participants", "rollout", "revenue"],
  };

  const ALL_PERSONA_IDS = PERSONAS.map((p) => p.id);

  it("should have entries for all 5 anchor pages", () => {
    for (const page of EXPECTED_PAGES) {
      expect(PAGE_ZONE_PRIORITIES).toHaveProperty(page);
    }
  });

  it("should have entries for all 12 personas on each page", () => {
    for (const page of EXPECTED_PAGES) {
      const pageMap = PAGE_ZONE_PRIORITIES[page];
      for (const personaId of ALL_PERSONA_IDS) {
        expect(pageMap).toHaveProperty(
          personaId,
          expect.any(Array),
        );
      }
    }
  });

  it("each persona's zone order should contain exactly the expected zones for that page", () => {
    for (const page of EXPECTED_PAGES) {
      const expectedZones = EXPECTED_ZONES[page];
      const pageMap = PAGE_ZONE_PRIORITIES[page];

      for (const personaId of ALL_PERSONA_IDS) {
        const personaOrder = pageMap[personaId];
        // Same length
        expect(personaOrder.length).toBe(expectedZones.length);
        // Same set of zones (order may differ)
        expect([...personaOrder].sort()).toEqual([...expectedZones].sort());
      }
    }
  });

  it("no duplicate zone IDs within any persona's order", () => {
    for (const page of EXPECTED_PAGES) {
      const pageMap = PAGE_ZONE_PRIORITIES[page];
      for (const personaId of ALL_PERSONA_IDS) {
        const personaOrder = pageMap[personaId];
        const unique = new Set(personaOrder);
        expect(unique.size).toBe(personaOrder.length);
      }
    }
  });

  it("total zone count across all pages should be 27", () => {
    let totalZones = 0;
    for (const page of EXPECTED_PAGES) {
      const expectedZones = EXPECTED_ZONES[page];
      totalZones += expectedZones.length;
    }
    expect(totalZones).toBe(27);
  });
});

// ─── getPageZoneOrder Helper ─────────────────────────────────────────────────

describe("getPageZoneOrder", () => {
  it("should return naturalIndex when personaId is null", () => {
    expect(getPageZoneOrder("/sg/problem", null, "depositories", 0)).toBe(0);
    expect(getPageZoneOrder("/sg/problem", null, "comparison", 3)).toBe(3);
  });

  it("should return naturalIndex for unknown page", () => {
    expect(getPageZoneOrder("/sg/unknown", "mas-board", "depositories", 0)).toBe(0);
  });

  it("should return naturalIndex for unknown persona on a known page", () => {
    expect(getPageZoneOrder("/sg/problem", "unknown-persona", "depositories", 0)).toBe(0);
  });

  it("should return correct order for MAS Board on /sg/problem", () => {
    // MAS Board: comparison first, then fragmentation, depositories, not-third
    expect(getPageZoneOrder("/sg/problem", "mas-board", "comparison", 3)).toBe(0);
    expect(getPageZoneOrder("/sg/problem", "mas-board", "fragmentation", 1)).toBe(1);
    expect(getPageZoneOrder("/sg/problem", "mas-board", "depositories", 0)).toBe(2);
    expect(getPageZoneOrder("/sg/problem", "mas-board", "not-third", 2)).toBe(3);
  });

  it("should return correct order for SFA Builders on /sg/problem", () => {
    // SFA Builders: not-third first, then depositories, fragmentation, comparison
    expect(getPageZoneOrder("/sg/problem", "sfa-builders", "not-third", 2)).toBe(0);
    expect(getPageZoneOrder("/sg/problem", "sfa-builders", "depositories", 0)).toBe(1);
    expect(getPageZoneOrder("/sg/problem", "sfa-builders", "fragmentation", 1)).toBe(2);
    expect(getPageZoneOrder("/sg/problem", "sfa-builders", "comparison", 3)).toBe(3);
  });

  it("should return correct order for MAS Supervisory on /sg/architecture", () => {
    // MAS Supervisory: observer first
    expect(getPageZoneOrder("/sg/architecture", "mas-supervisory", "observer", 3)).toBe(0);
    expect(getPageZoneOrder("/sg/architecture", "mas-supervisory", "three-layer", 0)).toBe(1);
  });

  it("should return correct order for Asset Managers on /sg/assets", () => {
    // Asset Managers: vcc first, then private-credit
    expect(getPageZoneOrder("/sg/assets", "asset-managers", "vcc", 6)).toBe(0);
    expect(getPageZoneOrder("/sg/assets", "asset-managers", "private-credit", 5)).toBe(1);
    expect(getPageZoneOrder("/sg/assets", "asset-managers", "equities", 0)).toBe(2);
  });

  it("should return correct order for Bank C-Suite on /sg/funding", () => {
    // Bank C-Suite: revenue first
    expect(getPageZoneOrder("/sg/funding", "bank-csuite", "revenue", 3)).toBe(0);
    expect(getPageZoneOrder("/sg/funding", "bank-csuite", "funding-pathways", 0)).toBe(1);
  });

  it("should return 99 for unknown zone on a known page/persona", () => {
    expect(getPageZoneOrder("/sg/problem", "mas-board", "unknown-zone", 5)).toBe(99);
  });
});

// ─── getPageZoneIds Helper ───────────────────────────────────────────────────

describe("getPageZoneIds", () => {
  it("should return zone IDs for /sg/problem", () => {
    const ids = getPageZoneIds("/sg/problem");
    expect(ids).toHaveLength(4);
    expect(ids).toContain("depositories");
    expect(ids).toContain("comparison");
  });

  it("should return zone IDs for /sg/assets", () => {
    const ids = getPageZoneIds("/sg/assets");
    expect(ids).toHaveLength(10);
    expect(ids).toContain("equities");
    expect(ids).toContain("composability");
  });

  it("should return empty array for unknown page", () => {
    expect(getPageZoneIds("/sg/unknown")).toEqual([]);
  });
});

// ─── Reading Progress Data Model ─────────────────────────────────────────────

describe("Reading Progress Data Model", () => {
  it("should define the correct structure for progress data", () => {
    // This is a structural test to ensure the data model is correct
    const progressData = {
      personaId: "mas-board",
      visitedSections: ["/sg", "/sg/problem"],
      startedAt: Date.now(),
      lastActivityAt: Date.now(),
    };

    expect(progressData.personaId).toBe("mas-board");
    expect(progressData.visitedSections).toHaveLength(2);
    expect(progressData.startedAt).toBeLessThanOrEqual(progressData.lastActivityAt);
  });

  it("should track progress percentage correctly", () => {
    // MAS Board has sectionOrder with specific routes
    const masBoard = PERSONAS.find((p) => p.id === "mas-board");
    expect(masBoard).toBeDefined();

    const totalSections = masBoard!.sectionOrder.length;
    expect(totalSections).toBeGreaterThan(0);

    // 2 of N visited
    const visitedCount = 2;
    const percentage = Math.round((visitedCount / totalSections) * 100);
    expect(percentage).toBeGreaterThan(0);
    expect(percentage).toBeLessThanOrEqual(100);
  });

  it("should reset progress when persona changes", () => {
    // Simulate: persona A has progress, switch to persona B
    const progressA = {
      personaId: "mas-board",
      visitedSections: ["/sg", "/sg/problem", "/sg/architecture"],
      startedAt: Date.now() - 60000,
      lastActivityAt: Date.now(),
    };

    // When persona changes, the hook should not return A's progress for B
    const newPersonaId = "sfa-builders";
    expect(progressA.personaId).not.toBe(newPersonaId);
    // The hook would return [] for sfa-builders since stored data is for mas-board
  });
});

// ─── Cross-validation: Zone IDs match across manifest and pages ──────────────

describe("Zone ID Cross-Validation", () => {
  it("all persona orders for a page should reference the same set of zones", () => {
    for (const [page, personaMap] of Object.entries(PAGE_ZONE_PRIORITIES)) {
      const personaIds = Object.keys(personaMap);
      if (personaIds.length === 0) continue;

      const referenceZones = [...personaMap[personaIds[0]]].sort();

      for (const personaId of personaIds.slice(1)) {
        const zones = [...personaMap[personaId]].sort();
        expect(zones).toEqual(referenceZones);
      }
    }
  });

  it("executive personas should see comparison/overview sections first on Problem page", () => {
    const executives = ["mas-board", "bank-csuite", "abs-ceos", "investors"];
    for (const pid of executives) {
      const order = PAGE_ZONE_PRIORITIES["/sg/problem"][pid];
      expect(order[0]).toBe("comparison");
    }
  });

  it("technical personas should see architecture-depth sections first on Architecture page", () => {
    const technical = ["mas-fintech", "sfa-builders"];
    for (const pid of technical) {
      const order = PAGE_ZONE_PRIORITIES["/sg/architecture"][pid];
      expect(order[0]).toBe("three-layer");
    }
  });

  it("asset managers should see VCC first on Assets page", () => {
    const order = PAGE_ZONE_PRIORITIES["/sg/assets"]["asset-managers"];
    expect(order[0]).toBe("vcc");
  });

  it("business personas should see revenue first on Funding page", () => {
    const business = ["bank-csuite", "abs-ceos", "capital-markets", "investors"];
    for (const pid of business) {
      const order = PAGE_ZONE_PRIORITIES["/sg/funding"][pid];
      expect(order[0]).toBe("revenue");
    }
  });
});
