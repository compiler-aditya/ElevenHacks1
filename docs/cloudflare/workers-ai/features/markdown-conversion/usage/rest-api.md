# Source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/

[Skip to content](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/#_top)

Copy page

# REST API

You can also use the Markdown Conversion REST API to convert your documents into Markdown.

## Prerequisite: Get Workers AI API token

To use the Markdown Conversion service via the REST API, you need an API token with permissions for the [Workers AI](https://developers.cloudflare.com/workers-ai/) REST API. Refer to [Get started with the Workers AI REST API](https://developers.cloudflare.com/workers-ai/get-started/rest-api/) for instructions on obtaining an API token with the correct permissions.

## Transform

This endpoint lets you convert any file given to us into markdown.

```
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \

  -X POST \

  -H 'Authorization: Bearer {API_TOKEN}' \

  -F "files=@cat.jpeg" \

  -F "files=@somatosensory.pdf" \

  -F 'conversionOptions={ ... }'
```

### Parameters

`files`` File[]`required

The files you want to convert.

`conversionOptions`` ConversionOptions`optional

Options that allow you to control how your files are converted. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/) for further details.

### Response

```
{

  "success": true,

  "result": [\
\
    {\
\
      "id": "...",\
\
      "name": "good.html",\
\
      "mimeType": "text/html",\
\
      "format": "markdown",\
\
      "tokens": 49,\
\
      "data": "# Image Embedded with a Data URI\n\nThis _image_ is directly encoded in the HTML:\n\n\n\nAn image description\n\n \n\nIt's a tiny 5x5 pixel PNG, scaled up to 50x50px.\n\n"\
\
    },\
\
    {\
\
      "id": "...",\
\
      "name": "bad.pdf",\
\
      "mimeType": "application/pdf",\
\
      "format": "error",\
\
      "error": "Some error that prevented this image from being converted"\
\
    }\
\
  ]

}
```

## Supported

This endpoint lets you programmatically retrieve the full set of rich formats that are supported for conversion.

```
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown/supported \

  -H 'Authorization: Bearer {API_TOKEN}'
```

### Response

```
{

  "success": true,

  "result": [\
\
    {\
\
      "extension": ".html",\
\
      "mimeType": "text/html"\
\
    },\
\
    {\
\
      "extension": ".pdf",\
\
      "mimeType": "application/pdf"\
\
    },\
\
    ...\
\
  ]

}
```

Back to top