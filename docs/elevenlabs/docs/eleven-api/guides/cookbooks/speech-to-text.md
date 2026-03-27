# Source: https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-to-text

This guide will show you how to convert spoken audio into text using the Speech to Text API.

Use the [ElevenLabs speech-to-text skill](https://github.com/elevenlabs/skills/tree/main/speech-to-text) to transcribe audio from your AI coding assistant:

```
npx skills add elevenlabs/skills --skill speech-to-text
```

This tutorial will demonstrate how to use the Batch Speech to Text API. For a guide on how to use
the Realtime Speech to Text API, see the [Client-side\\
streaming](https://elevenlabs.io/docs/eleven-api/guides/how-to/speech-to-text/client-side-streaming) or [Server-side\\
streaming](https://elevenlabs.io/docs/eleven-api/guides/how-to/speech-to-text/server-side-streaming) guides.

## Using the Speech to Text API

[1](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-to-text#create-an-api-key)

### Create an API key

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](https://elevenlabs.io/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

.env

```
ELEVENLABS_API_KEY=<your_api_key_here>
```

[2](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-to-text#install-the-sdk)

### Install the SDK

We’ll also use the `dotenv` library to load our API key from an environment variable.

PythonTypeScript

```
pip install elevenlabs
pip install python-dotenv
```

[3](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-to-text#make-the-api-request)

### Make the API request

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

PythonTypeScript

```
# example.py
import os
from dotenv import load_dotenv
from io import BytesIO
import requests
from elevenlabs.client import ElevenLabs

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
)
response = requests.get(audio_url)
audio_data = BytesIO(response.content)

transcription = elevenlabs.speech_to_text.convert(
    file=audio_data,
    model_id="scribe_v2", # Model to use
    tag_audio_events=True, # Tag audio events like laughter, applause, etc.
    language_code="eng", # Language of the audio file. If set to None, the model will detect the language automatically.
    diarize=True, # Whether to annotate who is speaking
)

print(transcription)
```

[4](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/speech-to-text#execute-the-code)

### Execute the code

PythonTypeScript

```
python example.py
```

You should see the transcription of the audio file printed to the console.

## Next steps

[Batch transcription\\
\\
Transcribe pre-recorded audio files with speaker diarization and event tagging](https://elevenlabs.io/docs/eleven-api/guides/how-to/speech-to-text/batch) [Realtime transcription\\
\\
Stream audio and receive transcriptions in real time](https://elevenlabs.io/docs/eleven-api/guides/how-to/speech-to-text/realtime) [API reference\\
\\
Explore all Speech to Text parameters and response formats](https://elevenlabs.io/docs/api-reference/speech-to-text/convert)