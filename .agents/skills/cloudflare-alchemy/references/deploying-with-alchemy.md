# Deploying to Cloudflare with Alchemy

Use this reference when working on Better-T-Stack projects that deploy to Cloudflare Workers via Alchemy.

## Deployment Shapes

### Combined web + server

Use when both frontend and backend deploy to Cloudflare:

```bash
bunx create-better-t-stack my-app \
  --frontend tanstack-router \
  --backend hono \
  --runtime workers \
  --web-deploy cloudflare \
  --server-deploy cloudflare
```

### Web-only

Use when only the web app deploys to Cloudflare, such as a Convex-backed frontend:

```bash
bunx create-better-t-stack my-app \
  --frontend tanstack-start \
  --backend convex \
  --web-deploy cloudflare
```

### Server-only

Use when there is no frontend app and the backend runs as a Worker:

```bash
bunx create-better-t-stack my-app \
  --frontend none \
  --backend hono \
  --runtime workers \
  --server-deploy cloudflare
```

## Core Infra Pattern

Better-T-Stack generates `packages/infra/alchemy.run.ts` as the infra entrypoint.

Typical responsibilities:

- load `.env` files with `dotenv`
- initialize the Alchemy app with `await alchemy("my-app")`
- create optional resources like `D1Database`
- deploy the frontend with the framework-specific Alchemy resource
- deploy the backend with `Worker`
- log deployed URLs
- call `await app.finalize()`

Keep env file loading explicit and ordered. Later `config()` calls override earlier ones.

Recommended pattern:

```ts
config({ path: "./.env" });
config({ path: "../../apps/web/.env" });
config({ path: "../../apps/server/.env" });
```

## Framework-Specific Resources

Pick the frontend resource that matches the app:

- `Nextjs` for Next.js
- `Nuxt` for Nuxt
- `SvelteKit` for SvelteKit
- `TanStackStart` for TanStack Start
- `ReactRouter` for React Router
- `Vite` for TanStack Router and SolidJS static builds

For server apps, use `Worker` with the correct `cwd`, entrypoint, compatibility mode, bindings, and optional dev port.

## Environment Variables and Secrets

Use the right binding type:

- `alchemy.env` for non-sensitive values such as `CORS_ORIGIN`, `VITE_SERVER_URL`, `STAGE`, and feature flags
- `alchemy.secret.env` for sensitive values such as `BETTER_AUTH_SECRET`, `DATABASE_URL`, API keys, and tokens

Do not place secrets on `alchemy.env`; they are plaintext in state and logs.

### ALCHEMY_PASSWORD

Secrets require `ALCHEMY_PASSWORD` for encryption and decryption.

- store it securely
- never commit it
- include it in CI/CD secrets if deploys run in automation

Strong password example:

```bash
openssl rand -base64 32
```

Without `ALCHEMY_PASSWORD`, secret-aware deploys fail.

## D1 Databases

When using D1:

- create a `D1Database` resource in `alchemy.run.ts`
- point `migrationsDir` at the actual SQL migrations directory
- bind the database into the Worker as `DB` or the project's chosen binding name

Example:

```ts
const db = await D1Database("database", {
  migrationsDir: "../../packages/db/src/migrations",
});
```

## Multi-Stage Deployments

Alchemy supports isolated stages such as `dev`, `staging`, and `prod`.

Stage resolution order:

1. `--stage`
2. `ALCHEMY_STAGE`
3. `STAGE`
4. `$USER`
5. `dev`

Useful commands:

```bash
bun run deploy
bun run deploy --stage staging
bun run deploy --stage prod
```

Each stage stores state separately under `.alchemy/<stage>/`.

Use `app.stage` in resource names or config when isolation matters:

```ts
name: `${app.name}-${app.stage}-server`;
```

Common stage-aware uses:

- unique Worker names
- unique D1 names
- different domains in prod vs preview/staging
- different `CORS_ORIGIN` values per stage

## Type-Safe Bindings

Better-T-Stack wires Cloudflare bindings into TypeScript via `packages/env/env.d.ts`.

Expected pattern:

```ts
import { type server } from "@my-app/infra/alchemy.run";

export type CloudflareEnv = typeof server.Env;
```

Then `packages/env/src/server.ts` should re-export:

```ts
export { env } from "cloudflare:workers";
```

Implications for Workers runtimes:

- server env comes from Worker bindings, not `process.env`
- runtime values are injected by Cloudflare
- server-side t3-env validation is usually not the source of truth here

## Local Development

`bun run dev` uses Alchemy's local emulation, backed by Miniflare.

Expect:

- local Worker URLs
- local D1 emulation
- hot reload behavior
- emulated resources under `.alchemy/miniflare/v3/`

## Root Commands

Better-T-Stack usually exposes these scripts at the repo root:

```json
{
  "scripts": {
    "deploy": "turbo -F @my-app/infra deploy",
    "destroy": "turbo -F @my-app/infra destroy"
  }
}
```

Use `bun run deploy` for deployment and `bun run destroy` for teardown.

`destroy` is destructive. It can permanently remove Workers and D1 data for the selected stage.

## CI/CD and State

Alchemy uses local file-based state by default. In CI/CD this can be fragile because the filesystem is ephemeral.

Safer options:

1. commit encrypted state files
2. configure a remote state store such as Cloudflare state storage

When giving CI advice, verify the latest Alchemy state-store docs first.

## Cross-Domain Production Setup

Separate web and server Workers get different domains. Update env values to the deployed URLs before production use.

Typical values to verify:

- `apps/web/.env` -> `VITE_SERVER_URL`
- `apps/server/.env` -> `CORS_ORIGIN`
- `apps/server/.env` -> `BETTER_AUTH_URL`

If these URLs do not match the real Worker domains, auth and browser requests often fail.

## Better Auth Cookie Configuration

When web and server run on different Worker subdomains, Better Auth needs cross-subdomain cookies.

Check `packages/auth/src/auth.ts` for:

- `session.cookieCache`
- `advanced.crossSubDomainCookies`

Typical production setup:

```ts
advanced: {
  crossSubDomainCookies: {
    enabled: true,
    domain: ".workers.dev",
  },
}
```

Replace `.workers.dev` with the actual shared workers subdomain when needed.

## Troubleshooting

### Undefined env variable

- verify the variable exists in the expected `.env` file
- verify `dotenv` loads that file
- if sensitive, use `alchemy.secret.env.X` rather than `alchemy.env.X`

### Secret cannot be decrypted

- verify `ALCHEMY_PASSWORD` is set
- verify the password matches the one used previously
- avoid rotating it casually across stages without a migration plan

### D1 migrations fail

- verify `migrationsDir`
- run local DB workflows first if available
- verify SQL files are valid

### Worker bundle too large

- inspect build output size
- reduce incompatible or heavy dependencies
- prefer edge-compatible packages

### Browser CORS errors

- verify `CORS_ORIGIN` matches the web app URL exactly
- verify preflight handling exists
- verify auth cookie domain and `SameSite` settings are consistent with deployment URLs
