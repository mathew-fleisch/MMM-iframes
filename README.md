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
    // to scrape iframe sources from html pages.
    // Note: For some reason youtube videos won't auto-play as the
    //       first video source.
    iframes: [
      "https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white",
      "https://www.youtube.com/embed/rT7tNsEdSDg?autoplay=1&controls=1&showinfo=1",
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA3In0",
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA4In0",
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA5In0",
      "https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn1f9fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTEwIn0",
      "https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_PJRP00000C69"
    ]
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
