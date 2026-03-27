# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/tests/summaries

Gets multiple agent response tests by their IDs. Returns a dictionary mapping test IDs to test summaries.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

test\_idslist of stringsRequired

List of test IDs to fetch. No duplicates allowed.

### Response

Successful Response

testsmap from strings to objects

Dictionary mapping test IDs to their summary information

Show 10 properties

### Errors

422

Tests Summaries Request Unprocessable Entity Error