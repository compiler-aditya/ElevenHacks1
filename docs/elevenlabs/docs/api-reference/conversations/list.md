# Source: https://elevenlabs.io/docs/api-reference/conversations/list

Get all conversations of agents that user owns. With option to restrict to a specific agent.

### Headers

xi-api-keystringOptional

### Query parameters

cursorstringOptional

Used for fetching next page. Cursor is returned in the response.

agent\_idstringOptional

The id of the agent you're taking the action on.

call\_successfulenumOptional

The result of the success evaluation

Allowed values:successfailureunknown

call\_start\_before\_unixintegerOptional

Unix timestamp (in seconds) to filter conversations up to this start date.

call\_start\_after\_unixintegerOptional

Unix timestamp (in seconds) to filter conversations after to this start date.

call\_duration\_min\_secsintegerOptional

Minimum call duration in seconds.

call\_duration\_max\_secsintegerOptional

Maximum call duration in seconds.

rating\_maxintegerOptional`1-5`

Maximum overall rating (1-5).

rating\_minintegerOptional`1-5`

Minimum overall rating (1-5).

has\_feedback\_commentbooleanOptional

Filter conversations with user feedback comments.

user\_idstringOptional

Filter conversations by the user ID who initiated them.

evaluation\_paramsstringOptional

Evaluation filters. Repeat param. Format: criteria\_id:result. Example: eval=value\_framing:success

data\_collection\_paramsstringOptional

Data collection filters. Repeat param. Format: id:op:value where op is one of eq\|neq\|gt\|gte\|lt\|lte\|in\|exists\|missing. For in, pipe-delimit values.

tool\_namesstringOptional

Filter conversations by tool names used during the call.

tool\_names\_successfulstringOptional

Filter conversations by tool names that had successful calls.

tool\_names\_erroredstringOptional

Filter conversations by tool names that had errored calls.

main\_languagesstringOptional

Filter conversations by detected main language (language code).

page\_sizeintegerOptional`1-100`Defaults to `30`

How many conversations to return at maximum. Can not exceed 100, defaults to 30.

summary\_modeenumOptionalDefaults to `exclude`

Whether to include transcript summaries in the response.

Allowed values:excludeinclude

searchstringOptionalDeprecated

Full-text or fuzzy search over transcript messages

conversation\_initiation\_sourceenumOptionalDefaults to `unknown`

Enum representing the possible sources for conversation initiation.

Show 17 enum values

branch\_idstringOptional

Filter conversations by branch ID.

### Response

Successful Response

conversationslist of objects

Show 18 properties

has\_moreboolean

next\_cursorstring

### Errors

422

Conversations List Request Unprocessable Entity Error