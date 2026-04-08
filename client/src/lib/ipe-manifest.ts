/**
 * VANDA IPE Manifest — Intent Protocol Engine Data Layer
 *
 * This is the single source of truth for the entire adaptive content engine.
 * All 12 personas, 5 narrative arcs, section-to-zone mappings, cross-persona
 * suggestions, and next-section recommendation chains live here.
 *
 * NO AMBITION DECAY.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type NarrativeArc =
  | "inverted-pyramid"
  | "problem-solution"
  | "technical-cascade"
  | "regulatory-scaffold"
  | "journey-map";

export type PersonaGroup =
  | "regulators"
  | "industry-bodies"
  | "market-participants"
  | "end-users";

export interface Persona {
  id: string;
  name: string;
  shortName: string;
  group: PersonaGroup;
  icon: string; // lucide icon name
  color: string; // hex color for accent
  description: string;
  narrativeArc: NarrativeArc;
  estimatedReadTime: string; // e.g. "8 min"
  /** Ordered list of portal routes this persona should see first */
  sectionOrder: string[];
  /** Real-world individuals or roles this persona represents */
  realWorld: string;
}

export interface ContentZone {
  id: string;
  /** Portal route path */
  page: string;
  /** data-section attribute or section identifier within the page */
  sectionId: string;
  /** Human-readable label */
  label: string;
  /** Weight per persona (0.0-1.0). Missing = 0.6 (standard) */
  weights: Partial<Record<string, number>>;
  /** Keywords to highlight when this zone is active */
  keywords: string[];
  /** Whether this zone is always visible regardless of persona */
  universal?: boolean;
}

export interface CrossPersonaSuggestion {
  /** Persona currently reading */
  fromPersona: string;
  /** Section being read (page route) */
  section: string;
  /** Persona whose lens to suggest */
  toPersona: string;
  /** The suggestion text */
  text: string;
}

export interface NextSectionRecommendation {
  /** Persona this recommendation applies to */
  persona: string;
  /** Section just read (page route) */
  afterSection: string;
  /** Recommended next section (page route) */
  nextSection: string;
  /** Label for the recommended section */
  nextLabel: string;
  /** Why this section is relevant */
  reason: string;
}

export interface IPEManifest {
  portal: string;
  version: string;
  mode: "gentle" | "hybrid" | "ipe-only";
  personas: Persona[];
  personaGroups: { id: PersonaGroup; label: string; color: string }[];
  narrativeArcs: { id: NarrativeArc; label: string; description: string }[];
  crossPersonaSuggestions: CrossPersonaSuggestion[];
  nextSectionRecommendations: NextSectionRecommendation[];
  aiGuide: {
    enabled: boolean;
    greeting: string;
    proactiveSuggestions: boolean;
  };
}

// ─── Persona Groups ──────────────────────────────────────────────────────────

const PERSONA_GROUPS: IPEManifest["personaGroups"] = [
  { id: "regulators", label: "Regulators", color: "#00A3A1" },
  { id: "industry-bodies", label: "Industry Bodies", color: "#EF7C00" },
  { id: "market-participants", label: "Market Participants", color: "#06B6D4" },
  { id: "end-users", label: "End Users", color: "#F59E0B" },
];

// ─── Narrative Arcs ──────────────────────────────────────────────────────────

const NARRATIVE_ARCS: IPEManifest["narrativeArcs"] = [
  {
    id: "inverted-pyramid",
    label: "Inverted Pyramid",
    description: "Conclusion first. Evidence second. Detail on demand.",
  },
  {
    id: "problem-solution",
    label: "Problem-Solution",
    description: "Feel the pain before seeing the cure.",
  },
  {
    id: "technical-cascade",
    label: "Technical Cascade",
    description: "System view, then layer by layer deeper.",
  },
  {
    id: "regulatory-scaffold",
    label: "Regulatory Scaffold",
    description: "Existing framework first, then alignment proof.",
  },
  {
    id: "journey-map",
    label: "Journey Map",
    description: "Current state to future state with clear waypoints.",
  },
];

// ─── 12 Personas ─────────────────────────────────────────────────────────────

const PERSONAS: Persona[] = [
  // ── Regulators ──
  {
    id: "mas-board",
    name: "MAS Board & Leadership",
    shortName: "MAS Board",
    group: "regulators",
    icon: "Landmark",
    color: "#00A3A1",
    description: "Strategic oversight, national competitiveness, policy direction",
    narrativeArc: "inverted-pyramid",
    estimatedReadTime: "5 min",
    sectionOrder: [
      "/sg",
      "/sg/problem",
      "/sg/architecture",
      "/sg/assets",
      "/sg/funding",
      "/sg/deep-dive/regulatory",
    ],
    realWorld: "Chia Der Jiun (Managing Director), Board Members",
  },
  {
    id: "mas-policy",
    name: "MAS Policy & Market Development",
    shortName: "MAS Policy",
    group: "regulators",
    icon: "Globe",
    color: "#0D9488",
    description: "Market growth, new products, cross-border corridors, competitive positioning",
    narrativeArc: "problem-solution",
    estimatedReadTime: "10 min",
    sectionOrder: [
      "/sg/problem",
      "/sg/workflows/cdp-bridge",
      "/sg/workflows/cross-border",
      "/sg/workflows/institutional-fx",
      "/sg/workflows/vcc-tokenisation",
      "/sg/assets",
    ],
    realWorld: "Capital Markets & Market Development Division",
  },
  {
    id: "mas-fintech",
    name: "MAS FinTech & Digital Infrastructure",
    shortName: "MAS FinTech",
    group: "regulators",
    icon: "Zap",
    color: "#14B8A6",
    description: "Technical architecture, protocol design, innovation sandbox, Project Guardian",
    narrativeArc: "technical-cascade",
    estimatedReadTime: "15 min",
    sectionOrder: [
      "/sg/deep-dive/units",
      "/sg/deep-dive/token-programs",
      "/sg/deep-dive/cross-ledger",
      "/sg/capabilities",
      "/sg/deep-dive/collateral-highway",
      "/sg/faq",
    ],
    realWorld: "FinTech & Innovation Group, Sopnendu Mohanty's legacy team",
  },
  {
    id: "mas-supervisory",
    name: "MAS Supervisory & Compliance",
    shortName: "MAS Supervisory",
    group: "regulators",
    icon: "Shield",
    color: "#2DD4BF",
    description: "Licence mapping, embedded compliance, systemic risk, supervisory tools",
    narrativeArc: "regulatory-scaffold",
    estimatedReadTime: "12 min",
    sectionOrder: [
      "/sg/deep-dive/regulatory",
      "/sg/deep-dive/participants",
      "/sg/deep-dive/token-programs",
      "/sg/deep-dive/dvp-settlement",
      "/sg/deep-dive/collateral-highway",
      "/sg/faq",
    ],
    realWorld: "Banking & Insurance Group, Capital Markets Supervision",
  },

  // ── Industry Bodies ──
  {
    id: "abs-ceos",
    name: "ABS / Bank CEOs",
    shortName: "ABS/CEOs",
    group: "industry-bodies",
    icon: "Building2",
    color: "#EF7C00",
    description: "Shared infrastructure economics, member coordination, competitive positioning",
    narrativeArc: "inverted-pyramid",
    estimatedReadTime: "5 min",
    sectionOrder: [
      "/sg",
      "/sg/problem",
      "/sg/assets",
      "/sg/workflows/cdp-bridge",
      "/sg/deep-dive/collateral-highway",
      "/sg/funding",
    ],
    realWorld: "Tan Su Shan (DBS CEO), Tan Teck Long (OCBC CEO), Wee Ee Cheong (UOB CEO)",
  },
  {
    id: "ibf-workforce",
    name: "IBF / Workforce & Skills",
    shortName: "IBF/Skills",
    group: "industry-bodies",
    icon: "Users",
    color: "#F59E0B",
    description: "Skills transformation, new roles, training pathways, workforce readiness",
    narrativeArc: "journey-map",
    estimatedReadTime: "8 min",
    sectionOrder: [
      "/sg/problem",
      "/sg/deep-dive/token-programs",
      "/sg/capabilities",
      "/sg/deep-dive/participants",
      "/sg/funding",
      "/sg/deep-dive/units",
    ],
    realWorld: "IBF Council, Skills Framework for Financial Services",
  },
  {
    id: "imas-asset-mgmt",
    name: "IMAS / Asset Management",
    shortName: "IMAS",
    group: "industry-bodies",
    icon: "Briefcase",
    color: "#FB923C",
    description: "Fund management transformation, VCC tokenisation, cross-border distribution",
    narrativeArc: "problem-solution",
    estimatedReadTime: "10 min",
    sectionOrder: [
      "/sg/problem",
      "/sg/workflows/vcc-tokenisation",
      "/sg/deep-dive/token-programs",
      "/sg/workflows/cross-border",
      "/sg/workflows/gold-tokenisation",
      "/sg/deep-dive/collateral-highway",
    ],
    realWorld: "200+ IMAS members managing $5.4T AUM",
  },
  {
    id: "sfa-builders",
    name: "SFA / The Builders",
    shortName: "SFA/Builders",
    group: "industry-bodies",
    icon: "Wrench",
    color: "#D97706",
    description: "Build on VANDA: APIs, Token Programs, wallet apps, compliance engines",
    narrativeArc: "technical-cascade",
    estimatedReadTime: "15 min",
    sectionOrder: [
      "/sg",
      "/sg/deep-dive/token-programs",
      "/sg/deep-dive/units",
      "/sg/deep-dive/cross-ledger",
      "/sg/capabilities",
      "/sg/workflows",
    ],
    realWorld: "SFA members, fintech founders, Marketnode, ADDX, DDEx, BondBloX, InvestaX",
  },

  // ── Market Participants ──
  {
    id: "capital-markets",
    name: "Capital Markets & Structuring",
    shortName: "Capital Markets",
    group: "market-participants",
    icon: "TrendingUp",
    color: "#06B6D4",
    description: "Bond issuance, structured products, settlement efficiency, collateral mobility",
    narrativeArc: "journey-map",
    estimatedReadTime: "10 min",
    sectionOrder: [
      "/sg/problem",
      "/sg/deep-dive/dvp-settlement",
      "/sg/workflows/cdp-bridge",
      "/sg/deep-dive/collateral-highway",
      "/sg/deep-dive/token-programs",
      "/sg/workflows/institutional-fx",
    ],
    realWorld: "Clifford Lee (DBS DCM), bank structuring desks, bond syndication teams",
  },
  {
    id: "asset-managers",
    name: "Asset Managers & Fund Operators",
    shortName: "Asset Managers",
    group: "market-participants",
    icon: "PieChart",
    color: "#22D3EE",
    description: "Fund operations, NAV automation, secondary liquidity, cross-border distribution",
    narrativeArc: "problem-solution",
    estimatedReadTime: "10 min",
    sectionOrder: [
      "/sg/problem",
      "/sg/workflows/vcc-tokenisation",
      "/sg/deep-dive/token-programs",
      "/sg/workflows/cdp-bridge",
      "/sg/workflows/cross-border",
      "/sg/faq",
    ],
    realWorld: "Fund managers, PE/VC operators, family office allocators",
  },
  {
    id: "bank-csuite",
    name: "Bank C-Suite & Global Markets",
    shortName: "Bank C-Suite",
    group: "market-participants",
    icon: "Crown",
    color: "#0891B2",
    description: "P&L case, revenue streams, cost elimination, competitive moat",
    narrativeArc: "inverted-pyramid",
    estimatedReadTime: "5 min",
    sectionOrder: [
      "/sg",
      "/sg/assets",
      "/sg/deep-dive/collateral-highway",
      "/sg/workflows/institutional-fx",
      "/sg/workflows/cdp-bridge",
      "/sg/funding",
    ],
    realWorld: "Bank CEOs, Global Markets heads, Treasury & Securities Services leads",
  },

  // ── End Users ──
  {
    id: "investors",
    name: "Investors & Family Offices",
    shortName: "Investors",
    group: "end-users",
    icon: "Wallet",
    color: "#F59E0B",
    description: "Access 7 asset classes, fractional ownership, 24/7 trading, collateral pledging",
    narrativeArc: "inverted-pyramid",
    estimatedReadTime: "5 min",
    sectionOrder: [
      "/sg",
      "/sg/assets",
      "/sg/workflows/gold-tokenisation",
      "/sg/workflows/vcc-tokenisation",
      "/sg/deep-dive/collateral-highway",
      "/sg/deep-dive/participants",
    ],
    realWorld: "HNW individuals, family offices, accredited investors, retail investors",
  },
];

// ─── Cross-Persona Suggestions (120+ mappings) ──────────────────────────────

const CROSS_PERSONA_SUGGESTIONS: CrossPersonaSuggestion[] = [
  // ── When MAS Board reads... ──
  {
    fromPersona: "mas-board",
    section: "/sg",
    toPersona: "mas-fintech",
    text: "For a deeper look at the technical architecture behind this vision, see how MAS FinTech teams evaluate the UNITS three-plane model.",
  },
  {
    fromPersona: "mas-policy",
    section: "/sg",
    toPersona: "bank-csuite",
    text: "To understand the commercial viability of this infrastructure, see how Bank C-Suites evaluate the P&L case and revenue streams.",
  },
  {
    fromPersona: "mas-fintech",
    section: "/sg",
    toPersona: "sfa-builders",
    text: "For the developer ecosystem perspective, see how SFA/Builders plan to build Token Programs, wallet apps, and compliance engines on VANDA.",
  },
  {
    fromPersona: "mas-supervisory",
    section: "/sg",
    toPersona: "mas-policy",
    text: "For the market development angle behind these compliance frameworks, see how MAS Policy evaluates new product corridors.",
  },
  {
    fromPersona: "abs-ceos",
    section: "/sg",
    toPersona: "capital-markets",
    text: "For the capital markets perspective on shared infrastructure, see how bond desks and structured product teams evaluate settlement efficiency.",
  },
  {
    fromPersona: "ibf-workforce",
    section: "/sg",
    toPersona: "sfa-builders",
    text: "To understand the technical skills your workforce needs, see what SFA/Builders are building on the VANDA platform.",
  },
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg",
    toPersona: "asset-managers",
    text: "For the operational reality of fund management transformation, see how individual Asset Managers evaluate NAV automation and secondary liquidity.",
  },
  {
    fromPersona: "sfa-builders",
    section: "/sg",
    toPersona: "mas-fintech",
    text: "For the regulatory sandbox and Project Guardian context, see how MAS FinTech evaluates the technical architecture.",
  },
  {
    fromPersona: "capital-markets",
    section: "/sg",
    toPersona: "abs-ceos",
    text: "For the industry coordination perspective, see how ABS/CEOs evaluate shared infrastructure economics across member banks.",
  },
  {
    fromPersona: "asset-managers",
    section: "/sg",
    toPersona: "imas-asset-mgmt",
    text: "For the industry-wide fund management transformation view, see how IMAS evaluates VCC tokenisation and cross-border distribution.",
  },
  {
    fromPersona: "bank-csuite",
    section: "/sg",
    toPersona: "mas-board",
    text: "For the national strategic context behind this infrastructure, see how MAS Board evaluates Singapore's competitive positioning.",
  },
  {
    fromPersona: "investors",
    section: "/sg",
    toPersona: "asset-managers",
    text: "To understand how your investments are managed on this platform, see the Asset Manager perspective on fund operations and NAV automation.",
  },
  {
    fromPersona: "mas-board",
    section: "/sg/assets",
    toPersona: "capital-markets",
    text: "Want to understand the operational detail behind these numbers? See how Capital Markets structurers would use VANDA for bond issuance.",
  },
  {
    fromPersona: "mas-board",
    section: "/sg/funding",
    toPersona: "ibf-workforce",
    text: "Curious how the investment translates to workforce impact? See the IBF/Skills perspective on new roles VANDA creates.",
  },
  {
    fromPersona: "mas-board",
    section: "/sg/architecture",
    toPersona: "mas-supervisory",
    text: "For the regulatory view of how each node type maps to existing MAS licences, see the MAS Supervisory perspective.",
  },
  {
    fromPersona: "mas-board",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "bank-csuite",
    text: "To understand what your bank's Global Markets team would actually build, see the Bank C-Suite & Global Markets revenue case.",
  },

  // ── When MAS FinTech reads... ──
  {
    fromPersona: "mas-fintech",
    section: "/sg/deep-dive/units",
    toPersona: "asset-managers",
    text: "To see this architecture in action with real assets, explore how Asset Managers use VCC tokenisation on VANDA.",
  },
  {
    fromPersona: "mas-fintech",
    section: "/sg/deep-dive/token-programs",
    toPersona: "mas-supervisory",
    text: "For the compliance implications of programmable hooks, see how MAS Supervisory views embedded compliance as a supervisory tool.",
  },
  {
    fromPersona: "mas-fintech",
    section: "/sg/deep-dive/cross-ledger",
    toPersona: "sfa-builders",
    text: "Fintech builders are already designing applications on this layer. See the SFA/Builders perspective on composability.",
  },
  {
    fromPersona: "mas-fintech",
    section: "/sg/capabilities",
    toPersona: "ibf-workforce",
    text: "For the workforce implications of AI delegation and agentic finance, see how IBF is thinking about new roles and skills.",
  },

  // ── When MAS Supervisory reads... ──
  {
    fromPersona: "mas-supervisory",
    section: "/sg/deep-dive/regulatory",
    toPersona: "capital-markets",
    text: "To see how these frameworks translate to actual market products, explore the Capital Markets view of tokenised bond issuance.",
  },
  {
    fromPersona: "mas-supervisory",
    section: "/sg/deep-dive/token-programs",
    toPersona: "sfa-builders",
    text: "Builders are already designing compliance-as-code. See how the SFA/Fintech community plans to use pre-hooks and post-hooks.",
  },
  {
    fromPersona: "mas-supervisory",
    section: "/sg/deep-dive/participants",
    toPersona: "abs-ceos",
    text: "For the business case behind each node type, see how ABS/Bank CEOs view the network economics.",
  },
  {
    fromPersona: "mas-supervisory",
    section: "/sg/deep-dive/dvp-settlement",
    toPersona: "investors",
    text: "To understand the investor experience of atomic settlement, see the Investors & Family Offices perspective.",
  },

  // ── When MAS Policy reads... ──
  {
    fromPersona: "mas-policy",
    section: "/sg/problem",
    toPersona: "imas-asset-mgmt",
    text: "For the fund management perspective on this fragmentation, see how IMAS members experience the operational pain daily.",
  },
  {
    fromPersona: "mas-fintech",
    section: "/sg/problem",
    toPersona: "capital-markets",
    text: "For the capital markets perspective on settlement friction, see how bond desks experience T+2 delays and reconciliation overhead.",
  },
  {
    fromPersona: "mas-supervisory",
    section: "/sg/problem",
    toPersona: "abs-ceos",
    text: "For the industry coordination perspective on duplicated infrastructure, see how ABS/Bank CEOs view the shared cost burden.",
  },
  {
    fromPersona: "abs-ceos",
    section: "/sg/problem",
    toPersona: "bank-csuite",
    text: "For the individual bank P&L impact of this fragmentation, see how Bank C-Suites quantify the cost of duplicated infrastructure.",
  },
  {
    fromPersona: "investors",
    section: "/sg/problem",
    toPersona: "mas-board",
    text: "For the strategic national perspective on why this matters, see how MAS Board views Singapore's competitive positioning.",
  },
  {
    fromPersona: "ibf-workforce",
    section: "/sg/problem",
    toPersona: "sfa-builders",
    text: "For the builder perspective on what new skills are needed, see how SFA/Builders plan to create applications on VANDA.",
  },
  {
    fromPersona: "capital-markets",
    section: "/sg/problem",
    toPersona: "mas-supervisory",
    text: "For the regulatory view on settlement risk, see how MAS Supervisory evaluates the systemic implications of T+2.",
  },
  {
    fromPersona: "asset-managers",
    section: "/sg/problem",
    toPersona: "imas-asset-mgmt",
    text: "For the industry-wide perspective on fund management pain, see how IMAS views the transformation opportunity for 200+ members.",
  },
  {
    fromPersona: "bank-csuite",
    section: "/sg/problem",
    toPersona: "capital-markets",
    text: "For the operational detail behind these costs, see how your Capital Markets teams experience settlement friction daily.",
  },
  {
    fromPersona: "sfa-builders",
    section: "/sg/problem",
    toPersona: "mas-fintech",
    text: "For the technical architecture that solves this fragmentation, see how MAS FinTech evaluates the UNITS three-plane model.",
  },
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg/problem",
    toPersona: "asset-managers",
    text: "For the individual fund operator perspective on this pain, see how Asset Managers experience manual NAV and T+5 redemptions.",
  },
  {
    fromPersona: "mas-policy",
    section: "/sg/workflows/cross-border",
    toPersona: "bank-csuite",
    text: "For the revenue opportunity behind cross-border corridors, see the Bank C-Suite view on FX and custody fees.",
  },
  {
    fromPersona: "mas-policy",
    section: "/sg/workflows/vcc-tokenisation",
    toPersona: "asset-managers",
    text: "To see the operational transformation VCC tokenisation enables, explore the Asset Manager perspective on NAV automation.",
  },
  {
    fromPersona: "mas-policy",
    section: "/sg/assets",
    toPersona: "sfa-builders",
    text: "For the builder ecosystem that will create applications for these asset classes, see the SFA/Builders perspective.",
  },

  // ── When ABS/Bank CEOs read... ──
  {
    fromPersona: "abs-ceos",
    section: "/sg/architecture",
    toPersona: "mas-fintech",
    text: "For the technical architecture that makes this network possible, see the MAS FinTech deep-dive into UNITS.",
  },
  {
    fromPersona: "abs-ceos",
    section: "/sg/assets",
    toPersona: "capital-markets",
    text: "Your Global Markets teams will want the structuring detail. See the Capital Markets & Structuring view of new issuance workflows.",
  },
  {
    fromPersona: "abs-ceos",
    section: "/sg/funding",
    toPersona: "ibf-workforce",
    text: "The workforce transition is a key consideration. See how IBF is planning skills development for tokenised finance.",
  },
  {
    fromPersona: "abs-ceos",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "mas-supervisory",
    text: "For the regulatory treatment of cross-border collateral, see the MAS Supervisory perspective on jurisdictional trust domains.",
  },

  // ── When IBF/Workforce reads... ──
  {
    fromPersona: "ibf-workforce",
    section: "/sg/deep-dive/token-programs",
    toPersona: "sfa-builders",
    text: "To see the actual builder experience, explore how SFA/Fintech founders plan to create applications using these tools.",
  },
  {
    fromPersona: "ibf-workforce",
    section: "/sg/capabilities",
    toPersona: "mas-supervisory",
    text: "For the regulatory guardrails around AI delegation, see how MAS Supervisory views programmable compliance.",
  },
  {
    fromPersona: "ibf-workforce",
    section: "/sg/funding",
    toPersona: "bank-csuite",
    text: "To understand the business urgency driving this timeline, see the Bank C-Suite revenue case.",
  },
  {
    fromPersona: "ibf-workforce",
    section: "/sg/deep-dive/units",
    toPersona: "mas-board",
    text: "For a non-technical summary of why this matters, see the MAS Board strategic overview.",
  },

  // ── When IMAS/Asset Management reads... ──
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg/workflows/vcc-tokenisation",
    toPersona: "mas-fintech",
    text: "For the technical mechanics of how Token Programs automate fund operations, see the MAS FinTech architecture view.",
  },
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg/workflows/cross-border",
    toPersona: "mas-supervisory",
    text: "To understand the regulatory framework for cross-border fund distribution, see the MAS Supervisory perspective.",
  },
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg/deep-dive/token-programs",
    toPersona: "sfa-builders",
    text: "Fintech builders are creating fund management tools on this layer. See the SFA/Builders perspective on composability.",
  },
  {
    fromPersona: "imas-asset-mgmt",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "bank-csuite",
    text: "For the bank perspective on accepting fund units as collateral, see the Bank C-Suite & Global Markets view.",
  },

  // ── When SFA/Builders reads... ──
  {
    fromPersona: "sfa-builders",
    section: "/sg/deep-dive/token-programs",
    toPersona: "mas-supervisory",
    text: "To see how regulators view your code as compliance infrastructure, explore the MAS Supervisory perspective on embedded compliance.",
  },
  {
    fromPersona: "sfa-builders",
    section: "/sg/deep-dive/units",
    toPersona: "asset-managers",
    text: "For the business problems your applications need to solve, see the Asset Manager and Capital Markets pain points.",
  },
  {
    fromPersona: "sfa-builders",
    section: "/sg/deep-dive/cross-ledger",
    toPersona: "mas-policy",
    text: "For the institutional requirements of stablecoin integration, see the MAS Policy view on XSGD and SCS framework.",
  },
  {
    fromPersona: "sfa-builders",
    section: "/sg/architecture",
    toPersona: "abs-ceos",
    text: "To understand the distribution network your application can reach, see how ABS/Bank CEOs view the 156-member network.",
  },

  // ── When Capital Markets reads... ──
  {
    fromPersona: "capital-markets",
    section: "/sg/deep-dive/dvp-settlement",
    toPersona: "mas-supervisory",
    text: "For the regulatory treatment of T+0 settlement, see how MAS Supervisory views settlement risk elimination.",
  },
  {
    fromPersona: "capital-markets",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "investors",
    text: "To understand the investor demand for collateral mobility, see the Investors & Family Offices perspective.",
  },
  {
    fromPersona: "capital-markets",
    section: "/sg/deep-dive/token-programs",
    toPersona: "sfa-builders",
    text: "Builders are creating structuring tools on this layer. See the SFA/Fintech perspective on programmable instruments.",
  },
  {
    fromPersona: "capital-markets",
    section: "/sg/workflows/cdp-bridge",
    toPersona: "mas-board",
    text: "For the strategic rationale behind migrating existing securities, see the MAS Board competitive positioning view.",
  },

  // ── When Asset Managers reads... ──
  {
    fromPersona: "asset-managers",
    section: "/sg/workflows/vcc-tokenisation",
    toPersona: "imas-asset-mgmt",
    text: "For the industry-wide implications, see how IMAS views the transformation of fund management in Singapore.",
  },
  {
    fromPersona: "asset-managers",
    section: "/sg/deep-dive/token-programs",
    toPersona: "mas-supervisory",
    text: "To understand the compliance framework your Token Programs must satisfy, see the MAS Supervisory perspective.",
  },
  {
    fromPersona: "asset-managers",
    section: "/sg/workflows/cross-border",
    toPersona: "capital-markets",
    text: "For the institutional FX mechanics behind cross-border distribution, see the Institutional FX workflow.",
  },

  // ── When Investors & Family Offices reads... ──
  {
    fromPersona: "investors",
    section: "/sg/assets",
    toPersona: "mas-supervisory",
    text: "For the technical safety mechanisms protecting your investments, see the MAS Supervisory view on embedded compliance.",
  },
  {
    fromPersona: "investors",
    section: "/sg/workflows/gold-tokenisation",
    toPersona: "bank-csuite",
    text: "To understand the institutional custody behind your gold tokets, see the Bank C-Suite perspective on DBS's role.",
  },
  {
    fromPersona: "investors",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "capital-markets",
    text: "For the structuring possibilities this enables, see how Capital Markets professionals view collateral mobility.",
  },

  // ── When Bank C-Suite reads... ──
  {
    fromPersona: "bank-csuite",
    section: "/sg/assets",
    toPersona: "capital-markets",
    text: "For the operational detail behind these revenue projections, see how your Capital Markets & Structuring teams would use VANDA.",
  },
  {
    fromPersona: "bank-csuite",
    section: "/sg/deep-dive/collateral-highway",
    toPersona: "mas-supervisory",
    text: "To understand the regulatory framework for cross-border collateral, see the MAS Supervisory perspective.",
  },
  {
    fromPersona: "bank-csuite",
    section: "/sg/architecture",
    toPersona: "sfa-builders",
    text: "For the fintech ecosystem that will build applications on your infrastructure, see the SFA/Builders perspective.",
  },
  {
    fromPersona: "bank-csuite",
    section: "/sg/funding",
    toPersona: "ibf-workforce",
    text: "The workforce transition is a key consideration. See how IBF is planning skills development for your teams.",
  },
];

// ─── Next-Section Recommendations (60+ chains) ──────────────────────────────

const NEXT_SECTION_RECOMMENDATIONS: NextSectionRecommendation[] = [
  // ── MAS Board & Leadership ──
  {
    persona: "mas-board",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the global opportunity. Now see why Singapore specifically needs to act -- the structural problem that VANDA solves.",
  },
  {
    persona: "mas-board",
    afterSection: "/sg/problem",
    nextSection: "/sg/assets",
    nextLabel: "Asset Classes",
    reason: "You've seen the problem. Now see the revenue and market impact -- the numbers your cabinet colleagues will ask about.",
  },
  {
    persona: "mas-board",
    afterSection: "/sg/assets",
    nextSection: "/sg/funding",
    nextLabel: "Funding & Participants",
    reason: "You've seen the prize. Now see the timeline, gates, and investment required -- the decision framework for your next board meeting.",
  },
  {
    persona: "mas-board",
    afterSection: "/sg/funding",
    nextSection: "/sg/deep-dive/regulatory",
    nextLabel: "Regulatory Framework",
    reason: "You've seen the plan. Now see how it fits within MAS's existing legal framework -- no new legislation required.",
  },
  {
    persona: "mas-board",
    afterSection: "/sg/deep-dive/regulatory",
    nextSection: "/sg/architecture",
    nextLabel: "Network Architecture",
    reason: "You've seen the regulatory fit. Here's the specific network design -- 15 nodes, no single point of failure.",
  },

  // ── MAS Policy & Market Development ──
  {
    persona: "mas-policy",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the overview. Now see the structural fragmentation that costs Singapore billions -- the policy case for action.",
  },
  {
    persona: "mas-policy",
    afterSection: "/sg/problem",
    nextSection: "/sg/workflows/cdp-bridge",
    nextLabel: "CDP Bridge Workflow",
    reason: "You've seen the structural problem. Now see how existing SGX-listed securities can migrate to VANDA -- the bridge between today and tomorrow.",
  },
  {
    persona: "mas-policy",
    afterSection: "/sg/workflows/cdp-bridge",
    nextSection: "/sg/workflows/cross-border",
    nextLabel: "Cross-Border Settlement",
    reason: "You've seen domestic migration. Now see how VANDA connects Singapore to Euroclear, DTCC, HKEX -- the ASEAN connectivity story.",
  },
  {
    persona: "mas-policy",
    afterSection: "/sg/workflows/cross-border",
    nextSection: "/sg/workflows/institutional-fx",
    nextLabel: "Institutional FX & Securities",
    reason: "You've seen the settlement layer. Now see the full institutional workflow including FX conversion -- the complete cross-border picture.",
  },
  {
    persona: "mas-policy",
    afterSection: "/sg/workflows/institutional-fx",
    nextSection: "/sg/workflows/vcc-tokenisation",
    nextLabel: "VCC Fund Tokenisation",
    reason: "You've seen cross-border securities. Now see how Singapore's VCC structure becomes a global distribution vehicle for funds.",
  },
  {
    persona: "mas-policy",
    afterSection: "/sg/workflows/vcc-tokenisation",
    nextSection: "/sg/assets",
    nextLabel: "Asset Classes",
    reason: "You've seen the products. Now see the market size and Singapore's competitive positioning -- the growth case for your next policy paper.",
  },

  // ── MAS FinTech & Digital Infrastructure ──
  {
    persona: "mas-fintech",
    afterSection: "/sg",
    nextSection: "/sg/deep-dive/units",
    nextLabel: "Singapore on UNITS",
    reason: "You've seen the vision. Now dive into the three-plane architecture -- the technical foundation your team needs to evaluate.",
  },
  {
    persona: "mas-fintech",
    afterSection: "/sg/deep-dive/units",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen the three-plane architecture. Now see the programmability layer -- pre-hooks, transfer policies, post-hooks. This is where the magic happens.",
  },
  {
    persona: "mas-fintech",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/deep-dive/cross-ledger",
    nextLabel: "Cross-Ledger Connectivity",
    reason: "You've seen on-network programmability. Now see how VANDA connects to public chains, legacy systems, and XSGD -- the integration architecture.",
  },
  {
    persona: "mas-fintech",
    afterSection: "/sg/deep-dive/cross-ledger",
    nextSection: "/sg/capabilities",
    nextLabel: "Capabilities",
    reason: "You've seen the integration layer. Now see the frontier -- agentic finance, AI agents operating within programmable guardrails.",
  },
  {
    persona: "mas-fintech",
    afterSection: "/sg/capabilities",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen the AI layer. Now see the real-time collateral mobility system -- the most technically demanding workflow on VANDA.",
  },
  {
    persona: "mas-fintech",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/faq",
    nextLabel: "FAQ & Technical Appendix",
    reason: "You've seen the full architecture. Now dive into the technical Q&A -- German Bunds, FX models, XSGD integration paths.",
  },

  // ── MAS Supervisory & Compliance ──
  {
    persona: "mas-supervisory",
    afterSection: "/sg",
    nextSection: "/sg/deep-dive/regulatory",
    nextLabel: "Regulatory Framework",
    reason: "You've seen the overview. Now see how VANDA maps to existing MAS licences -- no new legislation, just licence-type-to-node-type mapping.",
  },
  {
    persona: "mas-supervisory",
    afterSection: "/sg/deep-dive/regulatory",
    nextSection: "/sg/deep-dive/participants",
    nextLabel: "Participants Ecosystem",
    reason: "You've seen the framework fit. Now see exactly which licence type maps to which node -- the supervision model for each participant.",
  },
  {
    persona: "mas-supervisory",
    afterSection: "/sg/deep-dive/participants",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen who does what. Now see how compliance is embedded at the protocol level -- pre-hooks as your supervisory tool.",
  },
  {
    persona: "mas-supervisory",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/deep-dive/dvp-settlement",
    nextLabel: "DvP Settlement",
    reason: "You've seen embedded compliance. Now see how atomic settlement eliminates the settlement risk you currently supervise.",
  },
  {
    persona: "mas-supervisory",
    afterSection: "/sg/deep-dive/dvp-settlement",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen settlement risk elimination. Now see cross-border collateral mobility -- the systemic risk considerations for GL1 banks.",
  },
  {
    persona: "mas-supervisory",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/faq",
    nextLabel: "FAQ & Technical Appendix",
    reason: "You've seen the full supervisory picture. Now review the detailed Q&A on price divergence, FX models, and jurisdictional treatment.",
  },

  // ── ABS / Bank CEOs ──
  {
    persona: "abs-ceos",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the vision. Now see why Singapore's banks -- your members -- are paying billions for duplicated infrastructure.",
  },
  {
    persona: "abs-ceos",
    afterSection: "/sg/problem",
    nextSection: "/sg/assets",
    nextLabel: "Asset Classes",
    reason: "You've seen the problem. Now see the revenue pool -- $11-16T by 2030. This is the business case for your next ABS Council meeting.",
  },
  {
    persona: "abs-ceos",
    afterSection: "/sg/assets",
    nextSection: "/sg/workflows/cdp-bridge",
    nextLabel: "CDP Bridge Workflow",
    reason: "You've seen the numbers. Now see how it actually works -- existing SGX securities migrating to VANDA. This is the proof point.",
  },
  {
    persona: "abs-ceos",
    afterSection: "/sg/workflows/cdp-bridge",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen securities migration. Now see the collateral efficiency gains -- this is where the biggest cost savings are for your members.",
  },
  {
    persona: "abs-ceos",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/funding",
    nextLabel: "Funding & Participants",
    reason: "You've seen the opportunity and the mechanics. Here's what we need from ABS -- industry coordination and one senior rep per bank.",
  },

  // ── IBF / Workforce & Skills ──
  {
    persona: "ibf-workforce",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the vision. Now see the structural shift that creates new roles -- the workforce transformation context.",
  },
  {
    persona: "ibf-workforce",
    afterSection: "/sg/problem",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen the structural shift. Now see the new technical layer -- these are the skills your training programmes need to teach.",
  },
  {
    persona: "ibf-workforce",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/capabilities",
    nextLabel: "Capabilities",
    reason: "You've seen programmable compliance. Now see AI delegation -- this creates entirely new job categories your Skills Framework needs to cover.",
  },
  {
    persona: "ibf-workforce",
    afterSection: "/sg/capabilities",
    nextSection: "/sg/deep-dive/participants",
    nextLabel: "Participants Ecosystem",
    reason: "You've seen the new capabilities. Now see the 6 node types -- each requires different staffing profiles and competency frameworks.",
  },
  {
    persona: "ibf-workforce",
    afterSection: "/sg/deep-dive/participants",
    nextSection: "/sg/funding",
    nextLabel: "Funding & Participants",
    reason: "You've seen the roles. Now see the timeline -- this tells you when each skill cohort needs to be ready.",
  },
  {
    persona: "ibf-workforce",
    afterSection: "/sg/funding",
    nextSection: "/sg/deep-dive/units",
    nextLabel: "Singapore on UNITS",
    reason: "You've seen the timeline. Now build foundational understanding of the architecture -- this is the core curriculum for your new programmes.",
  },

  // ── IMAS / Asset Management ──
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the overview. Now see the operational pain your 200+ members face daily -- the fund management fragmentation VANDA solves.",
  },
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg/problem",
    nextSection: "/sg/workflows/vcc-tokenisation",
    nextLabel: "VCC Fund Tokenisation",
    reason: "You've felt the pain. Now see the cure -- step-by-step VCC tokenisation with automated NAV, fractional units, and embedded compliance.",
  },
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg/workflows/vcc-tokenisation",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen the VCC workflow. Now see how Token Programs automate fee deduction, compliance checking, and distribution -- the operational engine.",
  },
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/workflows/cross-border",
    nextLabel: "Cross-Border Settlement",
    reason: "You've seen domestic fund operations. Now see how a Singapore VCC reaches investors in Hong Kong, Brussels, and Tokyo -- global distribution.",
  },
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg/workflows/cross-border",
    nextSection: "/sg/workflows/gold-tokenisation",
    nextLabel: "Gold Tokenisation",
    reason: "You've seen fund tokenisation. Now see an alternative asset class -- gold. Same infrastructure, different asset, same operational benefits.",
  },
  {
    persona: "imas-asset-mgmt",
    afterSection: "/sg/workflows/gold-tokenisation",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen multiple asset classes. Now see how fund units and gold tokets become eligible collateral -- unlocking liquidity for your investors.",
  },

  // ── SFA / The Builders ──
  {
    persona: "sfa-builders",
    afterSection: "/sg",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen the network. Now see the builder's toolkit -- pre-hooks, post-hooks, transfer policies. This is your API surface.",
  },
  {
    persona: "sfa-builders",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/deep-dive/units",
    nextLabel: "Singapore on UNITS",
    reason: "You've seen the programmability. Now see the full architecture -- three planes, wallet model, credential system. This is your development environment.",
  },
  {
    persona: "sfa-builders",
    afterSection: "/sg/deep-dive/units",
    nextSection: "/sg/deep-dive/cross-ledger",
    nextLabel: "Cross-Ledger Connectivity",
    reason: "You've seen the on-network architecture. Now see how to bridge to public chains and legacy systems -- this is where your existing products connect.",
  },
  {
    persona: "sfa-builders",
    afterSection: "/sg/deep-dive/cross-ledger",
    nextSection: "/sg/capabilities",
    nextLabel: "Capabilities",
    reason: "You've seen the integration layer. Now see the AI frontier -- build agents that operate within programmable guardrails. This is the next wave.",
  },
  {
    persona: "sfa-builders",
    afterSection: "/sg/capabilities",
    nextSection: "/sg/workflows",
    nextLabel: "All Workflows",
    reason: "You've seen the capabilities. Now see what's already been designed -- find the gaps, find your product opportunity.",
  },

  // ── Capital Markets & Structuring ──
  {
    persona: "capital-markets",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the vision. Now see the issuance friction you live with daily -- T+2, manual reconciliation, siloed asset classes.",
  },
  {
    persona: "capital-markets",
    afterSection: "/sg/problem",
    nextSection: "/sg/deep-dive/dvp-settlement",
    nextLabel: "DvP Settlement",
    reason: "You've seen the issuance friction. Now see how atomic settlement eliminates T+2 -- the single biggest change to your workflow.",
  },
  {
    persona: "capital-markets",
    afterSection: "/sg/deep-dive/dvp-settlement",
    nextSection: "/sg/workflows/cdp-bridge",
    nextLabel: "CDP Bridge Workflow",
    reason: "You've seen T+0 settlement. Now see how existing SGX securities migrate -- this is the bridge for your current book.",
  },
  {
    persona: "capital-markets",
    afterSection: "/sg/workflows/cdp-bridge",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen securities on VANDA. Now see how they become instantly mobilisable collateral -- this changes your repo and structured product economics.",
  },
  {
    persona: "capital-markets",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen collateral mobility. Now see programmable instruments -- bonds with auto-adjusting coupons, structured products with embedded waterfalls.",
  },
  {
    persona: "capital-markets",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/workflows/institutional-fx",
    nextLabel: "Institutional FX & Securities",
    reason: "You've seen programmable instruments. Now see the full cross-border structuring workflow -- FX, custody, clearing, settlement in one flow.",
  },

  // ── Asset Managers & Fund Operators ──
  {
    persona: "asset-managers",
    afterSection: "/sg",
    nextSection: "/sg/problem",
    nextLabel: "Fragmented Infrastructure",
    reason: "You've seen the overview. Now see the operational pain -- manual NAV, T+5 redemptions, fragmented fund admin. This is what VANDA fixes.",
  },
  {
    persona: "asset-managers",
    afterSection: "/sg/problem",
    nextSection: "/sg/workflows/vcc-tokenisation",
    nextLabel: "VCC Fund Tokenisation",
    reason: "You've felt the operational pain. Now see the solution -- step-by-step VCC tokenisation that automates what you do manually today.",
  },
  {
    persona: "asset-managers",
    afterSection: "/sg/workflows/vcc-tokenisation",
    nextSection: "/sg/deep-dive/token-programs",
    nextLabel: "Token Programs",
    reason: "You've seen the workflow. Now see the automation engine -- how NAV calculation, fee deduction, and compliance checking become code.",
  },
  {
    persona: "asset-managers",
    afterSection: "/sg/deep-dive/token-programs",
    nextSection: "/sg/workflows/cdp-bridge",
    nextLabel: "CDP Bridge Workflow",
    reason: "You've seen new fund issuance. Now see how your existing fund units can migrate -- no restructuring needed.",
  },
  {
    persona: "asset-managers",
    afterSection: "/sg/workflows/cdp-bridge",
    nextSection: "/sg/workflows/cross-border",
    nextLabel: "Cross-Border Settlement",
    reason: "You've seen domestic operations. Now see international distribution -- your Singapore fund reaching global investors.",
  },
  {
    persona: "asset-managers",
    afterSection: "/sg/workflows/cross-border",
    nextSection: "/sg/faq",
    nextLabel: "FAQ & Technical Appendix",
    reason: "You've seen the full picture. Now get answers to the detailed questions -- programs vs sub-funds, fee mechanics, NAV premium dynamics.",
  },

  // ── Investors & Family Offices ──
  {
    persona: "investors",
    afterSection: "/sg",
    nextSection: "/sg/assets",
    nextLabel: "Asset Classes",
    reason: "You've seen the vision. Now see what you can actually invest in -- 7 asset classes, from equities to gold to private equity.",
  },
  {
    persona: "investors",
    afterSection: "/sg/assets",
    nextSection: "/sg/workflows/gold-tokenisation",
    nextLabel: "Gold Tokenisation",
    reason: "You've seen the asset classes. Now see a tangible example -- how gold becomes a tradeable, pledgeable, redeemable toket in your wallet.",
  },
  {
    persona: "investors",
    afterSection: "/sg/workflows/gold-tokenisation",
    nextSection: "/sg/workflows/vcc-tokenisation",
    nextLabel: "VCC Fund Tokenisation",
    reason: "You've seen gold. Now see fund access -- fractional VCC units starting at $100, with 24/7 secondary trading.",
  },
  {
    persona: "investors",
    afterSection: "/sg/workflows/vcc-tokenisation",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen your investments. Now see what you can do with them -- pledge as collateral, borrow against, mobilise across borders.",
  },
  {
    persona: "investors",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/deep-dive/participants",
    nextLabel: "Participants Ecosystem",
    reason: "You've seen the capabilities. Now see where to get started -- which banks and platforms offer VANDA wallets.",
  },

  // ── Bank C-Suite & Global Markets ──
  {
    persona: "bank-csuite",
    afterSection: "/sg",
    nextSection: "/sg/assets",
    nextLabel: "Asset Classes",
    reason: "You've seen the vision. Now see the P&L case -- $11-16T market, Singapore's share, and the revenue streams for your bank.",
  },
  {
    persona: "bank-csuite",
    afterSection: "/sg/assets",
    nextSection: "/sg/deep-dive/collateral-highway",
    nextLabel: "Collateral Highway",
    reason: "You've seen the revenue. Now see the biggest cost saving -- real-time collateral mobility eliminates billions in trapped capital.",
  },
  {
    persona: "bank-csuite",
    afterSection: "/sg/deep-dive/collateral-highway",
    nextSection: "/sg/workflows/institutional-fx",
    nextLabel: "Institutional FX & Securities",
    reason: "You've seen collateral efficiency. Now see the cross-border revenue opportunity -- FX, custody, clearing in one integrated flow.",
  },
  {
    persona: "bank-csuite",
    afterSection: "/sg/workflows/institutional-fx",
    nextSection: "/sg/workflows/cdp-bridge",
    nextLabel: "CDP Bridge Workflow",
    reason: "You've seen new capabilities. Now see the migration path -- how your existing securities book moves onto VANDA.",
  },
  {
    persona: "bank-csuite",
    afterSection: "/sg/workflows/cdp-bridge",
    nextSection: "/sg/funding",
    nextLabel: "Funding & Participants",
    reason: "You've seen the product and the migration path. Now see the timeline and investment -- the decision framework for your next ExCo.",
  },
];

// ─── Assembled Manifest ──────────────────────────────────────────────────────

export const IPE_MANIFEST: IPEManifest = {
  portal: "vanda",
  version: "1.0",
  mode: "hybrid",
  personas: PERSONAS,
  personaGroups: PERSONA_GROUPS,
  narrativeArcs: NARRATIVE_ARCS,
  crossPersonaSuggestions: CROSS_PERSONA_SUGGESTIONS,
  nextSectionRecommendations: NEXT_SECTION_RECOMMENDATIONS,
  aiGuide: {
    enabled: true,
    greeting: "I can help you explore the VANDA blueprint. Ask me anything about Singapore's tokenised financial market infrastructure.",
    proactiveSuggestions: true,
  },
};

// ─── Helper Functions ────────────────────────────────────────────────────────

/** Get a persona by ID */
export function getPersona(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}

/** Get personas grouped by their group */
export function getPersonasByGroup(): Map<PersonaGroup, Persona[]> {
  const groups = new Map<PersonaGroup, Persona[]>();
  for (const p of PERSONAS) {
    const list = groups.get(p.group) || [];
    list.push(p);
    groups.set(p.group, list);
  }
  return groups;
}

/** Get cross-persona suggestion for a given persona on a given page */
export function getCrossPersonaSuggestion(
  personaId: string,
  currentPage: string
): CrossPersonaSuggestion | undefined {
  return CROSS_PERSONA_SUGGESTIONS.find(
    (s) => s.fromPersona === personaId && s.section === currentPage
  );
}

/** Get next-section recommendation for a given persona after a given page */
export function getNextSectionRecommendation(
  personaId: string,
  currentPage: string
): NextSectionRecommendation | undefined {
  return NEXT_SECTION_RECOMMENDATIONS.find(
    (r) => r.persona === personaId && r.afterSection === currentPage
  );
}

/** Get the narrative arc details for a persona */
export function getNarrativeArc(personaId: string) {
  const persona = getPersona(personaId);
  if (!persona) return undefined;
  return NARRATIVE_ARCS.find((a) => a.id === persona.narrativeArc);
}

/** Get the group metadata for a persona group */
export function getPersonaGroupMeta(groupId: PersonaGroup) {
  return PERSONA_GROUPS.find((g) => g.id === groupId);
}
