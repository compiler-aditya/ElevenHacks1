# Source: https://developers.cloudflare.com/agents/api-reference/routing/

[Skip to content](https://developers.cloudflare.com/agents/api-reference/routing/#_top)

Copy page

# Routing

This guide explains how requests are routed to agents, how naming works, and patterns for organizing your agents.

## How routing works

When a request comes in, `routeAgentRequest()` examines the URL and routes it to the appropriate agent instance:

```
https://your-worker.dev/agents/{agent-name}/{instance-name}

                               └────┬────┘   └─────┬─────┘

                               Class name     Unique instance ID

                              (kebab-case)
```

**Example URLs:**

| URL | Agent Class | Instance |
| --- | --- | --- |
| `/agents/counter/user-123` | `Counter` | `user-123` |
| `/agents/chat-room/lobby` | `ChatRoom` | `lobby` |
| `/agents/my-agent/default` | `MyAgent` | `default` |

## Name resolution

Agent class names are automatically converted to kebab-case for URLs:

| Class Name | URL Path |
| --- | --- |
| `Counter` | `/agents/counter/...` |
| `MyAgent` | `/agents/my-agent/...` |
| `ChatRoom` | `/agents/chat-room/...` |
| `AIAssistant` | `/agents/ai-assistant/...` |

The router matches both the original name and kebab-case version, so you can use either:

- `useAgent({ agent: "Counter" })` → `/agents/counter/...`
- `useAgent({ agent: "counter" })` → `/agents/counter/...`

## Using routeAgentRequest()

The `routeAgentRequest()` function is the main entry point for agent routing:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2731)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2732)

```
import { routeAgentRequest } from "agents";

export default {

  async fetch(request, env, ctx) {

    // Route to agents - returns Response or undefined

    const agentResponse = await routeAgentRequest(request, env);

    if (agentResponse) {

      return agentResponse;

    }

    // No agent matched - handle other routes

    return new Response("Not found", { status: 404 });

  },

};
```

```
import { routeAgentRequest } from "agents";

export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // Route to agents - returns Response or undefined

    const agentResponse = await routeAgentRequest(request, env);

    if (agentResponse) {

      return agentResponse;

    }

    // No agent matched - handle other routes

    return new Response("Not found", { status: 404 });

  },

} satisfies ExportedHandler<Env>;
```

## Instance naming patterns

The instance name (the last part of the URL) determines which agent instance handles the request. Each unique name gets its own isolated agent with its own state.

### Per-user agents

Each user gets their own agent instance:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2725)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2726)

```
// Client

const agent = useAgent({

  agent: "UserProfile",

  name: `user-${userId}`, // e.g., "user-abc123"

});
```

```
// Client

const agent = useAgent({

  agent: "UserProfile",

  name: `user-${userId}`, // e.g., "user-abc123"

});
```

```
/agents/user-profile/user-abc123 → User abc123's agent

/agents/user-profile/user-xyz789 → User xyz789's agent (separate instance)
```

### Shared rooms

Multiple users share the same agent instance:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2727)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2728)

```
// Client

const agent = useAgent({

  agent: "ChatRoom",

  name: roomId, // e.g., "general" or "room-42"

});
```

```
// Client

const agent = useAgent({

  agent: "ChatRoom",

  name: roomId, // e.g., "general" or "room-42"

});
```

```
/agents/chat-room/general → All users in "general" share this agent
```

### Global singleton

A single instance for the entire application:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2729)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2730)

```
// Client

const agent = useAgent({

  agent: "AppConfig",

  name: "default", // Or any consistent name

});
```

```
// Client

const agent = useAgent({

  agent: "AppConfig",

  name: "default", // Or any consistent name

});
```

### Dynamic naming

Generate instance names based on context:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2735)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2736)

```
// Per-session

const agent = useAgent({

  agent: "Session",

  name: sessionId,

});

// Per-document

const agent = useAgent({

  agent: "Document",

  name: `doc-${documentId}`,

});

// Per-game

const agent = useAgent({

  agent: "Game",

  name: `game-${gameId}-${Date.now()}`,

});
```

```
// Per-session

const agent = useAgent({

  agent: "Session",

  name: sessionId,

});

// Per-document

const agent = useAgent({

  agent: "Document",

  name: `doc-${documentId}`,

});

// Per-game

const agent = useAgent({

  agent: "Game",

  name: `game-${gameId}-${Date.now()}`,

});
```

## Custom URL routing

For advanced use cases where you need control over the URL structure, you can bypass the default `/agents/{agent}/{name}` pattern.

### Using basePath (client-side)

The `basePath` option lets clients connect to any URL path:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2733)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2734)

```
// Client connects to /user instead of /agents/user-agent/...

const agent = useAgent({

  agent: "UserAgent", // Required but ignored when basePath is set

  basePath: "user", // → connects to /user

});
```

```
// Client connects to /user instead of /agents/user-agent/...

const agent = useAgent({

  agent: "UserAgent", // Required but ignored when basePath is set

  basePath: "user", // → connects to /user

});
```

This is useful when:

- You want clean URLs without the `/agents/` prefix
- The instance name is determined server-side (for example, from auth/session)
- You are integrating with an existing URL structure

### Server-side instance selection

When using `basePath`, the server must handle routing. Use `getAgentByName()` to get the agent instance, then forward the request with `fetch()`:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2745)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2746)

```
export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    // Custom routing - server determines instance from session

    if (url.pathname.startsWith("/user/")) {

      const session = await getSession(request);

      const agent = await getAgentByName(env.UserAgent, session.userId);

      return agent.fetch(request); // Forward request directly to agent

    }

    // Default routing for standard /agents/... paths

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};
```

```
export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);

    // Custom routing - server determines instance from session

    if (url.pathname.startsWith("/user/")) {

      const session = await getSession(request);

      const agent = await getAgentByName(env.UserAgent, session.userId);

      return agent.fetch(request); // Forward request directly to agent

    }

    // Default routing for standard /agents/... paths

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;
```

### Custom path with dynamic instance

Route different paths to different instances:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2739)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2740)

```
// Route /chat/{room} to ChatRoom agent

if (url.pathname.startsWith("/chat/")) {

  const roomId = url.pathname.replace("/chat/", "");

  const agent = await getAgentByName(env.ChatRoom, roomId);

  return agent.fetch(request);

}

// Route /doc/{id} to Document agent

if (url.pathname.startsWith("/doc/")) {

  const docId = url.pathname.replace("/doc/", "");

  const agent = await getAgentByName(env.Document, docId);

  return agent.fetch(request);

}
```

```
// Route /chat/{room} to ChatRoom agent

if (url.pathname.startsWith("/chat/")) {

  const roomId = url.pathname.replace("/chat/", "");

  const agent = await getAgentByName(env.ChatRoom, roomId);

  return agent.fetch(request);

}

// Route /doc/{id} to Document agent

if (url.pathname.startsWith("/doc/")) {

  const docId = url.pathname.replace("/doc/", "");

  const agent = await getAgentByName(env.Document, docId);

  return agent.fetch(request);

}
```

### Receiving the instance identity (client-side)

When using `basePath`, the client does not know which instance it connected to until the server returns this information. The agent automatically sends its identity on connection:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2747)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2748)

```
const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentity: (name, agentType) => {

    console.log(`Connected to ${agentType} instance: ${name}`);

    // e.g., "Connected to user-agent instance: user-123"

  },

});

// Reactive state - re-renders when identity is received

return (

  <div>

    {agent.identified ? `Connected to: ${agent.name}` : "Connecting..."}

  </div>

);
```

```
const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentity: (name, agentType) => {

    console.log(`Connected to ${agentType} instance: ${name}`);

    // e.g., "Connected to user-agent instance: user-123"

  },

});

// Reactive state - re-renders when identity is received

return (

  <div>

    {agent.identified ? `Connected to: ${agent.name}` : "Connecting..."}

  </div>

);
```

For `AgentClient`:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2749)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2750)

```
const agent = new AgentClient({

  agent: "UserAgent",

  basePath: "user",

  host: "example.com",

  onIdentity: (name, agentType) => {

    // Update UI with actual instance name

    setInstanceName(name);

  },

});

// Wait for identity before proceeding

await agent.ready;

console.log(agent.name); // Now has the server-determined name
```

```
const agent = new AgentClient({

  agent: "UserAgent",

  basePath: "user",

  host: "example.com",

  onIdentity: (name, agentType) => {

    // Update UI with actual instance name

    setInstanceName(name);

  },

});

// Wait for identity before proceeding

await agent.ready;

console.log(agent.name); // Now has the server-determined name
```

### Handling identity changes on reconnect

If the identity changes on reconnect (for example, session expired and user logs in as someone else), you can handle it with `onIdentityChange`:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2743)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2744)

```
const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentityChange: (oldName, newName, oldAgent, newAgent) => {

    console.log(`Session changed: ${oldName} → ${newName}`);

    // Refresh state, show notification, etc.

  },

});
```

```
const agent = useAgent({

  agent: "UserAgent",

  basePath: "user",

  onIdentityChange: (oldName, newName, oldAgent, newAgent) => {

    console.log(`Session changed: ${oldName} → ${newName}`);

    // Refresh state, show notification, etc.

  },

});
```

If `onIdentityChange` is not provided and identity changes, a warning is logged to help catch unexpected session changes.

### Disabling identity for security

If your instance names contain sensitive data (session IDs, internal user IDs), you can disable identity sending:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2737)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2738)

```
class SecureAgent extends Agent {

  // Do not expose instance names to clients

  static options = { sendIdentityOnConnect: false };

}
```

```
class SecureAgent extends Agent {

  // Do not expose instance names to clients

  static options = { sendIdentityOnConnect: false };

}
```

When identity is disabled:

- `agent.identified` stays `false`
- `agent.ready` never resolves (use state updates instead)
- `onIdentity` and `onIdentityChange` are never called

### When to use custom routing

| Scenario | Approach |
| --- | --- |
| Standard agent access | Default `/agents/{agent}/{name}` |
| Instance from auth/session | `basePath` \+ `getAgentByName` \+ `fetch` |
| Clean URLs (no `/agents/` prefix) | `basePath` \+ custom routing |
| Legacy URL structure | `basePath` \+ custom routing |
| Complex routing logic | Custom routing in Worker |

## Routing options

Both `routeAgentRequest()` and `getAgentByName()` accept options for customizing routing behavior.

### CORS

For cross-origin requests (common when your frontend is on a different domain):

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2741)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2742)

```
const response = await routeAgentRequest(request, env, {

  cors: true, // Enable default CORS headers

});
```

```
const response = await routeAgentRequest(request, env, {

  cors: true, // Enable default CORS headers

});
```

Or with custom CORS headers:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2751)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2752)

```
const response = await routeAgentRequest(request, env, {

  cors: {

    "Access-Control-Allow-Origin": "https://myapp.com",

    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

    "Access-Control-Allow-Headers": "Content-Type, Authorization",

  },

});
```

```
const response = await routeAgentRequest(request, env, {

  cors: {

    "Access-Control-Allow-Origin": "https://myapp.com",

    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

    "Access-Control-Allow-Headers": "Content-Type, Authorization",

  },

});
```

### Location hints

For latency-sensitive applications, hint where the agent should run:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2753)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2754)

```
// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  locationHint: "enam", // Eastern North America

});

// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  locationHint: "enam",

});
```

```
// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  locationHint: "enam", // Eastern North America

});

// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  locationHint: "enam",

});
```

Available location hints: `wnam`, `enam`, `sam`, `weur`, `eeur`, `apac`, `oc`, `afr`, `me`

### Jurisdiction

For data residency requirements:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2757)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2758)

```
// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  jurisdiction: "eu", // EU jurisdiction

});

// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  jurisdiction: "eu",

});
```

```
// With getAgentByName

const agent = await getAgentByName(env.MyAgent, "instance-name", {

  jurisdiction: "eu", // EU jurisdiction

});

// With routeAgentRequest (applies to all matched agents)

const response = await routeAgentRequest(request, env, {

  jurisdiction: "eu",

});
```

### Props

Since agents are instantiated by the runtime rather than constructed directly, `props` provides a way to pass initialization arguments:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2755)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2756)

```
const agent = await getAgentByName(env.MyAgent, "instance-name", {

  props: {

    userId: session.userId,

    config: { maxRetries: 3 },

  },

});
```

```
const agent = await getAgentByName(env.MyAgent, "instance-name", {

  props: {

    userId: session.userId,

    config: { maxRetries: 3 },

  },

});
```

Props are passed to the agent's `onStart` lifecycle method:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2759)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2760)

```
class MyAgent extends Agent {

  userId;

  config;

  async onStart(props) {

    this.userId = props?.userId;

    this.config = props?.config;

  }

}
```

```
class MyAgent extends Agent<Env, State> {

  private userId?: string;

  private config?: { maxRetries: number };

  async onStart(props?: { userId: string; config: { maxRetries: number } }) {

    this.userId = props?.userId;

    this.config = props?.config;

  }

}
```

When using `props` with `routeAgentRequest`, the same props are passed to whichever agent matches the URL. This works well for universal context like authentication:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2761)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2762)

```
export default {

  async fetch(request, env) {

    const session = await getSession(request);

    return routeAgentRequest(request, env, {

      props: { userId: session.userId, role: session.role },

    });

  },

};
```

```
export default {

  async fetch(request, env) {

    const session = await getSession(request);

    return routeAgentRequest(request, env, {

      props: { userId: session.userId, role: session.role },

    });

  },

} satisfies ExportedHandler<Env>;
```

For agent-specific initialization, use `getAgentByName` instead where you control exactly which agent receives the props.

### Hooks

`routeAgentRequest` supports hooks for intercepting requests before they reach agents:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2763)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2764)

```
const response = await routeAgentRequest(request, env, {

  onBeforeConnect: (req, lobby) => {

    // Called before WebSocket connections

    // Return a Response to reject, Request to modify, or void to continue

  },

  onBeforeRequest: (req, lobby) => {

    // Called before HTTP requests

    // Return a Response to reject, Request to modify, or void to continue

  },

});
```

```
const response = await routeAgentRequest(request, env, {

  onBeforeConnect: (req, lobby) => {

    // Called before WebSocket connections

    // Return a Response to reject, Request to modify, or void to continue

  },

  onBeforeRequest: (req, lobby) => {

    // Called before HTTP requests

    // Return a Response to reject, Request to modify, or void to continue

  },

});
```

These hooks are useful for authentication and validation. Refer to [Cross-domain authentication](https://developers.cloudflare.com/agents/guides/cross-domain-authentication/) for detailed examples.

## Server-side agent access

You can access agents from your Worker code using `getAgentByName()` for RPC calls:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2769)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2770)

```
import { getAgentByName, routeAgentRequest } from "agents";

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    // API endpoint that interacts with an agent

    if (url.pathname === "/api/increment") {

      const counter = await getAgentByName(env.Counter, "global-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }

    // Regular agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};
```

```
import { getAgentByName, routeAgentRequest } from "agents";

export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);

    // API endpoint that interacts with an agent

    if (url.pathname === "/api/increment") {

      const counter = await getAgentByName(env.Counter, "global-counter");

      const newCount = await counter.increment();

      return Response.json({ count: newCount });

    }

    // Regular agent routing

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;
```

For options like `locationHint`, `jurisdiction`, and `props`, refer to [Routing options](https://developers.cloudflare.com/agents/api-reference/routing/#routing-options).

## Sub-paths and HTTP methods

Requests can include sub-paths after the instance name. These are passed to your agent's `onRequest()` handler:

```
/agents/api/v1/users     → agent: "api", instance: "v1", path: "/users"

/agents/api/v1/users/123 → agent: "api", instance: "v1", path: "/users/123"
```

Handle sub-paths in your agent:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2771)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2772)

```
export class API extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);

    // url.pathname contains the full path including /agents/api/v1/...

    // Extract the sub-path after your agent's base path

    const path = url.pathname.replace(/^\/agents\/api\/[^/]+/, "");

    if (request.method === "GET" && path === "/users") {

      return Response.json(await this.getUsers());

    }

    if (request.method === "POST" && path === "/users") {

      const data = await request.json();

      return Response.json(await this.createUser(data));

    }

    return new Response("Not found", { status: 404 });

  }

}
```

```
export class API extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);

    // url.pathname contains the full path including /agents/api/v1/...

    // Extract the sub-path after your agent's base path

    const path = url.pathname.replace(/^\/agents\/api\/[^/]+/, "");

    if (request.method === "GET" && path === "/users") {

      return Response.json(await this.getUsers());

    }

    if (request.method === "POST" && path === "/users") {

      const data = await request.json();

      return Response.json(await this.createUser(data));

    }

    return new Response("Not found", { status: 404 });

  }

}
```

## Multiple agents

You can have multiple agent classes in one project. Each gets its own namespace:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2767)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2768)

```
// server.ts

export { Counter } from "./agents/counter";

export { ChatRoom } from "./agents/chat-room";

export { UserProfile } from "./agents/user-profile";

export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};
```

```
// server.ts

export { Counter } from "./agents/counter";

export { ChatRoom } from "./agents/chat-room";

export { UserProfile } from "./agents/user-profile";

export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;
```

- [wrangler.jsonc](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2723)
- [wrangler.toml](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2724)

```
{

  "durable_objects": {

    "bindings": [\
\
      { "name": "Counter", "class_name": "Counter" },\
\
      { "name": "ChatRoom", "class_name": "ChatRoom" },\
\
      { "name": "UserProfile", "class_name": "UserProfile" },\
\
    ],

  },

  "migrations": [\
\
    {\
\
      "tag": "v1",\
\
      "new_sqlite_classes": ["Counter", "ChatRoom", "UserProfile"],\
\
    },\
\
  ],

}
```

```
[[durable_objects.bindings]]

name = "Counter"

class_name = "Counter"

[[durable_objects.bindings]]

name = "ChatRoom"

class_name = "ChatRoom"

[[durable_objects.bindings]]

name = "UserProfile"

class_name = "UserProfile"

[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Counter", "ChatRoom", "UserProfile" ]
```

Each agent is accessed via its own path:

```
/agents/counter/...

/agents/chat-room/...

/agents/user-profile/...
```

## Request flow

Here is how a request flows through the system:

```

WebSocket

HTTP

HTTP Request
or WebSocket

routeAgentRequest
Parse URL path

Find binding in
env by name

Get/create DO
by instance ID

Agent Instance

Protocol?

onConnect(), onMessage

onRequest()
```

## Routing with authentication

There are several ways to authenticate requests before they reach your agent.

### Using authentication hooks

The `routeAgentRequest()` function provides `onBeforeConnect` and `onBeforeRequest` hooks for authentication:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2777)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2778)

```
import { Agent, routeAgentRequest } from "agents";

export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env, {

        // Run before WebSocket connections

        onBeforeConnect: async (request) => {

          const token = new URL(request.url).searchParams.get("token");

          if (!(await verifyToken(token, env))) {

            // Return a response to reject the connection

            return new Response("Unauthorized", { status: 401 });

          }

          // Return nothing to allow the connection

        },

        // Run before HTTP requests

        onBeforeRequest: async (request) => {

          const auth = request.headers.get("Authorization");

          if (!auth || !(await verifyAuth(auth, env))) {

            return new Response("Unauthorized", { status: 401 });

          }

        },

        // Optional: prepend a prefix to agent instance names

        prefix: "user-",

      })) ?? new Response("Not found", { status: 404 })

    );

  },

};
```

```
import { Agent, routeAgentRequest } from "agents";

export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env, {

        // Run before WebSocket connections

        onBeforeConnect: async (request) => {

          const token = new URL(request.url).searchParams.get("token");

          if (!(await verifyToken(token, env))) {

            // Return a response to reject the connection

            return new Response("Unauthorized", { status: 401 });

          }

          // Return nothing to allow the connection

        },

        // Run before HTTP requests

        onBeforeRequest: async (request) => {

          const auth = request.headers.get("Authorization");

          if (!auth || !(await verifyAuth(auth, env))) {

            return new Response("Unauthorized", { status: 401 });

          }

        },

        // Optional: prepend a prefix to agent instance names

        prefix: "user-",

      })) ?? new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;
```

### Manual authentication

Check authentication before calling `routeAgentRequest()`:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2773)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2774)

```
export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    // Protect agent routes

    if (url.pathname.startsWith("/agents/")) {

      const user = await authenticate(request, env);

      if (!user) {

        return new Response("Unauthorized", { status: 401 });

      }

      // Optionally, enforce that users can only access their own agents

      const instanceName = url.pathname.split("/")[3];

      if (instanceName !== `user-${user.id}`) {

        return new Response("Forbidden", { status: 403 });

      }

    }

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};
```

```
export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);

    // Protect agent routes

    if (url.pathname.startsWith("/agents/")) {

      const user = await authenticate(request, env);

      if (!user) {

        return new Response("Unauthorized", { status: 401 });

      }

      // Optionally, enforce that users can only access their own agents

      const instanceName = url.pathname.split("/")[3];

      if (instanceName !== `user-${user.id}`) {

        return new Response("Forbidden", { status: 403 });

      }

    }

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;
```

### Using a framework (Hono)

If you are using a framework like [Hono ↗](https://hono.dev/), authenticate in middleware before calling the agent:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2775)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2776)

```
import { Agent, getAgentByName } from "agents";

import { Hono } from "hono";

const app = new Hono();

// Authentication middleware

app.use("/agents/*", async (c, next) => {

  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token, c.env))) {

    return c.json({ error: "Unauthorized" }, 401);

  }

  await next();

});

// Route to a specific agent

app.all("/agents/code-review/:id/*", async (c) => {

  const id = c.req.param("id");

  const agent = await getAgentByName(c.env.CodeReviewAgent, id);

  return agent.fetch(c.req.raw);

});

export default app;
```

```
import { Agent, getAgentByName } from "agents";

import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// Authentication middleware

app.use("/agents/*", async (c, next) => {

  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token, c.env))) {

    return c.json({ error: "Unauthorized" }, 401);

  }

  await next();

});

// Route to a specific agent

app.all("/agents/code-review/:id/*", async (c) => {

  const id = c.req.param("id");

  const agent = await getAgentByName(c.env.CodeReviewAgent, id);

  return agent.fetch(c.req.raw);

});

export default app;
```

For WebSocket authentication patterns (tokens in URLs, JWT refresh), refer to [Cross-domain authentication](https://developers.cloudflare.com/agents/guides/cross-domain-authentication/).

## Troubleshooting

### Agent namespace not found

The error message lists available agents. Check:

1. Agent class is exported from your entry point.
2. Class name in code matches `class_name` in `wrangler.jsonc`.
3. URL uses correct kebab-case name.

### Request returns 404

1. Verify the URL pattern: `/agents/{agent-name}/{instance-name}`.
2. Check that `routeAgentRequest()` is called before your 404 handler.
3. Ensure the response from `routeAgentRequest()` is returned (not just called).

### WebSocket connection fails

1. Do not modify the response from `routeAgentRequest()` for WebSocket upgrades.
2. Ensure CORS is enabled if connecting from a different origin.
3. Check browser dev tools for the actual error.

### `basePath` not working

1. Ensure your Worker handles the custom path and forwards to the agent.
2. Use `getAgentByName()` \+ `agent.fetch(request)` to forward requests.
3. The `agent` parameter is still required but ignored when `basePath` is set.
4. Check that the server-side route matches the client's `basePath`.

## API reference

### `routeAgentRequest(request, env, options?)`

Routes a request to the appropriate agent.

| Parameter | Type | Description |
| --- | --- | --- |
| `request` | `Request` | The incoming request |
| `env` | `Env` | Environment with agent bindings |
| `options.cors` | `boolean | HeadersInit` | Enable CORS headers |
| `options.props` | `Record<string, unknown>` | Props passed to whichever agent handles request |
| `options.locationHint` | `string` | Preferred location for agent instances |
| `options.jurisdiction` | `string` | Data jurisdiction for agent instances |
| `options.onBeforeConnect` | `Function` | Callback before WebSocket connections |
| `options.onBeforeRequest` | `Function` | Callback before HTTP requests |

**Returns:**`Promise<Response | undefined>` \- Response if matched, undefined if no agent route.

### `getAgentByName(namespace, name, options?)`

Get an agent instance by name for server-side RPC or request forwarding.

| Parameter | Type | Description |
| --- | --- | --- |
| `namespace` | `DurableObjectNamespace<T>` | Agent binding from env |
| `name` | `string` | Instance name |
| `options.locationHint` | `string` | Preferred location |
| `options.jurisdiction` | `string` | Data jurisdiction |
| `options.props` | `Record<string, unknown>` | Initialization properties for onStart |

**Returns:**`Promise<DurableObjectStub<T>>` \- Typed stub for calling agent methods or forwarding requests.

### `useAgent(options)` / `AgentClient` options

Client connection options for custom routing:

| Option | Type | Description |
| --- | --- | --- |
| `agent` | `string` | Agent class name (required) |
| `name` | `string` | Instance name (default: `"default"`) |
| `basePath` | `string` | Full URL path - bypasses agent/name URL construction |
| `path` | `string` | Additional path to append to the URL |
| `onIdentity` | `(name, agent) => void` | Called when server sends identity |
| `onIdentityChange` | `(oldName, newName, oldAgent, newAgent) => void` | Called when identity changes on reconnect |

**Return value properties (React hook):**

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | Current instance name (reactive) |
| `agent` | `string` | Current agent class name (reactive) |
| `identified` | `boolean` | Whether identity has been received (reactive) |
| `ready` | `Promise<void>` | Resolves when identity is received |

### `Agent.options` (server)

Static options for agent configuration:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `hibernate` | `boolean` | `true` | Whether the agent should hibernate when inactive |
| `sendIdentityOnConnect` | `boolean` | `true` | Whether to send identity to clients on connect |
| `hungScheduleTimeoutSeconds` | `number` | `30` | Timeout before a running schedule is considered hung |

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2765)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/routing/#tab-panel-2766)

```
class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };

}
```

```
class SecureAgent extends Agent {

  static options = { sendIdentityOnConnect: false };

}
```

## Next steps

[Client SDK](https://developers.cloudflare.com/agents/api-reference/client-sdk/) Connect from browsers with useAgent and AgentClient.

[Cross-domain authentication](https://developers.cloudflare.com/agents/guides/cross-domain-authentication/) WebSocket authentication patterns.

[Callable methods](https://developers.cloudflare.com/agents/api-reference/callable-methods/) RPC from clients over WebSocket.

[Configuration](https://developers.cloudflare.com/agents/api-reference/configuration/) Set up agent bindings in wrangler.jsonc.

Back to top