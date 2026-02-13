---
name: zustand-feature-craftsman
description: >
  Use this skill when implementing or refactoring Zustand state management in a React/Next.js (TS) codebase
  with feature-based folder architecture. Output must be code-first: patches/diffs plus minimal workflow.
  Focus: store per feature, selectors, rerender minimization, middleware (persist/devtools/subscribeWithSelector),
  and clean exports. Avoid Redux patterns unless user explicitly asks.
---

# Zustand Feature Craftsman (token-lean, code-first)

## Goals

1. Design Zustand state boundaries per feature (avoid one giant store).
2. Enforce a feature-first folder structure with clean public APIs (barrels).
3. Minimize rerenders via selectors + shallow + subscribeWithSelector.
4. Keep changes reviewable (small diffs, predictable file layout).

## Hard constraints

- Zustand only for client state (UI state, cart, filters, auth session tokens if needed).
- Server-state (API data) should be TanStack Query when present; do NOT duplicate server cache in Zustand.
- Next.js note: components using `useStore(...)` must be Client Components. Store modules can be plain TS.

## Triage (ask max 2 questions ONLY if blocking)

1. Next.js App Router or Pages Router? (affects where state is consumed)
2. Persist needed? (cart/auth/theme) If unknown, default: persist cart only.

## Output contract (MUST follow; keep short)

Always respond in EXACT structure:

ASSUMPTIONS: <1 short line, omit if none>
PLAN: <max 3 bullets>
PATCH:

- Prefer unified diffs per file.
- If diff is huge: output only touched file paths + changed blocks/functions.
  RUN: <commands/tests, max 3 lines>
  VERIFY: <max 3 bullets>
  NOTES: <max 3 bullets>

──────────────────────────────────────────────────────────────────────────────

## Folder architecture (feature-first)

Preferred layout (src/):

- src/
  - app/ or pages/ (Next.js routing)
  - features/
    - <feature>/
      - components/ (feature UI)
      - hooks/ (feature hooks)
      - store/ (zustand store for this feature)
        - index.ts
        - store.ts
        - selectors.ts
        - types.ts
      - api/ (optional: thin API wrappers, but data via TanStack Query)
      - utils/
      - index.ts (public exports for the feature)
  - shared/
    - ui/ (shadcn wrappers if any)
    - lib/ (helpers)
    - types/
  - config/ (env/constants)

Rule: A feature exports ONLY from its `features/<feature>/index.ts`.
Other parts of the app import from feature public APIs, not deep paths.

### When to choose store-per-feature vs one root store

Default: store-per-feature.
Choose root store ONLY if:

- multiple features must update atomically in one action, OR
- you need a single persist boundary with shared versioning.

If root store is needed, still keep slices in features:

- src/store/
  - root.ts
  - middleware.ts
- src/features/<feature>/store/slice.ts

──────────────────────────────────────────────────────────────────────────────

## Zustand implementation standards (production-safe)

### Store shape

- Keep state minimal: primitives + IDs + UI flags. Avoid storing derived data; compute in selectors.
- Actions are methods in store; prefer immutable updates (set with partials).
- Types live in `types.ts`.

### Selectors (rerender control)

- Always use selectors in components: `useXStore(s => s.someField)`.
- Use `shallow` when selecting objects/arrays of multiple fields.
- Prefer `subscribeWithSelector` for side effects that should not rerender components.

### Middleware policy (allowed)

- `persist` for cart/theme/auth tokens (only if needed)
- `devtools` in development if requested
- `subscribeWithSelector` for subscriptions
  Do NOT add extra libs unless user requests (immer, zod, etc).

### Next.js policy

- Any component that calls zustand hook MUST be `"use client"`.
- Never call store hooks in Server Components.
- If SSR needs initial client state, pass it down as props to a Client Component then `initialize` store.

──────────────────────────────────────────────────────────────────────────────

## Templates (use when generating patches)

### Feature store module template

- features/<feature>/store/types.ts
  - export type State, Actions, Store = State & Actions
- features/<feature>/store/store.ts
  - export const use<Feature>Store = create<Store>()(middleware(...))
- features/<feature>/store/selectors.ts
  - export const selectX = (s: Store) => ...
- features/<feature>/store/index.ts
  - export \* from "./store"
  - export \* from "./selectors"
  - export \* from "./types"

### Persist template (cart example)

- name: "cart"
- version: 1
- partialize: persist only essential fields
- migrate: handle version bumps when needed

──────────────────────────────────────────────────────────────────────────────

## Debug checklist (token-lean)

1. Unwanted rerenders? -> selectors, shallow, avoid returning new objects
2. Persist bugs? -> partialize, version/migrate, storage key
3. Hydration mismatch? -> don’t read store on server; init in client
4. Cross-feature coupling? -> move shared state to a dedicated shared feature or root store

## Minimal explanation policy

- No long theory.
- Explain only what’s needed to review patch + verify.
- Expand only if user asks “why”.
