# Source: https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/

[Skip to content](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#_top)

Copy page

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# flux-1-schnell

Text-to-Image • Black Forest Labs

@cf/black-forest-labs/flux-1-schnell

FLUX.1 \[schnell\] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.

| Model Info |  |
| --- | --- |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service) |
| Unit Pricing | $0.000053 per 512 by 512 tile, $0.00011 per step |

## Usage

- [Worker (Data URI)](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#tab-panel-1820)
- [Worker (Image)](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#tab-panel-1821)
- [curl](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#tab-panel-1822)

```
export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {

      prompt: 'a cyberpunk lizard',

      seed: Math.floor(Math.random() * 10)

    });

    // response.image is base64 encoded which can be used directly as an <img src=""> data URI

    const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;

    return Response.json({ dataURI });

  },

} satisfies ExportedHandler<Env>;
```

```
export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {

      prompt: 'a cyberpunk lizard',

      seed: Math.floor(Math.random() * 10)

    });

    // Convert from base64 string

    const binaryString = atob(response.image);

    // Create byte representation

    const img = Uint8Array.from(binaryString, (m) => m.codePointAt(0));

    return new Response(img, {

      headers: {

        'Content-Type': 'image/jpeg',

      },

    });

  },

} satisfies ExportedHandler<Env>;
```

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/black-forest-labs/flux-1-schnell  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat", "seed": "Random positive integer" }'
```

## Parameters

\* indicates a required field

### Input

- `prompt`` string`requiredmin 1max 2048
A text description of the image you want to generate.

- `steps`` integer`default 4max 8
The number of diffusion steps; higher values can improve quality but take longer.


### Output

- `image`` string`
The generated image in Base64 format.


## API Schemas

The following schemas are based on JSON Schema

- [Input](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#tab-panel-1823)
- [Output](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/#tab-panel-1824)

```
{

    "type": "object",

    "properties": {

        "prompt": {

            "type": "string",

            "minLength": 1,

            "maxLength": 2048,

            "description": "A text description of the image you want to generate."

        },

        "steps": {

            "type": "integer",

            "default": 4,

            "maximum": 8,

            "description": "The number of diffusion steps; higher values can improve quality but take longer."

        }

    },

    "required": [\
\
        "prompt"\
\
    ]

}
```

```
{

    "type": "object",

    "contentType": "application/json",

    "properties": {

        "image": {

            "type": "string",

            "description": "The generated image in Base64 format."

        }

    }

}
```

Back to top