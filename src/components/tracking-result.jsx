
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');

var Line = require('./line.jsx');
var NewsletterLine = require('./newsletter-line.jsx');
var TrackingResultError = require('./tracking-result-error.jsx');
var AdsenseLine = require('./adsense-line.jsx');

var TrackingResult = React.createClass({

	mixins: [Router.State],

	getInitialState: function() {
		return {
			loading: true,
			currentTrackingNumber: null,
			lines: [],
			detectedCarrier: null,
			error: null
		};
	},

	componentDidMount: function() {
		this.track();
	},

	componentWillReceiveProps: function() {
		this.track();
	},

	track: function () {
		if (this.state.currentTrackingNumber === this.getQuery().tn)
			return;

		this.setState({
			loading: true,
			currentTrackingNumber: this.getQuery().tn,
			lines: []
		}, function() {
			var uri = "/api/track/:trackingNumber".replace(':trackingNumber', this.state.currentTrackingNumber);
			$.getJSON(uri)
				.done(function (results) {
					var lines, carrier;
					for (var i in results) {
						if (!results.hasOwnProperty(i)) continue;
						var result = results[i];
						if (result.lines !== false) {
							lines = result.lines;
							carrier = result.carrier;
							break;
						}
					}
					if (lines) {
						ga && ga('send', 'event', 'tracker', 'track', 'successful');
						this.setState({
							loading: false,
							lines: lines,
							detectedCarrier: carrier,
							error: null
						});
					} else {
						ga && ga('send', 'event', 'tracker', 'track', 'unsuccessful');
						this.setState({
							loading: false,
							lines: [],
							detectedCarrier: null,
							error: "Le numéro de colis n'a pas été reconnu."
						});
					}
				}.bind(this))
				.fail(function (xhr) {
					if (xhr.responseJSON) {
						var error = xhr.responseJSON.error;
						this.setState({
							loading: false,
							error: error
						});
					}
				}.bind(this))
			}.bind(this));
	},

	render: function() {
		if (this.state.loading === true) {
			return (
				<p className="loading">Chargement en cours...</p>
			);
		} else if (this.state.error !== null) {
			return (
				<TrackingResultError trackingNumber={this.state.currentTrackingNumber}/>
			);
		} else {

			var lineComponents = this.state.lines.map(function(line, i) { return (
				<Line line={line} key={i}/>
			); });
			lineComponents.splice(2, 0,
				<NewsletterLine key="newsletter"/>
			);
			lineComponents.splice(0, 0,
				<AdsenseLine key="adsense"/>);

			return (
				<div>
					<p>Transporteur détecté : <strong>{this.state.detectedCarrier.name}</strong></p>
					<ul className="list-group">
						{lineComponents}
					</ul>
				</div>
			);
		}
	}
});

module.exports = TrackingResult;