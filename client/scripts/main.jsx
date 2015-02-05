
var Router = ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var App = require('./components/app.jsx');
var Home = require('./components/home.jsx');
var TrackingResult = require('./components/tracking-result.jsx');

// var appComponent = React.render(
// 	React.createElement(App, {
// 		carriersSource: "/api/carriers",
// 	    packageTrackingSourceWithoutCarrier: "/api/track/:trackingNumber"
// 	}),
// 	document.getElementById('app')
// );

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Home}/>
		<Route name="track" path="track/:trackingNumber" handler={TrackingResult} />
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementsByClassName('app')[0]);
});
