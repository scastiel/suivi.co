
var App = require('./components/app.jsx');
var Router = require('./router.js');

var auth = null;
if (localStorage.auth) {
	auth = JSON.parse(localStorage.auth);
}

var appComponent = React.render(
	React.createElement(App, {
		carriersSource: "/api/carriers",
	    packageTrackingSource: "/api/track/:carrierCode/:trackingNumber",
	    loginPostUri: "/auth/login",
	    signupPostUri: "/auth/user",
	    initialAuth: auth
	}),
	document.getElementById('app')
);

window.getPathFromAppState = function getPathFromAppState(state) {
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

window.getAppStateFromContext = function getAppStateFromContext() {
	
	var state = {
		trackingNumber: '',
		carrierCode: null,
		lines: [],
		error: null,
		auth: null
	};

	var auth = localStorage.auth ? JSON.parse(localStorage.auth) : null;
	if (auth)
		state.auth = auth;

	var path = document.location.pathname;
	var matches = path.match(/track\/([^\/]+)\/([^\/]+)/)
	if (matches && matches.length > 0) {
		state.trackingNumber = matches[2],
		state.carrierCode = matches[1];
	} else {
		state.trackingNumber = '';
		state.carrierCode = null;
	}

	return state;

}

var oldAppComponent_ComponentWillUpdate = appComponent.componentWillUpdate;
appComponent.componentWillUpdate = function(nextProps, nextState) {
	var path = getPathFromAppState(nextState);
	if (path != document.location.pathname) {
		history.pushState(
			nextState,
			'',
			path
		);
	}
	oldAppComponent_ComponentWillUpdate && oldAppComponent_ComponentWillUpdate(nextProps, nextState);
}

var state = getAppStateFromContext();
var path = getPathFromAppState(state);
if (path != document.location.pathname) {
	console.log("Redirection", document.location.pathname, '=>', path);
	history.replaceState(
		appComponent.state,
		'',
		path
	);
}
appComponent.setState(state);

window.onpopstate = function (event) {
	event.preventDefault();

	var defaultState = getAppStateFromContext();
	var nextState = event.state;
	if (nextState) {
		nextState.auth = defaultState.auth;
	} else {
		nextState = defaultState;
	}
	appComponent.setState(nextState);

	var path = getPathFromAppState(nextState);
	if (path != document.location.pathname) {
		console.log("Redirection", document.location.pathname, '=>', path);
		history.replaceState(
			nextState,
			'',
			path
		);
	}
}

