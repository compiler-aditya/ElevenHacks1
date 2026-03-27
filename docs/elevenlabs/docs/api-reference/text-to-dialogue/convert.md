# Source: https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert

Converts a list of text and voice ID pairs into speech (dialogue) and returns audio.

### Headers

xi-api-keystringOptional

### Query parameters

output\_formatenumOptionalDefaults to `mp3_44100_128`

Output format of the generated audio. Formatted as codec\_sample\_rate\_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3\_22050\_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.

Show 28 enum values

### Request

This endpoint expects an object.

inputslist of objectsRequired

A list of dialogue inputs, each containing text and a voice ID which will be converted into speech. The maximum number of unique voice IDs is 10.

Show 2 properties

model\_idstringOptionalDefaults to `eleven_v3`

Identifier of the model that will be used, you can query them using GET /v1/models. The model needs to have support for text to speech, you can check this using the can\_do\_text\_to\_speech property.

language\_codestringOptional

Language code (ISO 639-1) used to enforce a language for the model and text normalization. If the model does not support provided language code, an error will be returned.

settingsobjectOptional

Settings controlling the dialogue generation.

Show 1 properties

pronunciation\_dictionary\_locatorslist of objectsOptional

A list of pronunciation dictionary locators (id, version\_id) to be applied to the text. They will be applied in order. You may have up to 3 locators per request

Show 2 properties

seedintegerOptional

If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed. Must be integer between 0 and 4294967295.

apply\_text\_normalizationenumOptionalDefaults to `auto`

This parameter controls text normalization with three modes: ‘auto’, ‘on’, and ‘off’. When set to ‘auto’, the system will automatically decide whether to apply text normalization (e.g., spelling out numbers). With ‘on’, text normalization will always be applied, while with ‘off’, it will be skipped.

Allowed values:autoonoff

### Response

The generated audio file

### Errors

422

Text to Dialogue Convert Request Unprocessable Entity Error