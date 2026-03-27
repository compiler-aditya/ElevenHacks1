# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/get

Get information about a single agent branch

### Path parameters

agent\_idstringRequired

The id of an agent. This is returned on agent creation.

branch\_idstringRequired

Unique identifier for the branch.

### Headers

xi-api-keystringOptional

### Response

Successful Response

idstring

namestring

agent\_idstring

descriptionstring

created\_atinteger

last\_committed\_atinteger

is\_archivedboolean

protection\_statusenumDefaults to `writer_perms_required`

Allowed values:writer\_perms\_requiredadmin\_perms\_required

access\_infoobject

Access information for the branch

Show 4 properties

current\_live\_percentagedoubleDefaults to `0`

Percentage of traffic live on the branch

parent\_branchobject

Parent branch of the branch

Show 2 properties

most\_recent\_versionslist of objects

Most recent versions on the branch

Show 8 properties

### Errors

422

Branches Get Request Unprocessable Entity Error