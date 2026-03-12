# DB AGENTS

## Scope

- `packages/db` owns the database client, schema, and repositories.
- This package is the only place that should talk directly to Drizzle.

## Structure

- Keep schema definitions in `src/schema`.
- Keep DB client setup in `src/client.ts`.
- Add repositories in `src/repositories/<feature>.ts`.
- Re-export stable repository APIs through `src/repositories/index.ts` and `src/index.ts` when needed.

## Best Practices

- Keep repositories focused on persistence concerns only.
- Return plain data needed by services; avoid leaking transport-specific shapes.
- Prefer small feature repositories over large generic query files.
- Keep naming aligned with feature modules that consume the repository.

## Guardrails

- Do not move business rules into repositories unless they are strictly query-related.
- Do not import from `packages/api`, `apps/server`, or `apps/web`.
- Avoid circular exports; use `src/client.ts` for the DB instance inside repositories.
