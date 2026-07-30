import Link from "next/link";
import type { TriggerEvent } from "@/lib/types";
import { confidencePct, formatDate, levelColor } from "@/lib/format";

export function EventCard({ event }: { event: TriggerEvent }) {
  const color = levelColor(event.level);
  return (
    <Link href={`/alerts/${event.id}`} className="event-card">
      <div className="event-card-bar" style={{ background: color }} />
      <div className="event-card-body">
        <div className="event-card-top">
          <span className="level-pill" style={{ color, borderColor: color }}>
            {event.level}
          </span>
          <span className="muted tiny">{formatDate(event.triggeredAt)}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
        <div className="event-card-foot">
          <span>{event.location.name}</span>
          <span>Confidence {confidencePct(event.confidence)}</span>
        </div>
      </div>
    </Link>
  );
}
