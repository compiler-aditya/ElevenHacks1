# Source: https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/

[Skip to content](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#_top)

Copy page

a

# indictrans2-en-indic-1B

Translation • ai4bharat

@cf/ai4bharat/indictrans2-en-indic-1B

IndicTrans2 is the first open-source transformer-based multilingual NMT model that supports high-quality translations across all the 22 scheduled Indic languages

| Model Info |  |
| --- | --- |
| Unit Pricing | $0.34 per M input tokens, $0.34 per M output tokens |

## Usage

- [TypeScript](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#tab-panel-1895)
- [Python](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#tab-panel-1896)
- [curl](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#tab-panel-1897)

```
export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run(

      "@cf/ai4bharat/indictrans2-en-indic-1B",

      {

        text: "I'll have an order of the moule frites",

        source_lang: "english", // defaults to english

        target_lang: "french",

      }

    );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;
```

```
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"

headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, input):

    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)

    return response.json()

output = run('@cf/ai4bharat/indictrans2-en-indic-1B', {

  "text": "I'll have an order of the moule frites",

  "source_lang": "english",

  "target_lang": "french"

})

print(output)
```

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/ai4bharat/indictrans2-en-indic-1B  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    -d '{ "text": "Ill have an order of the moule frites", "source_lang": "english", "target_lang": "french" }'
```

## Parameters

\* indicates a required field

### Input

- `text`` one of`required


  - `0`` string`
    Input text to translate. Can be a single string or a list of strings.

  - `1`` array`
    Input text to translate. Can be a single string or a list of strings.

    - `items`` string`
- `target_language`` string`requireddefault hin\_Deva
Target langauge to translate to


### Output

- `translations`` array`required
Translated texts

  - `items`` string`

## API Schemas

The following schemas are based on JSON Schema

- [Input](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#tab-panel-1898)
- [Output](https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/#tab-panel-1899)

```
{

    "type": "object",

    "properties": {

        "text": {

            "oneOf": [\
\
                {\
\
                    "type": "string"\
\
                },\
\
                {\
\
                    "type": "array",\
\
                    "items": {\
\
                        "type": "string"\
\
                    }\
\
                }\
\
            ],

            "description": "Input text to translate. Can be a single string or a list of strings."

        },

        "target_language": {

            "type": "string",

            "enum": [\
\
                "asm_Beng",\
\
                "awa_Deva",\
\
                "ben_Beng",\
\
                "bho_Deva",\
\
                "brx_Deva",\
\
                "doi_Deva",\
\
                "eng_Latn",\
\
                "gom_Deva",\
\
                "gon_Deva",\
\
                "guj_Gujr",\
\
                "hin_Deva",\
\
                "hne_Deva",\
\
                "kan_Knda",\
\
                "kas_Arab",\
\
                "kas_Deva",\
\
                "kha_Latn",\
\
                "lus_Latn",\
\
                "mag_Deva",\
\
                "mai_Deva",\
\
                "mal_Mlym",\
\
                "mar_Deva",\
\
                "mni_Beng",\
\
                "mni_Mtei",\
\
                "npi_Deva",\
\
                "ory_Orya",\
\
                "pan_Guru",\
\
                "san_Deva",\
\
                "sat_Olck",\
\
                "snd_Arab",\
\
                "snd_Deva",\
\
                "tam_Taml",\
\
                "tel_Telu",\
\
                "urd_Arab",\
\
                "unr_Deva"\
\
            ],

            "default": "hin_Deva",

            "description": "Target langauge to translate to"

        }

    },

    "required": [\
\
        "text",\
\
        "target_language"\
\
    ]

}
```

```
{

    "type": "object",

    "properties": {

        "translations": {

            "type": "array",

            "items": {

                "type": "string"

            },

            "description": "Translated texts"

        }

    },

    "required": [\
\
        "translations"\
\
    ]

}
```

Back to top