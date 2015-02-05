
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TrackingForm = require('./tracking-form.jsx');

var TrackingContainer = React.createClass({

	mixins: [Router.State],

	render: function() {
		return (
			<div>
				<section id="trackingNumberForm">
					<TrackingForm initialTrackingNumber={this.getParams().trackingNumber}/>
				</section>
				<section id="trackingLinesSection">
					<RouteHandler/>
				</section>
			</div>
		)
	}

});

module.exports = TrackingContainer;
