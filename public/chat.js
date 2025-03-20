// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/b2he0jzb'
(() => {
	var w = window;
	var ic = w.Intercom;
	if (typeof ic === "function") {
		ic("reattach_activator");
		ic("update", w.intercomSettings);
	} else {
		var d = document;
		var i = () => {
			i.c(arguments);
		};
		i.q = [];
		i.c = (args) => {
			i.q.push(args);
		};
		w.Intercom = i;
		var l = () => {
			var s = d.createElement("script");
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://widget.intercom.io/widget/b2he0jzb";
			var x = d.getElementsByTagName("script")[0];
			x.parentNode.insertBefore(s, x);
		};
		if (document.readyState === "complete") {
			l();
		} else if (w.attachEvent) {
			w.attachEvent("onload", l);
		} else {
			w.addEventListener("load", l, false);
		}
	}
})();
