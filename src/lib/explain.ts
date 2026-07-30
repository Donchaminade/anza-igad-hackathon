import type { ActionItem, Citation, ExplainResult, PersonaId, TriggerEvent } from "./types";
import { getFallback, getSourceLabel, getSources } from "./fixtures";

export function buildSms(
  event: TriggerEvent,
  personaId: PersonaId,
  actions: ActionItem[]
): string {
  const shortActions = actions
    .slice(0, 3)
    .map((a, i) => `${i + 1}) ${a.title}`)
    .join("; ");
  const top = event.indicators[0];
  const level = event.level.toUpperCase();
  const who = personaId === "drm" ? "DRM" : "EXT";
  return `ANZA ${who} ${level} ${event.location.name}: ${top?.indicator}=${top?.value}${top?.unit === "%" ? "%" : ""}. Act: ${shortActions}. Valid to ${new Date(event.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}.`;
}

export function getOfflineExplain(
  event: TriggerEvent,
  personaId: PersonaId,
  locale: "en" | "sw" = "en"
): ExplainResult {
  const fb = getFallback(event.id, personaId);
  if (!fb) {
    const citations: Citation[] = event.indicators.map((ind) => ({
      indicator: ind.indicator,
      value: `${ind.value}${ind.unit === "%" ? "%" : ""}`,
      threshold: `${ind.threshold} (${ind.level})`,
      sourceId: "icpac-thresholds",
    }));
    const actions: ActionItem[] = [
      {
        title: "Confirm indicator readings with county DRM desk",
        when: "Within 24 hours",
        why: `Trigger level is ${event.level} for ${event.location.name}.`,
        resources: "County DRM WhatsApp; NDMA liaison",
      },
      {
        title: "Share Alert Explain brief with ward admins",
        when: "Within 48 hours",
        why: "Field actors need plain-language actions, not raw indices.",
        resources: "ANZA SMS preview; chief network",
      },
      {
        title: "Schedule community baraza on water/feed",
        when: "This week",
        why: event.summary,
        resources: "Ward offices; water user associations",
      },
    ];
    return {
      explanation: `${event.summary} Indicators: ${event.indicators
        .map((i) => `${i.indicator}=${i.value}${i.unit === "%" ? "%" : ""}`)
        .join(", ")}. Confidence ${(event.confidence * 100).toFixed(0)}%.`,
      citations,
      actions,
      sms: buildSms(event, personaId, actions),
      source: "fallback",
      personaId,
      eventId: event.id,
      locale,
    };
  }

  let explanation = fb.explanation;
  let actions = fb.actions;
  let sms = fb.sms;

  if (locale === "sw") {
    explanation = `[SW] ${explanation}`;
    actions = actions.map((a) => ({
      ...a,
      title: a.title,
      when: a.when,
    }));
    sms = sms.replace("ANZA", "ANZA (SW)");
  }

  return {
    explanation,
    citations: fb.citations,
    actions,
    sms,
    source: "fallback",
    personaId,
    eventId: event.id,
    locale,
  };
}

export function buildGroundedPrompt(
  event: TriggerEvent,
  personaId: PersonaId,
  locale: "en" | "sw"
): string {
  const personaLabel =
    personaId === "extension"
      ? "Agricultural Extension Officer in Turkana"
      : "Local Civil Protection / DRM lead in Turkana";

  const sources = getSources()
    .map((s) => `${s.id}: ${s.label} (${s.url})`)
    .join("\n");

  return `You are ANZA, an anticipatory-action assistant for IGAD/ICPAC early warning.
You MUST only use the JSON context below. Do not invent indicator values.
Every claim about drought status must cite an indicator from the context.
Return valid JSON only with this shape:
{
  "explanation": "2-4 sentences plain language for the persona",
  "citations": [{"indicator":"","value":"","threshold":"","sourceId":""}],
  "actions": [{"title":"","when":"","why":"","resources":""}],
  "sms": "max 320 chars actionable SMS"
}

Rules:
- Exactly 3 actions, concrete, time-bound, Turkana-relevant
- SMS must include level + top indicator + 3 short actions
- Language: ${locale === "sw" ? "Swahili (simple)" : "English (simple, no jargon)"}
- Persona: ${personaLabel}
- sourceId must be one of: ${getSources().map((s) => s.id).join(", ")}

CONTEXT JSON:
${JSON.stringify(
  {
    event,
    sources: getSources(),
    note: "Demo fixtures inspired by ICPAC Thresholds & Triggers / Drought Watch — not operational forecasts.",
  },
  null,
  2
)}

Available sources:
${sources}
`;
}

export function parseExplainJson(
  raw: string,
  event: TriggerEvent,
  personaId: PersonaId,
  locale: "en" | "sw",
  model: string
): ExplainResult {
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(cleaned) as {
    explanation: string;
    citations: Citation[];
    actions: ActionItem[];
    sms: string;
  };

  if (!parsed.explanation || !Array.isArray(parsed.actions) || parsed.actions.length < 1) {
    throw new Error("Invalid LLM JSON shape");
  }

  const citations = (parsed.citations ?? []).map((c) => ({
    ...c,
    sourceId: c.sourceId || "icpac-thresholds",
  }));

  return {
    explanation: parsed.explanation,
    citations,
    actions: parsed.actions.slice(0, 3),
    sms: parsed.sms || buildSms(event, personaId, parsed.actions),
    source: "llm",
    model,
    personaId,
    eventId: event.id,
    locale,
  };
}

export { getSourceLabel };
