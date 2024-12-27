# Module: iframes

A module for the [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror)

## Setup

Clone the module into your modules folder:

```bash
cd ~/MagicMirror/modules && git clone https://github.com/mathew-fleisch/MMM-iframes
```

## Configuration

```javascript
{
  module: 'MMM-iframes',
  position: 'top_right',
  config: {
    // In seconds
    updateInterval: 1,
    // 5 minutes in seconds
    updateInterval: 300, 
    // Unique id allows multiple modules with isolated css target 
		iframeId: "iframes",
    // Don't use a youtube video as the first source... it doesn't work for some reason
		iframeSrc: "<iframe class=\"iframes-iframe\" src=\"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white\" scrolling=\"0\"></iframe>",
    // Why not start at the beginning
		currentIframe: 0,
    // Timestamp
		started: 0,
    // Another timestamp
		updated: 0,
    // Go back
		keyCodeBackward: 49,
    // Go forwards
		keyCodeForward: 50,
    // To the beginning
		keyCodeReset: 51,
    // Many live webcam feeds can be extracted from websites.
    // Use the provided modules/MMM-iframes/get-iframes.sh helper
    //  to scrape iframe sources from html pages
		iframes: [
			"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white",
			"https://www.youtube.com/embed/rT7tNsEdSDg?autoplay=1&controls=1&showinfo=1",
			"https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_PJRP00000C69"
		],
  }
}
```

## Styling

The [template](MMM-iframes.njk) uses the id `#iframes` and passes the `config.iframeId` value to the div's id field to enable multiple versions of this module to be easily styled in the same display. Add something similar to your css/custom.css file.

```css
#iframes iframe {
  background-color: #000;
  width:838px;
  height:473px;
  margin:10px 0 10px -10px;
  opacity:0;
  animation: fadeIn 2s ease-out forwards;
  animation-delay: 10s;
  border: 0;
  border-radius: 20px;
  overflow: hidden;
}
```
