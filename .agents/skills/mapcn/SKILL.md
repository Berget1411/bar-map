---
name: mapcn
description: Build and refactor React map interfaces with mapcn and MapLibre GL. Use when adding `@mapcn/map`, composing maps with controls, markers, popups, routes, or clusters, wiring controlled viewport state, customizing styles/themes, or deciding between DOM markers and GeoJSON layers.
---

# mapcn

mapcn provides copy-paste React map components built directly on MapLibre GL and styled to fit shadcn/ui projects.

## Core workflow

1. Add the registry item with the project's package runner.
2. Import the generated components from the local UI layer.
3. Render the map inside a container with an explicit height.
4. Start with `Map` and `MapControls`, then add markers, popups, routes, or clusters.
5. Drop to raw MapLibre through a ref or `useMap()` when the built-in primitives are not enough.

Use the npm form below as the default example, but swap in the project's package runner when needed.

```bash
npx shadcn@latest add @mapcn/map
```

```tsx
import { Map, MapControls } from "@/components/ui/map";

export function MyMap() {
  return (
    <div className="h-[320px] overflow-hidden rounded-xl border">
      <Map center={[-74.006, 40.7128]} zoom={11}>
        <MapControls />
      </Map>
    </div>
  );
}
```

## Rules

- Always give the map's parent container a height. A missing height is the most common reason the map appears broken.
- Prefer mapcn primitives first. Reach for raw MapLibre APIs only when the feature is not covered by the component set.
- Use `MapMarker` for small or medium interactive marker sets. For large datasets, prefer `MapClusterLayer` or custom GeoJSON layers.
- Use `MarkerPopup` when the popup belongs to a marker. Use `MapPopup` for location-driven or programmatically controlled popups.
- Use `viewport` plus `onViewportChange` for controlled mode. If you only need an initial camera, use normal map options such as `center` and `zoom`.
- Keep business logic outside the map UI. Fetch routes, GeoJSON, and app data in feature code, then pass the result into map components.

## Component selection

| Need                                       | Use                              |
| ------------------------------------------ | -------------------------------- |
| Base interactive map                       | `Map`                            |
| Zoom, compass, locate, fullscreen controls | `MapControls`                    |
| A few custom points of interest            | `MapMarker` + `MarkerContent`    |
| Hover text for a marker                    | `MarkerTooltip` or `MarkerLabel` |
| Click-open marker details                  | `MarkerPopup`                    |
| Popup not attached to a marker             | `MapPopup`                       |
| Draw a route or path                       | `MapRoute`                       |
| Hundreds or thousands of points            | `MapClusterLayer`                |
| Direct MapLibre access                     | `ref` on `Map` or `useMap()`     |

## High-value patterns

### Theme-aware maps

- `Map` automatically switches between light and dark styles when `theme` is omitted.
- The default basemap is a free Carto style, so no API key is required for the initial setup.
- Use the `styles` prop to replace the default basemap with any MapLibre-compatible style.

### Controlled viewport

- Use controlled mode when the app needs to sync camera state with side panels, filters, URLs, or other UI.
- `onViewportChange` fires continuously while the user pans, zooms, rotates, or pitches the map.

### Performance choice

- `MapMarker` renders DOM content and is best for richer UI with a few hundred markers or fewer.
- For larger datasets, use `MapClusterLayer` or custom layers so the points render in WebGL instead of as DOM nodes.

### Advanced customization

- For imperative actions such as `flyTo`, use a ref on `Map`.
- For child components rendered inside `Map`, use `useMap()` to subscribe to events or call raw MapLibre methods.
- UI content inside markers, popups, and tooltips is rendered through React portals, so styling stays in your React/Tailwind layer.

## Implementation notes

- `Map` extends MapLibre `MapOptions` except `container` and `style`.
- `MapMarker` extends MapLibre `MarkerOptions` except `element`.
- `MarkerPopup`, `MarkerTooltip`, and `MapPopup` extend MapLibre `PopupOptions`, but mapcn owns popup styling-related props to avoid conflicts.
- Use `projection={{ type: "globe" }}` when the product specifically needs globe mode.

For prop-level reference and component anatomy, read `references/api-reference.md`.
