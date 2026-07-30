"use client";

import { useState } from "react";
import { ExplainPanel } from "./ExplainPanel";
import type { Persona, PersonaId } from "@/lib/types";

export function PersonaExplain({
  eventId,
  personas,
}: {
  eventId: string;
  personas: Persona[];
}) {
  const [personaId, setPersonaId] = useState<PersonaId>("extension");
  const [locale, setLocale] = useState<"en" | "sw">("en");

  return (
    <div className="persona-explain">
      <div className="persona-toolbar">
        <div className="seg" role="tablist" aria-label="Persona">
          {personas.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={personaId === p.id}
              className={personaId === p.id ? "active" : ""}
              onClick={() => setPersonaId(p.id as PersonaId)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="seg compact" role="tablist" aria-label="Language">
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === "sw" ? "active" : ""}
            onClick={() => setLocale("sw")}
          >
            SW
          </button>
        </div>
      </div>
      <p className="persona-role muted">
        {personas.find((p) => p.id === personaId)?.role}
      </p>
      <ExplainPanel eventId={eventId} personaId={personaId} locale={locale} />
    </div>
  );
}
