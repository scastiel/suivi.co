
var React = require('react');
var Router = require('react-router');

var Line = require('./line.jsx');

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
		if (this.state.currentTrackingNumber === this.getParams().trackingNumber)
			return;

		this.setState({
			loading: true,
			currentTrackingNumber: this.getParams().trackingNumber,
			lines: []
		}, function() {
			var uri = "/api/track/:trackingNumber".replace(':trackingNumber', this.state.currentTrackingNumber);
			$.getJSON(uri)
				.done(function (results) {
					var lines, carrier;
					for (result of results) {
						if (result.lines !== false) {
							lines = result.lines;
							carrier = result.carrier;
							break;
						}
					}
					if (lines) {
						this.setState({
							loading: false,
							lines: lines,
							detectedCarrier: carrier,
							error: null
						});
					} else {
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
				<p className="error">{this.state.error}</p>
			);
		} else {
			return (
				<div>
					<p>Transporteur détecté : <strong>{this.state.detectedCarrier.name}</strong></p>
					<ul className="list-group">
						{this.state.lines.map(function(line, i) { return (
							<Line line={line} key={i}/>
						); })}
					</ul>
				</div>
			);
		}
	}
});

module.exports = TrackingResult;