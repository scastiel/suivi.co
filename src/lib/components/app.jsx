
var Navbar = require('./navbar.jsx');
var TrackingContainer = require('./tracking-container.jsx');
var Footer = require('./footer.jsx');

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');

var App = React.createClass({
	render: function() {
		return (
			<DocumentTitle title="Suivez vos colis sur un site unique – Suivi.co">
				<div>
					<Navbar/>
					<div className="main">
						<RouteHandler/>
					</div>
					<Footer/>
				</div>
			</DocumentTitle>
		);
	}
});

module.exports = App;