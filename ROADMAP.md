Roadmap
=======

What will the API look like?

## Options ##
`--save-log` : save logging to an output file

## Sensible Defaults ##
use codec names, not lib names, attempt to use the best implementation for each codec


## Example manifest ##

Use of a manifest file : webvideoconvert.json

```
{
    "input" : [
        "glob/**/*.mov"
    ],
    
    "output" : [
        {
        	 "dest" : "mp4/*.mp4"
	        "audio" : {
	        	"codec" : "aac",
	        	"bitrate" : 128 // expressed in KB
	        },
	        "video" : {
	        	"codec" : "h264",
	        	
	        },
	        "size" : "1280x720",
	        "extraParams" : [ // native params
	        	"-y"
	        ]
        },
        
    ],
    
    "saveLog" : (true | filename)
}
```