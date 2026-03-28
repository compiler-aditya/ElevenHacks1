# Platform Capabilities Reference — ElevenHacks Hackathon

> Use this document when brainstorming ideas. It covers everything Cloudflare and ElevenLabs can do, how they work, and how they connect. Workers and Durable Objects are covered in extra depth since judges specifically want creative use of these.

---

## CLOUDFLARE DEVELOPER PLATFORM

### Workers (Serverless Compute at the Edge)

Workers run JavaScript/TypeScript on Cloudflare's global network (300+ cities). They handle HTTP requests, WebSockets, scheduled events, and queued messages.

**What they can do:**
- Handle HTTP requests and responses (REST APIs, webhooks, proxy logic)
- Serve as the entry point that routes to Durable Objects, KV, R2, D1, Vectorize, etc.
- Run AI inference via Workers AI binding (`this.env.AI.run(...)`)
- Execute Puppeteer-based browser automation via Browser Rendering binding
- Process Queues messages (background jobs, pipelines)
- Run on cron schedules via `scheduled()` handler
- Act as WebSocket endpoints (though DO is preferred for stateful WS)

**Key limits (free tier):**
- 100,000 requests/day, 10ms CPU time per invocation
- Paid: unlimited requests, 30s CPU time (50ms on default)
- 128MB memory

**How to use in code:**
```ts
export default {
  async fetch(request, env) {
    // Route to a Durable Object
    const id = env.MY_DO.idFromName("room-123");
    const stub = env.MY_DO.get(id);
    return stub.fetch(request);
  },
  async scheduled(event, env) {
    // Cron-triggered background work
  }
};
```

---

### Durable Objects (Stateful Serverless) — DEEP DIVE

Durable Objects are the standout Cloudflare primitive. Each DO is a single-threaded JavaScript object with its own persistent storage that lives on the edge. Think of it as a "mini server" that is globally addressable, automatically created on first access, and sleeps when idle.

**Why judges care:** DO enables patterns impossible on other serverless platforms — real-time multiplayer, persistent agents, coordination, and stateful workflows — all without managing servers.

#### Core Properties

| Property | Detail |
|----------|--------|
| **Globally unique name/ID** | Address a specific instance from anywhere in the world |
| **Single-threaded** | All requests to one DO are serialized — no race conditions, no locks needed |
| **Persistent SQLite storage** | Up to 10GB per object, transactional, strongly consistent |
| **Hibernation** | Sleeps when idle, WebSocket clients stay connected, wakes on next message |
| **Auto-scaling** | Millions of objects across the network, no provisioning needed |
| **Location hints** | Optionally influence where an object runs (e.g., close to a user) |

#### Storage API (SQLite)

Each DO has an embedded SQLite database accessible via `this.ctx.storage.sql` or the higher-level `this.setState()`:

```ts
// Direct SQL
const rows = this.sql`SELECT * FROM users WHERE id = ${userId}`;

// Or higher-level state management (auto-syncs to all connected clients)
this.setState({ players: [...this.state.players, newPlayer] });
```

State set via `setState()` is:
- **Persistent** — survives restarts and hibernation
- **Synchronized** — changes broadcast to all connected WebSocket clients instantly
- **Bidirectional** — both server and clients can update
- **Immediately consistent** — read-your-own-writes

#### WebSockets (Real-Time Communication)

DOs can act as WebSocket servers connecting thousands of clients per instance. With Hibernation WebSocket API, clients stay connected even when the DO sleeps.

**Lifecycle hooks:**
| Hook | When called |
|------|-------------|
| `onStart()` | Once when DO first starts (before any connections) |
| `onConnect(connection, ctx)` | New WebSocket connection established |
| `onMessage(connection, message)` | WebSocket message received |
| `onClose(connection, code, reason)` | WebSocket connection closes |
| `onError(connection, error)` | WebSocket error occurs |
| `onStateChanged(state, source)` | State was updated (server or client) |

**Pattern — Chat/Game Room:**
```ts
export class GameRoom extends Agent {
  initialState = { players: [], gameState: "lobby" };

  onConnect(connection, ctx) {
    connection.send(JSON.stringify(this.state));
  }

  onMessage(connection, message) {
    const action = JSON.parse(message);
    // Process action, update state — auto-broadcasts to all clients
    this.setState({ ...this.state, ...newState });
  }
}
```

#### Alarms (Scheduled Execution)

DOs can schedule themselves to wake up at future times. Alarms survive restarts and have guaranteed at-least-once execution.

**Four scheduling modes:**
| Mode | Syntax | Example |
|------|--------|---------|
| Delayed | `this.schedule(60, "methodName", payload)` | Run in 60 seconds |
| Specific time | `this.schedule(new Date("2026-04-01"), ...)` | Run on April 1st |
| Cron | `this.schedule("0 8 * * *", ...)` | Every day at 8am |
| Interval | `this.scheduleEvery(30, ...)` | Every 30 seconds |

**Use cases:** Reminders, time capsules, polling, heartbeats, delayed notifications, recurring reports, game turns.

#### Agents SDK (Built on DO)

The `agents` package wraps Durable Objects into a higher-level Agent abstraction with:
- Built-in state management + client sync
- WebSocket lifecycle hooks
- Task scheduling via DO alarms
- SQL database per agent instance
- `AIChatAgent` subclass with automatic message persistence, resumable streaming, and tool support
- Client SDK (`useAgent` React hook) for connecting to agents from the browser

```ts
import { Agent } from "agents";

export class MyAgent extends Agent {
  initialState = { history: [] };

  async onMessage(connection, message) {
    // Call Workers AI
    const result = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [{ role: "user", content: message }]
    });
    connection.send(result.response);
  }

  async scheduledTask(payload) {
    // Runs when alarm fires
  }
}
```

#### RPC (Callable Methods)

Agent methods can be called directly from Workers without HTTP — like calling a function on a remote object:

```ts
// From a Worker:
const agent = env.MY_AGENT.get(id);
const result = await agent.myMethod(arg1, arg2); // Direct RPC call
```

---

### Workers AI (Serverless Inference)

Run AI models directly on Cloudflare's network with zero API keys. Access via `env.AI.run(model, inputs)`.

**Available model categories:**

| Task | Models | Usage |
|------|--------|-------|
| **Text Generation** | Llama 4 Scout, GLM-4.7-Flash, GPT-oss-120B, DeepSeek-R1, Kimi-K2.5, Nemotron-3, Qwen, Mistral, Hermes | Chat, reasoning, code, structured output |
| **Text-to-Image** | FLUX.2 Klein (4B/9B), FLUX.2 Dev, Stable Diffusion XL | Image generation from text prompts |
| **Text Embeddings** | BGE-base, BGE-M3 | Vector embeddings for search/RAG |
| **Translation** | M2M100-1.2B | 100+ language pairs |
| **Speech-to-Text** | Whisper (large-v3-turbo, tiny-en) | Audio transcription |
| **Text-to-Speech** | Deepgram Aura-2, MeloTTS | Voice synthesis |
| **Object Detection** | DETR-ResNet-50 | Detect objects in images |
| **Image-to-Text** | Llava-1.5 | Describe images |
| **Image Classification** | ResNet-50 | Classify images |
| **Text Classification** | DistilBERT | Sentiment analysis |
| **Summarization** | Various | Summarize text |

**Key features:**
- **Function calling** — models can call tools/functions (Llama 4, GLM-4.7, GPT-oss, Kimi-K2.5)
- **Reasoning mode** — step-by-step reasoning (DeepSeek-R1, GPT-oss)
- **Vision** — process images alongside text (Llama 4, Kimi-K2.5, Llava)
- **Streaming** — stream responses token-by-token over WebSockets
- **LoRA fine-tunes** — use custom LoRA adapters on supported models
- **Batch API** — process large batches asynchronously
- **Prompt caching** — save costs on repeated prompts
- **AI Gateway** — route across providers, eval responses, rate limiting

**Code example:**
```ts
// Text generation
const chat = await env.AI.run("@cf/meta/llama-4-scout-17b-16e-instruct", {
  messages: [{ role: "user", content: "Write a story about..." }]
});

// Image generation
const image = await env.AI.run("@cf/black-forest-labs/flux-2-klein-4b", {
  prompt: "A cat wearing a space suit"
});

// Embeddings
const vectors = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
  text: ["Hello world"]
});
```

---

### Vectorize (Vector Database for RAG)

Store and query vector embeddings for semantic search and retrieval-augmented generation.

**How it works with Agents:**
1. Generate embeddings via Workers AI (`bge-base-en-v1.5`)
2. Store in Vectorize with metadata
3. Query from any Agent method — Vectorize indexes are available on `this.env`
4. Use metadata to look up full records in the Agent's SQL database

```ts
// In an Agent method
const queryVector = await this.env.AI.run("@cf/baai/bge-base-en-v1.5", {
  text: [userQuery]
});
const results = await this.env.VECTOR_DB.query(queryVector.data[0], {
  topK: 10, returnMetadata: "all"
});
```

**Use cases:** Knowledge bases, semantic search, document retrieval, recommendation systems, chat history context.

---

### Browser Rendering (Headless Browser)

Spin up headless Chromium instances (via Puppeteer) from within Workers/Agents.

**What you can do:**
- Navigate to URLs and render pages
- Extract text/HTML content from any website
- Take screenshots of web pages
- Interact with pages (click, type, submit forms)
- Generate PDFs
- Feed extracted content to Workers AI for analysis

```ts
const browser = await puppeteer.launch(env.BROWSER);
const page = await browser.newPage();
await page.goto("https://example.com");
const content = await page.$eval("body", el => el.innerHTML);
// Feed to AI for analysis
const summary = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
  messages: [{ role: "user", content: `Summarize: ${content}` }]
});
```

**Use cases:** Content extraction, web scraping, screenshot generation, PDF generation, visual regression testing, compositing web-rendered content.

---

### Other Cloudflare Services

| Service | What it does | Use case |
|---------|-------------|----------|
| **R2** | S3-compatible object storage, zero egress fees | Store audio files, images, user uploads, generated media |
| **KV** | Eventually consistent key-value store, cached globally | Session data, config, API keys, feature flags |
| **D1** | Serverless SQLite database | Relational data, user profiles, app metadata |
| **Queues** | Message queuing with guaranteed delivery | Background processing, pipeline stages, async tasks |
| **Pipelines** | Streaming data ingestion | Event streams, analytics, log collection |
| **Pages** | Static site hosting (+ Functions) | Deploy frontend apps alongside Workers |
| **AI Gateway** | Proxy for AI API calls with caching, rate limiting, logging | Route between providers, monitor usage |
| **MCP Support** | Agents can be MCP servers or connect to external MCP servers | Tool ecosystem integration |

---

## ELEVENLABS PLATFORM

### Text-to-Speech (TTS)

Convert text to natural, human-quality speech. The core ElevenLabs product.

**Models:**
| Model | Latency | Quality | Best for |
|-------|---------|---------|----------|
| Flash v2.5 | ~75ms | High | Real-time apps, voice agents, interactive |
| Multilingual v2 | ~200ms | Highest | Narration, audiobooks, production content |
| Turbo v2.5 | ~130ms | High | Balance of speed and quality |

**Key features:**
- **5,000+ voices** in the Voice Library
- **31+ languages** supported
- **Emotion & style control** via text tags: `[cheerfully]`, `[whispering]`, `[angrily]`
- **SSML-like control** over pacing, emphasis, pauses
- **Streaming** — HTTP streaming or WebSocket streaming for real-time playback
- **WebSocket streaming** — send text incrementally (word-by-word from an LLM) and get audio back in real-time. Enables end-to-end low-latency voice pipelines

**Streaming architecture:**
```
LLM generates tokens → forward to EL WebSocket → audio chunks stream back → play immediately
```
Time-to-first-audio is just the time to synthesize the first audio chunk (~75ms with Flash), not the entire text.

**API:**
```ts
// Simple TTS
const audio = await elevenlabs.textToSpeech.convert("voice_id", {
  text: "Hello world",
  model_id: "eleven_flash_v2_5"
});

// Streaming TTS (for real-time playback)
const stream = await elevenlabs.textToSpeech.convertAsStream("voice_id", {
  text: "Long text here...",
  model_id: "eleven_flash_v2_5"
});
```

---

### Voice Cloning

Clone any voice from audio samples. Two tiers:

| Type | Samples needed | Quality | Latency |
|------|---------------|---------|---------|
| **Instant Voice Clone** | 1 minute of audio | Good | Instant |
| **Professional Voice Clone (PVC)** | 30+ minutes of audio | Highest fidelity | ~4 hours training |

Once cloned, the voice gets a `voice_id` and works with all ElevenLabs APIs (TTS, Agents, Dialogue, etc.).

**Use cases:** Personalized narration, preserve a person's voice for future use, brand voices, character consistency.

---

### Voice Design (Create Voices from Text)

Generate entirely new voices from a text description. No audio sample needed.

**Prompt format:**
```
Native English. Female, 25-35. High quality.
Persona: Friendly barista. Emotion: warm, upbeat.
Light Southern accent, medium pace, conversational delivery with a smile in the voice.
```

Generates 3 voice options per request. Save one to use across all EL APIs.

**Use cases:** Character creation, when you can't find the right voice in the library, rapid prototyping different personas.

---

### Text-to-Dialogue (Multi-Speaker Conversations)

Generate natural-sounding dialogue between multiple speakers from a script. Each line gets its own voice and emotion.

**How it works:**
```ts
const audio = await elevenlabs.textToDialogue.convert({
  inputs: [
    { text: "[cheerfully] Hello, how are you?", voice_id: "voice_a" },
    { text: "[thoughtfully] I've been better, honestly.", voice_id: "voice_b" },
    { text: "[encouragingly] Hey, things will get better!", voice_id: "voice_a" }
  ]
});
```

**Key features:**
- Emotion tags: `[cheerfully]`, `[whispering]`, `[angrily]`, `[sarcastically]`, `[thoughtfully]`, `[excitedly]`
- Natural turn-taking and timing between speakers
- Mix any voices (library, cloned, or designed)

**Use cases:** Podcasts, audiobooks with characters, dramatic readings, meeting simulations, courtroom dramas, storytelling.

---

### Conversational AI Agents (Real-Time Voice Agents)

Build voice agents that users can talk to in real-time. Full-duplex conversation with interruption handling.

**Architecture:**
```
User speaks → STT (automatic) → LLM processes → TTS response → User hears
```
All handled by ElevenLabs infrastructure. You configure the agent's behavior.

**Core components:**
- **System Prompt** — define personality, tone, knowledge, behavior
- **LLM Selection** — use ElevenLabs' models, GPT-4o, Claude, Gemini, or your own
- **Voice Selection** — any voice from library, cloned, or designed
- **Knowledge Base** — upload documents for RAG-grounded responses
- **Tools (Server Webhooks)** — agent can call external APIs mid-conversation
- **Client Tools** — trigger UI actions on the client side
- **MCP Integration** — connect to MCP tool servers
- **Workflows** — visual builder for multi-step conversation flows

**Conversation flow controls:**
| Setting | What it does |
|---------|-------------|
| **Turn timeout** | How long to wait during silence (1-30s) |
| **Soft timeout** | Speak filler ("Hmm...") while waiting for LLM response |
| **Interruptions** | Allow users to interrupt mid-speech |
| **Turn eagerness** | How quickly agent responds after user stops |

**WebSocket events (real-time):**
- Server→Client: audio chunks, transcripts, agent messages, tool calls
- Client→Server: audio input, context updates, tool responses

**Server Tools (Webhooks):**
Agents can call external APIs during conversation. The agent dynamically generates parameters based on conversation context:
```json
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "api": {
    "url": "https://api.weather.com/v1/current",
    "method": "GET"
  },
  "parameters": {
    "city": { "type": "string", "description": "City name" }
  }
}
```

**Use cases:** Customer support bots, interactive storytelling, language tutors, appointment booking, voice interfaces for apps.

---

### Dubbing (Voice Translation)

Translate audio/video into other languages while preserving the original speaker's voice characteristics.

**What it does:**
1. Transcribes source audio (any language)
2. Translates the transcript
3. Re-synthesizes speech in the target language using the original speaker's voice

**Supports:** 32+ languages, multiple speakers, video + audio input

```ts
const dubbing = await elevenlabs.dubbing.create({
  source_url: "https://example.com/video.mp4",
  target_lang: "es",  // Spanish
  source_lang: "en"
});
```

**Use cases:** Content localization, multilingual video, podcast translation, accessibility.

---

### Speech-to-Text (STT)

Transcribe audio with state-of-the-art accuracy.

**Models:**
| Model | Features |
|-------|----------|
| **Scribe v2** | 90+ languages, keyterm prompting (1000 terms), entity detection (56 types), word-level timestamps, speaker diarization (32 speakers), audio tagging |
| **Scribe v2 Realtime** | 90+ languages, real-time WebSocket transcription, ~150ms latency, word-level timestamps |

**Real-time STT via WebSocket:**
Stream audio to ElevenLabs and get transcription back in real-time. Essential for voice agent pipelines.

---

### Music Generation

Generate studio-grade music from text prompts.

**Capabilities:**
- Any genre, style, and structure
- Vocals or instrumental only
- Multilingual lyrics (English, Spanish, German, Japanese, etc.)
- Edit individual sections or the whole song
- **Music Finetunes** — train on your own tracks to capture your style/brand sound
- **Curated Finetunes** — pre-made styles (Afro House, Reggaeton, 80s Nu-Disco, Mozart-Style Symphony, etc.)

```ts
const music = await elevenlabs.music.generate({
  prompt: "Upbeat lo-fi hip hop beat with soft piano and vinyl crackle, 85 BPM",
  duration: 30
});
```

**Use cases:** Background music for content, jingles, soundtracks, podcast intros, game audio.

---

### Sound Effects

Generate sound effects from text descriptions.

**How it works:**
```
Input: "Heavy rain on a tin roof with distant thunder"
Output: Audio file of that exact sound
```

Adjustable duration and settings. Multiple variations per generation.

**Use cases:** Audio production, game audio, ambiance, podcast enhancement, immersive storytelling.

---

### Audio Isolation

Remove background noise from audio, isolating the voice track.

**Use cases:** Clean up noisy recordings, extract voice from mixed audio, pre-processing for voice cloning.

---

## HOW CLOUDFLARE + ELEVENLABS CONNECT

### Architecture Patterns

**Pattern 1: CF Agent as Voice App Backend**
```
Browser → WebSocket → CF Durable Object (Agent)
                         ├── Workers AI (text gen, reasoning)
                         ├── ElevenLabs TTS API (voice output)
                         ├── ElevenLabs STT API (voice input)
                         ├── Vectorize (knowledge retrieval)
                         └── R2 (audio storage)
```

**Pattern 2: EL Conversational Agent + CF Server Tools**
```
User Voice → ElevenLabs Conversational Agent
               ├── LLM (built-in or external)
               └── Server Tool Webhook → CF Worker
                                           ├── Durable Object (state)
                                           ├── Workers AI (analysis)
                                           ├── D1/KV (data lookup)
                                           └── Returns data to agent
```

**Pattern 3: Content Generation Pipeline**
```
CF Worker receives request
  → Workers AI generates script
  → EL Text-to-Dialogue generates multi-voice audio
  → EL Music generates background track
  → EL Sound Effects generates ambiance
  → Browser Rendering composites into video
  → R2 stores final output
  → DO tracks generation state + sharing
```

**Pattern 4: Real-Time Translation at the Edge**
```
User speaks → CF Worker (edge, low latency)
  → EL STT (transcribe)
  → Workers AI (translate)
  → EL TTS with Voice Clone (speak in user's voice, target language)
  → Stream audio back
  → DO maintains conversation context
```

### Key Synergies

| CF Feature | EL Feature | Why they combine well |
|------------|-----------|----------------------|
| **DO state + alarms** | **TTS + Voice Clone** | Schedule personalized voice content delivery |
| **DO WebSockets** | **EL Streaming TTS** | Real-time voice streaming to multiple clients |
| **Workers AI (text gen)** | **Text-to-Dialogue** | AI writes script → EL voices it with multiple characters |
| **Workers AI (image gen)** | **TTS + Sound Effects** | Generate visual + audio content in parallel |
| **Browser Rendering** | **TTS + Music** | Extract web content → generate audiobook/podcast |
| **Vectorize (RAG)** | **Conversational AI** | Grounded voice conversations with domain knowledge |
| **DO (persistent state)** | **Voice Clone** | Remember user's voice + preferences across sessions |
| **Workers AI (translation)** | **Dubbing / TTS** | Edge-translated content with voice preservation |
| **Queues** | **Music + SFX + TTS** | Pipeline multi-step audio production asynchronously |
| **R2** | **All audio APIs** | Store generated audio (voices, music, SFX) durably |

### The "Edge Advantage" Argument

When pitching to judges, the key question is: **"Why does this need Cloudflare's edge, and not just any backend?"**

Strong answers:
- "DO gives us persistent per-user/per-room state with zero infrastructure" (multiplayer, personalization)
- "DO alarms let us schedule future voice delivery natively" (time capsules, reminders, bedtime stories)
- "Edge compute means sub-100ms round trips for real-time voice" (translation, live conversation)
- "Browser Rendering lets us extract + process web content server-side" (audiobook from URL)
- "Each user gets their own DO instance — we scale to millions without thinking about it"
- "WebSocket hibernation means we only pay when users are active, but connections stay alive"

Weak answers (avoid):
- "We deployed it on Cloudflare Pages" (just hosting, no depth)
- "We used Workers AI for one API call" (could be any inference provider)
