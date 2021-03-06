
var React = require('react');
var Router = require('react-router');
var DocumentTitle = require('react-document-title');
var Link = Router.Link;

var NotFound = React.createClass({

	render: function() {

		return (
			<DocumentTitle title="Page non trouvée – Suivi.co">
				<div className="well well-lg">
					<span dangerouslySetInnerHTML={{__html: "<!--404-->"}}/>
					<p>
						La page que vous avez demandé n'a pas été trouvée :-(
					</p>
					<p>
						<Link to="app">Retour à la page d'accueil</Link>
					</p>
				</div>
			</DocumentTitle>
		);

	}

})

module.exports = NotFound;
