import type { DurableObjectNamespace, Fetcher, R2Bucket, KVNamespace, Ai } from "@cloudflare/workers-types";

// ─── Environment Bindings ────────────────────────────────────────────
export interface Env {
  AI: Ai;
  BROWSER: Fetcher;
  VANI_AGENT: DurableObjectNamespace;
  ASSETS_BUCKET: R2Bucket;
  CACHE: KVNamespace;

  // Secrets (wrangler secret put)
  ELEVENLABS_API_KEY: string;
  EL_AGENT_ID: string;
  WEBHOOK_SECRET: string;
}

// ─── VaniAgent State (synced to frontend via WebSocket) ──────────────
export interface VaniState {
  /** Current step in form-filling flow */
  currentStep: string;
  /** Number of fields filled / total */
  formProgress: { filled: number; total: number };
  /** Last message spoken by the agent */
  lastMessage: string;
  /** URL to latest browser screenshot */
  screenshotUrl: string | null;
  /** Active browser session ID */
  sessionId: string | null;
  /** Current language */
  language: string;
  /** User's phone number hash (DO key) */
  userKey: string | null;
  /** Whether browser is actively navigating */
  isBrowsing: boolean;
  /** Error message if any */
  error: string | null;
}

// ─── User Profile (SQLite) ──────────────────────────────────────────
export interface UserProfile {
  id: number;
  phone_hash: string;
  name: string | null;
  language: string;
  aadhaar_masked: string | null; // last 4 digits only
  state: string | null;
  district: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Saved Fields (SQLite) ──────────────────────────────────────────
export interface SavedField {
  id: number;
  user_id: number;
  form_type: string;
  field_name: string;
  field_value_encrypted: string; // AES-256 encrypted
  created_at: string;
  updated_at: string;
}

// ─── Interaction Log (SQLite) ────────────────────────────────────────
export interface Interaction {
  id: number;
  user_id: number;
  session_id: string;
  action: string;
  details: string; // JSON
  timestamp: string;
}

// ─── Scheduled Event (SQLite) ────────────────────────────────────────
export interface ScheduledEvent {
  id: number;
  user_id: number;
  event_type: string; // "reminder" | "follow_up" | "deadline"
  trigger_at: string; // ISO datetime
  payload: string; // JSON
  status: "pending" | "fired" | "cancelled";
  created_at: string;
}

// ─── Form Field Info ─────────────────────────────────────────────────
export interface FormFieldInfo {
  name: string;
  label: string;
  labelHindi: string;
  type: "text" | "dropdown" | "radio" | "checkbox" | "date" | "file";
  required: boolean;
  validation?: string; // regex pattern
  options?: string[]; // for dropdowns/radios
  hint?: string; // voice prompt hint in Hindi
  order: number;
}

// ─── PM Kisan Form Fields (hardcoded for demo reliability) ───────────
export const PM_KISAN_FIELDS: FormFieldInfo[] = [
  {
    name: "aadhaar",
    label: "Aadhaar Number",
    labelHindi: "आधार नंबर",
    type: "text",
    required: true,
    validation: "^[0-9]{12}$",
    hint: "Apna barah digit ka Aadhaar number bataiye",
    order: 1,
  },
  {
    name: "fullName",
    label: "Full Name",
    labelHindi: "पूरा नाम",
    type: "text",
    required: true,
    hint: "Apna poora naam bataiye jaise Aadhaar card mein hai",
    order: 2,
  },
  {
    name: "state",
    label: "State",
    labelHindi: "राज्य",
    type: "dropdown",
    required: true,
    hint: "Aap kis rajya mein rehte hain?",
    order: 3,
  },
  {
    name: "district",
    label: "District",
    labelHindi: "ज़िला",
    type: "dropdown",
    required: true,
    hint: "Apna zila bataiye",
    order: 4,
  },
  {
    name: "subDistrict",
    label: "Sub-District / Tehsil",
    labelHindi: "तहसील",
    type: "dropdown",
    required: true,
    hint: "Apni tehsil bataiye",
    order: 5,
  },
  {
    name: "village",
    label: "Village",
    labelHindi: "गाँव",
    type: "dropdown",
    required: true,
    hint: "Apne gaon ka naam bataiye",
    order: 6,
  },
  {
    name: "bankAccount",
    label: "Bank Account Number",
    labelHindi: "बैंक खाता नंबर",
    type: "text",
    required: true,
    hint: "Apna bank khata number bataiye",
    order: 7,
  },
  {
    name: "ifscCode",
    label: "IFSC Code",
    labelHindi: "IFSC कोड",
    type: "text",
    required: true,
    validation: "^[A-Z]{4}0[A-Z0-9]{6}$",
    hint: "Bank ka IFSC code bataiye, ye passbook pe likha hota hai",
    order: 8,
  },
];

// ─── Webhook Request/Response Types ──────────────────────────────────
export interface WebhookRequest {
  phone: string;
  [key: string]: unknown;
}

export interface IdentifyUserRequest extends WebhookRequest {
  name?: string;
  language?: string;
}

export interface NavigateFormRequest extends WebhookRequest {
  form_type: string;
}

export interface FillFieldRequest extends WebhookRequest {
  session_id: string;
  field_name: string;
  value: string;
}

export interface ReadScreenRequest extends WebhookRequest {
  session_id: string;
}

export interface CheckStatusRequest extends WebhookRequest {
  identifier: string; // Aadhaar or application ID
}

export interface WebhookResponse {
  success: boolean;
  message_for_agent: string; // Hindi text for EL agent to speak
  data?: Record<string, unknown>;
}

// ─── ElevenLabs Types ────────────────────────────────────────────────
export interface ELServerToolCall {
  tool_name: string;
  parameters: Record<string, unknown>;
}

export interface ELAgentConfig {
  name: string;
  conversation_config: {
    agent: {
      prompt: {
        prompt: string;
      };
      first_message: string;
      language: string;
    };
    tts: {
      voice_id: string;
    };
    stt: {
      language: string;
    };
    turn: {
      turn_timeout: number;
    };
  };
}
