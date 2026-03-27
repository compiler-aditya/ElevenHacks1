# Source: https://elevenlabs.io/docs/eleven-api/guides/how-to/voices/remix-a-voice

This guide will show you how to create an entirely new voice by remixing an existing one.

## Using the Voice Design API

This guide assumes you have [set up your API key and SDK](https://elevenlabs.io/docs/eleven-api/quickstart). Complete
the quickstart first if you haven’t. To play audio through your speakers, you may also need
[MPV](https://mpv.io/) and/or [ffmpeg](https://ffmpeg.org/).

[1](https://elevenlabs.io/docs/eleven-api/guides/how-to/voices/remix-a-voice#make-the-api-request)

### Make the API request

Remixing a voice is a two step process:

1. Generate a preview of the new voice by providing a voice ID and a prompt.
2. Create the new voice from the preview.

We’ll start by generating a preview of the new voice.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

You can only remix voices that were created by you. For example previously designed voices, IVC or PVC voices. You cannot remix voices from the voice library.

PythonTypeScript

```
# example.py
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import base64

load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

voices = elevenlabs.text_to_voice.remix(
    voice_id="JBFqnCBsd6RMkjVDRZzb"
    voice_description="Use a higher pitch and change to a Boston accent.",
    text="Of course I'm a Bostonian, I've lived here all my life!",
)

for preview in voices.previews:
    # Convert base64 to audio buffer
    audio_buffer = base64.b64decode(preview.audio_base_64)

    print(f"Playing preview: {preview.generated_voice_id}")

    play(audio_buffer)
```

[2](https://elevenlabs.io/docs/eleven-api/guides/how-to/voices/remix-a-voice#execute-the-code)

### Execute the code

PythonTypeScript

```
python example.py
```

You should hear the generated voice previews playing through your speakers, one at a time.

[3](https://elevenlabs.io/docs/eleven-api/guides/how-to/voices/remix-a-voice#add-generated-voice-to-your-library)

### Add generated voice to your library

Once you’ve generated the previews and picked your favorite, you can add it to your voice library via the generated voice ID so it can be used with other APIs.

PythonTypeScript

```
voice = elevenlabs.text_to_voice.create(
    voice_name="Bostonian",
    voice_description="A high pitched Bostonian accent.",
    # The generated voice ID of the preview you want to use,
    # using the first in the list for this example
    generated_voice_id=voices.previews[0].generated_voice_id
)

print(voice.voice_id)
```

## Next steps

[Voice design\\
\\
Generate a new voice from a text description rather than remixing an existing one.](https://elevenlabs.io/docs/eleven-api/guides/how-to/voices/voice-design) [API reference\\
\\
Full Voice Remix API reference and parameters.](https://elevenlabs.io/docs/api-reference/text-to-voice/remix)