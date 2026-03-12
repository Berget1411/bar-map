---
name: tanstack-table
description: Build React data tables and datagrids with TanStack Table plus shadcn-style table primitives. Use when creating or refactoring tables with column definitions, cell formatting, sorting, filtering, pagination, column visibility, row selection, row actions, or reusable table helpers.
user-invocable: false
---

# TanStack Table

Use this skill when a user needs an interactive data table, not just static tabular markup. Prefer a plain `Table` for simple read-only layouts; switch to TanStack Table when the table needs stateful behavior such as sorting, filtering, pagination, selection, visibility toggles, or row actions.

## Repo Defaults

- Keep table implementations feature-local in `apps/web` unless the exact same helper is reused in multiple features.
- Keep data fetching and mutations outside the table shell. The table component should receive `data`, `columns`, and callbacks or derived state.
- Keep server/business logic in `packages/api` services and `packages/db` repositories when backend work is needed.
- Use the shared table primitive from `@open-learn/ui/components/table` for rendering.
- In this repo, prefer shared UI imports such as `@open-learn/ui/components/button` over app-local `@/components/ui/*` imports.

## Decision Guide

1. **Static table only**: use `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` directly.
2. **Client-side interactivity on loaded data**: use TanStack Table row models (`getCoreRowModel`, plus sorting/filtering/pagination as needed).
3. **Large or remote datasets**: keep table state in the feature, use TanStack Table in manual mode, and let the feature own query params and fetching.

## Recommended File Layout

Start feature-local with files like:

```txt
app
└── payments
    ├── columns.tsx
    ├── data-table.tsx
    ├── data-table-toolbar.tsx
    ├── data-table-pagination.tsx
    └── page.tsx
```

- `columns.tsx`: row type and `ColumnDef<TData>[]`
- `data-table.tsx`: generic table shell with `useReactTable`
- `page.tsx` or feature container: data fetching and route wiring
- Optional helpers: toolbar, pagination, sortable header, row actions

## Workflow

### 1. Build the base shell first

- Define a row type.
- Create `columns` with stable `accessorKey` or `id` values.
- Build a generic `DataTable<TData, TValue>` that renders headers and cells with `flexRender`.
- Add an empty state before layering on interactions.

### 2. Add only the behaviors the feature needs

- **Sorting**: `SortingState`, `onSortingChange`, `getSortedRowModel()`
- **Filtering**: `ColumnFiltersState`, `onColumnFiltersChange`, `getFilteredRowModel()`
- **Pagination**: `getPaginationRowModel()` with previous/next controls or a pagination helper
- **Visibility**: `VisibilityState`, `onColumnVisibilityChange`, and a dropdown toggle UI
- **Row selection**: `rowSelection`, `onRowSelectionChange`, and a checkbox column
- **Row actions**: render actions from `row.original`

### 3. Keep reusable pieces small

If patterns repeat, extract helpers such as:

- `DataTableColumnHeader` for sortable headers
- `DataTablePagination` for paging controls
- `DataTableViewOptions` for column toggles
- `DataTableRowActions` for action menus

Do not move feature-specific fetch logic, labels, or mutations into `packages/ui`.

### 4. Use manual mode for server-backed tables

For remote sorting/filtering/pagination:

- Keep sorting/filter/filtering/page state in the feature container.
- Fetch data from the feature’s existing query layer.
- Pass controlled state into `useReactTable`.
- Use manual options such as `manualPagination`, `manualSorting`, and `manualFiltering` when the server is the source of truth.

## Repo Import Template

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@open-learn/ui/components/table";
import { Button } from "@open-learn/ui/components/button";
import { Input } from "@open-learn/ui/components/input";
import { Checkbox } from "@open-learn/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@open-learn/ui/components/dropdown-menu";
```

## Implementation Checklist

- Prefer feature-owned table files over a monolithic shared abstraction.
- Keep `columns` strongly typed with `ColumnDef<TData>[]`.
- Give non-data columns explicit `id` values like `select` or `actions`.
- Disable sorting/hiding on checkbox and action columns when appropriate.
- Use `row.original` for row-specific actions.
- Render empty states and selection counts explicitly.
- Avoid hard-coding data fetching into the table component.

## Common Pitfalls

- Building a giant shared `DataTable` before the table pattern is proven reusable.
- Mixing API fetching, mutation calls, and rendering into one client component.
- Using unstable column ids that break filtering, visibility, or sorting state.
- Turning on every TanStack feature by default when the feature only needs one or two.

## Reference

For step-by-step patterns and code snippets, read `references/patterns.md`.
