# Source: https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/

[Skip to content](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#_top)

Copy page

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.CTjvkdQs.svg)

# phoenix-1.0

Text-to-Image • Leonardo

@cf/leonardo/phoenix-1.0

Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.

| Model Info |  |
| --- | --- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner | Yes |
| Unit Pricing | $0.0058 per 512 by 512 tile, $0.00011 per step |

## Usage

- [TypeScript](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#tab-panel-2096)
- [curl](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#tab-panel-2097)

```
export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const inputs = {

      prompt: "cyberpunk cat",

    };

    const response = await env.AI.run(

      "@cf/leonardo/phoenix-1.0",

      inputs

    );

    return new Response(response, {

      headers: {

        "content-type": "image/jpg",

      },

    });

  },

} satisfies ExportedHandler<Env>;
```

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/leonardo/phoenix-1.0  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'
```

## Parameters

\* indicates a required field

### Input

- `prompt`` string`requiredmin 1
A text description of the image you want to generate.

- `guidance`` number`default 2min 2max 10
Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt

- `seed`` integer`min 0
Random seed for reproducibility of the image generation

- `height`` integer`default 1024min 0max 2048
The height of the generated image in pixels

- `width`` integer`default 1024min 0max 2048
The width of the generated image in pixels

- `num_steps`` integer`default 25min 1max 50
The number of diffusion steps; higher values can improve quality but take longer

- `negative_prompt`` string`min 1
Specify what to exclude from the generated images


### Output

The binding returns a `ReadableStream` with the output (check the model's output schema).

## API Schemas

The following schemas are based on JSON Schema

- [Input](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#tab-panel-2098)
- [Output](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#tab-panel-2099)

```
{

    "type": "object",

    "properties": {

        "prompt": {

            "type": "string",

            "minLength": 1,

            "description": "A text description of the image you want to generate."

        },

        "guidance": {

            "type": "number",

            "default": 2,

            "minimum": 2,

            "maximum": 10,

            "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"

        },

        "seed": {

            "type": "integer",

            "minimum": 0,

            "description": "Random seed for reproducibility of the image generation"

        },

        "height": {

            "type": "integer",

            "minimum": 0,

            "maximum": 2048,

            "default": 1024,

            "description": "The height of the generated image in pixels"

        },

        "width": {

            "type": "integer",

            "minimum": 0,

            "maximum": 2048,

            "default": 1024,

            "description": "The width of the generated image in pixels"

        },

        "num_steps": {

            "type": "integer",

            "default": 25,

            "minimum": 1,

            "maximum": 50,

            "description": "The number of diffusion steps; higher values can improve quality but take longer"

        },

        "negative_prompt": {

            "type": "string",

            "minLength": 1,

            "description": "Specify what to exclude from the generated images"

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

    "type": "string",

    "contentType": "image/jpeg",

    "format": "binary",

    "description": "The generated image in JPEG format"

}
```

Back to top