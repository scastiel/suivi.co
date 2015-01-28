
var Router = function(appComponent, ga) {

	this.appComponent = appComponent;
	this.ga = ga;

}

Router.prototype.getPathFromAppState = function getPathFromAppState(state) {
	var path;
	if (!state.auth) {
		path = '/login';
		// if (document.location.pathname != path) {
		// 	path += '?redirect=' + encodeURIComponent(document.location.pathname);
		// }
	} else {
		if (state.trackingNumber && state.carrierCode) {
			path = '/track/' + state.carrierCode + '/' + state.trackingNumber;
		} else {
			path = '/';
		}
	}
	return path;
}

Router.prototype.getAppStateFromContext = function getAppStateFromContext() {
	
	var state = {
		trackingNumber: '',
		carrierCode: null,
		lines: [],
		error: null,
		auth: null
	};

	var auth = localStorage.auth ? JSON.parse(localStorage.auth) : null;
	if (auth) {
		state.auth = auth;

		var path = document.location.pathname;
		var matches = path.match(/track\/([^\/]+)\/([^\/]+)/)
		if (matches && matches.length > 0) {
			state.trackingNumber = matches[2],
			state.carrierCode = matches[1];
		}
	}

	return state;

}

Router.prototype._initAppComponentComponentWillUpdate = function() {
	var oldAppComponent_ComponentWillUpdate = this.appComponent.componentWillUpdate;
	this.appComponent.componentWillUpdate = function(nextProps, nextState) {
		var path = this.getPathFromAppState(nextState);
		if (path != document.location.pathname) {
			history.pushState(
				nextState,
				'',
				path
			);
			ga && ga('send', 'pageview', path);
		}
		oldAppComponent_ComponentWillUpdate && oldAppComponent_ComponentWillUpdate(nextProps, nextState);
	}.bind(this);
}

Router.prototype._initWindowOnPopState = function() {
	window.onpopstate = function (event) {
		var defaultState = this.getAppStateFromContext();
		var nextState = event.state;
		if (nextState) {
			nextState.auth = defaultState.auth;
		} else {
			nextState = defaultState;
		}
		this.appComponent.setState(nextState);

		var path = this.getPathFromAppState(nextState);
		if (path != document.location.pathname) {
			history.replaceState(
				nextState,
				'',
				path
			);
			ga && ga('send', 'pageview', path);
		}
	}.bind(this);
}

Router.prototype.startRouting = function() {

	this._initAppComponentComponentWillUpdate(this.appComponent);

	this._initWindowOnPopState(this.appComponent);

	var state = this.getAppStateFromContext();
	var path = this.getPathFromAppState(state);
	if (path != document.location.pathname) {
		history.replaceState(
			this.appComponent.state,
			'',
			path
		);
	}
	this.appComponent.setState(state);
	ga && ga('send', 'pageview', path);
}

module.exports = Router;
