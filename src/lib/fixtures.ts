import triggersData from "../../data/fixtures/triggers.json";
import fallbacksData from "../../data/fixtures/fallbacks.json";
import type {
  FallbackMap,
  Persona,
  PersonaId,
  SourceRef,
  TriggerEvent,
  TriggersFixture,
} from "./types";

export const fixtures = triggersData as TriggersFixture;
export const fallbacks = fallbacksData as FallbackMap;

export function getEvents(): TriggerEvent[] {
  return [...fixtures.events].sort(
    (a, b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime()
  );
}

export function getEvent(id: string): TriggerEvent | undefined {
  return fixtures.events.find((e) => e.id === id);
}

export function getPersonas(): Persona[] {
  return fixtures.personas;
}

export function getPersona(id: PersonaId): Persona | undefined {
  return fixtures.personas.find((p) => p.id === id);
}

export function getSources(): SourceRef[] {
  return fixtures.meta.sources;
}

export function getSourceLabel(sourceId: string): string {
  return fixtures.meta.sources.find((s) => s.id === sourceId)?.label ?? sourceId;
}

export function getZone() {
  return fixtures.meta.zone;
}

export function getFallback(
  eventId: string,
  personaId: PersonaId
): FallbackMap[string][PersonaId] | undefined {
  return fallbacks[eventId]?.[personaId];
}
