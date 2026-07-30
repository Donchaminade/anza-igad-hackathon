# Devpost draft — ANZA (≤250 words each)

## Project Overview (draft)

ANZA (Swahili: begin) closes the gap between early warning and early action. When an ICPAC-style drought threshold is crossed in Turkana County, Kenya, field actors still face jargon-heavy indicators and no clear next step under low bandwidth. ANZA is a Progressive Web App that turns trigger events into grounded explanations, three persona-specific anticipatory actions, and a ready-to-send SMS preview. It serves agricultural extension officers and local civil protection leads — not as another monitoring dashboard, but as the last mile after Thresholds & Triggers fire. Offline fixture fallbacks keep the demo reliable without an LLM key. ANZA complements ICPAC Drought Watch, Hazard Watch, and HUSIKA; it does not replace them.

## Solution Details (draft)

Users open a drought trigger (Watch, Alert, Alarm). ANZA shows the indicator values that crossed thresholds (SPI-3, VCI, soil moisture, dekadal rainfall). An `/api/explain` route calls an optional LLM (Vercel AI Gateway, Groq, Gemini, or OpenAI) with JSON-only context and mandatory citations; if no key or the call fails, pre-grounded fixture responses are returned. Personas switch between extension and DRM action cards. A mock SMS block is copyable for HUSIKA-style channels. Stack: Next.js, TypeScript, Tailwind, Leaflet, PWA service worker, JSON fixtures. Demo zone: Turkana, Kenya. One hazard: drought.

## Video script (3–4 min)

1. Problem (30s): Thresholds fire; communities still wait. Show Drought Watch → then “so what do I do?”
2. ANZA hero (20s): Brand + Turkana map.
3. Demo Alarm (90s): Open Kakuma Alarm → explain citations → switch persona → copy SMS.
4. Tech integrity (40s): Fixtures + fallback + “no custom forecast model”.
5. Impact close (30s): Scalable pattern for IGAD anticipatory action.
