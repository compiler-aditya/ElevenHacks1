# Source: https://developers.cloudflare.com/workers-ai/models/lucid-origin/

[Skip to content](https://developers.cloudflare.com/workers-ai/models/lucid-origin/#_top)

Copy page

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.CTjvkdQs.svg)

# lucid-origin

Text-to-Image • Leonardo

@cf/leonardo/lucid-origin

Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.

| Model Info |  |
| --- | --- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner | Yes |
| Unit Pricing | $0.007 per 512 by 512 tile, $0.00013 per step |

## Usage

- [TypeScript](https://developers.cloudflare.com/workers-ai/models/lucid-origin/#tab-panel-2015)
- [curl](https://developers.cloudflare.com/workers-ai/models/lucid-origin/#tab-panel-2016)

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

      "@cf/leonardo/lucid-origin",

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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/leonardo/lucid-origin  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'
```

## Parameters

\* indicates a required field

### Input

- `prompt`` string`requiredmin 1
A text description of the image you want to generate.

- `guidance`` number`default 4.5min 0max 10
Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt

- `seed`` integer`min 0
Random seed for reproducibility of the image generation

- `height`` integer`default 1120min 0max 2500
The height of the generated image in pixels

- `width`` integer`default 1120min 0max 2500
The width of the generated image in pixels

- `num_steps`` integer`min 1max 40
The number of diffusion steps; higher values can improve quality but take longer

- `steps`` integer`min 1max 40
The number of diffusion steps; higher values can improve quality but take longer


### Output

- `image`` string`
The generated image in Base64 format.


## API Schemas

The following schemas are based on JSON Schema

- [Input](https://developers.cloudflare.com/workers-ai/models/lucid-origin/#tab-panel-2017)
- [Output](https://developers.cloudflare.com/workers-ai/models/lucid-origin/#tab-panel-2018)

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

            "default": 4.5,

            "minimum": 0,

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

            "maximum": 2500,

            "default": 1120,

            "description": "The height of the generated image in pixels"

        },

        "width": {

            "type": "integer",

            "minimum": 0,

            "maximum": 2500,

            "default": 1120,

            "description": "The width of the generated image in pixels"

        },

        "num_steps": {

            "type": "integer",

            "minimum": 1,

            "maximum": 40,

            "description": "The number of diffusion steps; higher values can improve quality but take longer"

        },

        "steps": {

            "type": "integer",

            "minimum": 1,

            "maximum": 40,

            "description": "The number of diffusion steps; higher values can improve quality but take longer"

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