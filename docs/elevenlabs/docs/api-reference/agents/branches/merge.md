# Source: https://elevenlabs.io/docs/api-reference/agents/branches/merge

Merge a branch into a target branch

### Path parameters

agent\_idstringRequired

The id of an agent. This is returned on agent creation.

source\_branch\_idstringRequired

Unique identifier for the source branch to merge from.

### Headers

xi-api-keystringOptional

### Query parameters

target\_branch\_idstringRequired

The ID of the target branch to merge into (must be the main branch).

### Request

This endpoint expects an object.

archive\_source\_branchbooleanOptionalDefaults to `true`

Whether to archive the source branch after merging

### Response

Successful Response

### Errors

422

Branches Merge Request Unprocessable Entity Error