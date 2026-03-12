import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@open-learn/ui/components/ui/map";
import { Card } from "@open-learn/ui/components/card";
import { Button } from "@open-learn/ui/components/button";
import { Clock, ExternalLink, Navigation, Star } from "lucide-react";

const STOCKHOLM_CENTER: [number, number] = [18.0686, 59.3293];

export function MapPage() {
  const { data: bars = [] } = useQuery(trpc.bar.getOpen.queryOptions());

  return (
    <Card className="h-[100vh] p-0 overflow-hidden">
      <Map center={STOCKHOLM_CENTER} zoom={13}>
        <MapControls showZoom showCompass showLocate showFullscreen />
        {bars.map((bar) => (
          <MapMarker key={bar.id} longitude={bar.longitude} latitude={bar.latitude}>
            <MarkerContent>
              <div className="size-5 rounded-full bg-amber-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <MarkerLabel position="bottom">{bar.name}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="p-0 w-64">
              {bar.imageUrl && (
                <div className="relative h-32 overflow-hidden rounded-t-md">
                  <img src={bar.imageUrl} alt={bar.name} className="h-full w-full object-cover" />
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
                  <p className="text-xs text-muted-foreground line-clamp-2">{bar.description}</p>
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
          </MapMarker>
        ))}
      </Map>
    </Card>
  );
}
