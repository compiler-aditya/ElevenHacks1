# Source: https://elevenlabs.io/docs/api-reference/voices/search

Gets a list of all available voices for a user with search, filtering and pagination.

### Headers

xi-api-keystringOptional

### Query parameters

next\_page\_tokenstringOptional

The next page token to use for pagination. Returned from the previous request. Use this in combination with the has\_more flag for reliable pagination.

page\_sizeintegerOptionalDefaults to `10`

How many voices to return at maximum. Can not exceed 100, defaults to 10. Page 0 may include more voices due to default voices being included.

searchstringOptional

Search term to filter voices by. Searches in name, description, labels, category.

sortstringOptional

Which field to sort by, one of ‘created\_at\_unix’ or ‘name’. ‘created\_at\_unix’ may not be available for older voices.

sort\_directionstringOptional

Which direction to sort the voices in. 'asc' or 'desc'.

voice\_typestringOptional

Type of the voice to filter by. One of ‘personal’, ‘community’, ‘default’, ‘workspace’, ‘non-default’, ‘saved’. ‘non-default’ is equal to all but ‘default’. ‘saved’ is equal to non-default, but includes default voices if they have been added to a collection.

categorystringOptional

Category of the voice to filter by. One of 'premade', 'cloned', 'generated', 'professional'

fine\_tuning\_statestringOptional

State of the voice’s fine tuning to filter by. Applicable only to professional voices clones. One of ‘draft’, ‘not\_verified’, ‘not\_started’, ‘queued’, ‘fine\_tuning’, ‘fine\_tuned’, ‘failed’, ‘delayed’

collection\_idstringOptional

Collection ID to filter voices by.

include\_total\_countbooleanOptionalDefaults to `true`

Whether to include the total count of voices found in the response. NOTE: The total\_count value is a live snapshot and may change between requests as users create, modify, or delete voices. For pagination, rely on the has\_more flag instead. Only enable this when you actually need the total count (e.g., for display purposes), as it incurs a performance cost.

voice\_idsstringOptional

Voice IDs to lookup by. Maximum 100 voice IDs.

### Response

Successful Response

voiceslist of objects

The list of voices matching the query.

Show 23 properties

has\_moreboolean

Indicates whether there are more voices available in subsequent pages. Use this flag (and next\_page\_token) for reliable pagination instead of relying on total\_count.

total\_countinteger

The total count of voices matching the query. This value is a live snapshot that reflects the current state of the database and may change between requests as users create, modify, or delete voices. For reliable pagination, use the has\_more flag instead of relying on this value. Only request this field when you actually need the total count (e.g., for display purposes), as calculating it incurs a performance cost.

next\_page\_tokenstring

Token to retrieve the next page of results. Pass this value to the next request to continue pagination. Null if there are no more results.

### Errors

422

Voices Search Request Unprocessable Entity Error