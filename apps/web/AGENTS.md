# Web AGENTS

## Scope

- `apps/web` owns routes, feature pages, and client composition.
- Shared design primitives belong in `packages/ui`.
- Shared API contracts come from `@open-learn/api`.

## Structure

- Build inside `src/features/<feature>` with `components`, `pages`, `services`, `constants`, and `utils` as needed.
- Keep route files in `src/routes` thin; they should usually import a feature page and export the route.
- Keep feature-specific hooks, queries, and mutations inside that feature.

## Best Practices

- Prefer feature-local components before promoting to shared components.
- Promote to `packages/ui` only when the abstraction is reusable across features/apps.
- Keep page components focused on composition; move reusable behavior to feature services/hooks.
- Use shared API clients such as `src/utils/trpc.ts` instead of ad hoc fetch logic when the endpoint already exists.

## Guardrails

- Do not put feature business logic into route files.
- Do not edit `src/routeTree.gen.ts` manually.
- Preserve existing route paths and user flows unless the task explicitly changes them.
