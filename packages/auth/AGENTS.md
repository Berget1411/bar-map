# Auth AGENTS

## Scope

- `packages/auth` owns Better Auth configuration and auth-related integrations.
- Keep it focused on auth setup, provider wiring, and auth plugins.

## Structure

- Keep the main auth configuration in `src/index.ts`.
- Put provider or billing helpers in `src/lib/*`.
- Keep exports minimal and intentional.

## Best Practices

- Reuse shared env values from `@open-learn/env`.
- Reuse DB/auth schema from `@open-learn/db` instead of redefining auth tables.
- Keep auth setup declarative; extract helper clients when config starts growing.
- Keep package code framework-agnostic enough to be mounted by `apps/server`.

## Guardrails

- Do not add route handlers or Hono-specific code here.
- Do not move general business logic into auth config.
- Keep secrets and provider credentials in env, never inline in code.
