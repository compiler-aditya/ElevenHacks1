# Source: https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/

[Skip to content](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#_top)

Copy page

# Conversion Options

By default, the `toMarkdown` service extracts text content from your files. To further extend the capabilities of the conversion process, you can pass options to the service to control how specific file types are converted.

Options are organized by file type and are all optional.

## Available options

### Images

```
{

  image?: {

    descriptionLanguage?: 'en' | 'it' | 'de' | 'es' | 'fr' | 'pt';

  }

}
```

- `descriptionLanguage`: controls the language of the AI-generated image descriptions.

### HTML

```
{

  html?: {

    hostname?: string;

    cssSelector?: string;

  }

}
```

- `hostname`: string to use as a host when resolving relative links inside the HTML.

- `cssSelector`: string containing a CSS selector pattern to pick specific elements from your HTML. Refer to [how HTML is processed](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/#html) for more details.


### PDF

```
{

  pdf?: {

    metadata?: boolean;

  }

}
```

- `metadata`: Previously, all converted PDF files always included metadata information when converted. This option allows you to opt-out of this behavior.

## Examples

### Binding

To configure custom options, pass a `conversionOptions` object inside the second argument of the binding call, like this:

```
await env.AI.toMarkdown(..., {

  conversionOptions: {

    html: { ... },

    pdf: { ... },

    ...

   }

})
```

### REST API

Since the REST API uses file uploads, the request's `Content-Type` will be `multipart/form-data`. As such, include a new form field with your stringified object as a value:

```
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \

  -X POST \

  -H 'Authorization: Bearer {API_TOKEN}' \

  ...

  -F 'conversionOptions={ "html": { ... }, ... }'
```

Back to top