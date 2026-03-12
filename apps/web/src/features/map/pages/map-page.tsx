import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { trpc } from "@/utils/trpc";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MarkerTooltip,
} from "@open-learn/ui/components/ui/map";
import { Card } from "@open-learn/ui/components/card";
import { Button } from "@open-learn/ui/components/button";
import { Badge } from "@open-learn/ui/components/badge";
import { Clock, ExternalLink, Navigation, Plus, Route, Star, X } from "lucide-react";
import { PubCrawlPanel, type CrawlStop } from "../components/pub-crawl-panel";

const STOCKHOLM_CENTER: [number, number] = [18.0686, 59.3293];

export function MapPage() {
  const { data: bars = [] } = useQuery(trpc.bar.getOpen.queryOptions());
  const [crawlMode, setCrawlMode] = useState(false);
  const [crawlStops, setCrawlStops] = useState<CrawlStop[]>([]);

  const crawlIds = new Set(crawlStops.map((s) => s.id));

  function addStop(bar: CrawlStop) {
    if (!crawlIds.has(bar.id)) {
      setCrawlStops((prev) => [...prev, bar]);
    }
  }

  function removeStop(id: number) {
    setCrawlStops((prev) => prev.filter((s) => s.id !== id));
  }

  const routeCoordinates = useMemo<[number, number][]>(
    () => crawlStops.map((s) => [s.longitude, s.latitude]),
    [crawlStops],
  );

  return (
    <Card className="relative h-[100vh] p-0 overflow-hidden">
      <Map center={STOCKHOLM_CENTER} zoom={13}>
        <MapControls showZoom showCompass showLocate showFullscreen />

        {/* Amber route line connecting crawl stops in order */}
        {crawlStops.length >= 2 && (
          <MapRoute
            id="pub-crawl-route"
            coordinates={routeCoordinates}
            color="#3b82f6"
            width={4}
            opacity={0.8}
            interactive={false}
          />
        )}

        {bars.map((bar) => {
          const crawlIndex = crawlStops.findIndex((s) => s.id === bar.id);
          const inCrawl = crawlIndex !== -1;

          return (
            <MapMarker key={bar.id} longitude={bar.longitude} latitude={bar.latitude}>
              <MarkerContent>
                <div className="relative">
                  {/* Main pin — numbered blue when in crawl, amber dot otherwise */}
                  {inCrawl ? (
                    <div className="flex size-6 items-center justify-center rounded-full bg-blue-500 border-2 border-white shadow-lg cursor-pointer text-white text-[11px] font-bold hover:scale-110 transition-transform">
                      {crawlIndex + 1}
                    </div>
                  ) : (
                    <div className="size-5 rounded-full bg-amber-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
                  )}

                  {/* Add/remove badge shown only in crawl mode */}
                  {crawlMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        inCrawl ? removeStop(bar.id) : addStop(bar);
                      }}
                      className={[
                        "absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full border border-white shadow transition-colors",
                        inCrawl
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white hover:bg-amber-500 hover:text-white text-amber-500",
                      ].join(" ")}
                      title={inCrawl ? "Remove from crawl" : "Add to crawl"}
                    >
                      {inCrawl ? <X className="size-2.5" /> : <Plus className="size-2.5" />}
                    </button>
                  )}
                </div>

                {/* Label only when not in crawl mode (crawl panel shows names) */}
                {!crawlMode && <MarkerLabel position="bottom">{bar.name}</MarkerLabel>}
              </MarkerContent>

              {/* Hover tooltip in crawl mode; click popup in normal mode */}
              {crawlMode ? (
                <MarkerTooltip>{bar.name}</MarkerTooltip>
              ) : (
                <MarkerPopup className="p-0 w-64">
                  {bar.imageUrl && (
                    <div className="h-32 overflow-hidden rounded-t-md">
                      <img
                        src={bar.imageUrl}
                        alt={bar.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 p-3">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Bar
                      </span>
                      <h3 className="font-semibold text-foreground leading-tight">{bar.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{bar.address}</p>
                    </div>
                    {bar.rating != null && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{bar.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {bar.hours && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="size-3.5 shrink-0" />
                        <span>{bar.hours}</span>
                      </div>
                    )}
                    {bar.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {bar.description}
                      </p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <Button
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${bar.latitude},${bar.longitude}`,
                            "_blank",
                          )
                        }
                      >
                        <Navigation className="size-3.5" data-icon="inline-start" />
                        Directions
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bar.name + " Stockholm")}`,
                            "_blank",
                          )
                        }
                      >
                        <ExternalLink className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </MarkerPopup>
              )}
            </MapMarker>
          );
        })}
      </Map>

      {/* Pub crawl mode toggle — top-left */}
      <div className="absolute top-3 left-3 z-10">
        <Button
          size="sm"
          variant={crawlMode ? "default" : "outline"}
          className="h-9 gap-1.5 bg-background/95 backdrop-blur-sm shadow-md"
          onClick={() => setCrawlMode((v) => !v)}
        >
          <Route className="size-4" />
          {crawlMode ? "Planning route…" : "Plan pub crawl"}
          {crawlStops.length > 0 && (
            <Badge variant="secondary" className="ml-0.5 px-1.5 py-0 text-[10px]">
              {crawlStops.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Crawl itinerary panel — bottom-left, visible in crawl mode */}
      {crawlMode && (
        <div className="absolute bottom-12 left-3 z-10">
          <PubCrawlPanel
            stops={crawlStops}
            onRemove={removeStop}
            onClear={() => setCrawlStops([])}
            onReorder={setCrawlStops}
          />
        </div>
      )}
    </Card>
  );
}
