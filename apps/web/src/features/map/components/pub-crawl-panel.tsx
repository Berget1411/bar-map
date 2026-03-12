import { Button } from "@open-learn/ui/components/button";
import { Badge } from "@open-learn/ui/components/badge";
import { ScrollArea } from "@open-learn/ui/components/scroll-area";
import { Separator } from "@open-learn/ui/components/separator";
import { Beer, ExternalLink, GripVertical, Navigation, Route, Trash2, X } from "lucide-react";

export type CrawlStop = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

type PubCrawlPanelProps = {
  stops: CrawlStop[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onReorder: (stops: CrawlStop[]) => void;
};

export function PubCrawlPanel({ stops, onRemove, onClear, onReorder }: PubCrawlPanelProps) {
  const googleMapsUrl =
    stops.length >= 2
      ? `https://www.google.com/maps/dir/${stops
          .map((s) => `${s.latitude},${s.longitude}`)
          .join("/")}`
      : null;

  function handleDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    if (fromIndex === targetIndex) return;
    const reordered = [...stops];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    onReorder(reordered);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  return (
    <div className="flex flex-col gap-0 rounded-xl border border-border bg-background shadow-lg w-72 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Route className="size-4 text-amber-500" />
          <span className="text-sm font-semibold">Pub Crawl</span>
          {stops.length > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {stops.length}
            </Badge>
          )}
        </div>
        {stops.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
            onClick={onClear}
            aria-label="Clear all stops"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Stop list */}
      {stops.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 px-4 text-center">
          <Beer className="size-8 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground">
            Click <strong>+ Add to crawl</strong> on any bar to start planning your route.
          </p>
        </div>
      ) : (
        <ScrollArea className="max-h-72">
          <ul className="flex flex-col py-1">
            {stops.map((stop, index) => (
              <li
                key={stop.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 cursor-grab active:cursor-grabbing group"
              >
                <GripVertical className="size-3.5 text-muted-foreground/40 shrink-0" />
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{stop.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{stop.address}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => onRemove(stop.id)}
                  aria-label={`Remove ${stop.name}`}
                >
                  <Trash2 className="size-3" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}

      {/* Footer actions */}
      {stops.length >= 2 && (
        <>
          <Separator />
          <div className="flex gap-2 p-2">
            <Button
              size="sm"
              className="flex-1 h-8"
              onClick={() => window.open(googleMapsUrl!, "_blank")}
            >
              <Navigation className="size-3.5" data-icon="inline-start" />
              Start crawl
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => window.open(googleMapsUrl!, "_blank")}
              aria-label="Open in Google Maps"
            >
              <ExternalLink className="size-3.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
