# Source: https://developers.cloudflare.com/agents/platform/limits/

[Skip to content](https://developers.cloudflare.com/agents/platform/limits/#_top)

Copy page

# Limits

Limits that apply to authoring, deploying, and running Agents are detailed below.

Many limits are inherited from those applied to Workers scripts and/or Durable Objects, and are detailed in the [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) documentation.

| Feature | Limit |
| --- | --- |
| Max concurrent (running) Agents per account | Tens of millions+ 1 |
| Max definitions per account | ~250,000+ 2 |
| Max state stored per unique Agent | 1 GB |
| Max compute time per Agent | 30 seconds (refreshed per HTTP request / incoming WebSocket message) 3 |
| Duration (wall clock) per step 3 | Unlimited (for example, waiting on a database call or an LLM response) |

* * *

Back to top