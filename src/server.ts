import { Hono } from "hono";
import { cors } from "hono/cors";
import { routeAgentRequest } from "agents";
import type { Env, WebhookResponse } from "./types";

// Re-export the Durable Object class so wrangler can find it
export { VaniAgent } from "./agent/vani-agent";

const app = new Hono<{ Bindings: Env }>();

// ─── Middleware ──────────────────────────────────────────────────────
app.use("*", cors());

// ─── Health Check ───────────────────────────────────────────────────
app.get("/api/health", (c) => {
  return c.json({ status: "ok", service: "vani", timestamp: new Date().toISOString() });
});

// ─── ElevenLabs Signed URL (proxied — never expose API key to client) ─
app.get("/api/el-signed-url", async (c) => {
  const agentId = c.env.EL_AGENT_ID;
  const apiKey = c.env.ELEVENLABS_API_KEY;

  if (!agentId || !apiKey) {
    return c.json({ error: "ElevenLabs not configured" }, 500);
  }

  const resp = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
    { headers: { "xi-api-key": apiKey } }
  );

  if (!resp.ok) {
    return c.json({ error: "Failed to get signed URL" }, resp.status);
  }

  const data = await resp.json() as { signed_url: string };
  return c.json(data);
});

// ─── Helper: Get VaniAgent DO stub by phone hash ────────────────────
function getAgentStub(env: Env, phone: string) {
  const id = env.VANI_AGENT.idFromName(phone);
  return env.VANI_AGENT.get(id);
}

// ─── Webhook: Identify User ─────────────────────────────────────────
app.post("/api/webhook/identify-user", async (c) => {
  const body = await c.req.json();
  const { phone, name, language } = body;

  if (!phone) {
    return c.json<WebhookResponse>({
      success: false,
      message_for_agent: "Phone number nahi mila. Kripya dobara try karein.",
    }, 400);
  }

  const stub = getAgentStub(c.env, phone);
  const resp = await stub.fetch(new Request("https://do/rpc/identifyUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, name, language }),
  }));

  return c.json(await resp.json());
});

// ─── Webhook: Navigate Form ─────────────────────────────────────────
app.post("/api/webhook/navigate-form", async (c) => {
  const body = await c.req.json();
  const { phone, form_type } = body;

  if (!phone) {
    return c.json<WebhookResponse>({
      success: false,
      message_for_agent: "Phone number nahi mila.",
    }, 400);
  }

  const stub = getAgentStub(c.env, phone);
  const resp = await stub.fetch(new Request("https://do/rpc/startFormNavigation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType: form_type || "pm-kisan" }),
  }));

  return c.json(await resp.json());
});

// ─── Webhook: Fill Field ────────────────────────────────────────────
app.post("/api/webhook/fill-field", async (c) => {
  const body = await c.req.json();
  const { phone, session_id, field_name, value } = body;

  if (!phone || !field_name || value === undefined) {
    return c.json<WebhookResponse>({
      success: false,
      message_for_agent: "Kuch jaankari missing hai. Kripya dobara bataiye.",
    }, 400);
  }

  const stub = getAgentStub(c.env, phone);
  const resp = await stub.fetch(new Request("https://do/rpc/fillField", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: session_id, fieldName: field_name, value }),
  }));

  return c.json(await resp.json());
});

// ─── Webhook: Read Screen ───────────────────────────────────────────
app.post("/api/webhook/read-screen", async (c) => {
  const body = await c.req.json();
  const { phone, session_id } = body;

  if (!phone) {
    return c.json<WebhookResponse>({
      success: false,
      message_for_agent: "Phone number nahi mila.",
    }, 400);
  }

  const stub = getAgentStub(c.env, phone);
  const resp = await stub.fetch(new Request("https://do/rpc/readScreen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: session_id }),
  }));

  return c.json(await resp.json());
});

// ─── Webhook: Check Status ──────────────────────────────────────────
app.post("/api/webhook/check-status", async (c) => {
  const body = await c.req.json();
  const { phone, identifier } = body;

  if (!phone || !identifier) {
    return c.json<WebhookResponse>({
      success: false,
      message_for_agent: "Aadhaar ya application ID bataiye status check karne ke liye.",
    }, 400);
  }

  const stub = getAgentStub(c.env, phone);
  const resp = await stub.fetch(new Request("https://do/rpc/checkStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  }));

  return c.json(await resp.json());
});

// ─── Serve Screenshot from R2 ───────────────────────────────────────
app.get("/api/screenshot/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const obj = await c.env.ASSETS_BUCKET.get(`screenshots/${sessionId}/latest.png`);

  if (!obj) {
    return c.json({ error: "Screenshot not found" }, 404);
  }

  return new Response(obj.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache",
    },
  });
});

// ─── Agents SDK WebSocket routing (for frontend state sync) ─────────
app.all("/agents/*", async (c) => {
  const resp = await routeAgentRequest(c.req.raw, c.env);
  if (resp) return resp;
  return c.json({ error: "Agent route not found" }, 404);
});

// ─── Fallback ───────────────────────────────────────────────────────
app.all("*", (c) => {
  return c.json({ error: "Not found" }, 404);
});

export default app;
