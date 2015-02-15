
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TrackingForm = require('./tracking-form.jsx');
var Title = require('./title.jsx');
var CarriersPage = require('./carriers-page.jsx');
var ConceptPage = require('./concept-page.jsx');

var TrackingContainer = React.createClass({

	mixins: [Router.State],

	render: function() {
		return (
			<div>
				<Title/>
				<section id="trackingNumberForm">
					<TrackingForm initialTrackingNumber={this.getQuery().tn}/>
				</section>
				<section id="trackingLinesSection">
					<RouteHandler/>
				</section>
				<ConceptPage/>
				<CarriersPage/>
			</div>
		)
	}

});

module.exports = TrackingContainer;
