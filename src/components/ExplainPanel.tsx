"use client";

import { useEffect, useState } from "react";
import type { ExplainResult, PersonaId } from "@/lib/types";

export function ExplainPanel({
  eventId,
  personaId,
  locale,
}: {
  eventId: string;
  personaId: PersonaId;
  locale: "en" | "sw";
}) {
  const [data, setData] = useState<ExplainResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, personaId, locale }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((json: ExplainResult) => {
        if (!cancelled) setData(json);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventId, personaId, locale]);

  async function copySms() {
    if (!data?.sms) return;
    await navigator.clipboard.writeText(data.sms);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="explain-skeleton" aria-busy="true">
        <div className="pulse-bar" />
        <div className="pulse-bar short" />
        <div className="pulse-bar" />
        <p className="muted">Generating grounded explain…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="error-box" role="alert">
        Could not load explain: {error ?? "unknown"}
      </div>
    );
  }

  return (
    <div className="explain-panel">
      <div className="source-badge" data-source={data.source}>
        {data.source === "llm" ? `AI grounded · ${data.model}` : "Offline fallback · fixture-cited"}
      </div>

      <section>
        <h3>Why this trigger fired</h3>
        <p className="explain-text">{data.explanation}</p>
      </section>

      <section>
        <h3>Citations</h3>
        <ul className="citation-list">
          {data.citations.map((c, i) => (
            <li key={`${c.indicator}-${i}`}>
              <strong>{c.indicator}</strong>: {c.value} vs {c.threshold}
              <span className="cite-src"> · {c.sourceId}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>3 early actions</h3>
        <ol className="action-list">
          {data.actions.map((a, i) => (
            <li key={i} className="action-card">
              <div className="action-title">{a.title}</div>
              <div className="action-meta">
                <span>{a.when}</span>
              </div>
              <p>{a.why}</p>
              <p className="resources">
                <span>Resources:</span> {a.resources}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sms-block">
        <div className="sms-head">
          <h3>SMS preview (mock)</h3>
          <button type="button" onClick={copySms} className="btn-ghost">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="sms-text">{data.sms}</pre>
        <p className="muted tiny">
          Mock channel only — architecture ready for HUSIKA / SMS gateway. No paid SMS sent.
        </p>
      </section>
    </div>
  );
}
