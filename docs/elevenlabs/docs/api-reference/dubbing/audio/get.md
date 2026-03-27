# Source: https://elevenlabs.io/docs/api-reference/dubbing/audio/get

Returns dub as a streamed MP3 or MP4 file. If this dub has been edited using Dubbing Studio you need to use the resource render endpoint as this endpoint only returns the original automatic dub result.

### Path parameters

dubbing\_idstringRequired

ID of the dubbing project.

language\_codestringRequired

ID of the language.

### Headers

xi-api-keystringOptional

### Response

The dubbed audio or video file

### Errors

403

Audio Get Request Forbidden Error

404

Audio Get Request Not Found Error

422

Audio Get Request Unprocessable Entity Error

425

Audio Get Request Too Early Error