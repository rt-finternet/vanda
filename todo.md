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
- [ ] Companion slide deck (10-15 slides)
- [ ] Nav menu search/filter (13+ deep dives)

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
- [ ] Design dual-deployment architecture (Manus tRPC + Vercel serverless)
- [ ] Create Vercel serverless API routes under /api directory (auth + admin)
- [ ] Create frontend API abstraction layer (switches between tRPC and fetch based on VITE_DEPLOY_TARGET)
- [ ] Add vercel.json configuration with rewrites
- [ ] Test both deployment paths work
- [ ] Document the dual-deployment setup in README

## Tests (Pre-Refactor Safety Net)
- [x] Write tests for access router (requestPin, verifyPin, checkSession, logout) - 23 tests
- [x] Write tests for admin router (addEmail, listEmails, toggleEmail, deleteEmail, stats) - 23 tests
- [x] Write tests for rate limiter utility - 8 tests
- [x] Write tests for PIN email utility - 12 tests
