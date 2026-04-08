/**
 * Comprehensive IPE Persona Tests
 * Tests all 12 personas across: manifest data, cross-persona suggestions,
 * next-section recommendations, narrative arcs, and section orders.
 *
 * NO AMBITION DECAY.
 */
import { describe, it, expect } from "vitest";

import {
  IPE_MANIFEST,
  getPersona,
  getCrossPersonaSuggestion,
  getNextSectionRecommendation,
  getNarrativeArc,
  getPersonasByGroup,
  type Persona,
} from "../client/src/lib/ipe-manifest";

const ALL_PERSONA_IDS = [
  "mas-board",
  "mas-fintech",
  "mas-supervisory",
  "mas-policy",
  "abs-ceos",
  "ibf-workforce",
  "imas-asset-mgmt",
  "sfa-builders",
  "capital-markets",
  "asset-managers",
  "bank-csuite",
  "investors",
];

const ALL_PAGES = [
  "/sg",
  "/sg/problem",
  "/sg/architecture",
  "/sg/capabilities",
  "/sg/assets",
  "/sg/funding",
];

describe("IPE Manifest Completeness", () => {
  it("should have exactly 12 personas", () => {
    expect(IPE_MANIFEST.personas).toHaveLength(12);
  });

  it("should have exactly 5 narrative arcs", () => {
    expect(IPE_MANIFEST.narrativeArcs).toHaveLength(5);
  });

  it("should have at least 50 cross-persona suggestions", () => {
    expect(IPE_MANIFEST.crossPersonaSuggestions.length).toBeGreaterThanOrEqual(50);
  });

  it("should have at least 60 next-section recommendations", () => {
    expect(IPE_MANIFEST.nextSectionRecommendations.length).toBeGreaterThanOrEqual(60);
  });

  it("should have AI Guide configuration", () => {
    expect(IPE_MANIFEST.aiGuide).toBeDefined();
    expect(IPE_MANIFEST.aiGuide.greeting).toBeTruthy();
  });
});

describe("All 12 Personas - Individual Validation", () => {
  ALL_PERSONA_IDS.forEach((personaId) => {
    describe(`Persona: ${personaId}`, () => {
      it("should exist in the manifest", () => {
        const persona = getPersona(personaId);
        expect(persona).toBeDefined();
      });

      it("should have all required fields", () => {
        const persona = getPersona(personaId);
        expect(persona).toBeDefined();
        if (!persona) return;

        expect(persona.id).toBe(personaId);
        expect(persona.name).toBeTruthy();
        expect(persona.shortName).toBeTruthy();
        expect(persona.description).toBeTruthy();
        expect(persona.group).toBeTruthy();
        expect(persona.icon).toBeTruthy();
        expect(persona.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(persona.narrativeArc).toBeTruthy();
        expect(persona.estimatedReadTime).toBeTruthy();
        expect(persona.realWorld).toBeTruthy();
      });

      it("should have a valid section order with at least 3 sections", () => {
        const persona = getPersona(personaId);
        expect(persona).toBeDefined();
        if (!persona) return;

        expect(persona.sectionOrder.length).toBeGreaterThanOrEqual(3);
        persona.sectionOrder.forEach((section) => {
          expect(section).toMatch(/^\/sg/);
        });
      });

      it("should have a valid narrative arc", () => {
        const arc = getNarrativeArc(personaId);
        expect(arc).toBeDefined();
        if (!arc) return;

        expect(arc.id).toBeTruthy();
        expect(arc.label).toBeTruthy();
        expect(arc.description).toBeTruthy();
      });

      it("should have at least one next-section recommendation", () => {
        let hasRecommendation = false;
        ALL_PAGES.forEach((page) => {
          const rec = getNextSectionRecommendation(personaId, page);
          if (rec) hasRecommendation = true;
        });
        expect(hasRecommendation).toBe(true);
      });

      it("should have at least one cross-persona suggestion across all pages", () => {
        let hasSuggestion = false;
        ALL_PAGES.forEach((page) => {
          const sug = getCrossPersonaSuggestion(personaId, page);
          if (sug) hasSuggestion = true;
        });
        expect(hasSuggestion).toBe(true);
      });
    });
  });
});

describe("Persona Groups", () => {
  it("should have 4 groups", () => {
    const groups = getPersonasByGroup();
    expect(groups.size).toBe(4);
  });

  it("should have regulators group with 4 personas", () => {
    const groups = getPersonasByGroup();
    const regulators = groups.get("regulators");
    expect(regulators).toBeDefined();
    expect(regulators).toHaveLength(4);
  });

  it("should have industry-bodies group with 4 personas", () => {
    const groups = getPersonasByGroup();
    const industry = groups.get("industry-bodies");
    expect(industry).toBeDefined();
    expect(industry).toHaveLength(4);
  });

  it("should have market-participants group with 3 personas", () => {
    const groups = getPersonasByGroup();
    const market = groups.get("market-participants");
    expect(market).toBeDefined();
    expect(market).toHaveLength(3);
  });

  it("should have end-users group with 1 persona", () => {
    const groups = getPersonasByGroup();
    const endUsers = groups.get("end-users");
    expect(endUsers).toBeDefined();
    expect(endUsers).toHaveLength(1);
  });
});

describe("Cross-Persona Suggestions - Coverage Matrix", () => {
  it("should have suggestions for /sg (Executive Summary) page for at least 6 personas", () => {
    let count = 0;
    ALL_PERSONA_IDS.forEach((pid) => {
      if (getCrossPersonaSuggestion(pid, "/sg")) count++;
    });
    expect(count).toBeGreaterThanOrEqual(6);
  });

  it("should have suggestions for /sg/problem page for at least 6 personas", () => {
    let count = 0;
    ALL_PERSONA_IDS.forEach((pid) => {
      if (getCrossPersonaSuggestion(pid, "/sg/problem")) count++;
    });
    expect(count).toBeGreaterThanOrEqual(6);
  });

  it("should have suggestions for /sg/architecture page for at least 3 personas", () => {
    let count = 0;
    ALL_PERSONA_IDS.forEach((pid) => {
      if (getCrossPersonaSuggestion(pid, "/sg/architecture")) count++;
    });
    expect(count).toBeGreaterThanOrEqual(3);
  });

  it("cross-persona suggestions should reference valid persona IDs", () => {
    IPE_MANIFEST.crossPersonaSuggestions.forEach((sug) => {
      expect(getPersona(sug.fromPersona)).toBeDefined();
      expect(getPersona(sug.toPersona)).toBeDefined();
    });
  });

  it("cross-persona suggestions should not suggest the same persona", () => {
    IPE_MANIFEST.crossPersonaSuggestions.forEach((sug) => {
      expect(sug.fromPersona).not.toBe(sug.toPersona);
    });
  });
});

describe("Next-Section Recommendations - Coverage Matrix", () => {
  it("should have recommendations from /sg for all 12 personas", () => {
    let count = 0;
    ALL_PERSONA_IDS.forEach((pid) => {
      if (getNextSectionRecommendation(pid, "/sg")) count++;
    });
    expect(count).toBe(12);
  });

  it("next-section recommendations should have valid target sections", () => {
    IPE_MANIFEST.nextSectionRecommendations.forEach((rec) => {
      expect(rec.nextSection).toMatch(/^\/sg/);
      expect(rec.nextLabel).toBeTruthy();
      expect(rec.reason).toBeTruthy();
    });
  });

  it("next-section should not recommend the same page", () => {
    IPE_MANIFEST.nextSectionRecommendations.forEach((rec) => {
      expect(rec.afterSection).not.toBe(rec.nextSection);
    });
  });
});

describe("Narrative Arc Assignments", () => {
  it("should use at least 3 different narrative arcs across all personas", () => {
    const arcsUsed = new Set<string>();
    ALL_PERSONA_IDS.forEach((pid) => {
      const persona = getPersona(pid);
      if (persona) arcsUsed.add(persona.narrativeArc);
    });
    expect(arcsUsed.size).toBeGreaterThanOrEqual(3);
  });

  it("all narrative arc IDs should exist in the manifest", () => {
    const arcsUsed = new Set<string>();
    ALL_PERSONA_IDS.forEach((pid) => {
      const persona = getPersona(pid);
      if (persona) arcsUsed.add(persona.narrativeArc);
    });
    arcsUsed.forEach((arcId) => {
      const arc = IPE_MANIFEST.narrativeArcs.find((a) => a.id === arcId);
      expect(arc).toBeDefined();
    });
  });
});

describe("Color Uniqueness", () => {
  it("each persona within a group should have a distinct color", () => {
    const groups = getPersonasByGroup();
    groups.forEach((personas, groupName) => {
      const colors = personas.map((p) => p.color);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });
});

describe("Section Order Validity", () => {
  ALL_PERSONA_IDS.forEach((personaId) => {
    it(`${personaId} section order should not have duplicates`, () => {
      const persona = getPersona(personaId);
      if (!persona) return;
      const uniqueSections = new Set(persona.sectionOrder);
      expect(uniqueSections.size).toBe(persona.sectionOrder.length);
    });
  });
});
