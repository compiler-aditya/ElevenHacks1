# Source: https://elevenlabs.io/docs/api-reference/history/get-audio

Returns the audio of an history item.

### Path parameters

history\_item\_idstringRequired

ID of the history item to be used. You can use the [Get generated items](https://elevenlabs.io/docs/api-reference/history/list) endpoint to retrieve a list of history items.

### Headers

xi-api-keystringOptional

### Response

The audio file of the history item.

### Errors

422

History Get Audio Request Unprocessable Entity Error