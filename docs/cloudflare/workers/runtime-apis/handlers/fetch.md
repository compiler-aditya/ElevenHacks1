# Source: https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/

[Skip to content](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/#_top)

Copy page

# Fetch Handler

## Background

Incoming HTTP requests to a Worker are passed to the `fetch()` handler as a [`Request`](https://developers.cloudflare.com/workers/runtime-apis/request/) object. To respond to the request with a response, return a [`Response`](https://developers.cloudflare.com/workers/runtime-apis/response/) object:

```
export default {

  async fetch(request, env, ctx) {

    return new Response('Hello World!');

  },

};
```

### Parameters

- `request` Request
  - The incoming HTTP request.
- `env` object
  - The [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) available to the Worker. As long as the [environment](https://developers.cloudflare.com/workers/wrangler/environments/) has not changed, the same object (equal by identity) may be passed to multiple requests. You can also [import `env` from `cloudflare:workers`](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) to access bindings from anywhere in your code.
- `ctx.waitUntil(promisePromise)` : void
  - Refer to [`waitUntil`](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil).
- `ctx.passThroughOnException()` : void
  - Refer to [`passThroughOnException`](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception).

Back to top