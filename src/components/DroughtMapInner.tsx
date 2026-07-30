"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Rectangle } from "react-leaflet";
import type { TriggerEvent, Zone } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export default function DroughtMapInner({
  zone,
  events,
  activeId,
  levelColor,
}: {
  zone: Zone;
  events: TriggerEvent[];
  activeId?: string;
  levelColor: (level: string) => string;
}) {
  const bounds: [[number, number], [number, number]] = [
    [zone.bbox[1], zone.bbox[0]],
    [zone.bbox[3], zone.bbox[2]],
  ];

  return (
    <MapContainer
      center={[zone.centroid.lat, zone.centroid.lng]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#e7e0d4" }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Rectangle
        bounds={bounds}
        pathOptions={{ color: "#3f5d4a", weight: 1, fillOpacity: 0.05, dashArray: "4 4" }}
      />
      {events.map((e) => (
        <CircleMarker
          key={e.id}
          center={[e.location.lat, e.location.lng]}
          radius={e.id === activeId ? 14 : 10}
          pathOptions={{
            color: levelColor(e.level),
            fillColor: levelColor(e.level),
            fillOpacity: e.id === activeId ? 0.85 : 0.55,
            weight: e.id === activeId ? 3 : 1,
          }}
        >
          <Popup>
            <strong>{e.title}</strong>
            <br />
            {e.level.toUpperCase()} · {e.location.name}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
