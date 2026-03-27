# Source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/

[Skip to content](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#_top)

Copy page

# HTTP

Worker A that declares a Service binding to Worker B can forward a [`Request`](https://developers.cloudflare.com/workers/runtime-apis/request/) object to Worker B, by calling the `fetch()` method that is exposed on the binding object.

For example, consider the following Worker that implements a [`fetch()` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/):

- [wrangler.jsonc](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#tab-panel-8782)
- [wrangler.toml](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#tab-panel-8783)

```
{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_b",

  "main": "./src/workerB.js"

}
```

```
"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_b"

main = "./src/workerB.js"
```

```
export default {

  async fetch(request, env, ctx) {

    return new Response("Hello World!");

  }

}
```

The following Worker declares a binding to the Worker above:

- [wrangler.jsonc](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#tab-panel-8784)
- [wrangler.toml](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#tab-panel-8785)

```
{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_a",

  "main": "./src/workerA.js",

  "services": [\
\
    {\
\
      "binding": "WORKER_B",\
\
      "service": "worker_b"\
\
    }\
\
  ]

}
```

```
"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_a"

main = "./src/workerA.js"

[[services]]

binding = "WORKER_B"

service = "worker_b"
```

And then can forward a request to it:

```
export default {

  async fetch(request, env) {

    return await env.WORKER_B.fetch(request);

  },

};
```

Back to top