# Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/

[Skip to content](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#_top)

Copy page

# Analog

In this guide, you will create a new [Analog ↗](https://analogjs.org/) application and deploy to Cloudflare Workers.

[Analog ↗](https://analogjs.org/) is a fullstack meta-framework for Angular, powered by [Vite ↗](https://vitejs.dev/) and [Nitro ↗](https://nitro.unjs.io/).

AnalogDetected

Generated configuration

wrangler.jsonc

main:.output/server/index.mjs

wrangler.jsonc

assets:directory: .output/public

wrangler.jsonc

compatibility\_flags:nodejs\_compat

wrangler.jsonc

observability:enabled: true

WorkersDeployed

Analog detected

## 1\. Set up a new project

Use the [`create-cloudflare` ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Analog's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Analog project, run the following command:

- [npm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8302)
- [yarn](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8303)
- [pnpm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8304)

```
npm create cloudflare@latest -- my-analog-app --framework=analog
```

```
yarn create cloudflare my-analog-app --framework=analog
```

```
pnpm create cloudflare@latest my-analog-app --framework=analog
```

After setting up your project, change your directory by running the following command:

```
cd my-analog-app
```

## 2\. Develop locally

After you have created your project, run the following command in the project directory to start a local server. This will allow you to preview your project locally during development.

- [npm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8305)
- [yarn](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8306)
- [pnpm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8307)

```
npm run dev
```

```
yarn run dev
```

```
pnpm run dev
```

## 3\. Deploy your Project

Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including [Cloudflare's own](https://developers.cloudflare.com/workers/ci-cd/builds/).

The following command will build and deploy your project. If you're using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.

- [npm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8308)
- [yarn](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8309)
- [pnpm](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/#tab-panel-8310)

```
npm run deploy
```

```
yarn run deploy
```

```
pnpm run deploy
```

* * *

## Bindings

Your Analog application can be fully integrated with the Cloudflare Developer Platform, in both local development and in production, by using product bindings. The [Nitro documentation ↗](https://nitro.unjs.io/deploy/providers/cloudflare#direct-access-to-cloudflare-bindings) provides information about configuring bindings and how you can access them in your Analog API routes.

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more.

Back to top