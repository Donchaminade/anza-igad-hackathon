import type { ExplainResult, PersonaId, TriggerEvent } from "./types";
import { buildGroundedPrompt, getOfflineExplain, parseExplainJson } from "./explain";

export function llmStatus(): {
  configured: boolean;
  provider: string;
} {
  if (process.env.AI_GATEWAY_API_KEY) {
    return { configured: true, provider: "vercel-ai-gateway" };
  }
  if (process.env.GROQ_API_KEY) {
    return { configured: true, provider: "groq" };
  }
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return { configured: true, provider: "google-gemini" };
  }
  if (process.env.OPENAI_API_KEY) {
    return { configured: true, provider: "openai" };
  }
  return { configured: false, provider: "fallback-only" };
}

function hasLlmKey(): boolean {
  return llmStatus().configured;
}

async function callOpenAiCompatible(options: {
  url: string;
  apiKey: string;
  model: string;
  prompt: string;
}): Promise<string> {
  const res = await fetch(options.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Return JSON only. Ground every claim in the provided context. Never invent indicator values.",
        },
        { role: "user", content: options.prompt },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`LLM HTTP ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? "";
}

async function callLlm(prompt: string): Promise<{ text: string; model: string }> {
  if (process.env.AI_GATEWAY_API_KEY) {
    const model = process.env.AI_MODEL || "openai/gpt-4.1-mini";
    const text = await callOpenAiCompatible({
      url: "https://ai-gateway.vercel.sh/v1/chat/completions",
      apiKey: process.env.AI_GATEWAY_API_KEY,
      model,
      prompt,
    });
    return { text, model };
  }

  if (process.env.GROQ_API_KEY) {
    const model = process.env.AI_MODEL || "llama-3.3-70b-versatile";
    const text = await callOpenAiCompatible({
      url: "https://api.groq.com/openai/v1/chat/completions",
      apiKey: process.env.GROQ_API_KEY,
      model,
      prompt,
    });
    return { text, model };
  }

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const model = process.env.AI_MODEL || "gemini-2.0-flash";
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    });
    if (!res.ok) {
      throw new Error(`Gemini error ${res.status}: ${await res.text()}`);
    }
    const data = (await res.json()) as {
      candidates: { content: { parts: { text: string }[] } }[];
    };
    return {
      text: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
      model,
    };
  }

  if (process.env.OPENAI_API_KEY) {
    const model = process.env.AI_MODEL || "gpt-4.1-mini";
    const text = await callOpenAiCompatible({
      url: "https://api.openai.com/v1/chat/completions",
      apiKey: process.env.OPENAI_API_KEY,
      model,
      prompt,
    });
    return { text, model };
  }

  throw new Error("No LLM API key configured");
}

export async function explainEvent(options: {
  event: TriggerEvent;
  personaId: PersonaId;
  locale?: "en" | "sw";
  forceFallback?: boolean;
}): Promise<ExplainResult> {
  const locale = options.locale ?? "en";
  const { event, personaId, forceFallback } = options;

  if (forceFallback || !hasLlmKey()) {
    return getOfflineExplain(event, personaId, locale);
  }

  try {
    const prompt = buildGroundedPrompt(event, personaId, locale);
    const { text, model } = await callLlm(prompt);
    return parseExplainJson(text, event, personaId, locale, model);
  } catch (err) {
    console.error("[anza] LLM failed, using fallback:", err);
    return getOfflineExplain(event, personaId, locale);
  }
}
