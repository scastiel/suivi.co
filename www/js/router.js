
function Router(window) {
	this.window = window;
}

Router.prototype.replaceHistory = function(appComponent) {
	this.window.history.replaceState(
		appComponent.state,
		'',
		'/track/' + appComponent.state.carrierCode + '/' + appComponent.state.trackingNumber
	);
}

Router.prototype.pushState = function(appComponent) {
	history.pushState(
		appComponent.state,
		'',
		'/track/' + appComponent.state.carrierCode + '/' + appComponent.state.trackingNumber
	)
}

Router.prototype.initPopState = function(appComponent) {
	this.window.onpopstate = function (event) {
		if (event.state) {
			appComponent.setState(event.state);
		} else {
			appComponent.setState({
				trackingNumber: '',
				carrierCode: null,
				lines: [],
				error: null
			});
		}
	};
}

Router.prototype.route = function(pathname, appComponent) {
	var matches = pathname.match(/track\/([^\/]+)\/([^\/]+)/);
	var carrierCode = null, trackingNumber = null;
	if (matches && matches.length > 0) {
		carrierCode = matches[1];
		trackingNumber = matches[2];
		appComponent.setState({
			trackingNumber: trackingNumber,
			carrierCode: carrierCode
		});
		appComponent.replaceHistory();
		appComponent.track();
	}
}