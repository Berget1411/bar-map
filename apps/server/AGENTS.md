# Server AGENTS

## Scope

- `apps/server` owns HTTP transport and runtime wiring.
- `packages/api` owns tRPC contracts and feature services.
- `packages/db` owns persistence.

## Structure

- Add REST features under `apps/server/src/modules/<feature>`.
- Use `*.rest.ts` for route registration only.
- Use controllers only for HTTP concerns: params, body, status codes, response shaping.
- Call services for business logic; do not place business rules in Hono handlers.

## Best Practices

- Keep `app.ts` focused on global middleware and mounting.
- Keep auth under `/api/auth/*`.
- Keep the AI REST endpoint working at `POST /ai` unless asked to change it.
- Add cross-cutting transport setup in `auth/`, `rest/`, or `trpc/`, not inside a feature.

## Data Rules

- Do not query Drizzle directly from `apps/server`.
- Do not create repositories in `apps/server` or `packages/api`.
- Add repositories in `packages/db/src/repositories/<feature>.ts`.

## tRPC Rules

- Add schemas and services in `packages/api/src/modules/<feature>`.
- Keep `*.trpc.ts` as procedure definitions only.
- Preserve current router shape unless the task explicitly changes API surface.
