---
name: cloudflare-alchemy
description: Deploy Better-T-Stack apps to Cloudflare Workers with Alchemy. Use when enabling `--web-deploy cloudflare` or `--server-deploy cloudflare`, editing `packages/infra/alchemy.run.ts`, configuring Worker bindings or D1 databases, wiring `packages/env/env.d.ts`, setting up multi-stage Cloudflare deployments, or troubleshooting Better-T-Stack apps deployed to Cloudflare with Alchemy.
---

# Cloudflare Alchemy Deployment

Treat `packages/infra/alchemy.run.ts` as the source of truth for infrastructure.

Prefer current docs over memory:

- Use Cloudflare docs for Workers, D1, bindings, compatibility, and runtime behavior.
- Use Alchemy docs for resource APIs, state storage, and deployment workflows.
- Use `references/deploying-with-alchemy.md` for Better-T-Stack-specific conventions.

## Working Pattern

1. Identify the deployment shape first: combined web + server, web-only, or server-only.
2. Inspect root scripts plus `packages/infra/alchemy.run.ts` before changing deployment code.
3. Keep dotenv loading explicit in infra so shared, web, and server env files load in a predictable order.
4. Use `alchemy.env` for public config and `alchemy.secret.env` for secrets; if secrets are involved, verify `ALCHEMY_PASSWORD` is part of the workflow.
5. Preserve type-safe bindings by keeping Worker exports and `packages/env/env.d.ts` aligned.
6. For D1-backed apps, keep `D1Database(...)` and `migrationsDir` pointed at the real migrations directory.
7. Use `app.stage` for stage-specific names, URLs, and resource isolation when multiple environments exist.
8. Before finishing, verify deploy commands, production URLs, CORS, auth cookie settings, and stage-specific env values.

## Framework Mapping

- Next.js -> `Nextjs`
- Nuxt -> `Nuxt`
- SvelteKit -> `SvelteKit`
- TanStack Start -> `TanStackStart`
- React Router -> `ReactRouter`
- TanStack Router -> `Vite`
- SolidJS -> `Vite`

## Key Files

- `packages/infra/alchemy.run.ts` - infra definition and bindings
- `packages/infra/.env` - infra/shared deployment config
- `apps/web/.env` - client deployment values like `VITE_SERVER_URL`
- `apps/server/.env` - server deployment values like `CORS_ORIGIN`
- `packages/env/env.d.ts` - inferred Cloudflare binding types
- `packages/env/src/server.ts` - `cloudflare:workers` env re-export for Workers runtimes
- `packages/auth/src/auth.ts` - cross-subdomain cookie config for Better Auth

## Retrieval Checklist

Fetch fresh docs before giving version-sensitive advice about:

- Cloudflare compatibility flags, limits, or bindings
- Alchemy resource options and state-store setup
- CI/CD guidance and remote state configuration

Use `references/deploying-with-alchemy.md` for the Better-T-Stack playbook and common pitfalls.
