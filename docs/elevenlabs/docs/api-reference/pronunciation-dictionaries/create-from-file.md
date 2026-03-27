# Source: https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/create-from-file

Creates a new pronunciation dictionary from a lexicon .PLS file

### Headers

xi-api-keystringOptional

### Request

This endpoint expects a multipart form containing an optional file.

namestringRequired

The name of the pronunciation dictionary, used for identification only.

filefileOptional

A lexicon .pls file which we will use to initialize the project with.

descriptionstringOptional

A description of the pronunciation dictionary, used for identification only.

workspace\_accessenumOptional

Should be one of 'admin', 'editor' or 'viewer'. If not provided, defaults to no access.

Allowed values:admineditorcommenterviewer

### Response

Successful Response

idstring

The ID of the created pronunciation dictionary.

namestring

The name of the created pronunciation dictionary.

created\_bystring

The user ID of the creator of the pronunciation dictionary.

creation\_time\_unixinteger

The creation time of the pronunciation dictionary in Unix timestamp.

version\_idstring

The ID of the created pronunciation dictionary version.

version\_rules\_numinteger

The number of rules in the version of the pronunciation dictionary.

descriptionstring

The description of the pronunciation dictionary.

permission\_on\_resourceenum

The permission on the resource of the pronunciation dictionary.

Allowed values:admineditorcommenterviewer

### Errors

422

Pronunciation Dictionaries Create from File Request Unprocessable Entity Error