# Source: https://elevenlabs.io/docs/api-reference/text-to-voice/design

Design a voice via a prompt. This method returns a list of voice previews. Each preview has a generated\_voice\_id and a sample of the voice as base64 encoded mp3 audio. To create a voice use the generated\_voice\_id of the preferred preview with the /v1/text-to-voice endpoint.

### Headers

xi-api-keystringOptional

### Query parameters

output\_formatenumOptional

Output format of the generated audio. Formatted as codec\_sample\_rate\_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3\_22050\_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.

Show 21 enum values

### Request

This endpoint expects an object.

voice\_descriptionstringRequired`20-1000 characters`

Description to use for the created voice.

model\_idenumOptionalDefaults to `eleven_multilingual_ttv_v2`

Model to use for the voice generation. Possible values: eleven\_multilingual\_ttv\_v2, eleven\_ttv\_v3.

Allowed values:eleven\_multilingual\_ttv\_v2eleven\_ttv\_v3

textstringOptional`100-1000 characters`

Text to generate, text length has to be between 100 and 1000.

auto\_generate\_textbooleanOptionalDefaults to `false`

Whether to automatically generate a text suitable for the voice description.

loudnessdoubleOptional`-1-1`Defaults to `0.5`

Controls the volume level of the generated voice. -1 is quietest, 1 is loudest, 0 corresponds to roughly -24 LUFS.

seedintegerOptional`0-2147483647`

Random number that controls the voice generation. Same seed with same inputs produces same voice.

guidance\_scaledoubleOptional`0-100`Defaults to `5`

Controls how closely the AI follows the prompt. Lower numbers give the AI more freedom to be creative, while higher numbers force it to stick more to the prompt. High numbers can cause voice to sound artificial or robotic. We recommend to use longer, more detailed prompts at lower Guidance Scale.

stream\_previewsbooleanOptionalDefaults to `false`

Determines whether the Text to Voice previews should be included in the response. If true, only the generated IDs will be returned which can then be streamed via the /v1/text-to-voice/:generated\_voice\_id/stream endpoint.

should\_enhancebooleanOptionalDefaults to `false`

Whether to enhance the voice description using AI to add more detail and improve voice generation quality. When enabled, the system will automatically expand simple prompts into more detailed voice descriptions. Defaults to False

remixing\_session\_idstringOptional

The remixing session id.

remixing\_session\_iteration\_idstringOptional

The id of the remixing session iteration where these generations should be attached to. If not provided, a new iteration will be created.

qualitydoubleOptional`-1-1`

Higher quality results in better voice output but less variety.

reference\_audio\_base64stringOptional

Reference audio to use for the voice generation. The audio should be base64 encoded. Only supported when using the eleven\_ttv\_v3 model.

prompt\_strengthdoubleOptional`0-1`

Controls the balance of prompt versus reference audio when generating voice samples. 0 means almost no prompt influence, 1 means almost no reference audio influence. Only supported when using the eleven\_ttv\_v3 model.

### Response

Successful Response

previewslist of objects

The previews of the generated voices.

Show 5 properties

textstring

The text used to preview the voices.

### Errors

422

Text to Voice Design Request Unprocessable Entity Error