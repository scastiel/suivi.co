
var Title = require('./title.jsx');
var TrackingContainer = require('./tracking-container.jsx');
var Footer = require('./footer.jsx');

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function() {
		return (
			<div>
				<div className="main">
					<Title/>
					<TrackingContainer/>
				</div>
				<Footer/>
			</div>
		);
	}
});

module.exports = App;