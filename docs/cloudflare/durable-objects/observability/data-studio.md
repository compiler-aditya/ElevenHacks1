# Source: https://developers.cloudflare.com/durable-objects/observability/data-studio/

[Skip to content](https://developers.cloudflare.com/durable-objects/observability/data-studio/#_top)

Copy page

# Data Studio

Each Durable Object can access private storage using [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) available on `ctx.storage`. To view and write to an object's stored data, you can use Durable Objects Data Studio as a UI editor available on the Cloudflare dashboard.

## View Data Studio

You need to have at least the `Workers Platform Admin` [role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) to access Data Studio.

1. In the Cloudflare dashboard, go to the **Durable Objects** page.
    [Go to **Durable Objects**](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)
2. Select an existing Durable Object namespace.

3. Select the **Data Studio** button.

4. Provide a Durable Object identifier, either a user-provided [unique name](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname) or a Cloudflare-generated [Durable Object ID](https://developers.cloudflare.com/durable-objects/api/id/).


- Queries executed by Data Studio send requests to your remote, deployed objects and incur [usage billing](https://developers.cloudflare.com/durable-objects/platform/pricing/) for requests, duration, rows read, and rows written. You should use Data Studio as you would handle your production, running objects.
- In the **Query** tab when running all statements, each SQL statement is sent as a separate Durable Object request.

## Audit logging

All queries issued by the Data Studio are logged with [audit logging v1](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) for your security and compliance needs.

- Each query emits two audit logs, a `query executed` action and a `query completed` action indicating query success or failure. `query_id` in the log event can be used to correlate the two events per query.

Back to top