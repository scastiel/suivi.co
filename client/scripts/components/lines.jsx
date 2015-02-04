
var Line = require('./line.jsx');
var SaveRequestPopup = require('./save-request-popup.jsx');

var Lines = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
		};
	},
	render: function() {
		if (this.state.loading === true) {
			return (
				<p className="loading">Chargement en cours...</p>
			);
		} else if (this.props.appComponent.state.error !== null) {
			return (
				<p className="error">{this.props.appComponent.state.error}</p>
			);
		} else if (this.props.appComponent.state.lines.length > 0) {
			var lineComponents = [];
			var lines = this.props.appComponent.state.lines;
			for (var i in lines) {
				if (!lines.hasOwnProperty(i)) continue;
				lineComponents.push(<Line line={lines[i]} key={i}/>);
			}
			return (
				<div>
					<p>Transporteur détecté : <strong>{this.props.appComponent.state.detectedCarrier.name}</strong></p>
					<SaveRequestPopup appComponent={this.props.appComponent}/>
					<ul className="list-group">
						{lineComponents}
					</ul>
				</div>
			);
		} else {
			if (this.props.appComponent.state.v == '1') {
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
			} else {
				return (
					<div className="well well-lg">
						<p>Vous achetez sur Internet et recevez régulièrement des colis ?</p>
						<p>Mais savez-vous à chaque fois comment suivre ces colis ?</p>
						<p>Et si un site vous permettait de suivre n'importe quel colis, <strong>quelque soit le transporteur</strong> ?</p>
					</div>
				);
			}
		}
	}
});

module.exports = Lines;