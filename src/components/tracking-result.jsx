
var React = require('react');
var Router = require('react-router');

var Line = require('./line.jsx');
var NewsletterSignupForm = require('./newsletter-signup-form.jsx');
var NewsletterLine = require('./newsletter-line.jsx');

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
				<div>
					<div className="well well-left">
						<p><strong>Nous ne sommes pas parvenus à récupérer les informations de suivi de votre colis.</strong></p>
						<p>Plusieurs raisons peuvent expliquer cela&nbsp;:</p>
						<ul>
							<li>une erreur s'est glissée dans votre saisie du numéro de colis&nbsp;;</li>
							<li>nous ne gérons pas encore le transporteur associé à votre colis.</li>
						</ul>
						<p>
							Si vous pensez qu'il s'agit d'un bug, n'hésitez pas à nous contacter&nbsp;:&nbsp;
							<a href={"mailto:S%C3%A9bastien%20de%20Suivi.co%20%3Csebastien%40suivi.co%3E?subject=Suivi.co%20%3A%20erreur%20sur%20suivi%20colis%20%C2%AB%20" + this.state.currentTrackingNumber + "%20%C2%BB"}>
								sebastien@suivi.co
							</a>
						</p>
						<p>
							Pour être informé des évolutions de Suivi.co et notamment des nouveaux
							transporteurs que nous prenons en charge, inscrivez-vous à notre newsletter&nbsp;:
						</p>
						<NewsletterSignupForm/>
					</div>

				</div>
			);
		} else {

			var lineComponents = this.state.lines.map(function(line, i) { return (
				<Line line={line} key={i}/>
			); });
			lineComponents.splice(2, 0,
				<NewsletterLine key="newsletter"/>
			);

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