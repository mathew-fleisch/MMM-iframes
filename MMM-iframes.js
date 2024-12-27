Module.register("MMM-iframes", {
	// these are the default values that can be overridden in your config/config.js
	defaults: {
		// 5 minutes in seconds
		updateInterval: 300, 
		// Unique id allows multiple modules with isolated css target 
		iframeId: "iframes",
		// Don't use a youtube video as the first source... it doesn't work for some reason
		iframeSrc: "<iframe src=\"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white\" scrolling=\"0\"></iframe>",
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
			"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white",
			"https://www.youtube.com/embed/rT7tNsEdSDg?autoplay=1&controls=1&showinfo=1",
			"https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA3In0",
			"https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA4In0",
			"https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn19fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTA5In0",
			"https://w3.mp.lura.live/player/prod/v3/anvload.html?key=eyJhbnZhY2siOiI1VkQ2RXlkNmRqZXdiQ21Od0JGbnNKajE3WUF2R1J3bCIsImV4cGVjdFByZXJvbGwiOnRydWUsImV4cGVjdFByZXJvbGxUaW1lb3V0Ijo1LCJodG1sNSI6dHJ1ZSwibSI6ImNicyIsInBsdWdpbnMiOnsiY29tc2NvcmUiOnsiYzMiOiJzYW5mcmFuY2lzY28uY2JzbG9jYWwuY29tIiwiY2xpZW50SWQiOiIzMDAwMDIzIn0sImRmcCI6eyJjbGllbnRTaWRlIjp7ImFkVGFnVXJsIjoiaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP3N6PTJ4Mlx1MDAyNml1PS80MTI4L2Nicy5zZlx1MDAyNmNpdV9zenNcdTAwMjZpbXBsPXNcdTAwMjZnZGZwX3JlcT0xXHUwMDI2ZW52PXZwXHUwMDI2b3V0cHV0PXhtbF92YXN0Mlx1MDAyNnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTFcdTAwMjZ1cmw9W3JlZmVycmVyX3VybF1cdTAwMjZkZXNjcmlwdGlvbl91cmw9W2Rlc2NyaXB0aW9uX3VybF1cdTAwMjZjb3JyZWxhdG9yPVt0aW1lc3RhbXBdIiwia2V5VmFsdWVzIjp7ImNhdGVnb3JpZXMiOiJbW0NBVEVHT1JJRVNdXSIsInByb2dyYW0iOiJbW1BST0dSQU1fTkFNRV1dIiwic2l0ZVNlY3Rpb24iOiJ2aWRlby1leHBlcmllbmNlIn1f9fSwiaGVhcnRiZWF0QmV0YSI6eyJhY2NvdW50IjoiY2JzbG9jYWwtZ2xvYmFsLXVuaWZpZWQiLCJjaGFwdGVyVHJhY2tpbmciOmZhbHNlLCJjdXN0b21NZXRhZGF0YSI6eyJ2aWRlbyI6eyJjYnNfbWFya2V0Ijoic2FuZnJhbmNpc2NvLmNic2xvY2FsLmNvbSIsImNic19wbGF0Zm9ybSI6ImRlc2t0b3AifX0sImN1c3RvbVRyYWNraW5nU2VydmVyIjoiY2JzZGlnaXRhbG1lZGlhLmQxLnNjLm9tdHJkYy5uZXQiLCJjdXN0b21UcmFja2luZ1NlcnZlclNlY3VyZSI6ImNic2RpZ2l0YWxtZWRpYS5kMS5zYy5vbXRyZGMubmV0Iiwiam9iSWQiOiJzY192YSIsIm1hcmtldGluZ0Nsb3VkSWQiOiI4MjNCQTAzMzU1Njc0OTdGN0YwMDAxMDFAQWRvYmVPcmciLCJwSW5zdGFuY2UiOiJwMCIsInByb2ZpbGUiOiJjYnMiLCJwdWJsaXNoZXJJZCI6ImNic2xvY2FsIiwidHJhY2tpbmdTZXJ2ZXIiOiJjYnNkaWdpdGFsbWVkaWEuaGIub210cmRjLm5ldCIsInZlcnNpb24iOiIxLjUifSwibW9hdCI6eyJjbGllbnRTaWRlIjp7InBhcnRuZXJDb2RlIjoiY2JzbG9jYWxhbnZhdG92aWRlbzE4MTczMjYwOTQzMSJ9fX0sInRva2VuIjoiZGVmYXVsdCIsInYiOiJjNTEwIn0",
			"https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_PJRP00000C69"
		]
	},

	// external dependency: https://momentjs.com/
	getScripts: function () {
		return ['moment.js'];
	},

	// uses momentjs and config.dateFormat to return a custom formatted date string
	getSimpleDate: function (dateFormat) {
		const currentDate = moment();
		const formattedDate = currentDate.format(dateFormat);
		return formattedDate;
	},

	// html template to inject date and place in DOM
	getTemplate() {
		return "MMM-iframes.njk";
	},

	// pass config to MagicMirror to override
	getTemplateData() {
		return this.config;
	},
	start: function () {
		var self = this;
		self.config.started = self.getSimpleDate('X');
		self.config.updated = self.getSimpleDate('X');
		// Check if any of the three keys have been pressed, and move forward, backward or to the beginning in the list
		document.addEventListener('keyup', function(event) {
			console.log('key pressed: '+event.keyCode);
			
			iframe_obj=document.querySelector('#'+self.config.iframeId+' iframe');
			if(iframe_obj) {
				// Ignore all other keypresses
				if (event.keyCode == self.config.keyCodeForward || event.keyCode == self.config.keyCodeBackward || event.keyCode == self.config.keyCodeReset) {

					// Advance one place in the list, and back around to the beginning if at the end
					if (event.keyCode == self.config.keyCodeForward) {
						self.config.currentIframe++;
						if (self.config.currentIframe >= self.config.iframes.length) {
							self.config.currentIframe = 0;
						}
					}

					// Move backward one place in the list and to the end of the list if at the beginning
					if (event.keyCode == self.config.keyCodeBackward) {
						self.config.currentIframe--;
						if (self.config.currentIframe < 0) {
							self.config.currentIframe = self.config.iframes.length-1;
						}
					}

					// Go back to the beginning of the list
					if (event.keyCode == self.config.keyCodeReset) {
						self.config.currentIframe = 0;
					}

					// With the current frame index decided, update the "src" value of the iframe
					console.log("New iframe source["+self.config.currentIframe+"]: "+self.config.iframes[self.config.currentIframe]);
					iframe_obj.src=self.config.iframes[self.config.currentIframe];
					self.config.updated = self.getSimpleDate('X');
				}
			} else {
				console.error("Could not find iframe");
			}

		});
		setInterval(function () {
			now = self.getSimpleDate('X');
			iframe_obj=document.querySelector('#'+self.config.iframeId+' iframe');
			if(iframe_obj) {
				// maths
				if ((now-self.config.updated) >= self.config.updateInterval) {
					self.config.updated = self.getSimpleDate('X');
					// This looks familiar...
					self.config.currentIframe++;
					if (self.config.currentIframe >= self.config.iframes.length) {
						self.config.currentIframe = 0;
					}
					console.log("New iframe source["+self.config.currentIframe+"]: "+self.config.iframes[self.config.currentIframe]);
					iframe_obj.src=self.config.iframes[self.config.currentIframe];
				// } else {
					// console.log("waiting... "+(now-self.config.updated)+" < "+self.config.updateInterval)
				}
			} else {
				console.error("Could not find iframe");
			}
		}, 1000);
	},
});
