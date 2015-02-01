
var Line = require('./line.jsx');

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
					<ul className="list-group">
						{lineComponents}
					</ul>
				</div>
			);
		} else {
			return <div/>
		}
	}
});

module.exports = Lines;