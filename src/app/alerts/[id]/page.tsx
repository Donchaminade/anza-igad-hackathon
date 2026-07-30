import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonaExplain } from "@/components/PersonaExplain";
import { DroughtMap } from "@/components/DroughtMap";
import { getEvent, getEvents, getPersonas, getZone } from "@/lib/fixtures";
import { confidencePct, formatDate, levelColor } from "@/lib/format";

export function generateStaticParams() {
  return getEvents().map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  return {
    title: event ? `${event.title} — ANZA` : "Alert — ANZA",
  };
}

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  const color = levelColor(event.level);
  const personas = getPersonas();
  const zone = getZone();

  return (
    <div className="page">
      <Link href="/alerts" className="back-link">
        ← All alerts
      </Link>

      <div className="alert-hero">
        <span className="level-pill" style={{ color, borderColor: color }}>
          {event.level}
        </span>
        <h1>{event.title}</h1>
        <p className="muted">
          {event.location.name} · Triggered {formatDate(event.triggeredAt)} · Confidence{" "}
          {confidencePct(event.confidence)} · Valid until {formatDate(event.validUntil)}
        </p>
        <p>{event.summary}</p>
      </div>

      <div className="indicator-grid">
        {event.indicators.map((ind) => (
          <div key={ind.thresholdId + ind.indicator} className="indicator-chip">
            <div className="label">{ind.indicator}</div>
            <div className="value">
              {ind.value}
              {ind.unit === "%" ? "%" : ""}
            </div>
            <div className="muted tiny">
              Threshold {ind.threshold}
              {ind.unit === "%" ? "%" : ""} · {ind.level}
            </div>
          </div>
        ))}
      </div>

      <div className="layout-split" style={{ marginBottom: "1.5rem" }}>
        <PersonaExplain eventId={event.id} personas={personas} />
        <DroughtMap zone={zone} events={getEvents()} activeId={event.id} />
      </div>
    </div>
  );
}
