import { Agent, type Connection, type Schedule } from "agents";
import { callable } from "agents";
import type {
  Env,
  VaniState,
  WebhookResponse,
  FormFieldInfo,
} from "../types";
import { PM_KISAN_FIELDS } from "../types";
import { PMKisanNavigator } from "../browser/form-navigator";
import {
  FIELD_MAPPING_PROMPT,
  TRANSLATE_TO_HINDI_PROMPT,
  SUMMARIZE_FOR_VOICE_PROMPT,
  VALIDATE_FIELD_PROMPT,
  EXTRACT_PAGE_CONTEXT_PROMPT,
} from "../ai/prompts";

// ─── VaniAgent: One per user, keyed by phone hash ────────────────────
export class VaniAgent extends Agent<Env, VaniState> {
  // Browser navigator instance (lazy-initialized)
  private navigator: PMKisanNavigator | null = null;
  private tablesCreated = false;

  // ─── Initial State ─────────────────────────────────────────────────
  initialState: VaniState = {
    currentStep: "idle",
    formProgress: { filled: 0, total: 0 },
    lastMessage: "",
    screenshotUrl: null,
    sessionId: null,
    language: "hi",
    userKey: null,
    isBrowsing: false,
    error: null,
  };

  // ─── Ensure SQLite Tables Exist ────────────────────────────────────
  private ensureTables() {
    if (this.tablesCreated) return;
    const sql = this.ctx.storage.sql;

    sql.exec(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_hash TEXT UNIQUE NOT NULL,
      name TEXT,
      language TEXT DEFAULT 'hi',
      aadhaar_masked TEXT,
      state TEXT,
      district TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )`);

    sql.exec(`CREATE TABLE IF NOT EXISTS saved_fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      form_type TEXT NOT NULL,
      field_name TEXT NOT NULL,
      field_value_encrypted TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, form_type, field_name)
    )`);

    sql.exec(`CREATE TABLE IF NOT EXISTS interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      session_id TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT DEFAULT '{}',
      timestamp TEXT DEFAULT (datetime('now'))
    )`);

    sql.exec(`CREATE TABLE IF NOT EXISTS scheduled_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      trigger_at TEXT NOT NULL,
      payload TEXT DEFAULT '{}',
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    this.tablesCreated = true;
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────
  onStart() {
    this.ensureTables();
  }

  // ─── WebSocket: Notify frontend of state changes ───────────────────
  onStateChanged(state: VaniState, _source: Connection | "server") {
    // State is auto-synced to connected clients via the agents SDK
  }

  // ─── RPC: Identify User ───────────────────────────────────────────
  async identifyUser(params: { phone: string; name?: string; language?: string }): Promise<WebhookResponse> {
    const { phone, name, language } = params;
    const phoneHash = await this.hashPhone(phone);

    // Upsert user
    const existing = this.ctx.storage.sql.exec(
      `SELECT * FROM users WHERE phone_hash = ?`,
      phoneHash
    ).toArray();

    let userId: number;
    let isReturning = false;

    if (existing.length > 0) {
      userId = existing[0].id as number;
      isReturning = true;

      // Update name/language if provided
      if (name || language) {
        this.ctx.storage.sql.exec(
          `UPDATE users SET name = COALESCE(?, name), language = COALESCE(?, language), updated_at = datetime('now') WHERE id = ?`,
          name ?? null, language ?? null, userId
        );
      }
    } else {
      this.ctx.storage.sql.exec(
        `INSERT INTO users (phone_hash, name, language) VALUES (?, ?, ?)`,
        phoneHash, name ?? null, language ?? "hi"
      );
      userId = Number(this.ctx.storage.sql.exec(`SELECT last_insert_rowid() as id`).toArray()[0].id);
    }

    // Get saved fields for this user
    const savedFields = this.ctx.storage.sql.exec(
      `SELECT field_name, field_value_encrypted FROM saved_fields WHERE user_id = ? AND form_type = 'pm-kisan'`,
      userId
    ).toArray();

    // Update state
    this.setState({
      ...this.state,
      userKey: phoneHash,
      language: language ?? this.state.language,
      currentStep: "identified",
    });

    // Log interaction
    this.logInteraction(userId, "identify", { isReturning, savedFieldCount: savedFields.length });

    const user = this.ctx.storage.sql.exec(`SELECT * FROM users WHERE id = ?`, userId).toArray()[0];

    if (isReturning && user.name) {
      return {
        success: true,
        message_for_agent: `Namaste ${user.name}! Aapko dubara dekh ke khushi hui. ${savedFields.length > 0 ? `Aapke ${savedFields.length} fields pehle se save hain, toh jaldi ho jayega.` : "Chaliye shuru karte hain."}`,
        data: {
          user_id: userId,
          name: user.name,
          is_returning: true,
          saved_fields: savedFields.map(f => f.field_name),
        },
      };
    }

    return {
      success: true,
      message_for_agent: name
        ? `Dhanyavaad ${name}! Aapka account ban gaya hai. Ab hum form bharna shuru kar sakte hain.`
        : "Namaste! Sabse pehle, aapka naam bataiye toh main aapko yaad rakh sakun.",
      data: { user_id: userId, is_returning: false, saved_fields: [] },
    };
  }

  // ─── RPC: Start Form Navigation ───────────────────────────────────
  async startFormNavigation(params: { formType: string }): Promise<WebhookResponse> {
    const { formType } = params;

    this.setState({
      ...this.state,
      currentStep: "navigating",
      isBrowsing: true,
      formProgress: { filled: 0, total: PM_KISAN_FIELDS.length },
      error: null,
    });

    try {
      // Launch browser and navigate to form
      this.navigator = new PMKisanNavigator(this.env);
      const sessionId = crypto.randomUUID();
      await this.navigator.launch();
      await this.navigator.navigateToRegistration();

      // Take initial screenshot
      const screenshot = await this.navigator.takeScreenshot();
      const screenshotUrl = await this.uploadScreenshot(sessionId, screenshot);

      // Extract form fields
      const fields = await this.navigator.extractFormFields();

      this.setState({
        ...this.state,
        currentStep: "form_ready",
        sessionId,
        screenshotUrl,
        isBrowsing: false,
      });

      const firstField = PM_KISAN_FIELDS[0];

      return {
        success: true,
        message_for_agent: `PM Kisan form khul gaya hai! Isme ${PM_KISAN_FIELDS.length} jaankari bharni hogi. Sabse pehle, ${firstField.hint}`,
        data: {
          session_id: sessionId,
          total_fields: PM_KISAN_FIELDS.length,
          first_field: firstField.name,
          first_field_label: firstField.labelHindi,
          screenshot_url: screenshotUrl,
          extracted_fields: fields,
        },
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      this.setState({
        ...this.state,
        currentStep: "error",
        isBrowsing: false,
        error: errMsg,
      });

      return {
        success: false,
        message_for_agent: "Form kholne mein thodi dikkat aa rahi hai. Main dubara try karti hoon. Ek minute rukiye...",
        data: { error: errMsg },
      };
    }
  }

  // ─── RPC: Fill a Form Field ───────────────────────────────────────
  async fillField(params: { sessionId: string; fieldName: string; value: string }): Promise<WebhookResponse> {
    const { sessionId, fieldName, value } = params;

    if (!this.navigator) {
      return {
        success: false,
        message_for_agent: "Abhi form khula nahi hai. Pehle mujhe bataiye ki kaunsa form bharna hai.",
      };
    }

    const fieldInfo = PM_KISAN_FIELDS.find(f => f.name === fieldName);
    if (!fieldInfo) {
      return {
        success: false,
        message_for_agent: "Ye field mujhe samajh nahi aaya. Kya aap dobara bata sakte hain?",
      };
    }

    this.setState({
      ...this.state,
      currentStep: `filling_${fieldName}`,
      isBrowsing: true,
    });

    try {
      let finalValue = value;

      // For dropdowns, map spoken value to option using AI
      if (fieldInfo.type === "dropdown" && fieldInfo.options) {
        const mapped = await this.mapSpokenValueToOption(value, fieldInfo.options);
        if (mapped) {
          finalValue = mapped;
        } else {
          return {
            success: false,
            message_for_agent: `"${value}" dropdown mein nahi mila. Available options hain: ${fieldInfo.options.slice(0, 5).join(", ")}. Kya aap sahi naam bata sakte hain?`,
          };
        }
      }

      // Validate the value
      if (fieldInfo.validation) {
        const regex = new RegExp(fieldInfo.validation);
        if (!regex.test(finalValue)) {
          return {
            success: false,
            message_for_agent: `"${value}" sahi format mein nahi hai. ${fieldInfo.hint}`,
          };
        }
      }

      // Fill the field in the browser
      await this.navigator.fillFormField(fieldName, finalValue, fieldInfo.type);

      // Take screenshot after filling
      const screenshot = await this.navigator.takeScreenshot();
      const screenshotUrl = await this.uploadScreenshot(sessionId, screenshot);

      // Save the field value for future use
      await this.saveFieldValue(fieldName, finalValue);

      // Calculate progress
      const filledCount = this.state.formProgress.filled + 1;
      const totalFields = PM_KISAN_FIELDS.length;

      this.setState({
        ...this.state,
        currentStep: filledCount >= totalFields ? "form_complete" : `awaiting_${PM_KISAN_FIELDS[filledCount]?.name}`,
        formProgress: { filled: filledCount, total: totalFields },
        screenshotUrl,
        isBrowsing: false,
      });

      // Determine next step
      if (filledCount >= totalFields) {
        return {
          success: true,
          message_for_agent: `Bahut badhiya! Saare ${totalFields} fields bhar gaye hain! Ab main form submit karti hoon. Ek minute...`,
          data: {
            field_filled: fieldName,
            progress: `${filledCount}/${totalFields}`,
            next_action: "submit",
            screenshot_url: screenshotUrl,
          },
        };
      }

      const nextField = PM_KISAN_FIELDS[filledCount];
      return {
        success: true,
        message_for_agent: `Bilkul sahi! ${fieldInfo.labelHindi} bhar diya. ${filledCount} mein se ${totalFields} ho gaye. Ab ${nextField.hint}`,
        data: {
          field_filled: fieldName,
          progress: `${filledCount}/${totalFields}`,
          next_field: nextField.name,
          next_field_label: nextField.labelHindi,
          screenshot_url: screenshotUrl,
        },
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      this.setState({
        ...this.state,
        isBrowsing: false,
        error: errMsg,
      });

      return {
        success: false,
        message_for_agent: `"${fieldName}" bharne mein dikkat aa gayi. ${errMsg}. Kya aap dobara value bata sakte hain?`,
        data: { error: errMsg },
      };
    }
  }

  // ─── RPC: Read Current Screen ─────────────────────────────────────
  async readScreen(params: { sessionId: string }): Promise<WebhookResponse> {
    if (!this.navigator) {
      return {
        success: false,
        message_for_agent: "Abhi koi page khula nahi hai.",
      };
    }

    try {
      const pageText = await this.navigator.extractPageText();

      // Use Workers AI to translate and summarize
      const summary = await this.translateAndSummarize(pageText);

      const screenshot = await this.navigator.takeScreenshot();
      const screenshotUrl = await this.uploadScreenshot(
        params.sessionId || this.state.sessionId || "unknown",
        screenshot
      );

      this.setState({
        ...this.state,
        screenshotUrl,
        lastMessage: summary,
      });

      return {
        success: true,
        message_for_agent: summary,
        data: { screenshot_url: screenshotUrl, raw_text_length: pageText.length },
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message_for_agent: "Page padhne mein dikkat aa rahi hai. Ek minute, main dubara try karti hoon.",
        data: { error: errMsg },
      };
    }
  }

  // ─── RPC: Check Application Status ────────────────────────────────
  async checkStatus(params: { identifier: string }): Promise<WebhookResponse> {
    const { identifier } = params;

    this.setState({
      ...this.state,
      currentStep: "checking_status",
      isBrowsing: true,
    });

    try {
      if (!this.navigator) {
        this.navigator = new PMKisanNavigator(this.env);
        await this.navigator.launch();
      }

      const statusInfo = await this.navigator.checkApplicationStatus(identifier);

      const screenshot = await this.navigator.takeScreenshot();
      const sessionId = this.state.sessionId || crypto.randomUUID();
      const screenshotUrl = await this.uploadScreenshot(sessionId, screenshot);

      this.setState({
        ...this.state,
        currentStep: "status_checked",
        screenshotUrl,
        sessionId,
        isBrowsing: false,
      });

      return {
        success: true,
        message_for_agent: statusInfo.summaryHindi,
        data: {
          status: statusInfo,
          screenshot_url: screenshotUrl,
        },
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      this.setState({
        ...this.state,
        currentStep: "error",
        isBrowsing: false,
        error: errMsg,
      });

      return {
        success: false,
        message_for_agent: "Status check karne mein dikkat aa rahi hai. Kya aapne sahi Aadhaar number diya hai?",
        data: { error: errMsg },
      };
    }
  }

  // ─── RPC: Schedule a Reminder ─────────────────────────────────────
  async scheduleReminder(params: {
    type: string;
    triggerAt: string;
    payload: Record<string, unknown>;
  }): Promise<WebhookResponse> {
    const userId = await this.getCurrentUserId();
    if (!userId) {
      return {
        success: false,
        message_for_agent: "Pehle apni pehchaan bataiye, phir reminder set karenge.",
      };
    }

    this.ctx.storage.sql.exec(
      `INSERT INTO scheduled_events (user_id, event_type, trigger_at, payload) VALUES (?, ?, ?, ?)`,
      userId, params.type, params.triggerAt, JSON.stringify(params.payload)
    );

    // Use DO alarm for scheduling
    const triggerTime = new Date(params.triggerAt).getTime();
    const delay = Math.max(0, triggerTime - Date.now());
    this.schedule(delay / 1000, "executeReminder", params.payload);

    return {
      success: true,
      message_for_agent: `Theek hai, main aapko ${params.type} ke liye yaad dilaungi.`,
    };
  }

  async executeReminder(payload: Record<string, unknown>, _task: Schedule<Record<string, unknown>>) {
    console.log("Executing reminder:", payload);
    this.broadcast(JSON.stringify({
      type: "reminder",
      payload,
      timestamp: new Date().toISOString(),
    }));
  }

  // ─── HTTP handler for RPC calls from the Worker ────────────────────
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Handle RPC-style calls from the Worker
    if (url.pathname.startsWith("/rpc/")) {
      try {
        // Ensure tables exist before any RPC call
        this.ensureTables();

        const method = url.pathname.replace("/rpc/", "");
        const body = await request.json() as Record<string, unknown>;

        let result: WebhookResponse;
        switch (method) {
          case "identifyUser":
            result = await this.identifyUser(body as Parameters<typeof this.identifyUser>[0]);
            break;
          case "startFormNavigation":
            result = await this.startFormNavigation(body as Parameters<typeof this.startFormNavigation>[0]);
            break;
          case "fillField":
            result = await this.fillField(body as Parameters<typeof this.fillField>[0]);
            break;
          case "readScreen":
            result = await this.readScreen(body as Parameters<typeof this.readScreen>[0]);
            break;
          case "checkStatus":
            result = await this.checkStatus(body as Parameters<typeof this.checkStatus>[0]);
            break;
          case "scheduleReminder":
            result = await this.scheduleReminder(body as Parameters<typeof this.scheduleReminder>[0]);
            break;
          default:
            return Response.json({ success: false, message_for_agent: `Unknown method: ${method}` }, { status: 404 });
        }
        return Response.json(result);
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error(`RPC error: ${errMsg}`, error);
        return Response.json({
          success: false,
          message_for_agent: "Kuch gadbad ho gayi. Ek minute, main dubara try karti hoon.",
          data: { error: errMsg },
        }, { status: 500 });
      }
    }

    // Fall through to agents SDK default WebSocket handling
    return super.fetch(request);
  }

  // ─── Private Helpers ───────────────────────────────────────────────

  private async hashPhone(phone: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(phone + (this.env.WEBHOOK_SECRET || "vani-salt"));
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  private async getCurrentUserId(): Promise<number | null> {
    if (!this.state.userKey) return null;
    const rows = this.ctx.storage.sql.exec(
      `SELECT id FROM users WHERE phone_hash = ?`,
      this.state.userKey
    ).toArray();
    return rows.length > 0 ? (rows[0].id as number) : null;
  }

  private logInteraction(userId: number, action: string, details: Record<string, unknown>) {
    this.ctx.storage.sql.exec(
      `INSERT INTO interactions (user_id, session_id, action, details) VALUES (?, ?, ?, ?)`,
      userId,
      this.state.sessionId || "pre-session",
      action,
      JSON.stringify(details)
    );
  }

  private async saveFieldValue(fieldName: string, value: string) {
    const userId = await this.getCurrentUserId();
    if (!userId) return;

    // For demo, we store plain text. In production, encrypt with AES-256.
    this.ctx.storage.sql.exec(
      `INSERT OR REPLACE INTO saved_fields (user_id, form_type, field_name, field_value_encrypted, updated_at)
       VALUES (?, 'pm-kisan', ?, ?, datetime('now'))`,
      userId, fieldName, value
    );
  }

  private async uploadScreenshot(sessionId: string, screenshot: Uint8Array): Promise<string> {
    const key = `screenshots/${sessionId}/latest.png`;

    await this.env.ASSETS_BUCKET.put(key, screenshot, {
      httpMetadata: { contentType: "image/png" },
    });

    return `/api/screenshot/${sessionId}`;
  }

  private async mapSpokenValueToOption(spoken: string, options: string[]): Promise<string | null> {
    try {
      const response = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct" as any, {
        messages: [
          { role: "system", content: "You are a form helper. Return only valid JSON." },
          { role: "user", content: FIELD_MAPPING_PROMPT(spoken, options) },
        ],
        max_tokens: 100,
      });

      const text = (response as any).response || "";
      const parsed = JSON.parse(text);
      return parsed.confidence > 0.5 ? parsed.match : null;
    } catch {
      // Fallback: try exact/substring match
      const lower = spoken.toLowerCase();
      return options.find(o => o.toLowerCase().includes(lower) || lower.includes(o.toLowerCase())) ?? null;
    }
  }

  private async translateAndSummarize(text: string): Promise<string> {
    try {
      const response = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct" as any, {
        messages: [
          { role: "system", content: "You are a translator. Respond only in Hindi." },
          { role: "user", content: SUMMARIZE_FOR_VOICE_PROMPT(text, "Hindi") },
        ],
        max_tokens: 200,
      });

      return (response as any).response || "Page ka content padh nahi paa rahi hoon.";
    } catch {
      return "Page ka content padh nahi paa rahi hoon. Ek minute, main dubara try karti hoon.";
    }
  }
}
