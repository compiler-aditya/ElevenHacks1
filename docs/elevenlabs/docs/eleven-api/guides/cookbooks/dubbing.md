# Source: https://elevenlabs.io/docs/eleven-api/guides/cookbooks/dubbing

This guide will show you how to dub an audio file across languages. In this example we’ll dub an audio file from English to Spanish.

## Using the Dubbing API

[1](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/dubbing#create-an-api-key)

### Create an API key

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](https://elevenlabs.io/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

.env

```
ELEVENLABS_API_KEY=<your_api_key_here>
```

[2](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/dubbing#install-the-sdk)

### Install the SDK

We’ll also use the `dotenv` library to load our API key from an environment variable.

PythonTypeScript

```
pip install elevenlabs
pip install python-dotenv
```

To play the audio through your speakers, you may be prompted to install [MPV](https://mpv.io/)
and/or [ffmpeg](https://ffmpeg.org/).

[3](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/dubbing#make-the-api-request)

### Make the API request

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

PythonTypeScript

```
# example.py
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import requests
from io import BytesIO
import time

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

target_lang = "es"  # Spanish

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
)
response = requests.get(audio_url)

audio_data = BytesIO(response.content)
audio_data.name = "audio.mp3"

# Start dubbing
dubbed = elevenlabs.dubbing.create(
    file=audio_data, target_lang=target_lang
)

while True:
    status = elevenlabs.dubbing.get(dubbed.dubbing_id).status
    if status == "dubbed":
        dubbed_file = elevenlabs.dubbing.audio.get(dubbed.dubbing_id, target_lang)
        play(dubbed_file)
        break
    else:
        print("Audio is still being dubbed...")
        time.sleep(5)
```

[4](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/dubbing#execute-the-code)

### Execute the code

PythonTypeScript

```
python example.py
```

You should hear the dubbed audio file playing through your speakers.

## Next steps

[Dubbing overview\\
\\
Learn about supported languages, formats, and dubbing capabilities](https://elevenlabs.io/docs/overview/capabilities/dubbing) [Browse voices\\
\\
Explore voices available for use in dubbed content](https://elevenlabs.io/app/voice-library) [API reference\\
\\
Explore all Dubbing API parameters and response formats](https://elevenlabs.io/docs/api-reference/dubbing/create)