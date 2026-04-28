# Sree Ram Technologies — Business Management Portal

## Overview
A complete internal business management web app for an Indian CCTV / biometrics / security systems / RF tower sales & service company. Modules: dashboard, customers, inventory (assets), installations, service tickets, invoicing, employees, and attendance. Brand: electric blue (#1FA9E6). Currency: INR (₹).

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
- `artifacts/srt-portal/src/pages/` — All app pages
- `artifacts/srt-portal/src/components/layout.tsx` — Top-bar shell (brand row + horizontal nav with all modules; flat / no gradients)
- `artifacts/srt-portal/src/components/page-header.tsx`, `kpi-card.tsx`, `data-toolbar.tsx` — Reusable UI primitives (flat solid-tint icon tiles, no gradients)
- `artifacts/srt-portal/vite.config.ts` — Vite dev server proxies `/api` → `http://localhost:3001` so the SPA can call api-server in dev

## Data conventions
- Numeric DB columns are stored as strings in pg-driver and converted to `Number` in serializers
- Date columns expect `YYYY-MM-DD` strings on insert; helpers in `serializers.ts` (`toDateString`, `toDateStringRequired`) convert from Zod-parsed `Date` objects
- Tickets auto-numbered `SRT-YYYY-####`; invoices `INV-YYYY-####`
- Tickets: `resolvedAt` auto-set when status becomes `resolved`/`closed`, cleared when reopened
- Attendance POST upserts on (`employeeId`, `date`)

## Workflows
- `artifacts/api-server: API Server` — Express server
- `artifacts/srt-portal: web` — Vite dev server

## Common tasks
- Regenerate API client / Zod after editing `openapi.yaml`: `pnpm --filter @workspace/api-spec run codegen`
- Push DB schema: `pnpm --filter @workspace/db run push`
- Re-seed DB: `cd artifacts/api-server && node --import tsx/esm src/seed.ts`
