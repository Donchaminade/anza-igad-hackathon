import { getSources, getZone } from "@/lib/fixtures";
import { llmStatus } from "@/lib/llm";

export const metadata = {
  title: "About — ANZA",
};

export default function AboutPage() {
  const zone = getZone();
  const sources = getSources();
  const llm = llmStatus();

  return (
    <div className="page">
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>About ANZA</h1>
      <p>
        <strong>ANZA</strong> (Swahili: <em>begin / start</em>) turns ICPAC-style drought threshold
        crossings into grounded explanations and anticipatory action briefs for field actors in{" "}
        {zone.name}, {zone.country}.
      </p>
      <h2 style={{ fontFamily: "var(--font-display)" }}>Personas</h2>
      <ul>
        <li>Agricultural Extension Officer — household / herd advice</li>
        <li>Local Civil Protection Lead — ward DRM & water trucking coordination</li>
      </ul>
      <h2 style={{ fontFamily: "var(--font-display)" }}>LLM status</h2>
      <p>
        Provider: <code>{llm.provider}</code>
        {llm.configured
          ? " — live grounded generation enabled."
          : " — no API key; offline fixture fallback is active (demo-safe)."}
      </p>
      <h2 style={{ fontFamily: "var(--font-display)" }}>Sources</h2>
      <div className="sources-row">
        {sources.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p className="muted" style={{ marginTop: "1.5rem" }}>
        Built for IGAD Hackathon 2026 — Smarter Early Warning, Stronger Communities. Demo data is
        illustrative, not an operational forecast product.
      </p>
    </div>
  );
}
