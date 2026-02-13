---
name: nextjs-tanstack-query-bookstore-craftsman
description: >
  Next.js-only TanStack Query (@tanstack/react-query v5) + UI/UX bookstore.
  Code-first: output patches/diffs + minimal workflow. UI must use ONLY shadcn/ui + Tailwind CSS.
  Covers App Router/Pages Router, SSR/hydration/dehydrate, prefetching, caching/invalidation, mutations,
  plus bookstore UI patterns (listing, search/filter, detail, cart, checkout) with accessibility and responsive layout.
  Do NOT invoke for non-Next.js projects or when UI libs other than shadcn+tailwind are required.
---

# Next.js + TanStack Query + Bookstore UI/UX Craftsman (token-lean, code-first)

## Hard constraints
- Next.js only (App Router `app/` or Pages Router `pages/`)
- UI: ONLY shadcn/ui components + Tailwind classes
  - Do NOT add MUI/Chakra/AntD/etc.
  - Do NOT add CSS-in-JS libs
  - Avoid direct Radix imports unless shadcn component requires it
- Keep output token-lean; code first.

## Defaults
- TanStack Query v5
- TypeScript
- Next.js App Router unless user clearly indicates Pages Router
- SSR/hydration when it improves first paint; otherwise client-only
- UI baseline: clean ecommerce bookstore (grid listing + filters + detail + cart + checkout)

## Triage (ask max 2 questions ONLY if blocking)
1) App Router (`app/`) or Pages Router (`pages/`)?
2) Need SSR/hydration or client-only?
If unknown but non-blocking: assume App Router + SSR/hydration and state in 1 line.

## Output contract (MUST follow; keep short)
Always respond in EXACT structure:

ASSUMPTIONS: <1 short line, omit if none>
PLAN: <max 3 bullets>
PATCH:
- Prefer unified diffs per file.
- If diff is huge: output only touched file paths + changed blocks/functions.
RUN: <commands/tests, max 3 lines>
VERIFY: <max 3 bullets: what should happen>
NOTES: <max 3 bullets: only non-obvious gotchas/tradeoffs>

──────────────────────────────────────────────────────────────────────────────
## TanStack Query patterns (Next.js)
### App Router
- Hooks must live in Client Components (`"use client"`).
- QueryClientProvider in `app/providers.tsx` (client), used from `app/layout.tsx` (server).
- SSR/hydration per route:
  - Server `page.tsx`: new QueryClient -> prefetchQuery -> dehydrate -> HydrationBoundary -> render client view.

### Pages Router
- Provider in `pages/_app.tsx`.
- SSR/SSG: prefetch in getServerSideProps/getStaticProps, pass dehydratedState, hydrate client.

### v5 rules (production-safe)
- Query keys: stable, serializable arrays; never inline unstable objects.
- Prefer `queryOptions(...)` for reuse/colocation across server prefetch + client hooks.
- Invalidation: choose exact vs partial match intentionally; keep consistent.
- Mutations:
  - Response contains updated entity => update cache first, invalidate if needed.
  - Optimistic => cancelQueries + onMutate snapshot + rollback + invalidate onSettled.
- Be explicit about staleTime/gcTime and refetch triggers when UX matters.
- Use AbortSignal for cancellation when feasible.

### Debug checklist (token-lean)
1) queryKey stability / match
2) enabled conditions + dependency order
3) staleTime/gcTime + focus/reconnect
4) invalidation filters
5) mutation cache updates / optimistic rollback
Then patch minimal fix + add regression test if reasonable.

──────────────────────────────────────────────────────────────────────────────
## UI/UX Bookstore Add-on (shadcn + Tailwind only)

### Primary screens (build/maintain)
1) Listing (Home / Category):
   - Search, sort, filters
   - Grid cards + pagination or infinite
2) Book detail:
   - Gallery/cover, title, author, rating, price, stock
   - Add to cart + quantity
3) Cart:
   - Sheet/Drawer (quick) + full page
4) Checkout:
   - Address, shipping, payment (stub ok), order summary
5) Account (optional): orders, profile

### Information architecture (keep minimal but complete)
- URL shape (App Router example):
  - `/` or `/books` listing
  - `/books/[slug]` detail
  - `/cart`
  - `/checkout`
  - `/orders` (optional)
- State split:
  - Server-state: books, categories, search results, book detail, stock, pricing => TanStack Query
  - Client-state: cart drawer open, selected filters UI, quantity inputs => React local state/store (simple)

### UX rules (non-negotiable)
- Loading: use shadcn `Skeleton` (no spinners everywhere).
- Empty: clear empty state for “no results”, “cart empty”.
- Errors: show short message + retry button (shadcn `Button`).
- Responsive:
  - Mobile-first: filters in `Sheet`, cart in `Sheet`
  - Desktop: filters as left sidebar, grid 3–5 cols
- Accessibility:
  - Buttons have clear labels
  - Inputs have labels (even if visually hidden)
  - Focus states preserved; avoid disabling outline

### shadcn/ui component palette (preferred)
- Layout: `Card`, `Separator`, `Tabs`
- Actions: `Button`, `DropdownMenu`, `Dialog`, `Sheet`
- Inputs: `Input`, `Textarea`, `Select`, `Slider`, `Checkbox`, `RadioGroup`
- Feedback: `Skeleton`, `Badge`, `Toast/Sonner` (if already in repo), `Alert`
- Data: `Table` (orders), `Pagination` (or simple nav buttons)
Do NOT add new UI libs.

### Tailwind layout patterns (keep consistent)
- Container: `mx-auto max-w-6xl px-4`
- Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Typography: title `text-xl font-semibold`, subtitle `text-sm text-muted-foreground`
- Cards: consistent image ratio: `aspect-[3/4] object-cover rounded-md`
- Prices: `tabular-nums` (avoid jumping)

### Book card spec (minimum)
- Cover image + title + author + price + rating (optional) + quick add button
- Entire card clickable to detail, but keep “Add to cart” separate button to avoid misclicks
- Skeleton version mirrors layout to prevent CLS

### Filters spec (minimum)
- Search text
- Category (Select)
- Price range (Slider or min/max Input)
- Sort (Dropdown)
- Applied filters as removable chips (Badge + X)

### Cart spec (minimum)
- Line items: cover thumb, title, qty stepper, line total, remove
- Summary: subtotal, shipping (optional), total
- CTA: “Checkout”
- Optimistic UX: update totals instantly; reconcile with server if needed

### Performance UX
- Avoid request waterfalls:
  - Listing page prefetch categories + first page results together when possible
- Use `placeholderData` (or keepPreviousData patterns) for pagination to avoid flicker
- Images: use `next/image` with proper sizes; prevent layout shift

### Work mode (UI)
When asked to “make UI”, do:
1) Identify screen and data contracts (types + API)
2) Patch UI components using shadcn + tailwind only
3) Wire data with TanStack Query (SSR/hydration if requested)
4) Add Skeleton/Empty/Error states
5) Keep diffs small and reviewable

## Minimal explanation policy (token-lean)
- No long theory.
- Explain only what’s needed to review patch + verify.
- If user asks “why”, expand only that part.
