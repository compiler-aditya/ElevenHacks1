# Source: https://developers.cloudflare.com/agents/api-reference/configuration/index.md

\-\-\-
title: Configuration
description: This guide covers everything you need to configure agents for local development and production deployment, including Wrangler configuration file setup, type generation, environment variables, and the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
\-\-\-

\[Skip to content\](#%5Ftop)

Was this helpful?

YesNo

\[ Edit page \](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/api-reference/configuration.mdx) \[ Report issue \](https://github.com/cloudflare/cloudflare-docs/issues/new/choose)

Copy page

\# Configuration

This guide covers everything you need to configure agents for local development and production deployment, including Wrangler configuration file setup, type generation, environment variables, and the Cloudflare dashboard.

\## Project structure

The typical file structure for an Agent project created from \`npm create cloudflare@latest agents-starter -- --template cloudflare/agents-starter\` follows:

\\* Directorysrc/
 \\* index.ts your Agent definition
\\* Directorypublic/
 \\* index.html
\\* Directorytest/
 \\* index.spec.ts your tests
\\* package.json
\\* tsconfig.json
\\* vitest.config.mts
\\* worker-configuration.d.ts
\\* wrangler.jsonc your Workers and Agent configuration

\## Wrangler configuration file

The \`wrangler.jsonc\` file configures your Cloudflare Worker and its bindings. Here is a complete example for an agents project:

\\* \[ wrangler.jsonc \](#tab-panel-2443)
\\* \[ wrangler.toml \](#tab-panel-2444)

\`\`\`

{

 "$schema": "node\_modules/wrangler/config-schema.json",

 "name": "my-agent-app",

 "main": "src/server.ts",

 // Set this to today's date

 "compatibility\_date": "2026-03-26",

 "compatibility\_flags": \["nodejs\_compat"\],

 // Static assets (optional)

 "assets": {

 "directory": "public",

 "binding": "ASSETS",

 },

 // Durable Object bindings for agents

 "durable\_objects": {

 "bindings": \[\
\
 {\
\
 "name": "MyAgent",\
\
 "class\_name": "MyAgent",\
\
 },\
\
 {\
\
 "name": "ChatAgent",\
\
 "class\_name": "ChatAgent",\
\
 },\
\
 \],

 },

 // Required: Enable SQLite storage for agents

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["MyAgent", "ChatAgent"\],\
\
 },\
\
 \],

 // AI binding (optional, for Workers AI)

 "ai": {

 "binding": "AI",

 },

 // Observability (recommended)

 "observability": {

 "enabled": true,

 },

}

\`\`\`

\`\`\`

"$schema" = "node\_modules/wrangler/config-schema.json"

name = "my-agent-app"

main = "src/server.ts"

\# Set this to today's date

compatibility\_date = "2026-03-26"

compatibility\_flags = \[ "nodejs\_compat" \]

\[assets\]

directory = "public"

binding = "ASSETS"

\[\[durable\_objects.bindings\]\]

name = "MyAgent"

class\_name = "MyAgent"

\[\[durable\_objects.bindings\]\]

name = "ChatAgent"

class\_name = "ChatAgent"

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "MyAgent", "ChatAgent" \]

\[ai\]

binding = "AI"

\[observability\]

enabled = true

\`\`\`

\### Key fields

\#### \`compatibility\_flags\`

The \`nodejs\_compat\` flag is required for agents:

\\* \[ wrangler.jsonc \](#tab-panel-2423)
\\* \[ wrangler.toml \](#tab-panel-2424)

\`\`\`

{

 "compatibility\_flags": \["nodejs\_compat"\],

}

\`\`\`

\`\`\`

compatibility\_flags = \[ "nodejs\_compat" \]

\`\`\`

This enables Node.js compatibility mode, which agents depend on for crypto, streams, and other Node.js APIs.

\#### \`durable\_objects.bindings\`

Each agent class needs a binding:

\\* \[ wrangler.jsonc \](#tab-panel-2425)
\\* \[ wrangler.toml \](#tab-panel-2426)

\`\`\`

{

 "durable\_objects": {

 "bindings": \[\
\
 {\
\
 "name": "Counter",\
\
 "class\_name": "Counter",\
\
 },\
\
 \],

 },

}

\`\`\`

\`\`\`

\[\[durable\_objects.bindings\]\]

name = "Counter"

class\_name = "Counter"

\`\`\`

\| Field \| Description \|
\| \-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| name \| The property name on env. Use this in code: env.Counter \|
\| class\\\_name \| Must match the exported class name exactly \|

When \`name\` and \`class\_name\` differ

When \`name\` and \`class\_name\` differ, follow the pattern shown below:

\\* \[ wrangler.jsonc \](#tab-panel-2427)
\\* \[ wrangler.toml \](#tab-panel-2428)

\`\`\`

{

 "durable\_objects": {

 "bindings": \[\
\
 {\
\
 "name": "COUNTER\_DO",\
\
 "class\_name": "CounterAgent",\
\
 },\
\
 \],

 },

}

\`\`\`

\`\`\`

\[\[durable\_objects.bindings\]\]

name = "COUNTER\_DO"

class\_name = "CounterAgent"

\`\`\`

This is useful when you want environment variable-style naming (\`COUNTER\_DO\`) but more descriptive class names (\`CounterAgent\`).

\#### \`migrations\`

Migrations tell Cloudflare how to set up storage for your Durable Objects:

\\* \[ wrangler.jsonc \](#tab-panel-2429)
\\* \[ wrangler.toml \](#tab-panel-2430)

\`\`\`

{

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["MyAgent"\],\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "MyAgent" \]

\`\`\`

\| Field \| Description \|
\| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| tag \| Version identifier (for example, "v1", "v2"). Must be unique \|
\| new\\\_sqlite\\\_classes \| Agent classes that use SQLite storage (state persistence) \|
\| deleted\\\_classes \| Classes being removed \|
\| renamed\\\_classes \| Classes being renamed \|

\#### \`assets\`

For serving static files (HTML, CSS, JS):

\\* \[ wrangler.jsonc \](#tab-panel-2431)
\\* \[ wrangler.toml \](#tab-panel-2432)

\`\`\`

{

 "assets": {

 "directory": "public",

 "binding": "ASSETS",

 },

}

\`\`\`

\`\`\`

\[assets\]

directory = "public"

binding = "ASSETS"

\`\`\`

With a binding, you can serve assets programmatically:

\\* \[ JavaScript \](#tab-panel-2465)
\\* \[ TypeScript \](#tab-panel-2466)

JavaScript

\`\`\`

export default {

 async fetch(request, env) {

 // Static assets are served by the worker automatically by default

 // Route the request to the appropriate agent

 const agentResponse = await routeAgentRequest(request, env);

 if (agentResponse) return agentResponse;

 // Add your own routing logic here

 return new Response("Not found", { status: 404 });

 },

};

\`\`\`

TypeScript

\`\`\`

export default {

 async fetch(request: Request, env: Env) {

 // Static assets are served by the worker automatically by default

 // Route the request to the appropriate agent

 const agentResponse = await routeAgentRequest(request, env);

 if (agentResponse) return agentResponse;

 // Add your own routing logic here

 return new Response("Not found", { status: 404 });

 },

} satisfies ExportedHandler;

\`\`\`

\#### \`ai\`

For Workers AI integration:

\\* \[ wrangler.jsonc \](#tab-panel-2433)
\\* \[ wrangler.toml \](#tab-panel-2434)

\`\`\`

{

 "ai": {

 "binding": "AI",

 },

}

\`\`\`

\`\`\`

\[ai\]

binding = "AI"

\`\`\`

Access in your agent:

\\* \[ JavaScript \](#tab-panel-2457)
\\* \[ TypeScript \](#tab-panel-2458)

JavaScript

\`\`\`

const response = await this.env.AI.run("@cf/meta/llama-3-8b-instruct", {

 prompt: "Hello!",

});

\`\`\`

TypeScript

\`\`\`

const response = await this.env.AI.run("@cf/meta/llama-3-8b-instruct", {

 prompt: "Hello!",

});

\`\`\`

\## Generating types

Wrangler can generate TypeScript types for your bindings.

\### Automatic generation

Run the types command:

Terminal window

\`\`\`

npx wrangler types

\`\`\`

This creates or updates \`worker-configuration.d.ts\` with your \`Env\` type.

\### Custom output path

Specify a custom path:

Terminal window

\`\`\`

npx wrangler types env.d.ts

\`\`\`

\### Without runtime types

For cleaner output (recommended for agents):

Terminal window

\`\`\`

npx wrangler types env.d.ts --include-runtime false

\`\`\`

This generates just your bindings without Cloudflare runtime types.

\### Example generated output

TypeScript

\`\`\`

// env.d.ts (generated)

declare namespace Cloudflare {

 interface Env {

 OPENAI\_API\_KEY: string;

 Counter: DurableObjectNamespace;

 ChatAgent: DurableObjectNamespace;

 }

}

interface Env extends Cloudflare.Env {}

\`\`\`

\### Manual type definition

You can also define types manually:

\\* \[ JavaScript \](#tab-panel-2469)
\\* \[ TypeScript \](#tab-panel-2470)

JavaScript

\`\`\`

// env.d.ts

\`\`\`

TypeScript

\`\`\`

// env.d.ts

import type { Counter } from "./src/agents/counter";

import type { ChatAgent } from "./src/agents/chat";

interface Env {

 // Secrets

 OPENAI\_API\_KEY: string;

 WEBHOOK\_SECRET: string;

 // Agent bindings

 Counter: DurableObjectNamespace;

 ChatAgent: DurableObjectNamespace;

 // Other bindings

 AI: Ai;

 ASSETS: Fetcher;

 MY\_KV: KVNamespace;

}

\`\`\`

\### Adding to package.json

Add a script for easy regeneration:

\`\`\`

{

 "scripts": {

 "types": "wrangler types env.d.ts --include-runtime false"

 }

}

\`\`\`

\## Environment variables and secrets

\### Local development (\`.env\`)

Create a \`.env\` file for local secrets (add to \`.gitignore\`):

Terminal window

\`\`\`

\# .env

OPENAI\_API\_KEY=sk-...

GITHUB\_WEBHOOK\_SECRET=whsec\_...

DATABASE\_URL=postgres://...

\`\`\`

Access in your agent:

\\* \[ JavaScript \](#tab-panel-2463)
\\* \[ TypeScript \](#tab-panel-2464)

JavaScript

\`\`\`

class MyAgent extends Agent {

 async onStart() {

 const apiKey = this.env.OPENAI\_API\_KEY;

 }

}

\`\`\`

TypeScript

\`\`\`

class MyAgent extends Agent {

 async onStart() {

 const apiKey = this.env.OPENAI\_API\_KEY;

 }

}

\`\`\`

\### Production secrets

Use \`wrangler secret\` for production:

Terminal window

\`\`\`

\# Add a secret

npx wrangler secret put OPENAI\_API\_KEY

\# Enter value when prompted

\# List secrets

npx wrangler secret list

\# Delete a secret

npx wrangler secret delete OPENAI\_API\_KEY

\`\`\`

\### Non-secret variables

For non-sensitive configuration, use \`vars\` in the Wrangler configuration file:

\\* \[ wrangler.jsonc \](#tab-panel-2435)
\\* \[ wrangler.toml \](#tab-panel-2436)

\`\`\`

{

 "vars": {

 "API\_BASE\_URL": "https://api.example.com",

 "MAX\_RETRIES": "3",

 "DEBUG\_MODE": "false",

 },

}

\`\`\`

\`\`\`

\[vars\]

API\_BASE\_URL = "https://api.example.com"

MAX\_RETRIES = "3"

DEBUG\_MODE = "false"

\`\`\`

All values must be strings. Parse numbers and booleans in code:

\\* \[ JavaScript \](#tab-panel-2461)
\\* \[ TypeScript \](#tab-panel-2462)

JavaScript

\`\`\`

const maxRetries = parseInt(this.env.MAX\_RETRIES, 10);

const debugMode = this.env.DEBUG\_MODE === "true";

\`\`\`

TypeScript

\`\`\`

const maxRetries = parseInt(this.env.MAX\_RETRIES, 10);

const debugMode = this.env.DEBUG\_MODE === "true";

\`\`\`

\### Environment-specific variables

Use \`env\` sections for different environments (for example, staging, production):

\\* \[ wrangler.jsonc \](#tab-panel-2441)
\\* \[ wrangler.toml \](#tab-panel-2442)

\`\`\`

{

 "name": "my-agent",

 "vars": {

 "API\_URL": "https://api.example.com",

 },

 "env": {

 "staging": {

 "vars": {

 "API\_URL": "https://staging-api.example.com",

 },

 },

 "production": {

 "vars": {

 "API\_URL": "https://api.example.com",

 },

 },

 },

}

\`\`\`

\`\`\`

name = "my-agent"

\[vars\]

API\_URL = "https://api.example.com"

\[env.staging.vars\]

API\_URL = "https://staging-api.example.com"

\[env.production.vars\]

API\_URL = "https://api.example.com"

\`\`\`

Deploy to specific environment:

Terminal window

\`\`\`

npx wrangler deploy --env staging

npx wrangler deploy --env production

\`\`\`

\## Local development

\### Starting the dev server

With Vite (recommended for full stack apps):

Terminal window

\`\`\`

npx vite dev

\`\`\`

Without Vite:

Terminal window

\`\`\`

npx wrangler dev

\`\`\`

\### Local state persistence

Durable Object state is persisted locally in \`.wrangler/state/\`:

\\* Directory.wrangler/
 \\* Directorystate/
 \\* Directoryv3/
 \\* Directoryd1/
 \\* Directoryminiflare-D1DatabaseObject/
 \\* ... (SQLite files)

\### Clearing local state

To reset all local Durable Object state:

Terminal window

\`\`\`

rm -rf .wrangler/state

\`\`\`

Or restart with fresh state:

Terminal window

\`\`\`

npx wrangler dev --persist-to=""

\`\`\`

\### Inspecting local SQLite

You can inspect agent state directly:

Terminal window

\`\`\`

\# Find the SQLite file

ls .wrangler/state/v3/d1/

\# Open with sqlite3

sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/\*.sqlite

\`\`\`

\## Dashboard setup

\### Automatic resources

When you deploy, Cloudflare automatically creates:

\\* \*\*Worker\*\* \\- Your deployed code
\\* \*\*Durable Object namespaces\*\* \\- One per agent class
\\* \*\*SQLite storage\*\* \\- Attached to each namespace

\### Viewing Durable Objects

Log in to the Cloudflare dashboard, then go to Durable Objects.

\[ Go to \*\*Durable Objects\*\* \](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)

Here you can:

\\* See all Durable Object namespaces
\\* View individual object instances
\\* Inspect storage (keys and values)
\\* Delete objects

\### Real-time logs

View live logs from your agents:

Terminal window

\`\`\`

npx wrangler tail

\`\`\`

Or in the dashboard:

1\. Go to your Worker.
2\. Select the \*\*Observability\*\* tab.
3\. Enable real-time logs.

Filter by:

\\* Status (success, error)
\\* Search text
\\* Sampling rate

\## Production deployment

\### Basic deploy

Terminal window

\`\`\`

npx wrangler deploy

\`\`\`

This:

1\. Bundles your code
2\. Uploads to Cloudflare
3\. Applies migrations
4\. Makes it live on \`\*.workers.dev\`

\### Custom domain

Add a route in the Wrangler configuration file:

\\* \[ wrangler.jsonc \](#tab-panel-2437)
\\* \[ wrangler.toml \](#tab-panel-2438)

\`\`\`

{

 "routes": \[\
\
 {\
\
 "pattern": "agents.example.com/\*",\
\
 "zone\_name": "example.com",\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[routes\]\]

pattern = "agents.example.com/\*"

zone\_name = "example.com"

\`\`\`

Or use a custom domain (simpler):

\\* \[ wrangler.jsonc \](#tab-panel-2439)
\\* \[ wrangler.toml \](#tab-panel-2440)

\`\`\`

{

 "routes": \[\
\
 {\
\
 "pattern": "agents.example.com",\
\
 "custom\_domain": true,\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[routes\]\]

pattern = "agents.example.com"

custom\_domain = true

\`\`\`

\### Preview deployments

Deploy without affecting production:

Terminal window

\`\`\`

npx wrangler deploy --dry-run # See what would be uploaded

npx wrangler versions upload # Upload new version

npx wrangler versions deploy # Gradually roll out

\`\`\`

\### Rollbacks

Roll back to a previous version:

Terminal window

\`\`\`

npx wrangler rollback

\`\`\`

\## Multi-environment setup

\### Environment configuration

Define environments in the Wrangler configuration file:

\\* \[ wrangler.jsonc \](#tab-panel-2467)
\\* \[ wrangler.toml \](#tab-panel-2468)

\`\`\`

{

 "name": "my-agent",

 "main": "src/server.ts",

 // Base configuration (shared)

 // Set this to today's date

 "compatibility\_date": "2026-03-26",

 "compatibility\_flags": \["nodejs\_compat"\],

 "durable\_objects": {

 "bindings": \[{ "name": "MyAgent", "class\_name": "MyAgent" }\],

 },

 "migrations": \[{ "tag": "v1", "new\_sqlite\_classes": \["MyAgent"\] }\],

 // Environment overrides

 "env": {

 "staging": {

 "name": "my-agent-staging",

 "vars": {

 "ENVIRONMENT": "staging",

 },

 },

 "production": {

 "name": "my-agent-production",

 "vars": {

 "ENVIRONMENT": "production",

 },

 },

 },

}

\`\`\`

\`\`\`

name = "my-agent"

main = "src/server.ts"

\# Set this to today's date

compatibility\_date = "2026-03-26"

compatibility\_flags = \[ "nodejs\_compat" \]

\[\[durable\_objects.bindings\]\]

name = "MyAgent"

class\_name = "MyAgent"

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "MyAgent" \]

\[env.staging\]

name = "my-agent-staging"

 \[env.staging.vars\]

 ENVIRONMENT = "staging"

\[env.production\]

name = "my-agent-production"

 \[env.production.vars\]

 ENVIRONMENT = "production"

\`\`\`

\### Deploying to environments

Terminal window

\`\`\`

\# Deploy to staging

npx wrangler deploy --env staging

\# Deploy to production

npx wrangler deploy --env production

\# Set secrets per environment

npx wrangler secret put OPENAI\_API\_KEY --env staging

npx wrangler secret put OPENAI\_API\_KEY --env production

\`\`\`

\### Separate Durable Objects

Each environment gets its own Durable Objects. Staging agents do not share state with production agents.

To explicitly separate:

\\* \[ wrangler.jsonc \](#tab-panel-2447)
\\* \[ wrangler.toml \](#tab-panel-2448)

\`\`\`

{

 "env": {

 "staging": {

 "durable\_objects": {

 "bindings": \[\
\
 {\
\
 "name": "MyAgent",\
\
 "class\_name": "MyAgent",\
\
 "script\_name": "my-agent-staging",\
\
 },\
\
 \],

 },

 },

 },

}

\`\`\`

\`\`\`

\[\[env.staging.durable\_objects.bindings\]\]

name = "MyAgent"

class\_name = "MyAgent"

script\_name = "my-agent-staging"

\`\`\`

\## Migrations

Migrations manage Durable Object storage schema changes.

\### Adding a new agent

Add to \`new\_sqlite\_classes\` in a new migration:

\\* \[ wrangler.jsonc \](#tab-panel-2445)
\\* \[ wrangler.toml \](#tab-panel-2446)

\`\`\`

{

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["ExistingAgent"\],\
\
 },\
\
 {\
\
 "tag": "v2",\
\
 "new\_sqlite\_classes": \["NewAgent"\],\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "ExistingAgent" \]

\[\[migrations\]\]

tag = "v2"

new\_sqlite\_classes = \[ "NewAgent" \]

\`\`\`

\### Renaming an agent class

Use \`renamed\_classes\`:

\\* \[ wrangler.jsonc \](#tab-panel-2459)
\\* \[ wrangler.toml \](#tab-panel-2460)

\`\`\`

{

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["OldName"\],\
\
 },\
\
 {\
\
 "tag": "v2",\
\
 "renamed\_classes": \[\
\
 {\
\
 "from": "OldName",\
\
 "to": "NewName",\
\
 },\
\
 \],\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "OldName" \]

\[\[migrations\]\]

tag = "v2"

 \[\[migrations.renamed\_classes\]\]

 from = "OldName"

 to = "NewName"

\`\`\`

Also update:

1\. The class name in code
2\. The \`class\_name\` in bindings
3\. Export statements

\### Deleting an agent class

Use \`deleted\_classes\`:

\\* \[ wrangler.jsonc \](#tab-panel-2453)
\\* \[ wrangler.toml \](#tab-panel-2454)

\`\`\`

{

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["AgentToDelete", "AgentToKeep"\],\
\
 },\
\
 {\
\
 "tag": "v2",\
\
 "deleted\_classes": \["AgentToDelete"\],\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "AgentToDelete", "AgentToKeep" \]

\[\[migrations\]\]

tag = "v2"

deleted\_classes = \[ "AgentToDelete" \]

\`\`\`

Warning

This permanently deletes all data for that class.

\### Migration best practices

1\. \*\*Never modify existing migrations\*\* \\- Always add new ones.
2\. \*\*Use sequential tags\*\* \\- v1, v2, v3 (or use dates: 2025-01-15).
3\. \*\*Test locally first\*\* \\- Migrations run on deploy.
4\. \*\*Back up production data\*\* \\- Before renaming or deleting.

\## Troubleshooting

\### No such Durable Object class

The class is not in migrations:

\\* \[ wrangler.jsonc \](#tab-panel-2449)
\\* \[ wrangler.toml \](#tab-panel-2450)

\`\`\`

{

 "migrations": \[\
\
 {\
\
 "tag": "v1",\
\
 "new\_sqlite\_classes": \["MissingClassName"\],\
\
 },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "MissingClassName" \]

\`\`\`

\### Cannot find module in types

Regenerate types:

Terminal window

\`\`\`

npx wrangler types env.d.ts --include-runtime false

\`\`\`

\### Secrets not loading locally

Check that \`.env\` exists and contains the variable:

Terminal window

\`\`\`

cat .env

\# Should show: MY\_SECRET=value

\`\`\`

\### Migration tag conflict

Migration tags must be unique. If you see conflicts:

\\* \[ wrangler.jsonc \](#tab-panel-2451)
\\* \[ wrangler.toml \](#tab-panel-2452)

\`\`\`

{

 // Wrong - duplicate tags

 "migrations": \[\
\
 { "tag": "v1", "new\_sqlite\_classes": \["A"\] },\
\
 { "tag": "v1", "new\_sqlite\_classes": \["B"\] },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "A" \]

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "B" \]

\`\`\`

\\* \[ wrangler.jsonc \](#tab-panel-2455)
\\* \[ wrangler.toml \](#tab-panel-2456)

\`\`\`

{

 // Correct - sequential tags

 "migrations": \[\
\
 { "tag": "v1", "new\_sqlite\_classes": \["A"\] },\
\
 { "tag": "v2", "new\_sqlite\_classes": \["B"\] },\
\
 \],

}

\`\`\`

\`\`\`

\[\[migrations\]\]

tag = "v1"

new\_sqlite\_classes = \[ "A" \]

\[\[migrations\]\]

tag = "v2"

new\_sqlite\_classes = \[ "B" \]

\`\`\`

\## Next steps

\[ Agents API \](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK.

\[ Routing \](https://developers.cloudflare.com/agents/api-reference/routing/) Route requests to your agent instances.

\[ Schedule tasks \](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) Background processing with delayed and cron-based tasks.

\`\`\`json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":\[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/configuration/","name":"Configuration"}}\]}
\`\`\`