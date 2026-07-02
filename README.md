# Velora — Bookstore Frontend

A modern, full-featured e-commerce storefront and admin dashboard for an online bookstore, built with Next.js 16 App Router, React 19, and TypeScript.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Radix UI, shadcn/ui, Framer Motion |
| Styling | Tailwind CSS v4 |
| State Management | Zustand v5, TanStack Query v5 |
| Forms & Validation | React Hook Form, Zod v4 |
| Internationalization | next-intl v4 (EN / VI) |
| Authentication | NextAuth v4, Auth.js |
| HTTP Client | Axios |
| Tables | TanStack Table v8 |
| Charts | Recharts |
| Maps | MapLibre GL |
| CI / CD | GitHub Actions → Vercel |

---

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

---

## Getting Started

### 1. Clone & install

```bash
git clone <repo-url>
cd book-store-fe
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root:

```env
# Backend API
BACKEND_API_URL=http://localhost:8000
NEXT_PUBLIC_BASE_API=http://localhost:8000

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Debug (optional)
NEXTAUTH_DEBUG=false
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/           # Login, register pages
│   │   ├── (main)/           # Public storefront (home, books, cart, orders…)
│   │   └── (private)/
│   │       ├── checkout/     # Checkout & payment flow
│   │       └── (manage)/
│   │           └── dashboard/ # Admin dashboard
│   └── api/                  # Next.js API route handlers (proxy layer)
│
├── components/               # Shared UI primitives (Button, Modal, Input…)
├── features/                 # Domain modules (auth, catalog, orders, cart…)
│   ├── admin/
│   ├── auth/
│   ├── cart/
│   ├── catalog/
│   ├── orders/
│   ├── modal/
│   └── ...
├── hooks/                    # Generic custom hooks
├── services/                 # API service layer
├── types/                    # Global TypeScript types & response DTOs
├── validation/               # Zod schemas
├── lib/                      # Utilities (fetchHandler, responseHandler…)
├── config/                   # App-wide configuration
└── constants/                # Enums, static values

messages/
├── en.json                   # English translations
└── vi.json                   # Vietnamese translations
```

---

## Architecture

### Routing

The application uses **Next.js App Router** with locale-based routing via `next-intl`. Route groups keep concerns separated:

- `(auth)` — unauthenticated pages
- `(main)` — public storefront pages
- `(private)` — requires session; split into `checkout` and `(manage)/dashboard`

### Feature Modules

Each feature under `src/features/<domain>/` is self-contained and typically includes:

```
features/orders/
├── hooks/       # TanStack Query hooks (useQueryOrder, useMutateOrder…)
├── store/       # Zustand slice
├── components/  # Domain-specific components
└── index.ts     # Public barrel export
```

### Data Fetching

- **Server state** — TanStack Query v5 (`useQuery`, `useMutation`, `useInfiniteQuery`)
- **Client state** — Zustand v5 stores (cart, order, modal, session…)
- **API proxy** — `src/app/api/**` handlers forward requests to the NestJS backend, keeping secrets server-side

### Internationalization

Full i18n support for **English** and **Vietnamese** via `next-intl`. Translation keys live in `messages/`. All user-facing strings use `useTranslations()`.

---

## Admin Dashboard

### Entry points

| Purpose | Path |
|---|---|
| Dashboard root | `src/app/[locale]/(private)/(manage)/dashboard/` |
| Sidebar config | `src/features/admin/` |

### Adding a new dashboard page

1. Create the page: `src/app/[locale]/(private)/(manage)/dashboard/<module>/page.tsx`
2. Create a client component: `_components/<Module>DashboardClient/index.tsx`
3. Add a sidebar entry in the admin sidebar data file
4. Add translation keys to `messages/en.json` and `messages/vi.json`

---

## Code Quality

| Tool | Purpose |
|---|---|
| ESLint | Linting (runs on staged files via `lint-staged`) |
| Prettier | Code formatting |
| Husky | Git hooks (pre-commit lint check) |
| Commitlint | Enforce Conventional Commits |
| TypeScript | Strict type checking |

---

## License

Private — all rights reserved.
