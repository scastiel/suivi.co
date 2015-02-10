
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var App = require('../components/app.jsx');
var Home = require('../components/home.jsx');
var NotFound = require('../components/not-found.jsx');
var TrackingContainer = require('../components/tracking-container.jsx');
var TrackingResult = require('../components/tracking-result.jsx');
var ConceptPage = require('../components/concept-page.jsx');
var CarriersPage = require('../components/carriers-page.jsx');

module.exports = (
	<Route name="app" path="/" handler={App}>
		
		<DefaultRoute handler={TrackingContainer}/>

		{/* Tracking */}
		<Route handler={TrackingContainer}>
			<DefaultRoute handler={Home}/>
			<Route name="track" path="suivre" handler={TrackingResult} />
		</Route>
		
		<NotFoundRoute name="not-found" handler={NotFound} />
	</Route>
);
