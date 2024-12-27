Module.register("MMM-iframes", {
	// these are the default values that can be overridden in your config/config.js
	defaults: {
		updateInterval: 300, // 5 minutes in seconds
		iframeId: "iframes",
		iframeSrc: "<iframe class=\"iframes-iframe\" src=\"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white\" scrolling=\"0\"></iframe>",
		currentIframe: 0,
		started: 0,
		updated: 0,
		keyCodeBackward: 49,
		keyCodeForward: 50,
		keyCodeReset: 51,
		iframes: [
			"https://g1.ipcamlive.com/player/player.php?alias=608dc4709bc06&autoplay=1&skin=white",
			"https://www.youtube.com/embed/rT7tNsEdSDg?autoplay=1&controls=1&showinfo=1",
			"https://relay.ozolio.com/pub.api?cmd=embed&oid=EMB_PJRP00000C69"
		],
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
			
			iframe_obj=document.querySelector('#'+self.config.iframeId+' .iframes-iframe');
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
			iframe_obj=document.querySelector('#'+self.config.iframeId+' .iframes-iframe');
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
