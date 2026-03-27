# Source: https://developers.cloudflare.com/workers-ai/get-started/dashboard/

[Skip to content](https://developers.cloudflare.com/workers-ai/get-started/dashboard/#_top)

Copy page

# Dashboard

Follow this guide to create a Workers AI application using the Cloudflare dashboard.

## Prerequisites

Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.

## Setup

To create a Workers AI application:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
    [Go to **Workers & Pages**](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.

3. Under **Select a template**, select **LLM Chat App**.

4. Select **Deploy**.

5. Name your Worker, then select **Create and deploy**.

6. Preview your Worker at its provided [`workers.dev`](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) subdomain.


## Development

### Dashboard

Editing in the dashboard is helpful for simpler use cases.

Once you have created your Worker script, you can edit and deploy your Worker using the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
    [Go to **Workers & Pages**](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your application.

3. Select **Edit Code**.


![Edit code directly within the Cloudflare dashboard](https://developers.cloudflare.com/_astro/workers-edit-code.CKxxvQSe_11id2b.webp)

### Wrangler CLI

To develop more advanced applications or [implement tests](https://developers.cloudflare.com/workers/testing/), start working in the Wrangler CLI.

1. Install [`npm` ↗](https://docs.npmjs.com/getting-started).
2. Install [`Node.js` ↗](https://nodejs.org/en/).

3. Run the following command, replacing the value of `[<DIRECTORY>]` which the location you want to put your Worker Script.

- [npm](https://developers.cloudflare.com/workers-ai/get-started/dashboard/#tab-panel-7652)
- [yarn](https://developers.cloudflare.com/workers-ai/get-started/dashboard/#tab-panel-7653)
- [pnpm](https://developers.cloudflare.com/workers-ai/get-started/dashboard/#tab-panel-7654)

```
npm create cloudflare@latest -- [<DIRECTORY>] --type=pre-existing
```

```
yarn create cloudflare [<DIRECTORY>] --type=pre-existing
```

```
pnpm create cloudflare@latest [<DIRECTORY>] --type=pre-existing
```

After you run this command - and work through the prompts - your local changes will not automatically sync with dashboard. So, once you download your script, continue using the CLI.

Back to top