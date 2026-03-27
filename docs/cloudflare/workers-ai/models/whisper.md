# Source: https://developers.cloudflare.com/workers-ai/models/whisper/

[Skip to content](https://developers.cloudflare.com/workers-ai/models/whisper/#_top)

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.ChTKThcR.svg)

# whisper

Automatic Speech Recognition • OpenAI

@cf/openai/whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.

| Model Info |  |
| --- | --- |
| More information | [link ↗](https://openai.com/research/whisper) |
| Unit Pricing | $0.00045 per audio minute |

## Usage

- [TypeScript](https://developers.cloudflare.com/workers-ai/models/whisper/#tab-panel-2200)
- [curl](https://developers.cloudflare.com/workers-ai/models/whisper/#tab-panel-2201)

```
export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch(

      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"

    );

    const blob = await res.arrayBuffer();

    const input = {

      audio: [...new Uint8Array(blob)],

    };

    const response = await env.AI.run(

      "@cf/openai/whisper",

      input

    );

    return Response.json({ input: { audio: [] }, response });

  },

} satisfies ExportedHandler<Env>;
```

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/openai/whisper  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  --data-binary "@talking-llama.mp3"
```

## Parameters

\* indicates a required field

### Input

- `0`` string`

- `1`` object`


  - `audio`` array`required
    An array of integers that represent the audio data constrained to 8-bit unsigned integer values

    - `items`` number`
      A value between 0 and 255

### Output

- `text`` string`required
The transcription

- `word_count`` number`

- `words`` array`


  - `items`` object`


    - `word`` string`

    - `start`` number`
      The second this word begins in the recording

    - `end`` number`
      The ending second when the word completes
- `vtt`` string`


## API Schemas

The following schemas are based on JSON Schema

- [Input](https://developers.cloudflare.com/workers-ai/models/whisper/#tab-panel-2202)
- [Output](https://developers.cloudflare.com/workers-ai/models/whisper/#tab-panel-2203)

```
{

    "oneOf": [\
\
        {\
\
            "type": "string",\
\
            "format": "binary"\
\
        },\
\
        {\
\
            "type": "object",\
\
            "properties": {\
\
                "audio": {\
\
                    "type": "array",\
\
                    "description": "An array of integers that represent the audio data constrained to 8-bit unsigned integer values",\
\
                    "items": {\
\
                        "type": "number",\
\
                        "description": "A value between 0 and 255"\
\
                    }\
\
                }\
\
            },\
\
            "required": [\
\
                "audio"\
\
            ]\
\
        }\
\
    ]

}
```

```
{

    "type": "object",

    "contentType": "application/json",

    "properties": {

        "text": {

            "type": "string",

            "description": "The transcription"

        },

        "word_count": {

            "type": "number"

        },

        "words": {

            "type": "array",

            "items": {

                "type": "object",

                "properties": {

                    "word": {

                        "type": "string"

                    },

                    "start": {

                        "type": "number",

                        "description": "The second this word begins in the recording"

                    },

                    "end": {

                        "type": "number",

                        "description": "The ending second when the word completes"

                    }

                }

            }

        },

        "vtt": {

            "type": "string"

        }

    },

    "required": [\
\
        "text"\
\
    ]

}
```

Back to top