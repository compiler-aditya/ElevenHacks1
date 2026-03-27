# Source: https://elevenlabs.io/docs/api-reference/voices/settings/get

Returns the settings for a specific voice. “similarity\_boost” corresponds to”Clarity + Similarity Enhancement” in the web app and “stability” corresponds to “Stability” slider in the web app.

### Path parameters

voice\_idstringRequired

Voice ID to be used, you can use [https://api.elevenlabs.io/v1/voices](https://api.elevenlabs.io/v1/voices) to list all the available voices.

### Headers

xi-api-keystringOptional

### Response

Successful Response

stabilitydouble`0-1`

Determines how stable the voice is and the randomness between each generation. Lower values introduce broader emotional range for the voice. Higher values can result in a monotonous voice with limited emotion.

use\_speaker\_boostboolean

This setting boosts the similarity to the original speaker. Using this setting requires a slightly higher computational load, which in turn increases latency.

similarity\_boostdouble`0-1`

Determines how closely the AI should adhere to the original voice when attempting to replicate it.

styledouble

Determines the style exaggeration of the voice. This setting attempts to amplify the style of the original speaker. It does consume additional computational resources and might increase latency if set to anything other than 0.

speeddouble

Adjusts the speed of the voice. A value of 1.0 is the default speed, while values less than 1.0 slow down the speech, and values greater than 1.0 speed it up.

### Errors

422

Settings Get Request Unprocessable Entity Error