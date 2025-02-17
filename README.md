# Module: iframes

A module for the [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror) where a list of iframe sources are defined an displayed in a loop. If a keyboard is connected, the sources can also be manually cycled. The iframe sources in the example are all live webcam feeds from various sources.

Included in this repo is a [helper script](get-iframes.sh) to scrape iframe sources from other websites. For instance, four of the live cameras currently in the examples are the [Salesforce Tower Cameras](https://www.cbsnews.com/sanfrancisco/salesforce-tower-cameras/) and those iframes can be scraped with the included [helper script](get-iframes.sh). Or, if you are comfortable with html, view the source, and search for `<iframe` and grab the `src` value for the iframes array.

```bash
./get-iframes.sh https://www.cbsnews.com/sanfrancisco/salesforce-tower-cameras/
```

Note: Some webcams will only work when running MagicMirror in an electron browser. Audio will only work in server mode, viewing MagicMirror through a browser like firefox.

Demo gifs:
- https://i.imgur.com/mjIry5i.gif
- https://i.imgur.com/GLlh6uD.gif

## Setup

Clone the module into your modules folder:

```bash
cd ~/MagicMirror/modules && git clone https://github.com/mathew-fleisch/MMM-iframes
```

## Configuration

The default links that I have put in this module likely will not work forever. If you find an updated link, please submit a PR to update it in the read-me and defaults. Youtube embeds will work (if not the first source) for live or recorded content. Video streams on you local network could also be a source in the list of iframes (used rasperry pi + motioneye that hosts a video stream this module can embed)

```javascript
{
  module: 'MMM-iframes',
  position: 'top_right',
  config: {
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
    // Press '1' to go backwards one source in the iframes list
    keyCodeBackward: 49,
    // Press '2' to go forwards one source in the iframes list
    keyCodeForward: 50,
    // Press '3' to go to the beginning of the iframes list
    keyCodeReset: 51,
    // Many live webcam feeds can be extracted from websites.
    // Use the provided modules/MMM-iframes/get-iframes.sh helper
    // to scrape iframe sources from html pages.
    // Note: For some reason youtube videos won't auto-play as the
    //       first video source.
    iframes: [
      // Muir Beach
      "https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white",
      // Treasure Island
      "https://www.youtube.com/embed/rT7tNsEdSDg?autoplay=1&controls=1&showinfo=1",
      // Salesforce Tower 1
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA3In0",
      // Salesforce Tower 2
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA4In0",
      // Salesforce Tower 3
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA5In0",
      // Salesforce Tower 4
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn1f9fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTEwIn0",
      // Hanalei Colony Resort (does not work in server mode)
      "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_PJRP00000C69",
      // Because I had to...
      "https://player.vimeo.com/video/798328936?autoplay=1&app_id=58479"
    ]
  }
}
```

## Styling

The [template](MMM-iframes.njk) uses the class `.iframes` and passes the `config.iframeId` value to the div's id field to enable multiple versions of this module to be easily styled in the same display. Add something similar to your css/custom.css file.

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

## Keybindings

There are three keybindings that can advance the iframe in the list before the updateInterval elapses, or go back one place in the list, or back to the beginning. By default, 

- `1` (keyCode:49) will go backward one place in the iframes list
- `2` (keyCode:50) will go forward one place in the iframes list
- `3` (keyCode:51) will go back to the beginning of the iframes list
