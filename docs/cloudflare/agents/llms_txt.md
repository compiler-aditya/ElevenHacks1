# Source: https://developers.cloudflare.com/agents/llms.txt

\# Agents

Build AI-powered agents to perform tasks, persist state, browse the web, and communicate in real-time

\> Links below point directly to Markdown versions of each page. Any page can also be retrieved as Markdown by sending an \`Accept: text/markdown\` header to the page's URL without the \`index.md\` suffix (for example, \`curl -H "Accept: text/markdown" https://developers.cloudflare.com/agents/\`).
>
\> For other Cloudflare products, see the \[Cloudflare documentation directory\](https://developers.cloudflare.com/llms.txt).
>
\> Use \[Agents llms-full.txt\](https://developers.cloudflare.com/agents/llms-full.txt) for the complete Agents documentation in a single file, intended for offline indexing, bulk vectorization, or large-context models.

\## Overview

\- \[Build Agents on Cloudflare\](https://developers.cloudflare.com/agents/index.md)

\## Getting started

\- \[Getting started\](https://developers.cloudflare.com/agents/getting-started/index.md)
\- \[Add to existing project\](https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/index.md)
\- \[Build a chat agent\](https://developers.cloudflare.com/agents/getting-started/build-a-chat-agent/index.md): Build a streaming AI chat agent with tools using Workers AI — no API keys required.
\- \[Prompt an AI model\](https://developers.cloudflare.com/agents/getting-started/prompting/index.md): Use the Workers "mega prompt" to build a Agents using your preferred AI tools and/or IDEs. The prompt understands the Agents SDK APIs, best practices and guidelines, and makes it easier to build valid Agents and Workers.
\- \[Quick start\](https://developers.cloudflare.com/agents/getting-started/quick-start/index.md): Build your first agent in 10 minutes — a counter with persistent state that syncs to a React frontend in real-time.
\- \[Testing your Agents\](https://developers.cloudflare.com/agents/getting-started/testing-your-agent/index.md)

\## Patterns

\- \[Patterns\](https://developers.cloudflare.com/agents/patterns/index.md)

\## Model Context Protocol (MCP)

\- \[Model Context Protocol (MCP)\](https://developers.cloudflare.com/agents/model-context-protocol/index.md)
\- \[Authorization\](https://developers.cloudflare.com/agents/model-context-protocol/authorization/index.md)
\- \[MCP governance\](https://developers.cloudflare.com/agents/model-context-protocol/governance/index.md)
\- \[MCP server portals\](https://developers.cloudflare.com/agents/model-context-protocol/mcp-portal/index.md): Centralize multiple MCP servers onto a single endpoint and customize the tools, prompts, and resources available to users.
\- \[Cloudflare's own MCP servers\](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/index.md)
\- \[Tools\](https://developers.cloudflare.com/agents/model-context-protocol/tools/index.md)
\- \[Transport\](https://developers.cloudflare.com/agents/model-context-protocol/transport/index.md)

\## Agentic Payments

\- \[Agentic Payments\](https://developers.cloudflare.com/agents/agentic-payments/index.md): Let AI agents pay for services programmatically using payment protocols like MPP and x402 with Cloudflare's Agents SDK.
\- \[MPP (Machine Payments Protocol)\](https://developers.cloudflare.com/agents/agentic-payments/mpp/index.md): Accept and make payments using the Machine Payments Protocol (MPP) on Cloudflare Workers.
\- \[Charge for HTTP content\](https://developers.cloudflare.com/agents/agentic-payments/mpp/charge-for-http-content/index.md): Gate HTTP endpoints with MPP payments using the mpp-proxy template on Cloudflare Workers.
\- \[x402\](https://developers.cloudflare.com/agents/agentic-payments/x402/index.md): Accept and make machine-to-machine payments using the x402 HTTP payment protocol on Cloudflare Workers and the Agents SDK.
\- \[Charge for HTTP content\](https://developers.cloudflare.com/agents/agentic-payments/x402/charge-for-http-content/index.md): Gate HTTP endpoints with x402 payments using a Cloudflare Worker proxy.
\- \[Charge for MCP tools\](https://developers.cloudflare.com/agents/agentic-payments/x402/charge-for-mcp-tools/index.md): Charge per tool call in an MCP server using paidTool.
\- \[Pay from Agents SDK\](https://developers.cloudflare.com/agents/agentic-payments/x402/pay-from-agents-sdk/index.md): Use withX402Client to pay for resources from a Cloudflare Agent.
\- \[Pay from coding tools\](https://developers.cloudflare.com/agents/agentic-payments/x402/pay-with-tool-plugins/index.md): Add x402 payment handling to OpenCode and Claude Code.

\## api-reference

\- \[Agents API\](https://developers.cloudflare.com/agents/api-reference/agents-api/index.md)
\- \[Browse the web\](https://developers.cloudflare.com/agents/api-reference/browse-the-web/index.md)
\- \[Callable methods\](https://developers.cloudflare.com/agents/api-reference/callable-methods/index.md)
\- \[Chat agents\](https://developers.cloudflare.com/agents/api-reference/chat-agents/index.md)
\- \[Client SDK\](https://developers.cloudflare.com/agents/api-reference/client-sdk/index.md)
\- \[Codemode\](https://developers.cloudflare.com/agents/api-reference/codemode/index.md)
\- \[Configuration\](https://developers.cloudflare.com/agents/api-reference/configuration/index.md)
\- \[Email routing\](https://developers.cloudflare.com/agents/api-reference/email/index.md)
\- \[getCurrentAgent()\](https://developers.cloudflare.com/agents/api-reference/get-current-agent/index.md)
\- \[HTTP and Server-Sent Events\](https://developers.cloudflare.com/agents/api-reference/http-sse/index.md)
\- \[McpAgent\](https://developers.cloudflare.com/agents/api-reference/mcp-agent-api/index.md)
\- \[McpClient\](https://developers.cloudflare.com/agents/api-reference/mcp-client-api/index.md)
\- \[createMcpHandler\](https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/index.md)
\- \[Observability\](https://developers.cloudflare.com/agents/api-reference/observability/index.md)
\- \[Protocol messages\](https://developers.cloudflare.com/agents/api-reference/protocol-messages/index.md)
\- \[Queue tasks\](https://developers.cloudflare.com/agents/api-reference/queue-tasks/index.md)
\- \[Retrieval Augmented Generation\](https://developers.cloudflare.com/agents/api-reference/rag/index.md)
\- \[Readonly connections\](https://developers.cloudflare.com/agents/api-reference/readonly-connections/index.md)
\- \[Retries\](https://developers.cloudflare.com/agents/api-reference/retries/index.md)
\- \[Routing\](https://developers.cloudflare.com/agents/api-reference/routing/index.md)
\- \[Run Workflows\](https://developers.cloudflare.com/agents/api-reference/run-workflows/index.md)
\- \[Schedule tasks\](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/index.md)
\- \[Store and sync state\](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/index.md)
\- \[Using AI Models\](https://developers.cloudflare.com/agents/api-reference/using-ai-models/index.md)
\- \[WebSockets\](https://developers.cloudflare.com/agents/api-reference/websockets/index.md)

\## concepts

\- \[Agent class internals\](https://developers.cloudflare.com/agents/concepts/agent-class/index.md)
\- \[Calling LLMs\](https://developers.cloudflare.com/agents/concepts/calling-llms/index.md)
\- \[Human in the Loop\](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/index.md)
\- \[Tools\](https://developers.cloudflare.com/agents/concepts/tools/index.md)
\- \[What are agents?\](https://developers.cloudflare.com/agents/concepts/what-are-agents/index.md)
\- \[Workflows\](https://developers.cloudflare.com/agents/concepts/workflows/index.md)

\## guides

\- \[Implement Effective Agent Patterns\](https://developers.cloudflare.com/agents/guides/anthropic-agent-patterns/index.md): Implement common agent patterns using the Agents SDK framework.
\- \[Build a Remote MCP Client\](https://developers.cloudflare.com/agents/guides/build-mcp-client/index.md): Build an AI Agent that acts as a remote MCP client.
\- \[Build an Interactive ChatGPT App\](https://developers.cloudflare.com/agents/guides/chatgpt-app/index.md)
\- \[Connect to an MCP server\](https://developers.cloudflare.com/agents/guides/connect-mcp-client/index.md)
\- \[Cross-domain authentication\](https://developers.cloudflare.com/agents/guides/cross-domain-authentication/index.md)
\- \[Human-in-the-loop patterns\](https://developers.cloudflare.com/agents/guides/human-in-the-loop/index.md): Implement human-in-the-loop functionality using Cloudflare Agents for workflow approvals and MCP elicitation
\- \[Handle OAuth with MCP servers\](https://developers.cloudflare.com/agents/guides/oauth-mcp-client/index.md)
\- \[Build a Remote MCP server\](https://developers.cloudflare.com/agents/guides/remote-mcp-server/index.md)
\- \[Securing MCP servers\](https://developers.cloudflare.com/agents/guides/securing-mcp-server/index.md)
\- \[Build a Slack Agent\](https://developers.cloudflare.com/agents/guides/slack-agent/index.md)
\- \[Test a Remote MCP Server\](https://developers.cloudflare.com/agents/guides/test-remote-mcp-server/index.md)
\- \[Webhooks\](https://developers.cloudflare.com/agents/guides/webhooks/index.md)

\## platform

\- \[Limits\](https://developers.cloudflare.com/agents/platform/limits/index.md)
\- \[Prompt Engineering\](https://developers.cloudflare.com/agents/platform/prompting/index.md): Learn how to prompt engineer your AI models & tools when building Agents & Workers on Cloudflare.
\- \[prompt.txt\](https://developers.cloudflare.com/agents/platform/prompttxt/index.md): Provide context to your AI models & tools when building on Cloudflare.