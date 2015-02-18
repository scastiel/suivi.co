
var React = require('react');
var Page = require('./page.jsx');
var NewsletterSignupForm = require('./newsletter-signup-form/newsletter-signup-form.jsx');

var CarriersPage = React.createClass({
	render: function() {
		return (
			<Page title="Les transporteurs pris en charge" id="les-transporteurs">
				<p>Les transporteurs actuellement gérés sont les suivants :</p>

				<ul className="list-inline carriers-logo-list center">
					<li><img src="/assets/logo-colissimo.png" alt="Colissimo"/></li>
					<li><img src="/assets/logo-chronopost.png" alt="Chronopost"/></li>
					<li><img src="/assets/logo-ups.png" alt="UPS"/></li>
					<li><img src="/assets/logo-postnl.png" alt="PostNL"/></li>
				</ul>

				<p><strong>Suivi.co</strong> est actuellement en phase de développement, c'est pourquoi tous les transporteurs ne sont pas
				encore disponibles. Néanmoins, prendre en charge ces transporteurs nous permet déjà de répondre à la plupart
				des requêtes que nous recevons.</p>

				<p>Abonnez-vous à notre newsletter pour être informés des transporteurs qui s'ajouteront à la liste :</p>

				<NewsletterSignupForm/>
			</Page>
		);
	}
});

module.exports = CarriersPage;
