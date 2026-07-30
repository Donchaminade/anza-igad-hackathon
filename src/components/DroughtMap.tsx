"use client";

import dynamic from "next/dynamic";
import type { TriggerEvent, Zone } from "@/lib/types";
import { levelColor } from "@/lib/format";

const MapInner = dynamic(() => import("./DroughtMapInner"), {
  ssr: false,
  loading: () => <div className="map-placeholder">Loading map…</div>,
});

export function DroughtMap({
  zone,
  events,
  activeId,
}: {
  zone: Zone;
  events: TriggerEvent[];
  activeId?: string;
}) {
  return (
    <div className="map-shell">
      <MapInner zone={zone} events={events} activeId={activeId} levelColor={levelColor} />
    </div>
  );
}
