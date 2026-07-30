export type TriggerLevel = "watch" | "alert" | "alarm" | "emergency" | "recovering";

export type PersonaId = "extension" | "drm";

export interface SourceRef {
  id: string;
  label: string;
  url: string;
}

export interface Zone {
  id: string;
  name: string;
  country: string;
  adminLevel: string;
  igadMember: boolean;
  centroid: { lat: number; lng: number };
  bbox: number[];
}

export interface Threshold {
  id: string;
  indicator: string;
  fullName: string;
  unit: string;
  alert: number;
  alarm: number;
  emergency: number;
  direction: "below" | "above";
  sourceId: string;
}

export interface IndicatorReading {
  thresholdId: string;
  indicator: string;
  value: number;
  threshold: number;
  level: TriggerLevel;
  unit: string;
}

export interface TriggerEvent {
  id: string;
  title: string;
  hazard: string;
  level: TriggerLevel;
  triggeredAt: string;
  location: { name: string; lat: number; lng: number };
  summary: string;
  indicators: IndicatorReading[];
  confidence: number;
  validUntil: string;
}

export interface Persona {
  id: PersonaId;
  name: string;
  nameSw: string;
  role: string;
  channel: string;
  icon: string;
}

export interface Citation {
  indicator: string;
  value: string;
  threshold: string;
  sourceId: string;
}

export interface ActionItem {
  title: string;
  when: string;
  why: string;
  resources: string;
}

export interface ExplainResult {
  explanation: string;
  citations: Citation[];
  actions: ActionItem[];
  sms: string;
  source: "llm" | "fallback";
  model?: string;
  personaId: PersonaId;
  eventId: string;
  locale: "en" | "sw";
}

export interface TriggersFixture {
  meta: {
    hazard: string;
    zone: Zone;
    sources: SourceRef[];
    disclaimer: string;
  };
  thresholds: Threshold[];
  personas: Persona[];
  events: TriggerEvent[];
}

export type FallbackMap = Record<
  string,
  Partial<Record<PersonaId, Omit<ExplainResult, "source" | "personaId" | "eventId" | "locale" | "model">>>
>;
