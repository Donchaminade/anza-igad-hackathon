import { NextResponse } from "next/server";
import { getEvent } from "@/lib/fixtures";
import { explainEvent, llmStatus } from "@/lib/llm";
import type { PersonaId } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "anza-explain",
    llm: llmStatus(),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      eventId?: string;
      personaId?: PersonaId;
      locale?: "en" | "sw";
      forceFallback?: boolean;
    };

    const eventId = body.eventId;
    const personaId = body.personaId ?? "extension";
    const locale = body.locale ?? "en";

    if (!eventId) {
      return NextResponse.json({ error: "eventId required" }, { status: 400 });
    }
    if (personaId !== "extension" && personaId !== "drm") {
      return NextResponse.json({ error: "personaId must be extension|drm" }, { status: 400 });
    }

    const event = getEvent(eventId);
    if (!event) {
      return NextResponse.json({ error: "event not found" }, { status: 404 });
    }

    const result = await explainEvent({
      event,
      personaId,
      locale,
      forceFallback: body.forceFallback === true,
    });

    return NextResponse.json({
      ...result,
      llm: llmStatus(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "explain failed", detail: err instanceof Error ? err.message : "unknown" },
      { status: 500 }
    );
  }
}
