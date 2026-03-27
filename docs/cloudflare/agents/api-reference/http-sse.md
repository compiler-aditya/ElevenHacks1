# Source: https://developers.cloudflare.com/agents/api-reference/http-sse/

[Skip to content](https://developers.cloudflare.com/agents/api-reference/http-sse/#_top)

Copy page

# HTTP and Server-Sent Events

Agents can handle HTTP requests and stream responses using Server-Sent Events (SSE). This page covers the `onRequest` method and SSE patterns.

## Handling HTTP requests

Define the `onRequest` method to handle HTTP requests to your agent:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2523)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2524)

```
import { Agent } from "agents";

export class APIAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);

    // Route based on path

    if (url.pathname.endsWith("/status")) {

      return Response.json({ status: "ok", state: this.state });

    }

    if (url.pathname.endsWith("/action")) {

      if (request.method !== "POST") {

        return new Response("Method not allowed", { status: 405 });

      }

      const data = await request.json();

      await this.processAction(data.action);

      return Response.json({ success: true });

    }

    return new Response("Not found", { status: 404 });

  }

  async processAction(action) {

    // Handle the action

  }

}
```

```
import { Agent } from "agents";

export class APIAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);

    // Route based on path

    if (url.pathname.endsWith("/status")) {

      return Response.json({ status: "ok", state: this.state });

    }

    if (url.pathname.endsWith("/action")) {

      if (request.method !== "POST") {

        return new Response("Method not allowed", { status: 405 });

      }

      const data = await request.json<{ action: string }>();

      await this.processAction(data.action);

      return Response.json({ success: true });

    }

    return new Response("Not found", { status: 404 });

  }

  async processAction(action: string) {

    // Handle the action

  }

}
```

## Server-Sent Events (SSE)

SSE allows you to stream data to clients over a long-running HTTP connection. This is ideal for AI model responses that generate tokens incrementally.

### Manual SSE

Create an SSE stream manually using `ReadableStream`:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2527)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2528)

```
export class StreamAgent extends Agent {

  async onRequest(request) {

    const encoder = new TextEncoder();

    const stream = new ReadableStream({

      async start(controller) {

        // Send events

        controller.enqueue(encoder.encode("data: Starting...\n\n"));

        for (let i = 1; i <= 5; i++) {

          await new Promise((r) => setTimeout(r, 500));

          controller.enqueue(encoder.encode(`data: Step ${i} complete\n\n`));

        }

        controller.enqueue(encoder.encode("data: Done!\n\n"));

        controller.close();

      },

    });

    return new Response(stream, {

      headers: {

        "Content-Type": "text/event-stream",

        "Cache-Control": "no-cache",

        Connection: "keep-alive",

      },

    });

  }

}
```

```
export class StreamAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const encoder = new TextEncoder();

    const stream = new ReadableStream({

      async start(controller) {

        // Send events

        controller.enqueue(encoder.encode("data: Starting...\n\n"));

        for (let i = 1; i <= 5; i++) {

          await new Promise((r) => setTimeout(r, 500));

          controller.enqueue(encoder.encode(`data: Step ${i} complete\n\n`));

        }

        controller.enqueue(encoder.encode("data: Done!\n\n"));

        controller.close();

      },

    });

    return new Response(stream, {

      headers: {

        "Content-Type": "text/event-stream",

        "Cache-Control": "no-cache",

        Connection: "keep-alive",

      },

    });

  }

}
```

### SSE message format

SSE messages follow a specific format:

```
data: your message here\n\n
```

You can also include event types and IDs:

```
event: update\n

id: 123\n

data: {"count": 42}\n\n
```

### With AI SDK

The [AI SDK ↗](https://sdk.vercel.ai/) provides built-in SSE streaming:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2521)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2522)

```
import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";

export class ChatAgent extends Agent {

  async onRequest(request) {

    const { prompt } = await request.json();

    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: prompt,

    });

    return result.toTextStreamResponse();

  }

}
```

```
import { Agent } from "agents";

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";

interface Env {

  AI: Ai;

}

export class ChatAgent extends Agent<Env> {

  async onRequest(request: Request): Promise<Response> {

    const { prompt } = await request.json<{ prompt: string }>();

    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      prompt: prompt,

    });

    return result.toTextStreamResponse();

  }

}
```

## Connection handling

SSE connections can be long-lived. Handle client disconnects gracefully:

- **Persist progress** — Write to [agent state](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) so clients can resume
- **Use agent routing** — Clients can [reconnect to the same agent instance](https://developers.cloudflare.com/agents/api-reference/routing/) without session stores
- **No timeout limits** — Cloudflare Workers have no effective limit on SSE response duration

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2525)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/http-sse/#tab-panel-2526)

```
export class ResumeAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);

    const lastEventId = request.headers.get("Last-Event-ID");

    if (lastEventId) {

      // Client is resuming - send events after lastEventId

      return this.resumeStream(lastEventId);

    }

    return this.startStream();

  }

  async startStream() {

    // Start new stream, saving progress to this.state

  }

  async resumeStream(fromId) {

    // Resume from saved state

  }

}
```

```
export class ResumeAgent extends Agent {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);

    const lastEventId = request.headers.get("Last-Event-ID");

    if (lastEventId) {

      // Client is resuming - send events after lastEventId

      return this.resumeStream(lastEventId);

    }

    return this.startStream();

  }

  async startStream(): Promise<Response> {

    // Start new stream, saving progress to this.state

  }

  async resumeStream(fromId: string): Promise<Response> {

    // Resume from saved state

  }

}
```

## WebSockets vs SSE

| Feature | WebSockets | SSE |
| --- | --- | --- |
| Direction | Bi-directional | Server → Client only |
| Protocol | `ws://` / `wss://` | HTTP |
| Binary data | Yes | No (text only) |
| Reconnection | Manual | Automatic (browser) |
| Best for | Interactive apps, chat | Streaming responses, notifications |

**Recommendation:** Use WebSockets for interactive applications. Use SSE for streaming AI responses or server-push notifications.

Refer to [WebSockets](https://developers.cloudflare.com/agents/api-reference/websockets/) for WebSocket documentation.

## Next steps

[WebSockets](https://developers.cloudflare.com/agents/api-reference/websockets/) Bi-directional real-time communication.

[State management](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) Persist stream progress and agent state.

[Build a chat agent](https://developers.cloudflare.com/agents/getting-started/build-a-chat-agent/) Streaming responses with AI chat.

Back to top