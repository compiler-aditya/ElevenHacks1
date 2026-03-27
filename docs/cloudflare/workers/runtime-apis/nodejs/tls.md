# Source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/

[Skip to content](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/#_top)

Copy page

# tls

You can use [`node:tls` ↗](https://nodejs.org/api/tls.html) to create secure connections to
external services using [TLS ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security) (Transport Layer Security).

```
import { connect } from "node:tls";

// ... in a request handler ...

const connectionOptions = { key: env.KEY, cert: env.CERT };

const socket = connect(url, connectionOptions, () => {

  if (socket.authorized) {

    console.log("Connection authorized");

  }

});

socket.on("data", (data) => {

  console.log(data);

});

socket.on("end", () => {

  console.log("server ends connection");

});
```

The following APIs are available:

- [`connect` ↗](https://nodejs.org/api/tls.html#tlsconnectoptions-callback)
- [`TLSSocket` ↗](https://nodejs.org/api/tls.html#class-tlstlssocket)
- [`checkServerIdentity` ↗](https://nodejs.org/api/tls.html#tlscheckserveridentityhostname-cert)
- [`createSecureContext` ↗](https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions)

All other APIs, including [`tls.Server` ↗](https://nodejs.org/api/tls.html#class-tlsserver) and [`tls.createServer` ↗](https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener),
are not supported and will throw a `Not implemented` error when called.

The full `node:tls` API is documented in the [Node.js documentation for `node:tls` ↗](https://nodejs.org/api/tls.html).

Back to top