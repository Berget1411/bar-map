# UI AGENTS

## Scope

- `packages/ui` owns shared design primitives, helpers, hooks, and global styles.
- Only place code here when it is reusable across features or apps.

## Structure

- Put reusable primitives in `src/components/*`.
- Put shared hooks in `src/hooks/*`.
- Put styling helpers in `src/lib/*`.
- Keep shared tokens and base styles in `src/styles/globals.css`.

## Best Practices

- Prefer app or feature-local UI first; promote only proven reusable pieces.
- Keep components presentational and composable.
- Favor small wrappers around base primitives over monolithic components.
- Preserve existing export paths used by apps.

## Guardrails

- Do not move feature-specific data fetching or business logic into `packages/ui`.
- Do not hardcode app-specific copy, routes, or API behavior.
- When changing global styles or tokens, consider impact on both apps before editing.
