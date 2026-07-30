import Link from "next/link";

const GITHUB = "https://github.com/Donchaminade/anza-igad-hackathon";

export default function HomePage() {
  return (
    <div className="landing">
      <section className="hero" aria-label="ANZA introduction">
        <div className="hero-bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, PWA-cacheable, full-bleed decorative */}
          <img className="hero-visual" src="/hero-turkana.svg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="hero-inner">
          <p className="hero-brand">
            AN<em>ZA</em>
          </p>
          <h1>From drought threshold to field action.</h1>
          <p className="hero-lead">
            When a Turkana drought trigger fires, ANZA explains why — then ships three early actions
            and an SMS for the people who must move today.
          </p>
          <div className="cta-row">
            <Link href="/alerts" className="btn btn-primary">
              Open live alerts
            </Link>
            <a href="#how-it-works" className="btn btn-secondary">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section className="section landing-section" aria-labelledby="problem-title">
        <h2 id="problem-title">Thresholds fire. Action stalls.</h2>
        <p className="section-lead">
          ICPAC systems already watch drought. What field actors lack is a clear brief in the first
          24–48 hours — what to do, for whom, and how to send it on a low-bandwidth channel.
        </p>
      </section>

      <section className="section landing-section" aria-labelledby="solution-title">
        <h2 id="solution-title">Grounded briefs for the last mile.</h2>
        <p className="section-lead">
          ANZA turns a crossed threshold into a persona action sheet: agricultural extension officers
          and local DRM leads get the same trigger, explained differently — with citations, not
          invented forecasts — plus an SMS preview ready for HUSIKA-style channels.
        </p>
        <ul className="persona-strip" role="list">
          <li>
            <strong>Extension</strong>
            Household and herd advice when SPI / VCI trip Alert or Alarm.
          </li>
          <li>
            <strong>DRM lead</strong>
            Ward water, feed, and protection moves timed to the trigger level.
          </li>
          <li>
            <strong>Grounded AI + SMS</strong>
            LLM writes from fixture indicators only; offline fallback stays demo-safe.
          </li>
        </ul>
      </section>

      <section
        id="how-it-works"
        className="section landing-section"
        aria-labelledby="flow-title"
      >
        <h2 id="flow-title">Trigger → Explain → Act → SMS</h2>
        <p className="section-lead">
          One vertical slice for Turkana drought — not another monitoring dashboard.
        </p>
        <ol className="flow-strip">
          <li className="flow-step">
            <strong>1. Trigger</strong>
            Fixture thresholds (SPI-3, VCI, soil moisture) trip Watch / Alert / Alarm.
          </li>
          <li className="flow-step">
            <strong>2. Explain</strong>
            Grounded AI cites the indicators that crossed — source-linked, no gadget forecast.
          </li>
          <li className="flow-step">
            <strong>3. Act</strong>
            Three early actions per persona, with timing and resources.
          </li>
          <li className="flow-step">
            <strong>4. SMS</strong>
            Low-bandwidth text preview you can copy for field dissemination.
          </li>
        </ol>
      </section>

      <section className="section landing-cta" aria-labelledby="demo-title">
        <h2 id="demo-title">Run the Turkana demo.</h2>
        <p className="section-lead">
          Browse active drought triggers, open an Alarm brief, switch persona, and copy the SMS —
          works offline from fixtures when the LLM is down.
        </p>
        <div className="cta-row">
          <Link href="/alerts" className="btn btn-primary">
            Enter alerts desk
          </Link>
          <a
            href={GITHUB}
            className="btn btn-ghost landing-ghost"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
        <p className="install-hint">
          PWA-ready: Add to Home Screen on mobile for an offline-capable shell of the alert flow.
        </p>
      </section>
    </div>
  );
}
