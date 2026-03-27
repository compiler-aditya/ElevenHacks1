# Source: https://elevenlabs.io/docs/api-reference/dubbing/create

Dubs a provided audio or video file into given language.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects a multipart form with multiple files.

filefileOptional

A list of file paths to audio recordings intended for voice cloning

csv\_filefileOptional

CSV file containing transcription/translation metadata

foreground\_audio\_filefileOptional

For use only with csv input

background\_audio\_filefileOptional

For use only with csv input

namestringOptional

Name of the dubbing project.

source\_urlstringOptional

URL of the source video/audio file.

source\_langstringOptionalDefaults to `auto`

Source language. Expects a valid iso639-1 or iso639-3 language code.

target\_langstringOptional

The Target language to dub the content into. Expects a valid iso639-1 or iso639-3 language code.

target\_accentstringOptional

\[Experimental\] An accent to apply when selecting voices from the library and to use to inform translation of the dialect to prefer.

num\_speakersintegerOptionalDefaults to `0`

Number of speakers to use for the dubbing. Set to 0 to automatically detect the number of speakers

watermarkbooleanOptionalDefaults to `false`

Whether to apply watermark to the output video.

start\_timeintegerOptional

Start time of the source video/audio file.

end\_timeintegerOptional

End time of the source video/audio file.

highest\_resolutionbooleanOptionalDefaults to `false`

Whether to use the highest resolution available.

drop\_background\_audiobooleanOptionalDefaults to `false`

An advanced setting. Whether to drop background audio from the final dub. This can improve dub quality where it's known that audio shouldn't have a background track such as for speeches or monologues.

use\_profanity\_filterbooleanOptional

\[BETA\] Whether transcripts should have profanities censored with the words ‘\[censored\]’

dubbing\_studiobooleanOptionalDefaults to `false`

Whether to prepare dub for edits in dubbing studio or edits as a dubbing resource.

disable\_voice\_cloningbooleanOptionalDefaults to `false`

Instead of using a voice clone in dubbing, use a similar voice from the ElevenLabs Voice Library. Voices used from the library will contribute towards a workspace’s custom voices limit, and if there aren’t enough available slots the dub will fail. Using this feature requires the caller to have the ‘add\_voice\_from\_voice\_library’ permission on their workspace to access new voices.

modeenumOptionalDefaults to `automatic`

The mode in which to run this Dubbing job. Defaults to automatic, use manual if specifically providing a CSV transcript to use. Note that manual mode is experimental and production use is strongly discouraged.

Allowed values:automaticmanual

csv\_fpsdoubleOptional

Frames per second to use when parsing a CSV file for dubbing. If not provided, FPS will be inferred from timecodes.

### Response

Successful Response

dubbing\_idstring

The ID of the dubbing project.

expected\_duration\_secdouble

The expected duration of the dubbing project in seconds.

### Errors

422

Dubbing Create Request Unprocessable Entity Error