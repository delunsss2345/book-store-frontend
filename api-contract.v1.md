# API Contract Export

This project exports FE-oriented API contract JSON from static TypeScript source analysis.

## Generate

```bash
npm run contract:export
```

## Output

- `docs/api-contract.v1.json`

## Contract shape

- `meta`: build metadata (`generatedAt`, `globalPrefix`, route/schema totals, commit hash).
- `stats`: coverage checks and warning totals.
- `routes[]`: per endpoint contract (`method`, `path`, `security`, request, response, notes).
- `schemas{}`: reusable schema registry for DTO/type/inferred payloads.
- `errors{}`: global error envelopes from HTTP and Prisma exception filters.

## Notes

- Prefix resolves from `GLOBAL_PREFIX` env if present, otherwise default from config (`api/v1`).
- Success payloads are wrapped by global `ResponseDto` envelope.
- `bigint` and `Date` are normalized to wire type strings for FE.
