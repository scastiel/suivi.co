
var React = require('react');

var Home = React.createClass({

	render: function() {

		return (
			<div className="well well-lg">
				<p>
					<strong>Suivi.co</strong> vous permet de suivre vos colis sur un site unique
					et ce <strong>quelque soit le transporteur</strong>.
				</p>
				<p>
					Pour cela, saisissez ci-dessus le numéro de colis fourni par le transporteur
					ou le marchand, puis cliquez sur <em>Valider</em>.
				</p>
			</div>
		);

	}

})

module.exports = Home;
