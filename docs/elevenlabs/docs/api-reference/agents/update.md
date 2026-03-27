# Source: https://elevenlabs.io/docs/api-reference/agents/update

Patches an Agent settings

### Path parameters

agent\_idstringRequired

The id of an agent. This is returned on agent creation.

### Headers

xi-api-keystringOptional

### Query parameters

enable\_versioning\_if\_not\_enabledbooleanOptionalDefaults to `false`

Enable versioning for the agent, if not already enabled

branch\_idstringOptional

The ID of the branch to use

### Request

This endpoint expects an object.

conversation\_configobjectOptional

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

version\_descriptionstringOptional

Description for this version when publishing changes (only applicable for versioned agents)

### Response

Successful Response

agent\_idstring

The ID of the agent

namestring

The name of the agent

conversation\_configobject

The conversation configuration of the agent

Show 7 properties

metadataobject

The metadata of the agent

Show 2 properties

platform\_settingsobject

The platform settings of the agent

Show 13 properties

phone\_numberslist of objects

The phone numbers of the agent

Show 2 variants

whatsapp\_accountslist of objects

WhatsApp accounts assigned to the agent

Show 9 properties

workflowobject

The workflow of the agent

Show 3 properties

access\_infoobject

The access information of the agent for the user

Show 4 properties

tagslist of strings

Agent tags used to categorize the agent

version\_idstring

The ID of the version the agent is on

branch\_idstring

The ID of the branch the agent is on

main\_branch\_idstring

The ID of the main branch for this agent

### Errors

422

Agents Update Request Unprocessable Entity Error