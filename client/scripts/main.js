
var App = require('./components/app.jsx');
var Router = require('./router.js');

var router = new Router(window);

var appComponent = React.render(
	React.createElement(App, {
		carriersSource: "/api/carriers",
	    packageTrackingSource: "/api/track/:carrierCode/:trackingNumber",
	    loginPostUri: "/auth/login",
	    router: router
	}),
	document.getElementById('app')
);

if (sessionStorage.auth) {
	appComponent.setState({ auth: JSON.parse(sessionStorage.auth) });
}

router.initPopState(appComponent);
router.route(document.location.pathname, appComponent);
