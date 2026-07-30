# ANZA

**From drought threshold to field action.**

ANZA (Swahili: *begin / start*) is a Progressive Web App for the [IGAD Hackathon 2026](https://igad-husika-hackathon.devpost.com/). When an ICPAC-style drought threshold is crossed, ANZA explains **why** (grounded citations) and delivers **3 early actions** + an **SMS preview** for two field personas in **Turkana County, Kenya**.

> Not a Drought Watch / Hazard Watch clone. ANZA is the **last mile**: trigger → understand → act.

## Demo zone & personas

| | |
|--|--|
| **Hazard** | Drought only |
| **Zone** | Turkana County, Kenya (IGAD) |
| **Persona 1** | Agricultural Extension Officer |
| **Persona 2** | Local Civil Protection / DRM lead |
| **Channels** | In-app brief + SMS mock (HUSIKA-ready) |

## Flow (E2E)

1. Browse live trigger events (Watch / Alert / Alarm / Recovering)
2. Open an alert → see indicators that crossed thresholds
3. Switch persona (Extension / DRM) + language (EN / SW label)
4. `/api/explain` returns grounded explain + 3 ActionCards + SMS
5. Copy SMS for low-bandwidth dissemination (mock — no paid SMS)

## Stack

- **Next.js 15** + TypeScript + Tailwind CSS v4
- **PWA** via `@ducanh2912/next-pwa` (installable, offline shell)
- **Leaflet** map (Turkana bbox + trigger markers)
- **JSON fixtures** inspired by ICPAC Thresholds & Triggers / Drought Watch
- **LLM** optional: Vercel AI Gateway · Groq · Gemini · OpenAI
- **Fallback** 100% offline with pre-grounded fixture responses

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — works without any key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### LLM keys (optional)

The demo is fully usable **without** a key (fixture fallback). To enable live grounded generation, set **one** of:

```env
# Preferred on Vercel
AI_GATEWAY_API_KEY=
AI_MODEL=openai/gpt-4.1-mini

# Groq free tier — https://console.groq.com/
GROQ_API_KEY=
AI_MODEL=llama-3.3-70b-versatile

# Google AI Studio — https://aistudio.google.com/apikey
GOOGLE_GENERATIVE_AI_API_KEY=
AI_MODEL=gemini-2.0-flash

# OpenAI
OPENAI_API_KEY=
AI_MODEL=gpt-4.1-mini
```

Never commit secrets. `.env*` is gitignored; `.env.example` is the template.

## Architecture

```
TriggerEvent (fixtures)
        │
        ▼
  POST /api/explain
        │
        ├── LLM key present? → grounded JSON (citations mandatory)
        │
        └── else / LLM error → fallbacks.json (same shape, fixture-cited)
        │
        ▼
  Explain + 3 ActionCards + SMS preview (persona-aware)
```

```
data/fixtures/triggers.json   # zone, thresholds, events, personas
data/fixtures/fallbacks.json  # offline grounded explains
src/app/api/explain/route.ts  # LLM + fallback
src/components/*              # map, cards, persona explain
```

## Data attribution (ICPAC)

Demo fixtures are **illustrative**, inspired by public ICPAC early-warning concepts — **not** operational forecasts.

| System | URL |
|--------|-----|
| ICPAC Thresholds & Triggers | https://eatriggersthresholds.icpac.net/ |
| ICPAC Drought Watch | https://droughtwatch.icpac.net/ |
| ICPAC Hazard Watch | https://hazardwatch.icpac.net/ |
| HUSIKA | https://husika.icpac.net/ |
| ICPAC | https://www.icpac.net/ |

Indicators used in fixtures: **SPI-3**, **VCI**, **Soil Moisture Anomaly**, **Dekadal Rainfall % of Normal**.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Hackathon notes

- **Problem:** Thresholds fire, but field actors still lack clear next actions under low bandwidth.
- **Innovation:** Grounded GenAI that *writes* action briefs from threshold JSON — not a custom climate model.
- **Integrity:** Citations required; offline fallback always available; SMS is mocked.

## License

MIT — see `LICENSE`. ICPAC platforms remain the property of their respective owners; ANZA only references them.
