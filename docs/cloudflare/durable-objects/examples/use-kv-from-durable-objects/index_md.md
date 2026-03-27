# Source: https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/index.md

\-\-\-
title: Use Workers KV from Durable Objects
description: Read and write to/from KV within a Durable Object
image: https://developers.cloudflare.com/dev-products-preview.png
\-\-\-

\[Skip to content\](#%5Ftop)

Was this helpful?

YesNo

\[ Edit page \](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/durable-objects/examples/use-kv-from-durable-objects.mdx) \[ Report issue \](https://github.com/cloudflare/cloudflare-docs/issues/new/choose)

Copy page

\# Use Workers KV from Durable Objects

\*\*Last reviewed:\*\* over 2 years ago

Read and write to/from Workers KV within a Durable Object

The following Worker script shows you how to configure a Durable Object to read from and/or write to a \[Workers KV namespace\](https://developers.cloudflare.com/kv/concepts/how-kv-works/). This is useful when using a Durable Object to coordinate between multiple clients, and allows you to serialize writes to KV and/or broadcast a single read from KV to hundreds or thousands of clients connected to a single Durable Object \[using WebSockets\](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Prerequisites:

\\* A \[KV namespace\](https://developers.cloudflare.com/kv/api/) created via the Cloudflare dashboard or the \[wrangler CLI\](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
\\* A \[configured binding\](https://developers.cloudflare.com/kv/concepts/kv-bindings/) for the \`kv\_namespace\` in the Cloudflare dashboard or Wrangler file.
\\* A \[Durable Object namespace binding\](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects).

Configure your Wrangler file as follows:

\\* \[ wrangler.jsonc \](#tab-panel-4789)
\\* \[ wrangler.toml \](#tab-panel-4790)

\`\`\`

{

 "$schema": "./node\_modules/wrangler/config-schema.json",

 "name": "my-worker",

 "main": "src/index.ts",

 "kv\_namespaces": \[\
\
 {\
\
 "binding": "YOUR\_KV\_NAMESPACE",\
\
 "id": ""\
\
 }\
\
 \],

 "durable\_objects": {

 "bindings": \[\
\
 {\
\
 "name": "YOUR\_DO\_CLASS",\
\
 "class\_name": "YourDurableObject"\
\
 }\
\
 \]

 }

}

\`\`\`

\`\`\`

"$schema" = "./node\_modules/wrangler/config-schema.json"

name = "my-worker"

main = "src/index.ts"

\[\[kv\_namespaces\]\]

binding = "YOUR\_KV\_NAMESPACE"

id = ""

\[\[durable\_objects.bindings\]\]

name = "YOUR\_DO\_CLASS"

class\_name = "YourDurableObject"

\`\`\`

\\* \[ TypeScript \](#tab-panel-4787)
\\* \[ Python \](#tab-panel-4788)

TypeScript

\`\`\`

import { DurableObject } from "cloudflare:workers";

interface Env {

 YOUR\_KV\_NAMESPACE: KVNamespace;

 YOUR\_DO\_CLASS: DurableObjectNamespace;

}

export default {

 async fetch(req: Request, env: Env): Promise {

 // Assume each Durable Object is mapped to a roomId in a query parameter

 // In a production application, this will likely be a roomId defined by your application

 // that you validate (and/or authenticate) first.

 let url = new URL(req.url);

 let roomIdParam = url.searchParams.get("roomId");

 if (roomIdParam) {

 // Get a stub that allows you to call that Durable Object

 let durableObjectStub = env.YOUR\_DO\_CLASS.getByName(roomIdParam);

 // Pass the request to that Durable Object and await the response

 // This invokes the constructor once on your Durable Object class (defined further down)

 // on the first initialization, and the fetch method on each request.

 //

 // You could pass the original Request to the Durable Object's fetch method

 // or a simpler URL with just the roomId.

 let response = await durableObjectStub.fetch(\`http://do/${roomId}\`);

 // This would return the value you read from KV \*within\* the Durable Object.

 return response;

 }

 },

};

export class YourDurableObject extends DurableObject {

 constructor(

 public state: DurableObjectState,

 env: Env,

 ) {

 super(state, env);

 }

 async fetch(request: Request) {

 // Error handling elided for brevity.

 // Write to KV

 await this.env.YOUR\_KV\_NAMESPACE.put("some-key");

 // Fetch from KV

 let val = await this.env.YOUR\_KV\_NAMESPACE.get("some-other-key");

 return Response.json(val);

 }

}

\`\`\`

Python

\`\`\`

from workers import DurableObject, Response, WorkerEntrypoint

from urllib.parse import urlparse, parse\_qs

class Default(WorkerEntrypoint):

 async def fetch(self, req):

 # Assume each Durable Object is mapped to a roomId in a query parameter

 # In a production application, this will likely be a roomId defined by your application

 # that you validate (and/or authenticate) first.

 url = req.url

 parsed\_url = urlparse(url)

 room\_id\_param = parse\_qs(parsed\_url.query).get('roomId', \[None\])\[0\]

 if room\_id\_param:

 # Get a stub that allows you to call that Durable Object

 durable\_object\_stub = self.env.YOUR\_DO\_CLASS.getByName(room\_id\_param)

 # Pass the request to that Durable Object and await the response

 # This invokes the constructor once on your Durable Object class (defined further down)

 # on the first initialization, and the fetch method on each request.

 #

 # You could pass the original Request to the Durable Object's fetch method

 # or a simpler URL with just the roomId.

 response = await durable\_object\_stub.fetch(f"http://do/{room\_id\_param}")

 # This would return the value you read from KV \*within\* the Durable Object.

 return response

class YourDurableObject(DurableObject):

 def \_\_init\_\_(self, state, env):

 super().\_\_init\_\_(state, env)

 async def fetch(self, request):

 # Error handling elided for brevity.

 # Write to KV

 await self.env.YOUR\_KV\_NAMESPACE.put("some-key", "some-value")

 # Fetch from KV

 val = await self.env.YOUR\_KV\_NAMESPACE.get("some-other-key")

 return Response.json(val)

\`\`\`

\`\`\`json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":\[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/use-kv-from-durable-objects/","name":"Use Workers KV from Durable Objects"}}\]}
\`\`\`