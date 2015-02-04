
var Router = function(appComponent, ga) {

	this.appComponent = appComponent;
	this.ga = ga;

}

Router.prototype.getPathFromAppState = function getPathFromAppState(state) {
	var path;
	if (state.trackingNumber) {
		path = '/track/' + state.trackingNumber;
	} else {
		path = '/';
	}

	if (state.saveRequestPopup) {
		path += '/save-request'
	}

	return path;
}

function getQueryVariable(variable) {
	var query = document.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
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
	}

	var path = document.location.pathname;
	var matches = path.match(/^\/track\/([^\/]+)/)
	if (matches && matches.length > 0) {
		state.trackingNumber = matches[1]
	}

	// Analytics A/B testing
	state.v = window.localStorage.getItem('v') || '0';

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

Router.prototype._initABTesting = function() {
	var v = getQueryVariable('v');
	if (v !== false && window.localStorage.getItem('v') === null)
		window.localStorage.setItem('v', v);
}

Router.prototype.startRouting = function() {

	this._initAppComponentComponentWillUpdate(this.appComponent);

	this._initWindowOnPopState(this.appComponent);

	this._initABTesting();

	var state = this.getAppStateFromContext();
	var path = this.getPathFromAppState(state);
	if (path != document.location.pathname) {
		history.replaceState(
			this.appComponent.state,
			'',
			path + document.location.search
		);
	}
	this.appComponent.setState(state);
	ga && ga('send', 'pageview', path);
}

module.exports = Router;
