
var React = require('react');
var Router = require('react-router');

var Page = require('./page.jsx');

var ConceptPage = React.createClass({
	render: function() {
		return (
			<Page title="Comment ça marche&nbsp;?" id="comment-ca-marche">
				<p><strong>Suivi.co</strong> est un site qui répond à un problème courant : j’ai un numéro de colis
				(suite à un achat sur un site par exemple), mais je ne sais pas sur quel site aller
				pour obtenir le suivi du colis. S’agit-il de Colissimo, UPS, Chronopost, GLS, TNT ?
				Les transporteurs sont nombreux...</p>

				<p>C’est pourquoi nous vous permettons grâce à un site unique de suivre tous vos colis
				et ce indépendamment du transporteur. Tout ce dont vous avez besoin est votre numéro
				de colis, nous nous chargeons du reste :-)</p>

				<a href="#les-transporteurs" className="center-block">Découvrez les transporteurs que nous prenons en charge actuellement.</a>
			</Page>
		);
	}
});

module.exports = ConceptPage;
