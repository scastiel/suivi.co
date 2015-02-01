
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
	    packageTrackingSourceWithoutCarrier: "/api/track/:trackingNumber",
	    loginPostUri: "/auth/login",
	    signupPostUri: "/auth/user",
	    initialAuth: auth
	}),
	document.getElementById('app')
);

var router = new Router(appComponent, window.ga);
router.startRouting();

