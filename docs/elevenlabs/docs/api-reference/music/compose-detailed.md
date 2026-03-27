# Source: https://elevenlabs.io/docs/api-reference/music/compose-detailed

Compose a song from a prompt or a composition plan.

### Headers

xi-api-keystringOptional

### Query parameters

output\_formatenumOptional

Output format of the generated audio. Formatted as codec\_sample\_rate\_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3\_22050\_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.

Show 21 enum values

### Request

This endpoint expects an object.

promptstringOptional`<=4100 characters`

A simple text prompt to generate a song from. Cannot be used in conjunction with `composition_plan`.

composition\_planobjectOptional

A detailed composition plan to guide music generation. Cannot be used in conjunction with `prompt`.

Show 3 properties

music\_length\_msintegerOptional`3000-600000`

The length of the song to generate in milliseconds. Used only in conjunction with `prompt`. Must be between 3000ms and 600000ms. Optional - if not provided, the model will choose a length based on the prompt.

model\_id"music\_v1"Optional

The model to use for the generation.

seedintegerOptional`0-2147483647`

Random seed to initialize the music generation process. Providing the same seed with the same parameters can help achieve more consistent results, but exact reproducibility is not guaranteed and outputs may change across system updates. Cannot be used in conjunction with prompt.

force\_instrumentalbooleanOptionalDefaults to `false`

If true, guarantees that the generated song will be instrumental. If false, the song may or may not be instrumental depending on the `prompt`. Can only be used with `prompt`.

respect\_sections\_durationsbooleanOptionalDefaults to `true`

Controls how strictly section durations in the `composition_plan` are enforced. Only used with `composition_plan`. When set to true, the model will precisely respect each section’s `duration_ms` from the plan. When set to false, the model may adjust individual section durations which will generally lead to better generation quality and improved latency, while always preserving the total song duration from the plan.

store\_for\_inpaintingbooleanOptionalDefaults to `false`

Whether to store the generated song for inpainting. Only available to enterprise clients with access to the inpainting feature.

with\_timestampsbooleanOptionalDefaults to `false`

Whether to return the timestamps of the words in the generated song.

sign\_with\_c2pabooleanOptionalDefaults to `false`

Whether to sign the generated song with C2PA. Applicable only for mp3 files.

### Response

Multipart/mixed response with JSON metadata and binary audio file

### Errors

422

Music Compose Detailed Request Unprocessable Entity Error