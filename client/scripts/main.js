
var App = require('./components/app.jsx');
var Router = require('./router.js');

var router = new Router(window);

var auth = null;
if (sessionStorage.auth) {
	auth = JSON.parse(sessionStorage.auth);
}

var appComponent = React.render(
	React.createElement(App, {
		carriersSource: "/api/carriers",
	    packageTrackingSource: "/api/track/:carrierCode/:trackingNumber",
	    loginPostUri: "/auth/login",
	    signupPostUri: "/auth/user",
	    router: router,
	    initialAuth: auth
	}),
	document.getElementById('app')
);

router.initPopState(appComponent);
router.route(document.location.pathname, appComponent);
