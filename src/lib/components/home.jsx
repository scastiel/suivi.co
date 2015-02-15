
var React = require('react');
var Router = require('react-router');

var NewsletterSignupForm = require('./newsletter-signup-form/newsletter-signup-form.jsx');
var Adsense = require('./adsense.jsx');

var Home = React.createClass({

	render: function() {

		return (
			<div>

				<div className="home-adsense">
					<Adsense adClient="ca-pub-9817974754702006" adSlot="7293197376" width={320} height={100}
						placeholder="http://placehold.it/320x100/eff2ff/337ab7&amp;text=Adsense"/>
				</div>

				<div className="well well-lg">
					<p>
						<strong>Suivi.co</strong> vous permet de suivre vos colis sur un site unique
						et ce <strong>quelque soit le transporteur</strong>.
					</p>
					<p>
						Pour cela, saisissez ci-dessus le numéro de colis fourni par le transporteur
						ou le marchand, puis cliquez sur <em>Valider</em>.
					</p>
					<a className="center-block" href="#comment-ca-marche">En savoir plus</a>
				</div>

				<div className="well">
					<p>
						Suivi.co est actuellement en phase de lancement, et évolue donc très rapidement.
					</p>
					<p>
						Pour rester informé des évolutions de Suivi.co, inscrivez-vous à notre newsletter :
						<NewsletterSignupForm/>
					</p>
				</div>

			</div>
		);

	}

})

module.exports = Home;
