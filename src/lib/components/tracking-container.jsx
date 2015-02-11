
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TrackingForm = require('./tracking-form.jsx');
var Title = require('./title.jsx');
var CarriersPage = require('./carriers-page.jsx');
var ConceptPage = require('./concept-page.jsx');
var Adsense = require('./adsense.jsx');

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
				<Adsense adClient="ca-pub-9817974754702006" adSlot="7293197376" width={320} height={100}
					placeholder="http://placehold.it/320x100/eff2f3/337ab7&amp;text=Adsense"/>
				<ConceptPage/>
				<CarriersPage/>
			</div>
		)
	}

});

module.exports = TrackingContainer;
