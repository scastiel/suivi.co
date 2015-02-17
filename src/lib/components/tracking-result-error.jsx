
var React = require('react');
var Router = require('react-router');
var NewsletterSignupForm = require('./newsletter-signup-form/newsletter-signup-form.jsx');
var Adsense = require('./adsense.jsx');

var TrackingResultError = React.createClass({

	render: function() {

		var random = Math.floor(Math.random() * 2) + 1;
		switch (random) {
			case 1:
				adSenseComponent = <Adsense adClient="ca-pub-9817974754702006" adSlot="2862350979"/>
				break;
			case 2:
				adSenseComponent = <Adsense adClient="ca-pub-9817974754702006" adSlot="5228891372" width={234} height={60}/>
				break;
		}

		return (
			<div>
				<div className="well well-left">
					<p><strong>Nous ne sommes pas parvenus à récupérer les informations de suivi de votre colis.</strong></p>
					<p>Plusieurs raisons peuvent expliquer cela&nbsp;:</p>
					<ul>
						<li>une erreur s'est glissée dans votre saisie du numéro de colis&nbsp;;</li>
						<li>
							nous ne gérons pas encore&nbsp;
							<a href="#les-transporteurs" title="Les transporteurs pris en charge par Suivi.co">le transporteur</a>
							&nbsp;associé à votre colis.
						</li>
					</ul>
					<p>
						Si vous pensez qu'il s'agit d'un bug, n'hésitez pas à nous contacter&nbsp;:&nbsp;
						<a href={"mailto:S%C3%A9bastien%20de%20Suivi.co%20%3Csebastien%40suivi.co%3E?subject=Suivi.co%20%3A%20erreur%20sur%20suivi%20colis%20%C2%AB%20" + this.props.trackingNumber + "%20%C2%BB"}>
							sebastien@suivi.co
						</a>
					</p>
					{adSenseComponent}
					<p>
						Pour être informé des évolutions de Suivi.co et notamment des nouveaux
						transporteurs que nous prenons en charge, inscrivez-vous à notre newsletter&nbsp;:
					</p>
					<NewsletterSignupForm/>
				</div>

			</div>
		);

	}

});

module.exports = TrackingResultError;