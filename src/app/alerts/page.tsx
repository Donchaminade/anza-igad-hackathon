import { DroughtMap } from "@/components/DroughtMap";
import { EventCard } from "@/components/EventCard";
import { getEvents, getZone } from "@/lib/fixtures";

export const metadata = {
  title: "Alerts — ANZA",
};

export default function AlertsPage() {
  const events = getEvents();
  const zone = getZone();

  return (
    <div className="section" style={{ paddingTop: "1.5rem" }}>
      <h2>Active drought triggers</h2>
      <p className="section-lead">
        {zone.name}, {zone.country}. Tap an alert for grounded explain + persona actions + SMS.
      </p>
      <div className="layout-split">
        <div className="event-list">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        <DroughtMap zone={zone} events={events} />
      </div>
    </div>
  );
}
