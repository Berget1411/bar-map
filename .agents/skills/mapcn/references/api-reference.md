# mapcn API reference

Use this file when you need prop-level details or need to choose the right primitive quickly.

## Component anatomy

```tsx
<Map>
  <MapMarker longitude={...} latitude={...}>
    <MarkerContent>
      <MarkerLabel />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>

  <MapPopup longitude={...} latitude={...} />
  <MapControls />
  <MapRoute coordinates={...} />
  <MapClusterLayer data={...} />
</Map>
```

## Map

Root container that initializes MapLibre GL, exposes context to children, and automatically handles light/dark theming.

- Extends `MapOptions` except `container` and `style`.
- Important props:
  - `children: ReactNode`
  - `className?: string`
  - `theme?: "light" | "dark"`
  - `styles?: { light?: string | StyleSpecification; dark?: string | StyleSpecification }`
  - `projection?: ProjectionSpecification`
  - `viewport?: Partial<MapViewport>`
  - `onViewportChange?: (viewport: MapViewport) => void`

Key notes:

- Omitting `theme` uses document theme or system preference.
- Omitting `styles` uses the default Carto basemap.
- `viewport` plus `onViewportChange` enables controlled mode.

## useMap

Hook for children rendered inside `Map`.

```tsx
const { map, isLoaded } = useMap();
```

- `map` is the underlying `MapLibre.Map` instance.
- `isLoaded` tells you whether the map is ready for raw API calls.

## MapControls

Renders built-in control buttons.

- `position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"` - default `"bottom-right"`
- `showZoom?: boolean` - default `true`
- `showCompass?: boolean` - default `false`
- `showLocate?: boolean` - default `false`
- `showFullscreen?: boolean` - default `false`
- `className?: string`
- `onLocate?: (coords: { longitude: number; latitude: number }) => void`

Use when the product needs standard navigation controls without custom MapLibre control wiring.

## MapMarker

Context provider for marker-related child components.

- Extends `MarkerOptions` except `element`.
- Important props:
  - `longitude: number`
  - `latitude: number`
  - `children: ReactNode`
  - `onClick?: (e: MouseEvent) => void`
  - `onMouseEnter?: (e: MouseEvent) => void`
  - `onMouseLeave?: (e: MouseEvent) => void`
  - `onDragStart?: (lngLat: { lng: number; lat: number }) => void`
  - `onDrag?: (lngLat: { lng: number; lat: number }) => void`
  - `onDragEnd?: (lngLat: { lng: number; lat: number }) => void`

Use for custom POIs, draggable pins, and marker-driven interaction.

## MarkerContent

Visual content for a marker.

- `children?: ReactNode`
- `className?: string`

If `children` is omitted, mapcn renders a default blue dot marker.

## MarkerPopup

Popup attached to a marker, opened by clicking the marker.

- Extends `PopupOptions` except MapLibre's `className` and `closeButton`.
- Important props:
  - `children?: ReactNode`
  - `className?: string`
  - `closeButton?: boolean` - default `false`

Use for click-to-open marker details.

## MarkerTooltip

Hover tooltip attached to a marker.

- Extends `PopupOptions` except MapLibre's `className`, `closeButton`, and `closeOnClick`.
- Important props:
  - `children?: ReactNode`
  - `className?: string`

Use for lightweight hover affordances.

## MarkerLabel

Text label rendered above or below marker content.

- `children?: ReactNode`
- `className?: string`
- `position?: "top" | "bottom"` - default `"top"`

## MapPopup

Standalone popup not tied to a marker.

- Extends `PopupOptions` except MapLibre's `className` and `closeButton`.
- Important props:
  - `longitude: number`
  - `latitude: number`
  - `onClose?: () => void`
  - `children?: ReactNode`
  - `className?: string`
  - `closeButton?: boolean` - default `false`

Use for selected coordinates, search results, or app-driven popups.

## MapRoute

Draws a route or line string.

- `id?: string`
- `coordinates: [number, number][]`
- `color?: string` - default `"#4285F4"`
- `width?: number` - default `3`
- `opacity?: number` - default `0.8`
- `dashArray?: [number, number]`
- `onClick?: () => void`
- `onMouseEnter?: () => void`
- `onMouseLeave?: () => void`
- `interactive?: boolean` - default `true`

Use for routes, trails, or option comparison UIs.

## MapClusterLayer

Clustered point rendering using MapLibre's native clustering.

- Supports a typed feature shape: `MapClusterLayer<MyProperties>`.
- Important props:
  - `data: string | GeoJSON.FeatureCollection`
  - `clusterMaxZoom?: number` - default `14`
  - `clusterRadius?: number` - default `50`
  - `clusterColors?: [string, string, string]` - default `["#22c55e", "#eab308", "#ef4444"]`
  - `clusterThresholds?: [number, number]` - default `[100, 750]`
  - `pointColor?: string` - default `"#3b82f6"`
  - `onPointClick?: (feature: GeoJSON.Feature, coordinates: [number, number]) => void`
  - `onClusterClick?: (clusterId: number, coordinates: [number, number], pointCount: number) => void`

Behavior notes:

- If `onClusterClick` is omitted, clicking a cluster zooms into it.
- Use this instead of many `MapMarker` nodes for large datasets.

## Practical guidance

- Default tiles require no API key, which makes mapcn good for quick prototypes and internal tools.
- Custom tiles or styles should still be passed through the `styles` prop so light/dark behavior remains explicit.
- Markers, popups, and tooltips are rendered with React portals, so rich UI built with local components is expected.
- When you need unsupported MapLibre features, keep the mapcn `Map` and add custom layers, sources, or event listeners through the raw map instance.
