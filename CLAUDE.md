# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed the database (via prisma/seed.ts)
npm run db:reset     # Drop and recreate DB + re-seed (destructive)
```

No test suite exists yet. TypeScript checking: `npx tsc --noEmit`.

## Architecture

**Stack**: Next.js 16 App Router + TypeScript strict + Tailwind CSS v4 + shadcn/ui (new-york style) + Prisma v7 + SQLite via `@prisma/adapter-better-sqlite3` + Recharts + Lucide React. Interface is entirely in French.

### Data flow

Pages in `src/app/` are **Server Components** that query Prisma and pass typed props down to Client Components. Mutations go through **Server Actions** colocated in `actions.ts` files next to their page, all calling `revalidatePath()` for ISR invalidation. Pages export `export const dynamic = "force-dynamic"` to prevent caching.

### Prisma v7 specifics

- `new PrismaClient()` without an adapter does **not** work — always use the singleton in `src/lib/db.ts`
- Adapter import: `PrismaBetterSqlite3` (not `PrismaBetterSQLite3`) from `@prisma/adapter-better-sqlite3`
- `DATABASE_URL` is relative to project root: `file:./dev.db`
- Seed script uses `path.resolve(__dirname, "..", "dev.db")` to resolve the DB path

### Key files

| Path | Purpose |
|---|---|
| `src/lib/db.ts` | Prisma singleton with better-sqlite3 adapter |
| `src/lib/utils.ts` | `cn()`, French formatters (`formatEuros`, `formatDate`, `formatMois`, `statutLabel`, `categorieLabel`, `metierLabel`) |
| `src/lib/simulateur.ts` | Standalone financial calculation logic (amortization, ROI, cash flow) |
| `src/types/index.ts` | All domain types: `PaymentStatut`, `ExpenseCategorie`, `CreditInfo`, `SimulateurParams`, `SimulateurResultats`, etc. |
| `src/components/groovy-mascots.tsx` | Custom SVG rubber hose mascots: `MascotSun`, `MascotHouse`, `MascotCoin`, `MascotBank`, `MascotFlower`, `MascotStar` |

### Pages currently implemented

- `/` — Dashboard with KPI cards, revenue/expense bar chart, upcoming deadlines, recent payments, expense donut
- `/credit` — Loan management: edit credit info + annual/monthly installment grid with override support
- `/simulateur` — Financial simulator: sticky hypothesis panel (client state) + multi-chart results
- `/contacts` — Professional contacts CRUD (cards grid with metier icons)

Pages for `/bien`, `/locataire`, `/loyers`, `/quittances`, `/depenses`, `/calendrier`, `/documents` are planned (Phase 2/3) — they render as disabled "Bientôt" items in the sidebar.

### Design system

The app uses a "Groovy 70s moderne" design language. All color tokens are defined as CSS variables in `src/app/globals.css`:

- Sidebar/dark: `#1A3C2A` (forest green)
- Primary action: `#3A8B5C` → CSS var `--primary`
- Accent: `#F5B731` (warm gold) → CSS var `--accent`
- Destructive: `#D4622B` (burnt orange) → CSS var `--destructive`

Custom CSS utilities: `.groovy-stripe` (tricolor gradient bar), `.groovy-hover` (spring lift on cards), `.groovy-label` (uppercase tracking labels). `prefers-reduced-motion` is respected.

Fonts: **Fredoka** (`--font-heading` / `--font-display`) for headings, **Nunito** (`--font-body`) for body text. Use `style={{ fontFamily: "var(--font-display)" }}` on elements that need the display font outside of `h1-h4` tags.

Use `tabular-nums` Tailwind class on all financial figures to prevent layout shift. Use `min-h-dvh` (not `100vh`) for full-height containers.
