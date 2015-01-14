
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
				<p className="error">Une erreur s’est produite : {this.props.appComponent.state.error}</p>
			);
		} else {
			var lineComponents = [];
			var lines = this.props.appComponent.state.lines;
			for (var i in lines) {
				if (!lines.hasOwnProperty(i)) continue;
				lineComponents.push(<Line line={lines[i]} key={i}/>);
			}
			return (
				<ul className="list-group">
					{lineComponents}
				</ul>
			);
		}
	}
});

module.exports = Lines;