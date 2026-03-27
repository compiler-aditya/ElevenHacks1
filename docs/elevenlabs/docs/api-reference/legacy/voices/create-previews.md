# Source: https://elevenlabs.io/docs/api-reference/legacy/voices/create-previews

Create a voice from a text prompt.

### Headers

xi-api-keystringOptional

### Query parameters

output\_formatenumOptional

The output format of the generated audio.

Show 21 enum values

### Request

This endpoint expects an object.

voice\_descriptionstringRequired`20-1000 characters`

Description to use for the created voice.

textstringOptional`100-1000 characters`

Text to generate, text length has to be between 100 and 1000.

auto\_generate\_textbooleanOptionalDefaults to `false`

Whether to automatically generate a text suitable for the voice description.

loudnessdoubleOptional`-1-1`Defaults to `0.5`

Controls the volume level of the generated voice. -1 is quietest, 1 is loudest, 0 corresponds to roughly -24 LUFS.

qualitydoubleOptional`-1-1`Defaults to `0.9`

Higher quality results in better voice output but less variety.

seedintegerOptional`0-2147483647`

Random number that controls the voice generation. Same seed with same inputs produces same voice.

guidance\_scaledoubleOptional`0-100`Defaults to `5`

Controls how closely the AI follows the prompt. Lower numbers give the AI more freedom to be creative, while higher numbers force it to stick more to the prompt. High numbers can cause voice to sound artificial or robotic. We recommend to use longer, more detailed prompts at lower Guidance Scale.

should\_enhancebooleanOptionalDefaults to `false`

Whether to enhance the voice description using AI to add more detail and improve voice generation quality. When enabled, the system will automatically expand simple prompts into more detailed voice descriptions. Defaults to False

### Response

Successful Response

previewslist of objects

The previews of the generated voices.

Show 5 properties

textstring

The text used to preview the voices.

### Errors

422

Text to Voice Create Previews Request Unprocessable Entity Error