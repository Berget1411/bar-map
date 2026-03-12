# API AGENTS

## Scope

- `packages/api` owns shared API contracts, schemas, procedures, and feature services.
- It should stay framework-light and reusable by both server and web.

## Structure

- Add backend features under `src/modules/<feature>`.
- Use `*.schema.ts` for validation and shared input/output types.
- Use `*.service.ts` for business logic.
- Use `*.trpc.ts` for procedure definitions and router assembly.

## Best Practices

- Keep procedures thin; they should validate input and delegate quickly.
- Keep services focused on domain behavior, not HTTP concerns.
- Reuse `src/trpc/*` primitives instead of redefining app-wide tRPC setup.
- Export public API intentionally from package entrypoints.

## Data Rules

- Do not place repositories in `packages/api`.
- Consume persistence through `@open-learn/db` repositories.
- Do not import app runtime code from `apps/server` or `apps/web`.

## Guardrails

- Preserve existing router shape unless the task explicitly changes API surface.
- Keep shared context types in `src/context`, but keep runtime context creation outside this package.
