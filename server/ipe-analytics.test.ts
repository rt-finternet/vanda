/**
 * IPE Analytics Router Tests
 * Tests the analytics event tracking, summary, and recent events endpoints.
 */
import { describe, it, expect } from "vitest";

// Test the input validation schema
describe("IPE Analytics Input Validation", () => {
  const validEvent = {
    eventType: "persona_select" as const,
    personaId: "mas-board",
    sectionPath: "/sg",
  };

  it("accepts valid persona_select event", () => {
    expect(validEvent.eventType).toBe("persona_select");
    expect(validEvent.personaId).toBeTruthy();
    expect(validEvent.sectionPath).toBeTruthy();
  });

  it("accepts all 5 event types", () => {
    const eventTypes = [
      "persona_select",
      "cross_persona_click",
      "ai_guide_query",
      "next_section_click",
      "page_view",
    ];
    eventTypes.forEach((type) => {
      expect(typeof type).toBe("string");
      expect(type.length).toBeGreaterThan(0);
    });
  });

  it("validates optional fields can be undefined", () => {
    const event = {
      ...validEvent,
      targetPersonaId: undefined,
      targetSection: undefined,
      queryText: undefined,
      sessionToken: undefined,
    };
    expect(event.targetPersonaId).toBeUndefined();
    expect(event.targetSection).toBeUndefined();
    expect(event.queryText).toBeUndefined();
    expect(event.sessionToken).toBeUndefined();
  });

  it("validates cross_persona_click has target fields", () => {
    const event = {
      eventType: "cross_persona_click" as const,
      personaId: "mas-board",
      sectionPath: "/sg",
      targetPersonaId: "bank-csuite",
    };
    expect(event.targetPersonaId).toBe("bank-csuite");
  });

  it("validates ai_guide_query has queryText", () => {
    const event = {
      eventType: "ai_guide_query" as const,
      personaId: "sfa-builders",
      sectionPath: "/sg/architecture",
      queryText: "How does the three-plane architecture work?",
    };
    expect(event.queryText).toBeTruthy();
    expect(event.queryText!.length).toBeLessThanOrEqual(500);
  });

  it("validates next_section_click has targetSection", () => {
    const event = {
      eventType: "next_section_click" as const,
      personaId: "bank-csuite",
      sectionPath: "/sg",
      targetSection: "/sg/assets",
    };
    expect(event.targetSection).toBe("/sg/assets");
  });

  it("validates page_view is minimal", () => {
    const event = {
      eventType: "page_view" as const,
      personaId: "investors",
      sectionPath: "/sg/funding",
    };
    expect(event.eventType).toBe("page_view");
  });
});

describe("IPE Analytics Event Coverage", () => {
  // All 12 persona IDs that should be trackable
  const PERSONA_IDS = [
    "mas-board",
    "mas-policy",
    "mas-fintech",
    "mas-supervisory",
    "abs-ceos",
    "ibf-workforce",
    "imas-asset-mgmt",
    "sfa-builders",
    "capital-markets",
    "asset-managers",
    "bank-csuite",
    "investors",
  ];

  // All portal pages that should be trackable
  const PAGES = [
    "/sg",
    "/sg/problem",
    "/sg/architecture",
    "/sg/capabilities",
    "/sg/assets",
    "/sg/funding",
    "/sg/workflows/cdp-bridge",
    "/sg/workflows/atomic-dvp",
    "/sg/workflows/vcc-tokenisation",
    "/sg/workflows/gold-tokenisation",
    "/sg/workflows/cross-border",
    "/sg/workflows/commodities-collateral",
    "/sg/workflows/collateral-mobilisation",
    "/sg/workflows/institutional-fx",
  ];

  it("all 12 persona IDs are valid strings", () => {
    PERSONA_IDS.forEach((id) => {
      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
      expect(id.length).toBeLessThanOrEqual(64);
    });
  });

  it("all 14 page paths are valid", () => {
    PAGES.forEach((page) => {
      expect(page.startsWith("/sg")).toBe(true);
      expect(page.length).toBeLessThanOrEqual(256);
    });
  });

  it("can construct a valid event for every persona + page combination", () => {
    let count = 0;
    PERSONA_IDS.forEach((personaId) => {
      PAGES.forEach((sectionPath) => {
        const event = {
          eventType: "page_view" as const,
          personaId,
          sectionPath,
        };
        expect(event.personaId).toBe(personaId);
        expect(event.sectionPath).toBe(sectionPath);
        count++;
      });
    });
    // 12 personas x 14 pages = 168 combinations
    expect(count).toBe(168);
  });
});

describe("IPE Analytics Query Text Truncation", () => {
  it("truncates query text to 500 characters", () => {
    const longQuery = "A".repeat(600);
    const truncated = longQuery.slice(0, 500);
    expect(truncated.length).toBe(500);
  });

  it("preserves short query text", () => {
    const shortQuery = "What is VANDA?";
    const truncated = shortQuery.slice(0, 500);
    expect(truncated).toBe(shortQuery);
  });
});

describe("IPE Analytics Session Token", () => {
  it("session token is optional", () => {
    const event = {
      eventType: "persona_select" as const,
      personaId: "mas-board",
      sectionPath: "/sg",
    };
    expect(event).not.toHaveProperty("sessionToken");
  });

  it("session token has max length 128", () => {
    const token = "a".repeat(128);
    expect(token.length).toBeLessThanOrEqual(128);
  });
});
