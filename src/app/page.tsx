import Link from "next/link";
import { DroughtMap } from "@/components/DroughtMap";
import { EventCard } from "@/components/EventCard";
import { getEvents, getSources, getZone } from "@/lib/fixtures";

export default function HomePage() {
  const events = getEvents().filter((e) => e.level !== "recovering").slice(0, 3);
  const zone = getZone();
  const sources = getSources();

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="hero-inner">
          <p className="hero-brand">
            AN<em>ZA</em>
          </p>
          <h1>From drought threshold to field action.</h1>
          <p>
            When an ICPAC-style trigger fires in Turkana, ANZA explains why — then ships three early
            actions and an SMS for the people who must act today.
          </p>
          <div className="cta-row">
            <Link href="/alerts" className="btn btn-primary">
              Open live alerts
            </Link>
            <Link href="/alerts/evt-turkana-2026-07-alarm" className="btn btn-secondary">
              Demo Alarm brief
            </Link>
          </div>
          <p className="install-hint" style={{ color: "rgba(255,250,242,0.85)", borderColor: "#f0d2a8" }}>
            PWA: Add to Home Screen on mobile for offline-ready alert briefs.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Trigger → Explain → Act → SMS</h2>
        <p className="section-lead">
          Not another monitoring dashboard. ANZA is the last mile between ICPAC thresholds and
          anticipatory action for extension officers and civil protection leads.
        </p>
        <div className="flow-strip">
          <div className="flow-step">
            <strong>1. Trigger</strong>
            Fixture thresholds (SPI-3, VCI, soil moisture) trip Alert/Alarm.
          </div>
          <div className="flow-step">
            <strong>2. Explain</strong>
            Grounded AI cites the indicators — no invented forecast.
          </div>
          <div className="flow-step">
            <strong>3. Act</strong>
            Three persona-specific early actions with timing + resources.
          </div>
          <div className="flow-step">
            <strong>4. SMS</strong>
            Low-bandwidth preview ready to hand to HUSIKA-style channels.
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Turkana drought desk</h2>
        <p className="section-lead">
          Demo zone: {zone.name}, {zone.country} — IGAD member. Active triggers below.
        </p>
        <div className="layout-split">
          <div className="event-list">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
            <Link href="/alerts" className="btn btn-primary" style={{ width: "fit-content" }}>
              See all alerts
            </Link>
          </div>
          <DroughtMap zone={zone} events={getEvents()} />
        </div>
      </section>

      <section className="section">
        <h2>Grounded in ICPAC systems</h2>
        <p className="section-lead">
          ANZA references Thresholds & Triggers, Drought Watch, Hazard Watch, and HUSIKA —
          complementing, not cloning them.
        </p>
        <div className="sources-row">
          {sources.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
