# Source: https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-dialogue

This guide will show you how to generate immersive, natural-sounding dialogue from text using the Text to Dialogue API.

## Using the Text to Dialogue API

[1](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-dialogue#create-an-api-key)

### Create an API key

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](https://elevenlabs.io/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

.env

```
ELEVENLABS_API_KEY=<your_api_key_here>
```

[2](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-dialogue#install-the-sdk)

### Install the SDK

We’ll also use the `dotenv` library to load our API key from an environment variable.

PythonTypeScript

```
pip install elevenlabs
pip install python-dotenv
```

[3](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-dialogue#make-the-api-request)

### Make the API request

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

PythonTypeScript

```
# example.py
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio = elevenlabs.text_to_dialogue.convert(
    inputs=[\
        {\
            "text": "[cheerfully] Hello, how are you?",\
            "voice_id": "9BWtsMINqrJLrRacOk9x",\
        },\
        {\
            "text": "[stuttering] I'm... I'm doing well, thank you",\
            "voice_id": "IKne3meq5aSn9XLyUdCD",\
        }\
    ]
)

play(audio)
```

[4](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-dialogue#execute-the-code)

### Execute the code

PythonTypeScript

```
python example.py
```

You should hear the dialogue audio play.

## Next steps

[Browse voices\\
\\
Explore 5,000+ voices to assign to each dialogue speaker](https://elevenlabs.io/app/voice-library) [Text to Speech\\
\\
Generate speech from a single voice with the Text to Speech API](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/text-to-speech) [API reference\\
\\
Explore all Text to Dialogue parameters and response formats](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert)