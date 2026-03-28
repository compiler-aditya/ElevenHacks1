/**
 * Setup ElevenLabs Conversational AI Agent for VANI
 *
 * Run with: npm run setup-el -- or npx tsx scripts/setup-el-agent.ts
 *
 * Prerequisites:
 * - ELEVENLABS_API_KEY env var set
 * - Worker deployed to get the webhook base URL
 */

import { EL_AGENT_SYSTEM_PROMPT, EL_AGENT_FIRST_MESSAGE } from "../src/ai/prompts";

const API_BASE = "https://api.elevenlabs.io/v1";
const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error("Error: ELEVENLABS_API_KEY environment variable not set");
  process.exit(1);
}

const WEBHOOK_BASE_URL = process.env.VANI_WORKER_URL || "https://vani.a84580912.workers.dev";

const headers = {
  "xi-api-key": API_KEY,
  "Content-Type": "application/json",
};

// ─── Step 1: Create a Hindi Voice ────────────────────────────────────
async function createVoice(): Promise<string> {
  console.log("🎙️  Creating Hindi voice persona...");

  const resp = await fetch(`${API_BASE}/text-to-voice/create-previews`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      voice_description:
        "Native Hindi speaker. Female, 30-40 years old. Warm, maternal, like a caring older sister (didi). Patient and encouraging tone. Gentle Hindi intonation with medium-slow pace. Clear pronunciation suitable for elderly listeners.",
      text: "Namaste! Main VANI hoon, aapki digital didi. Main aapko government forms bharne mein madad karungi. Aapko kuch bhi type ya padhne ki zaroorat nahi — bas mujhse baat kariye!",
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error("Voice creation failed:", err);
    throw new Error(`Voice creation failed: ${resp.status}`);
  }

  const data = (await resp.json()) as {
    previews: Array<{ generated_voice_id: string; audio_base_64: string }>;
  };

  // Use the first generated voice
  const voiceId = data.previews[0].generated_voice_id;
  console.log(`   Voice created: ${voiceId}`);

  // Save the voice permanently
  const saveResp = await fetch(`${API_BASE}/text-to-voice/create-voice-from-preview`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      voice_name: "VANI Didi",
      voice_description: "Hindi digital didi - warm, patient, encouraging",
      generated_voice_id: voiceId,
    }),
  });

  if (!saveResp.ok) {
    console.warn("   Could not save voice permanently, using preview ID");
    return voiceId;
  }

  const savedVoice = (await saveResp.json()) as { voice_id: string };
  console.log(`   Voice saved permanently: ${savedVoice.voice_id}`);
  return savedVoice.voice_id;
}

// ─── Step 2: Create Server Tools ─────────────────────────────────────
interface ServerTool {
  name: string;
  description: string;
  url: string;
  method: string;
  parameters: {
    type: string;
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required: string[];
  };
}

function getServerTools(): ServerTool[] {
  return [
    {
      name: "identify_user",
      description:
        "Identify or create a user profile. Call this at the start of every conversation. Returns saved fields if user has filled forms before.",
      url: `${WEBHOOK_BASE_URL}/api/webhook/identify-user`,
      method: "POST",
      parameters: {
        type: "object",
        properties: {
          phone: {
            type: "string",
            description: "User's phone number (used as unique identifier)",
          },
          name: {
            type: "string",
            description: "User's name if they provide it",
          },
          language: {
            type: "string",
            description: "User's preferred language",
            enum: ["hi", "en", "ta", "te", "bn", "mr"],
          },
        },
        required: ["phone"],
      },
    },
    {
      name: "navigate_form",
      description:
        "Open a government form in the browser. Call this when the user says they want to fill a form or apply for a scheme.",
      url: `${WEBHOOK_BASE_URL}/api/webhook/navigate-form`,
      method: "POST",
      parameters: {
        type: "object",
        properties: {
          phone: {
            type: "string",
            description: "User's phone number",
          },
          form_type: {
            type: "string",
            description: "Type of form to fill",
            enum: ["pm-kisan", "ration-card", "ayushman-bharat"],
          },
        },
        required: ["phone", "form_type"],
      },
    },
    {
      name: "fill_field",
      description:
        "Fill a single field in the currently open form. Call this after collecting a field value from the user.",
      url: `${WEBHOOK_BASE_URL}/api/webhook/fill-field`,
      method: "POST",
      parameters: {
        type: "object",
        properties: {
          phone: {
            type: "string",
            description: "User's phone number",
          },
          session_id: {
            type: "string",
            description: "Browser session ID from navigate_form response",
          },
          field_name: {
            type: "string",
            description: "Name of the field to fill",
            enum: [
              "aadhaar",
              "fullName",
              "state",
              "district",
              "subDistrict",
              "village",
              "bankAccount",
              "ifscCode",
            ],
          },
          value: {
            type: "string",
            description: "The value to fill in the field (as spoken by user)",
          },
        },
        required: ["phone", "session_id", "field_name", "value"],
      },
    },
    {
      name: "read_screen",
      description:
        "Read and translate the current page content. Use when you need to understand what's on the screen, like after a page load or when the user asks what they see.",
      url: `${WEBHOOK_BASE_URL}/api/webhook/read-screen`,
      method: "POST",
      parameters: {
        type: "object",
        properties: {
          phone: {
            type: "string",
            description: "User's phone number",
          },
          session_id: {
            type: "string",
            description: "Browser session ID",
          },
        },
        required: ["phone"],
      },
    },
    {
      name: "check_status",
      description:
        "Check the status of a PM Kisan application using Aadhaar number or application ID.",
      url: `${WEBHOOK_BASE_URL}/api/webhook/check-status`,
      method: "POST",
      parameters: {
        type: "object",
        properties: {
          phone: {
            type: "string",
            description: "User's phone number",
          },
          identifier: {
            type: "string",
            description: "Aadhaar number or application ID to check status for",
          },
        },
        required: ["phone", "identifier"],
      },
    },
  ];
}

// ─── Step 3: Create the Conversational AI Agent ──────────────────────
async function createAgent(voiceId: string): Promise<string> {
  console.log("🤖 Creating ElevenLabs Conversational Agent...");

  const tools = getServerTools();

  const agentConfig = {
    conversation_config: {
      agent: {
        prompt: {
          prompt: EL_AGENT_SYSTEM_PROMPT,
        },
        first_message: EL_AGENT_FIRST_MESSAGE,
        language: "hi",
      },
      tts: {
        voice_id: voiceId,
        model_id: "eleven_flash_v2_5",
        optimize_streaming_latency: 3,
      },
      stt: {
        provider: "elevenlabs",
        model: "scribe_v2",
        language: "hi",
        keywords: [
          "Aadhaar:2",
          "PM Kisan:3",
          "Kisan:2",
          "IFSC:2",
          "bank:1",
          "khata:1",
          "rajya:1",
          "zila:1",
          "tehsil:1",
          "gaon:1",
          "Yojana:2",
          "form:1",
        ],
      },
      turn: {
        turn_timeout: 15,
        mode: "turn",
      },
      conversation: {
        max_duration_seconds: 600,
      },
    },
    platform_settings: {
      auth: {
        enable_auth: false,
      },
    },
    name: "VANI - Digital Didi",
    tags: ["vani", "hindi", "government", "form-filling"],
  };

  // Create agent with all tools at once
  console.log(`   Registering ${tools.length} server tools...`);
  const createBody = {
    ...agentConfig,
    conversation_config: {
      ...agentConfig.conversation_config,
      agent: {
        ...agentConfig.conversation_config.agent,
        tools: tools.map((t) => ({
          type: "webhook",
          name: t.name,
          description: t.description,
          api_schema: {
            url: t.url,
            method: t.method,
            request_body_schema: t.parameters,
          },
        })),
      },
    },
  };

  const toolResp = await fetch(`${API_BASE}/convai/agents/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(createBody),
  });

  if (toolResp.ok) {
    const agent = (await toolResp.json()) as { agent_id: string };
    console.log(`\n✅ Agent created successfully!`);
    console.log(`   Agent ID: ${agent.agent_id}`);
    console.log(`\n   Run: wrangler secret put EL_AGENT_ID`);
    console.log(`   Then paste: ${agent.agent_id}`);
    return agent.agent_id;
  }

  const err = await toolResp.text();
  console.error("Agent creation failed:", err);
  throw new Error(`Failed to create agent: ${err}`);
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   VANI — ElevenLabs Agent Setup      ║");
  console.log("╚══════════════════════════════════════╝\n");

  console.log(`Webhook Base URL: ${WEBHOOK_BASE_URL}\n`);

  // Step 1: Use existing voice or create new one
  const existingVoiceId = process.env.VANI_VOICE_ID;
  const voiceId = existingVoiceId || await createVoice();
  console.log(`Using voice: ${voiceId}`);

  // Step 2: Create agent with tools
  const agentId = await createAgent(voiceId);

  console.log("\n╔══════════════════════════════════════╗");
  console.log("║          Setup Complete!              ║");
  console.log("╚══════════════════════════════════════╝");
  console.log(`\nVoice ID: ${voiceId}`);
  console.log(`Agent ID: ${agentId}`);
  console.log(`\nNext steps:`);
  console.log(`1. wrangler secret put EL_AGENT_ID`);
  console.log(`2. Paste: ${agentId}`);
  console.log(`3. npm run deploy`);
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
