# Source: https://elevenlabs.io/docs/api-reference/dubbing/delete

Deletes a dubbing project.

### Path parameters

dubbing\_idstringRequired

ID of the dubbing project.

### Headers

xi-api-keystringOptional

### Response

Successful Response

statusstring

The status of the dubbing project. If the request was successful, the status will be 'ok'. Otherwise an error message with status 500 will be returned.

### Errors

422

Dubbing Delete Request Unprocessable Entity Error