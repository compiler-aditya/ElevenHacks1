# Source: https://elevenlabs.io/docs/api-reference/music/upload

Upload a music file to be later used for inpainting. Only available to enterprise clients with access to the inpainting feature.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects a multipart form containing a file.

filefileRequired

The audio file to upload.

extract\_composition\_planbooleanOptionalDefaults to `false`

Whether to generate and return the composition plan for the uploaded song. If True, the response will include the composition\_plan but will increase the latency.

### Response

Successfully uploaded music file with optional composition plan

song\_idstring

Unique identifier for the uploaded song

composition\_planobject

The composition plan extracted from the uploaded song. Only present if `extract_composition_plan` was True in the request body

Show 3 properties

### Errors

422

Music Upload Request Unprocessable Entity Error