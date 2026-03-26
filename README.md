# VANDA

**Value And Network Digital Architecture**

A next-generation financial market infrastructure portal that reimagines how value is created, represented, and transferred. Built for Singapore, designed for the world.

## Overview

VANDA is the stakeholder-facing blueprint portal for the **UNITS|SG** initiative. It presents a comprehensive vision for a permissioned network layer that unifies Singapore's two depositories (SGX CDP and MAS MEPS+), enables 24/7 atomic settlement, and brings tokenised securities, gold, stablecoins, and private credit onto a single programmable infrastructure.

The portal includes 6 blueprint pages, 15 deep-dive research pages, 8 interactive workflow visualisations, a cinematic landing page, and an admin dashboard for stakeholder access control. Access is gated via a PIN-based authentication system that supports both dynamic email OTP and static PINs.

The project supports **dual deployment** from a single codebase: it runs on Manus (built-in hosting with tRPC + Express) and on Vercel (serverless functions). The deployment target is selected at build time via the `VITE_DEPLOY_TARGET` environment variable.

## Architecture

The project follows a monorepo structure with a shared React frontend and two backend implementations that share the same API contract.

| Component | Manus (Default) | Vercel |
|-----------|-----------------|--------|
| Frontend | React 19 + Tailwind 4 | Same (identical build) |
| API layer | tRPC 11 + Express 4 | Vercel Serverless Functions |
| Database | TiDB via Drizzle ORM | Any MySQL-compatible via Drizzle ORM |
| Email | Resend API | Resend API |
| Sessions | JWT cookies (HTTP-only) | JWT cookies (HTTP-only) |
| Auth | Email PIN (OTP or static) | Email PIN (OTP or static) |
| Build tool | Vite 7 | Vite 7 |

The frontend uses an abstraction layer (`client/src/lib/api.ts` and `client/src/hooks/useAdminData.ts`) that checks `VITE_DEPLOY_TARGET` at build time. On Manus, it uses tRPC hooks. On Vercel, it uses plain `fetch` calls to the serverless API routes. Vite's dead-code elimination ensures the unused path is tree-shaken from the production bundle, so there is zero runtime overhead from the dual-deployment architecture.

### How the Deployment Switch Works

The constant `IS_VERCEL` is computed once at build time in `client/src/lib/useApi.ts`:

```ts
export const IS_VERCEL = import.meta.env.VITE_DEPLOY_TARGET === "vercel";
```

Every component that touches the backend checks this constant and branches accordingly. On Manus, the app wraps in `trpc.Provider` and `QueryClientProvider` (see `client/src/main.tsx`). On Vercel, those providers are skipped entirely and the app uses the fetch-based API client. The `AccessContext` similarly forks into `ManusAccessProvider` or `VercelAccessProvider` based on the same flag.

The shared API contract in `shared/api.ts` defines TypeScript interfaces for every request and response. Both the tRPC procedures and the Vercel serverless functions implement the same contract, ensuring type safety across deployment targets.

## Content Structure

The portal contains 29 navigable pages organised into three sections, plus the landing page and admin dashboard.

### Singapore Blueprint (6 pages)

These pages present the core thesis: why Singapore needs a unified network, how the UNITS architecture works, what capabilities it enables, which asset classes it supports, and how the initiative can be funded.

| Page | Route | Description |
|------|-------|-------------|
| Executive Summary | `/sg` | 5-minute overview of the entire blueprint |
| Fragmented Infrastructure | `/sg/problem` | The two-depository problem and isolated token platforms |
| Network Architecture | `/sg/architecture` | Three-layer stack, GL1 compliance, interactive diagram |
| Capabilities | `/sg/capabilities` | 24/7 settlement, repo, unsponsored tokets |
| Asset Classes | `/sg/assets` | Nine asset classes on one network |
| Funding and Participants | `/sg/funding` | FSTI 3.0, Institute of Programmable Finance, 40+ participants |

### Deep Dives (15 pages)

Each deep dive provides detailed research on a specific topic, with tables, diagrams, comparison matrices, and knowledge base links.

| Page | Route |
|------|-------|
| Singapore on UNITS | `/sg/deep-dive/units` |
| DvP Settlement | `/sg/deep-dive/dvp-settlement` |
| Tokenisation | `/sg/deep-dive/tokenisation` |
| Regulatory Framework | `/sg/deep-dive/regulatory` |
| Collateral Highway | `/sg/deep-dive/collateral-highway` |
| Participants Ecosystem | `/sg/deep-dive/participants` |
| VCC Fund Tokenisation | `/sg/deep-dive/vcc` |
| Precious Metals | `/sg/deep-dive/precious-metals` |
| Token Programs | `/sg/deep-dive/token-programs` |
| P-Tokets (Portfolios) | `/sg/deep-dive/p-tokets` |
| Cross-Ledger Connectivity | `/sg/deep-dive/cross-ledger` |
| Unsponsored Tokets | `/sg/deep-dive/unsponsored-tokets` |
| Structured Notes | `/sg/deep-dive/structured-notes` |
| Equities Settlement | `/sg/deep-dive/equities` |
| Wallets and Registers | `/sg/deep-dive/wallets-registers` |

### Interactive Workflows (8 pages)

Step-by-step workflow visualisations showing how specific operations work on the UNITS Network.

| Page | Route |
|------|-------|
| Workflows Overview | `/sg/workflows` |
| CDP Bridge | `/sg/workflows/cdp-bridge` |
| Atomic DvP | `/sg/workflows/atomic-dvp` |
| Collateral Mobilisation | `/sg/workflows/collateral-mobilisation` |
| VCC Fund Tokenisation | `/sg/workflows/vcc-tokenisation` |
| Gold Tokenisation | `/sg/workflows/gold-tokenisation` |
| Commodities Collateral | `/sg/workflows/commodities-collateral` |
| Cross-Border Settlement | `/sg/workflows/cross-border` |

### Additional Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing Page | `/` | Cinematic VANDA landing page with motion design |
| Admin Dashboard | `/admin` | Stakeholder email management, access logs, sessions |

## Features

### PIN-Based Access Control

The portal is gated behind a PIN authentication system. Stakeholders must enter their email address, then verify with a 6-digit PIN. The system supports two modes:

**Dynamic PIN (email OTP):** When a stakeholder's email is in the allowed list without a static PIN, the system sends a one-time PIN via Resend email. The PIN is valid for 10 minutes and is bound to a `pinToken` for verification.

**Static PIN (pre-configured):** When a stakeholder's email has a `defaultPin` set in the database, they can use that PIN directly without waiting for an email. This is useful for demo scenarios or stakeholders who prefer a fixed credential.

Sessions are JWT-based, stored in HTTP-only cookies, and tracked in the `access_sessions` table for admin visibility.

### Admin Dashboard

The admin panel (accessible at `/admin` with master PIN `314159`) provides:

- **Stakeholder management:** Add, toggle, and delete allowed emails with optional static PINs
- **Access logs:** Audit trail of all authentication events
- **Active sessions:** View and revoke active sessions
- **Stats overview:** Total emails, active emails, active sessions, total log entries

### Interactive Architecture Diagram

The Network Architecture page includes an animated SVG diagram with 5 layers (Connectivity, Applications, Assets, Protocol, Infrastructure) and 20 clickable nodes that link to the corresponding deep-dive pages. The diagram features animated connection lines, pulsing data flow particles, and a tooltip system.

### Guided Tour

A 6-step auto-scrolling narration mode for the architecture diagram. The tour highlights each layer in sequence, scrolling to the relevant section and providing context. Controls include play, pause, and exit.

### Sidebar Search

The sidebar navigation includes a real-time search filter (also accessible via `Cmd/Ctrl+K`) that filters across all 29 navigation items in three sections. Section headers are preserved during filtering, empty sections are hidden, and a result counter shows the number of matches. The search clears automatically when the sidebar closes.

### Version Footprint

The git commit hash and build timestamp are displayed in the admin dashboard footer, the portal sidebar, and the landing page footer. This is injected at build time via Vite's `define` plugin.

### Performance

All 15 deep-dive pages and 8 workflow pages are loaded via `React.lazy` + `Suspense` to reduce the initial bundle size. Only the 6 blueprint pages are eagerly loaded since they form the primary navigation path.

## Project Structure

```
client/                         React frontend (shared across deployments)
  src/
    components/                 Reusable UI components
      SGPortalNav.tsx           Sidebar navigation with search filter
      PinGate.tsx               PIN authentication gate
      AdminDashboard.tsx        Admin panel
      ArchitectureDiagram.tsx   Interactive SVG architecture diagram
      GuidedTour.tsx            Auto-scrolling narration for diagram
    contexts/
      AccessContext.tsx          Deployment-aware auth context
    hooks/
      useAdminData.ts           Deployment-aware admin data hook
    lib/
      api.ts                    Fetch-based API client (Vercel path)
      trpc.ts                   tRPC client (Manus path)
      useApi.ts                 IS_VERCEL constant
    pages/                      Page components (blueprint, deep-dives, workflows)
server/                         Manus backend (tRPC + Express)
  routers/
    access.ts                   PIN auth procedures
    admin.ts                    Admin CRUD procedures
  db.ts                         Database query helpers
  pinEmail.ts                   PIN email template (HTML)
  rateLimiter.ts                Sliding-window rate limiter
api/                            Vercel serverless functions
  _lib/
    db.ts                       Database connection for Vercel
    helpers.ts                  Response utilities, cookie helpers
  auth/
    request-pin.ts              POST /api/auth/request-pin
    verify-pin.ts               POST /api/auth/verify-pin
    check-session.ts            GET  /api/auth/check-session
    logout.ts                   POST /api/auth/logout
  admin/
    emails.ts                   GET/POST /api/admin/emails
    emails/[id].ts              DELETE   /api/admin/emails/:id
    emails/[id]/toggle.ts       POST     /api/admin/emails/:id/toggle
    logs.ts                     GET      /api/admin/logs
    sessions.ts                 GET      /api/admin/sessions
    sessions/[id].ts            DELETE   /api/admin/sessions/:id
    stats.ts                    GET      /api/admin/stats
shared/                         Shared types and constants
  api.ts                        API contract types (request/response shapes)
  const.ts                      Shared constants
drizzle/                        Database schema and migrations
  schema.ts                     Table definitions (Drizzle ORM)
vercel.json                     Vercel deployment configuration
.env.vercel.example             Required environment variables for Vercel
```

## Deployment

### Option 1: Manus (Default)

The portal is pre-configured for Manus hosting. All environment variables are injected automatically by the platform.

**Steps:**

1. Click **Publish** in the Manus Management UI.
2. Optionally bind a custom domain via Settings > Domains.

**Available scripts:**

```bash
pnpm dev          # Development server (Express + Vite HMR)
pnpm build        # Production build (Vite frontend + esbuild server)
pnpm start        # Production server (Node.js)
pnpm db:push      # Push schema changes to database (generate + migrate)
pnpm test         # Run test suite (85 tests)
pnpm check        # TypeScript type checking
```

**Environment variables (auto-injected by Manus):**

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | TiDB connection string |
| `JWT_SECRET` | Session cookie signing secret |
| `RESEND_API_KEY` | Resend API key for PIN emails |
| `RESEND_FROM_EMAIL` | Sender address for PIN emails |
| `VITE_APP_TITLE` | Application title |
| `VITE_APP_LOGO` | Application logo URL |

### Option 2: Vercel

**Prerequisites:**

- A GitHub repository containing this codebase
- A Vercel account connected to the repository
- A MySQL-compatible database (TiDB, PlanetScale, or similar)
- A Resend account for email delivery

**Step 1: Connect Repository**

Link the GitHub repository to a new Vercel project. Vercel will detect `vercel.json` automatically.

**Step 2: Configure Environment Variables**

Set the following in the Vercel project settings (Settings > Environment Variables). A complete reference is available in `.env.vercel.example`.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DEPLOY_TARGET` | Must be `vercel` | `vercel` |
| `DATABASE_URL` | MySQL connection string with SSL | `mysql://user:pass@host:port/db?ssl=...` |
| `JWT_SECRET` | 64-character hex secret | Generate with `openssl rand -hex 32` |
| `RESEND_API_KEY` | Resend API key | `re_xxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Verified sender email | `access@yourdomain.com` |

**Step 3: Push Schema**

Before the first deployment, push the database schema:

```bash
DATABASE_URL="your-connection-string" pnpm db:push
```

**Step 4: Deploy**

Push to the main branch or trigger a deployment from the Vercel dashboard. Vercel will use:

- **Build command:** `VITE_DEPLOY_TARGET=vercel pnpm run build:vercel`
- **Output directory:** `dist/public`
- **API routes:** All files under `api/` are deployed as serverless functions

**Step 5: Seed Allowed Emails**

Add stakeholder emails to the `allowed_emails` table. You can do this via the admin dashboard (once deployed) or directly via SQL:

```sql
INSERT INTO allowed_emails (email, name, organization, isActive)
VALUES ('stakeholder@example.com', 'Name', 'Organisation', true);
```

### Option 3: Static Export (Read-Only)

For deployment behind a corporate firewall without a backend:

```bash
VITE_DEPLOY_TARGET=vercel pnpm run build:vercel
```

The `dist/public` directory contains a fully static SPA. Serve it with any HTTP server (nginx, Apache, Caddy). The PIN gate and admin panel require the API routes, so this option is suitable only for scenarios where access control is handled externally.

### Custom Domain (DNS Configuration)

If binding a custom domain (e.g., `vanda.neurail.io`):

**For Manus:** Add the domain in Settings > Domains. Manus provides the CNAME target. Update your DNS provider (Cloudflare, Porkbun, etc.) to point the subdomain to the Manus CNAME.

**For Vercel:** Add the domain in the Vercel project settings. Vercel provides the CNAME or A record. Update your DNS accordingly.

> **Important:** If switching between Manus and Vercel, ensure the DNS records point to the correct platform. A domain pointing to Vercel while the backend runs on Manus (or vice versa) will cause API errors (typically HTTP 405 on POST requests).

## Database Schema

The portal uses four tables managed by Drizzle ORM:

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `allowed_emails` | Stakeholder whitelist | `email`, `defaultPin`, `isActive`, `accessCount` |
| `access_sessions` | Active JWT sessions | `email`, `sessionToken`, `expiresAt` |
| `access_log` | Audit trail | `email`, `action`, `ipAddress`, `createdAt` |
| `users` | Manus OAuth users | `openId`, `name`, `role` (Manus deployment only) |

Schema changes follow a migration workflow:

```bash
# Edit drizzle/schema.ts, then:
pnpm db:push    # Generates migration SQL and applies it
```

## Testing

The project includes 85 tests across 7 test files, covering both the Manus tRPC procedures and the Vercel serverless API contract.

```bash
pnpm test                          # Run all tests
pnpm test -- server/access.test    # Access router tests (23)
pnpm test -- server/admin.test     # Admin router tests (23)
pnpm test -- server/rateLimiter    # Rate limiter tests (8)
pnpm test -- server/pinEmail       # PIN email tests (12)
pnpm test -- server/vercel-api     # Vercel API contract tests (16)
pnpm test -- server/resend         # Resend integration tests (2)
pnpm test -- server/auth.logout    # Auth logout tests (1)
```

The test suite uses Vitest with mocked database, email, and JWT dependencies. Tests validate input validation, error handling, rate limiting, session management, and the shared API contract between both deployment targets.

## Key Design Decisions

**Stateless sessions via JWT.** Both deployment paths use JWT tokens stored in HTTP-only cookies. The `access_sessions` table exists for admin visibility (listing and revoking sessions) but is not required for session validation. This makes the Vercel path fully serverless with no session store dependency.

**Build-time deployment switching.** The `VITE_DEPLOY_TARGET` environment variable is resolved at build time by Vite's `define` plugin. The unused code path (tRPC on Vercel, fetch on Manus) is completely eliminated from the production bundle.

**Shared API contract.** The `shared/api.ts` file defines TypeScript interfaces for every request and response. Both backends implement the same contract, ensuring type safety and making it straightforward to add a third deployment target in the future.

**PIN over password.** The portal uses 6-digit PINs instead of passwords because the audience is a curated set of stakeholders, not the general public. This reduces friction while maintaining access control. The admin can set static PINs for demo scenarios or rely on email OTP for production use.

**No third-party auth provider.** The authentication system is self-contained (JWT + Resend email) to avoid dependencies on external identity providers. This keeps the deployment simple and avoids vendor lock-in.

## Development

**Prerequisites:** Node.js 22+, pnpm

```bash
# Install dependencies
pnpm install

# Start development server (Express + Vite HMR)
pnpm dev

# Run tests
pnpm test

# Type check
pnpm check

# Format code
pnpm format
```

The development server runs on port 3000 by default (auto-assigned by the platform in production). Hot module replacement is enabled for the React frontend.

## License

MIT
