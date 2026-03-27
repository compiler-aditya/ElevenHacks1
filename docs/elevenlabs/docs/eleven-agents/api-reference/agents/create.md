# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/agents/create

Create an agent from a config object

### Headers

xi-api-keystringOptional

### Query parameters

enable\_versioningbooleanOptionalDefaults to `false`

Enable versioning for the agent

### Request

This endpoint expects an object.

conversation\_configobjectRequired

Conversation configuration for an agent

Show 7 properties

platform\_settingsobjectOptional

Platform settings for the agent are all settings that aren't related to the conversation orchestration and content.

Show 12 properties

workflowobjectOptional

Workflow for the agent. This is used to define the flow of the conversation and how the agent interacts with tools.

Show 3 properties

namestringOptional

A name to make the agent easier to find

tagslist of stringsOptional

Tags to help classify and filter the agent

### Response

Successful Response

agent\_idstring

ID of the created agent

### Errors

422

Agents Create Request Unprocessable Entity Error