# VANDA — Project TODO

## Content Refresh (9-item backlog)
- [x] Token Programs Deep Dive (Item B — 7 dead links fixed)
- [x] P-Tokets Deep Dive (Item A — composable portfolio tokens)
- [x] UNITS Protocol Refresh (Item C — removed EU 8-CSD framing, Singapore-first)
- [x] Cross-Ledger Connectivity Deep Dive (Item D — 5 dead links fixed)
- [x] Unsponsored Tokets Deep Dive (Item E — global access thesis)
- [x] Tokenisation Refresh (Item F — added P-Toket refs, updated KB links)
- [x] Cross-Border Settlement Refresh (Item G — added US, APAC corridors)
- [x] Structured Notes Deep Dive (Item H — 5 note types, Marketnode)
- [x] Corporate Actions subsection (Item I — folded into Token Programs KB)

## Original Tier 1 Pages
- [x] Precious Metals Deep Dive (SG-contextualised with SBMA + LBMA)
- [x] Gold Tokenisation Workflow (SG participants, SBMA vault standards)
- [x] Commodities Collateral Workflow (SG cross-asset, gold/silver gram-tokets)
- [x] Cross-Border Settlement Workflow (DBS Private Banking, XSGD, Belgian bond)

## New Deep Dives
- [x] Equities Settlement Deep Dive (CDP proxy tokets, STI, dividends)
- [x] Wallets vs Registers Deep Dive (UNITS|SG supports both models)

## Infrastructure
- [x] React.lazy + Suspense for all deep-dive and workflow pages
- [x] PIN Gate authentication (email + dynamic PIN via Resend + static PIN)
- [x] Full-stack upgrade (tRPC + database + user management)
- [x] Resend API key configured and validated
- [x] Allowed emails seeded (rajeev.tummala@finternetlab.io, rajeev@neurail.io, demo@units.sg)
- [x] motionsites-design skill created

## Enhancements — Future
- [x] Favicon + Open Graph meta tags
- [x] Interactive Architecture Diagram (SVG clickable layers)
- [ ] PDF Export button
- [ ] Walkthrough video script
- [ ] Companion executive slide deck (15-20 slides) for NUS/IPF board presentations
- [x] Nav menu search/filter (29 items across 3 sections, Cmd/Ctrl+K shortcut)

## Landing Page & Admin
- [x] Cinematic VANDA landing page with heavy motionsites.ai motion design
- [x] Admin dashboard for managing stakeholder emails and access logs
- [x] Master PIN (314159) gate for admin panel access
- [x] Back-to-portal navigation from admin page
- [x] Open Graph meta tags and custom favicon
- [x] Interactive Architecture Diagram (SVG clickable layers linking to deep-dives)

## Bug Fixes
- [x] Fix admin panel login not working
- [x] Fix portal PIN gate login not working
- [x] Guided Tour mode for architecture diagram (auto-scroll with narration)
- [x] Remove all em dashes from GuidedTour narration text
- [x] Remove all em dashes from entire portal (deep-dives, workflows, landing, etc.)
- [x] Fix PIN input boxes not rendering (padEnd bug in PinInput component)
- [x] Fix "The string did not match the expected pattern" error when adding a user in admin panel
- [x] Add git commit hash version footprint visible on the portal
- [x] Continue investigating add-email "string did not match expected pattern" error (wrapped in form noValidate, added type=button/submit, autoComplete=off)
- [x] Root cause found: vanda.neurail.io DNS points to Vercel (405 on POST), not Manus deployment; improved error messages for server/network errors

## Dual Deployment (Manus + Vercel)
- [x] Design dual-deployment architecture (Manus tRPC + Vercel serverless)
- [x] Create Vercel serverless API routes under /api directory (auth + admin) - 10 serverless functions
- [x] Create frontend API abstraction layer (switches between tRPC and fetch based on VITE_DEPLOY_TARGET)
- [x] Add vercel.json configuration with rewrites
- [x] Test both deployment paths work (85 tests pass, Manus e2e verified in browser)
- [x] Document the dual-deployment setup in README (comprehensive docs with architecture, content structure, deployment guides)

## Tests (Pre-Refactor Safety Net)
- [x] Write tests for access router (requestPin, verifyPin, checkSession, logout) - 23 tests
- [x] Write tests for admin router (addEmail, listEmails, toggleEmail, deleteEmail, stats) - 23 tests
- [x] Write tests for rate limiter utility - 8 tests
- [x] Write tests for PIN email utility - 12 tests
- [x] Write comprehensive README documenting dual-deployment setup (Manus + Vercel)
- [x] Build sidebar search/filter for 29 navigation entries (real-time filter, Cmd/Ctrl+K, result counter, section preservation)

## Deployment
- [x] Push latest code to GitHub (rt-finternet/vanda, all commits synced)
- [x] Prepare Vercel deployment (Manus as backup) — env vars configured, functions deployed, vanda.neurail.io live
- [x] Add viewer@finternetlab.io with static PIN 150424
- [x] Fix Vercel API routes returning 405 on POST requests (removed invalid runtime, fixed SPA rewrite, added .js extensions)
- [x] Add Amit Shukla (amit.shukla@finternetlab.io) with dynamic PIN (already in DB, no static PIN)
- [x] Ensure viewer@finternetlab.io has static PIN on Vercel app (PIN 150424, verified working)

## GL1 Banks Enhancement
- [x] Add HSBC, J.P. Morgan, MUFG to ecosystem diagram (5-tier layout, 16 nodes, GL1 Global Banks tier)
- [x] Add HSBC, J.P. Morgan, MUFG to participant lists across deep dives (8 files updated)
- [x] Update GL1 references to highlight these banks as founding members (cards with tags, descriptions)
- [x] Update Funding & Participants section with GL1 bank prominence (cross-ledger, workflows, precious metals)

## Stakeholder Feedback (Round 1)
- [x] Fix ecosystem diagram: GL1 banks now use nusOrange (#EF7C00), Anchor banks use finternetCyan (#06B6D4)
- [x] Fix node count: corrected from 17 to 16 (MAS + CDP + MEPS+ + 3 anchor + 4 GL1 + 6 RMOs = 16)
- [x] Fix Token Programs post-hook text: changed to downstream effects wording (notify, audit, distribute, confirm)
- [x] Fix "Repo & Securities Lending" KB links going to 404 (2 files: Collateral Highway, Capabilities)
- [x] Add missing RMOs to Participants page (DDEx, BondBloX, InvestaX added to Market Specialists tier)
- [x] Add SCS glossary box below Token Programs comparison table (SCS = Single-Currency Stablecoin)
- [x] "Ask AI" feature (LLM-powered Q&A about the blueprint) — implemented as AI Guide in IPE

## Stakeholder Feedback (Round 2)
- [x] CDP Bridge: Add price divergence mechanism (AP arbitrage, DMMs, reference pricing, circuit breakers)
- [x] Gold Workflow: Add LBMA price alignment mechanism and two-tier physical redemption model
- [x] Gold Workflow: Add in-kind management fee explanation via Token Program
- [x] Cross-Border: Add German Bund Unsponsored Toket workflow details
- [x] Cross-Border: Add three-layer FX conversion model (stablecoin swap, CLS, bank treasury)
- [x] Cross-Border: Add full institutional FX + foreign securities deep-dive workflow (integrated into existing workflow steps 3 and comparison table)
- [x] XSGD: Add integration section (bridge, native issuance, wholesale CBDC models) — added to Cross-Ledger Stablecoin Adapter
- [x] VCC: Add legend/tooltip distinguishing 5 programs from 3 sub-funds
- [x] VCC: Add timestamps to execution log and system state NAV premium
- [x] Draft stakeholder response email (Gmail-ready HTML, 398 words)

## New Pages (Round 3)
- [x] Build dedicated Institutional FX & Foreign Securities workflow page
- [x] Build FAQ/Technical Appendix page consolidating all stakeholder Q&A
- [x] Register routes and navigation for both new pages
- [x] Draft comprehensive stakeholder email with links to all portal updates (535 words)

## Full Portal Audit (Round 3)
- [x] Audit all pages for consistency (naming, data, participants, terminology)
- [x] Fix: Propine removed from SGFunding.tsx
- [x] Fix: 'Sixteen nodes' to 'Fifteen nodes' in SGDeepDiveUNITS.tsx
- [x] Fix: 'six' to 'five' platforms in SGDeepDiveCrossLedger.tsx
- [x] Fix: '40+' to '30+' institutions in SGDeepDiveParticipants.tsx
- [x] Fix: em-dash in VCC workflow
- [x] Fix: 'Cross-depository' to 'Cross-network' in Regulatory
- [x] Fix: 'token' to 'toket' in PreciousMetals, UNITS, CrossLedger deep-dives
- [x] Fix: self-referencing link in CollateralHighway

## IPE (Intent Protocol Engine) Integration
- [x] Research MAS individuals (Eugene Long, Alan Lim) and bucket all stakeholder archetypes
- [x] Build IPE manifest with 12 personas, 5 narrative arcs, 60 cross-persona suggestions, 61 next-section recommendations (1,300+ lines)
- [x] Build IPE context engine (IPEContext + IPEProvider + useIPE hook + IPEPageTracker) and zone rendering framework (CrossPersonaCallout, NextSectionBar, IPEFloatingBar, PersonaContextBanner, KeywordHighlight)
- [x] Build AI Guide component with LLM integration (tRPC aiGuide router + AIGuidePanel with persona-aware system prompt, 36 suggested questions)
- [x] Apply IPE zones to 6 anchor pages (Executive Summary, Problem, Architecture, Capabilities, Assets, Funding) with CrossPersonaCallout integration
- [x] Test all personas and context switching (92 tests pass, visual confirmation of PersonaSelector, CrossPersonaCallout, AIGuidePanel)

## Visual & Readability Audit
- [x] Audit landing page (text sizing, contrast, readability)
- [x] Audit Executive Summary and top-level portal pages
- [x] Audit deep dive pages (12+ pages)
- [x] Audit workflow pages (8 pages)
- [x] Audit IPE overlays (PersonaSelector, AIGuide, CrossPersonaCallout, FloatingBar, ContextBanner)
- [x] Document all findings and fix issues
- [x] Reposition IPE floating controls (persona badge + AI Guide) to left side, vertically centered, auto-collapse on idle, expand on hover

## Comprehensive Persona Testing
- [x] Run all vitest unit tests and fix any failures (197 tests pass, 9 test files)
- [x] Visual test all 12 personas (persona selection, cross-persona callout, next-section bar, AI Guide context)
- [x] Fix all issues found during comprehensive testing (ibf-skills→ibf-workforce, unique persona colors, added 7 missing next-section recs, added cross-persona suggestions for /sg/problem)

## IPE Enhancements (Round 2)
- [x] Extend CrossPersonaCallouts to all 8 workflow pages (CDP Bridge, Atomic DvP, Collateral Mobilisation, VCC Fund Tokenisation, Gold Tokenisation, Commodities Collateral, Cross-Border Settlement, Institutional FX) — 105 total cross-persona suggestions, 44 workflow-specific
- [x] Add cross-persona suggestions to manifest for all workflow page routes — 44 workflow-specific suggestions covering all 8 routes
- [x] Add IPE analytics tracking (persona selections, cross-persona clicks, AI Guide queries) — ipe_analytics DB table, tRPC router, useIPEAnalytics hook, 5 integration points
- [x] Build analytics tRPC router and database table — trackEvent mutation, getSummary/getRecent queries
- [x] Build persona-driven content reordering (zone weight system) — CSS order-based reordering on Executive Summary
- [x] Implement ZoneRenderer component that reorders content sections based on persona weights — animated transitions, reorder indicator banner

## IPE Enhancements (Round 3)
- [x] Requirements & Design doc for ZoneRenderer extension + Progress Tracker (ipe-enhancements-r3-design.md)
- [x] Extend ZoneRenderer to SGProblem page (4 zones: depositories, fragmentation, not-third, comparison)
- [x] Extend ZoneRenderer to SGArchitecture page (5 zones: three-layer, gl1, byow, observer, multi-chain)
- [x] Extend ZoneRenderer to SGCapabilities page (4 zones: settlement, repo, unsponsored, comparison)
- [x] Extend ZoneRenderer to SGAssets page (10 zones: equities, govt-securities, gold, stablecoins, structured, private-credit, vcc, p-tokets, unsponsored, composability)
- [x] Extend ZoneRenderer to SGFunding page (4 zones: funding-pathways, participants, rollout, revenue)
- [x] Build persona-specific reading progress tracker component (ReadingProgressTracker.tsx)
- [x] Integrate progress tracker into IPEContext (useReadingProgress hook, auto-marks current page)
- [x] Persist progress state to localStorage (vanda_ipe_reading_progress key, resets on persona change)
- [x] Add progress tracker to the IPE floating rail (between persona button and AI Guide button)
- [x] Write vitest tests for ZoneRenderer deep dive integration (25 tests in ipe-r3.test.ts)
- [x] Write vitest tests for progress tracker logic (data model + percentage + reset tests)
- [ ] Visual test ZoneRenderer reordering on all 5 deep dive pages (pending browser test)
- [ ] Visual test progress tracker across persona switches (pending browser test)
- [x] Full audit and checkpoint (01ac010d, 247 tests passing)
- [x] Push to GitHub (01ac010 pushed to rt-finternet/vanda)

## Bug Fix
- [x] Fix crash on /sg route (reported on vanda.neurail.io/sg)

## Vercel Crash Fix
- [x] Fix tRPC crash: IPEContext.tsx calls trpc.ipeAnalytics.trackEvent.useMutation() outside tRPC Provider in Vercel mode
- [x] Fix tRPC crash: useIPEAnalytics.ts calls trpc.ipeAnalytics.trackEvent.useMutation() outside tRPC Provider in Vercel mode
- [x] Fix tRPC crash: AIGuidePanel.tsx calls trpc.aiGuide.ask.useMutation() outside tRPC Provider in Vercel mode
- [x] Test Vercel deployment after fix (vanda.neurail.io/sg loads PIN gate correctly)
- [x] Verify Manus deployment still works after fix (222 tests pass, HMR confirmed)

## Domain Configuration
- [ ] Point vanda.neurail.io to Manus deployment (unitssg-k7gf8xok.manus.space)
- [ ] Add custom domain in Manus Settings > Domains
- [ ] Update DNS CNAME record at neurail.io registrar
- [ ] Verify domain is working
