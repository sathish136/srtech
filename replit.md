# Sree Ram Technologies — Business Management Portal

## Overview
Two surfaces in one artifact (`srt-portal`):
1. **Public marketing website** at `/` — hero, services, products, about, contact pages. Inspired by liveu.lk style. Uses `MarketingLayout`. Includes "Open Web App" CTAs that link to `/portal`.
2. **Internal ERP / business management portal** at `/portal` (was `/`) — dashboard, customers, inventory (assets), installations, service tickets, invoicing, employees, attendance, leads/CRM. Uses `Layout`.

Indian CCTV / biometrics / security systems / RF tower sales & service company. Brand: electric blue (#1FA9E6). Currency: INR (₹).

## Stack
- **Monorepo:** pnpm workspace
- **Frontend:** React + Vite + TypeScript + wouter + TanStack Query + shadcn/ui + recharts (artifact `srt-portal`, served at `/`)
- **Backend:** Express 5 + Drizzle ORM + Zod validation (artifact `api-server`, served at `/api`)
- **DB:** PostgreSQL (Replit-provisioned via `DATABASE_URL`)
- **API contract:** OpenAPI 3 (`lib/api-spec/openapi.yaml`) → Orval codegen for TanStack Query hooks (`@workspace/api-client-react`) and Zod schemas (`@workspace/api-zod`)

## Key files
- `lib/api-spec/openapi.yaml` — single source of truth for API contract
- `lib/db/src/schema/` — Drizzle table definitions
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/lib/serializers.ts` — DB row → API response normalizers (numeric→Number, Date→ISO/YYYY-MM-DD)
- `artifacts/api-server/src/seed.ts` — Sample data seeder
- `artifacts/srt-portal/src/pages/` — All app pages, including marketing pages (`marketing-home.tsx`, `marketing-about.tsx`, `marketing-services.tsx`, `marketing-products.tsx`, `marketing-contact.tsx`)
- `artifacts/srt-portal/src/components/layout.tsx` — Internal portal shell (top-bar brand row + horizontal nav). All nav items prefixed with `/portal/...`. Nav items: Dashboard, Leads/CRM, Customers, Installations, Tickets, Inventory, Invoices, Employees, Attendance.
- `artifacts/srt-portal/src/components/marketing-layout.tsx` — Public website shell, styled after liveu.lk. Top utility bar uses solid primary blue with greeting + email + phone + Tirupur address. Header uses the actual `public/logo.png` (camera-and-arrow mark) at h-14 next to the wordmark. Active nav indicator uses orange accent. CTA button is flat orange (`bg-orange-500`). Footer in dark slate. **No gradients anywhere on the marketing site** — all surfaces are flat solid colors (primary blue / orange-500 / slate).
- `artifacts/srt-portal/public/images/` — Stock photos used by the marketing site (hero-camera, control-room, biometric, fire-alarm, rf-tower, engineer, office, industrial). All `.jpg`, referenced as `${BASE_URL}images/<name>.jpg`. The home hero shows a product collage: dotted orbit rings + center logo + 4 floating photos.
- Brand color palette: primary = blue from logo (hsl 220 95% 38%); accent = `orange-500` (used for CTAs, the italic tagline, and active-nav underline). All addresses on the marketing site point to **Tirupur, Tamil Nadu 641601** (Avinashi Road).
- `artifacts/srt-portal/src/components/page-header.tsx`, `kpi-card.tsx`, `data-toolbar.tsx` — Reusable UI primitives (flat solid-tint icon tiles, no gradients)
- `artifacts/srt-portal/src/components/followups-timeline.tsx` — Reusable activity timeline + add-follow-up form (used by ticket-detail and lead-detail). Uses TanStack Query directly via `lib/api.ts`.
- `artifacts/srt-portal/src/lib/api.ts` — Lightweight inline fetch client for endpoints not in the OpenAPI/codegen pipeline (currently leads + followups).
- `artifacts/srt-portal/vite.config.ts` — Vite dev server proxies `/api` → `http://localhost:3001` so the SPA can call api-server in dev

## Data conventions
- Numeric DB columns are stored as strings in pg-driver and converted to `Number` in serializers
- Date columns expect `YYYY-MM-DD` strings on insert; helpers in `serializers.ts` (`toDateString`, `toDateStringRequired`) convert from Zod-parsed `Date` objects
- Tickets auto-numbered `SRT-YYYY-####`; invoices `INV-YYYY-####`; leads `LEAD-YYYY-####`
- Tickets: `resolvedAt` auto-set when status becomes `resolved`/`closed`, cleared when reopened
- Attendance POST upserts on (`employeeId`, `date`)
- Followups are polymorphic: `entityType` is `"ticket"` or `"lead"`, `entityId` is the FK id. Used for the activity timeline on both tickets and leads.
- Leads + Followups endpoints (`/leads`, `/leads/summary`, `/followups`) are NOT in the OpenAPI spec / codegen — they're hand-written Express routes consumed directly by `artifacts/srt-portal/src/lib/api.ts` and TanStack Query.

## Workflows
- `artifacts/api-server: API Server` — Express server
- `artifacts/srt-portal: web` — Vite dev server

## Common tasks
- Regenerate API client / Zod after editing `openapi.yaml`: `pnpm --filter @workspace/api-spec run codegen`
- Push DB schema: `pnpm --filter @workspace/db run push`
- Re-seed DB: `cd artifacts/api-server && node --import tsx/esm src/seed.ts`
