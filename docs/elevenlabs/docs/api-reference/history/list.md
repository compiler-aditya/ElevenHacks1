# Source: https://elevenlabs.io/docs/api-reference/history/list

Returns a list of your generated audio.

### Headers

xi-api-keystringOptional

### Query parameters

page\_sizeintegerOptionalDefaults to `100`

How many history items to return at maximum. Can not exceed 1000, defaults to 100.

start\_after\_history\_item\_idstringOptional

After which ID to start fetching, use this parameter to paginate across a large collection of history items. In case this parameter is not provided history items will be fetched starting from the most recently created one ordered descending by their creation date.

voice\_idstringOptional

ID of the voice to be filtered for. You can use the [Get voices](https://elevenlabs.io/docs/api-reference/voices/search) endpoint list all the available voices.

model\_idstringOptional

Search term used for filtering history items. If provided, source becomes required.

date\_before\_unixintegerOptional

Unix timestamp to filter history items before this date (exclusive).

date\_after\_unixintegerOptional

Unix timestamp to filter history items after this date (inclusive).

sort\_directionenumOptional

Sort direction for the results.

Allowed values:ascdesc

searchstringOptional

search term used for filtering

sourceenumOptional

Source of the generated history item

Allowed values:TTSSTS

### Response

Successful Response

historylist of objects

A list of speech history items.

Show 19 properties

has\_moreboolean

Whether there are more history items to fetch.

last\_history\_item\_idstring

The ID of the last history item.

scanned\_untilinteger

The timestamp of the last history item.

### Errors

422

History List Request Unprocessable Entity Error