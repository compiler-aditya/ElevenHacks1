# Source: https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant

**Tutorial** · Assumes you have completed the [ElevenAgents\\
quickstart](https://elevenlabs.io/docs/eleven-agents/quickstart) and have a Raspberry Pi with Python installed.

## Introduction

In this tutorial you will learn how to build a voice assistant with Agents Platform running on a Raspberry Pi. Just like conventional home assistants like Alexa on Amazon Echo, Google Home, or Siri on Apple devices, your Eleven Voice assistant will listen to a hotword, in our case “Hey Eleven”, and then initiate an ElevenLabs Agents session to assist the user.

Build a Raspberry Pi Voice Assistant with ElevenLabs Conversational AI - YouTube

Tap to unmute

[Build a Raspberry Pi Voice Assistant with ElevenLabs Conversational AI](https://www.youtube.com/watch?v=OrRlN_gUFRg) [ElevenLabs](https://www.youtube-nocookie.com/channel/UC-ew9TfeD887qUSiWWAAj1w)

![thumbnail-image](https://yt3.ggpht.com/c9ik7bc8n_f-W6XJKvBpiiCoDsQ7IKDruGZvxHAee5J8kFybBWWnj1TYAjJMF5x_a1Rrg5a31w=s68-c-k-c0x00ffffff-no-rj)

ElevenLabs118K subscribers

[Watch on](https://www.youtube.com/watch?v=OrRlN_gUFRg)

##### Prefer to jump straight to the code?

Find the [example project on\\
GitHub](https://github.com/elevenlabs/examples/tree/main/examples/conversational-ai/raspberry-pi).

## Requirements

- A Raspberry Pi 5 or similar device.
- A microphone and speaker.
- Python 3.9 or higher installed on your machine.
- An ElevenLabs account with an [API key](https://elevenlabs.io/app/settings/api-keys).

## Setup

### Install dependencies

On Debian-based systems you can install the dependencies with:

```
sudo apt-get update
sudo apt-get install libportaudio2 libportaudiocpp0 portaudio19-dev libasound-dev libsndfile1-dev -y
```

### Create the project

On your Raspberry Pi, open the terminal and create a new directory for your project.

```
mkdir eleven-voice-assistant
cd eleven-voice-assistant
```

Create a new virtual environment and install the dependencies:

```
python -m venv .venv # Only required the first time you set up the project
source .venv/bin/activate
```

Install the dependencies:

```
pip install tflite-runtime
pip install librosa
pip install EfficientWord-Net
pip install elevenlabs
pip install "elevenlabs[pyaudio]"
```

Now create a new python file called `hotword.py` and add the following code:

hotword.py

```
import os
import signal
import time
from eff_word_net.streams import SimpleMicStream
from eff_word_net.engine import HotwordDetector

from eff_word_net.audio_processing import Resnet50_Arc_loss

# from eff_word_net import samples_loc

from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation, ConversationInitiationData
from elevenlabs.conversational_ai.default_audio_interface import DefaultAudioInterface

convai_active = False

elevenlabs = ElevenLabs()
agent_id = os.getenv("ELEVENLABS_AGENT_ID")
api_key = os.getenv("ELEVENLABS_API_KEY")

dynamic_vars = {
    'user_name': 'Thor',
    'greeting': 'Hey'
}

config = ConversationInitiationData(
    dynamic_variables=dynamic_vars
)

base_model = Resnet50_Arc_loss()

eleven_hw = HotwordDetector(
    hotword="hey_eleven",
    model = base_model,
    reference_file=os.path.join("hotword_refs", "hey_eleven_ref.json"),
    threshold=0.7,
    relaxation_time=2
)

def create_conversation():
    """Create a new conversation instance"""
    return Conversation(
        # API client and agent ID.
        elevenlabs,
        agent_id,
        config=config,

        # Assume auth is required when API_KEY is set.
        requires_auth=bool(api_key),

        # Use the default audio interface.
        audio_interface=DefaultAudioInterface(),

        # Simple callbacks that print the conversation to the console.
        callback_agent_response=lambda response: print(f"Agent: {response}"),
        callback_agent_response_correction=lambda original, corrected: print(f"Agent: {original} -> {corrected}"),
        callback_user_transcript=lambda transcript: print(f"User: {transcript}"),

        # Uncomment if you want to see latency measurements.
        # callback_latency_measurement=lambda latency: print(f"Latency: {latency}ms"),
    )

def start_mic_stream():
    """Start or restart the microphone stream"""
    global mic_stream
    try:
        # Always create a new stream instance
        mic_stream = SimpleMicStream(
            window_length_secs=1.5,
            sliding_window_secs=0.75,
        )
        mic_stream.start_stream()
        print("Microphone stream started")
    except Exception as e:
        print(f"Error starting microphone stream: {e}")
        mic_stream = None
        time.sleep(1)  # Wait a bit before retrying

def stop_mic_stream():
    """Stop the microphone stream safely"""
    global mic_stream
    try:
        if mic_stream:
            # SimpleMicStream doesn't have a stop_stream method
            # We'll just set it to None and recreate it next time
            mic_stream = None
            print("Microphone stream stopped")
    except Exception as e:
        print(f"Error stopping microphone stream: {e}")

# Initialize microphone stream
mic_stream = None
start_mic_stream()

print("Say Hey Eleven ")
while True:
    if not convai_active:
        try:
            # Make sure we have a valid mic stream
            if mic_stream is None:
                start_mic_stream()
                continue

            frame = mic_stream.getFrame()
            result = eleven_hw.scoreFrame(frame)
            if result == None:
                #no voice activity
                continue
            if result["match"]:
                print("Wakeword uttered", result["confidence"])

                # Stop the microphone stream to avoid conflicts
                stop_mic_stream()

                # Start ConvAI Session
                print("Start ConvAI Session")
                convai_active = True

                try:
                    # Create a new conversation instance
                    conversation = create_conversation()

                    # Start the session
                    conversation.start_session()

                    # Set up signal handler for graceful shutdown
                    def signal_handler(sig, frame):
                        print("Received interrupt signal, ending session...")
                        try:
                            conversation.end_session()
                        except Exception as e:
                            print(f"Error ending session: {e}")

                    signal.signal(signal.SIGINT, signal_handler)

                    # Wait for session to end
                    conversation_id = conversation.wait_for_session_end()
                    print(f"Conversation ID: {conversation_id}")

                except Exception as e:
                    print(f"Error during conversation: {e}")
                finally:
                    # Cleanup
                    convai_active = False
                    print("Conversation ended, cleaning up...")

                    # Give some time for cleanup
                    time.sleep(1)

                    # Restart microphone stream
                    start_mic_stream()
                    print("Ready for next wake word...")

        except Exception as e:
            print(f"Error in wake word detection: {e}")
            # Try to restart microphone stream if there's an error
            mic_stream = None
            time.sleep(1)
            start_mic_stream()
```

## Agent configuration

[1](https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant#sign-in-to-elevenlabs)

### Sign in to ElevenLabs

Go to [elevenlabs.io](https://elevenlabs.io/app/sign-up) and sign in to your account.

[2](https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant#create-a-new-agent)

### Create a new agent

Navigate to [Agents Platform > Agents](https://elevenlabs.io/app/agents/agents) and
create a new agent from the blank template.

[3](https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant#set-the-first-message)

### Set the first message

Set the first message and specify the dynamic variable for the platform.

```
{{greeting}} {{user_name}}, Eleven here, what's up?
```

[4](https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant#set-the-system-prompt)

### Set the system prompt

Set the system prompt. You can find our best practises docs [here](https://elevenlabs.io/docs/eleven-agents/best-practices/prompting-guide).

```
You are a helpful Agents Platform assistant with access to a weather tool. When users ask about
weather conditions, use the get_weather tool to fetch accurate, real-time data. The tool requires
a latitude and longitude - use your geographic knowledge to convert location names to coordinates
accurately.

Never ask users for coordinates - you must determine these yourself. Always report weather
information conversationally, referring to locations by name only. For weather requests:

1. Extract the location from the user's message
2. Convert the location to coordinates and call get_weather
3. Present the information naturally and helpfully

For non-weather queries, provide friendly assistance within your knowledge boundaries. Always be
concise, accurate, and helpful.
```

[5](https://elevenlabs.io/docs/eleven-agents/guides/integrations/raspberry-pi-voice-assistant#set-up-a-server-tool)

### Set up a server tool

We’ll set up a simple server tool that will fetch the weather data for us. Follow the setup steps [here](https://elevenlabs.io/docs/eleven-agents/customization/tools/server-tools#configure-the-weather-tool) to set up the tool.

## Run the app

To run the app, first set the required environment variables:

```
export ELEVENLABS_API_KEY=YOUR_API_KEY
export ELEVENLABS_AGENT_ID=YOUR_AGENT_ID
```

Then simply run the following command:

```
python hotword.py
```

Now say “Hey Eleven” to start the conversation. Happy chattin’!

## \[Optional\] Train your custom hotword

### Generate training audio

To generate the hotword embeddings, you can use ElevenLabs to generate four training samples. Simply navigate to [Text To Speech](https://elevenlabs.io/app/speech-synthesis/text-to-speech) within your ElevenLabs app, and type in your hotword, e.g. “Hey Eleven”. Select a voice and click on the “Generate” button.

After the audio has been generated, download the audio file and save them into a folder called `hotword_training_audio` at the root of your project. Repeat this process three more times with different voices.

### Train the hotword

In your terminal, with your virtual environment activated, run the following command to train the hotword:

```
python -m eff_word_net.generate_reference --input-dir hotword_training_audio --output-dir hotword_refs --wakeword hey_eleven --model-type resnet_50_arc
```

This will generate the `hey_eleven_ref.json` file in the `hotword_refs` folder. Now you simply need to update the `reference_file` parameter in the `HotwordDetector` class in `hotword.py` to point to the new reference file and you’re good to go!

## Next steps

[ElevenAgents\\
\\
Build a fully managed voice agent without handling audio streams manually.](https://elevenlabs.io/docs/eleven-agents/quickstart) [TTS quickstart\\
\\
Explore more text-to-speech options and voice customisation.](https://elevenlabs.io/docs/eleven-api/quickstart)