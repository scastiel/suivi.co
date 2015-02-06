
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('../components/app.jsx');
var Home = require('../components/home.jsx');
var TrackingResult = require('../components/tracking-result.jsx');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Home}/>
		<Route name="track" path="track/:trackingNumber" handler={TrackingResult} />
	</Route>
);
