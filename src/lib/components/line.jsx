
var React = require('react');

var Line = React.createClass({
	
	render: function() {

		var containsUnrecognizedText = false;
		
		var dateComponent;
		if (typeof this.props.line.date === "object") {
			// if (this.props.line.date.text.indexOf('?') === -1) {
				dateComponent = <span>{this.props.line.date.text}</span>;
			// } else {
			// 	dateComponent = <img className="line-data" src={this.props.line.date.content}/>;
			// }
		} else {
			dateComponent = <span>{this.props.line.date + (this.props.line.time ? ' à ' + this.props.line.time : '')}</span>;
		}
		
		var locationComponent;
		if (typeof this.props.line.location === "object") {
			// if (this.props.line.location.text.indexOf('?') === -1) {
				locationComponent = <span>{this.props.line.location.text}</span>;
			// } else {
			// 	locationComponent = <img className="line-data" src={this.props.line.location.content}/>;
			// }
		} else if (this.props.line.location) {
			locationComponent = <span>{this.props.line.location}</span>;
		}
		
		var labelComponent;
		if (typeof this.props.line.label === "object") {
			// if (this.props.line.label.text.indexOf('?') === -1) {
				labelComponent = <span>{this.props.line.label.text}</span>;
			// } else {
			// 	labelComponent = <img className="line-data" src={this.props.line.label.content}/>;
			// }
		} else {
			labelComponent = <span>{this.props.line.label}</span>;
		}
		
		return (
			<li className="list-group-item">
				<div className="row">
					<span className={(locationComponent ? "col-xs-6 col-sm-3" : "col-xs-12 col-sm-3") + " tracking-date"}>{dateComponent}</span>
					<span className={(locationComponent ? "col-xs-6 col-sm-3" : "hidden") + " tracking-location"}>{locationComponent}</span>
					<span className={(locationComponent ? "col-xs-12 col-sm-6" : "col-xs-12 col-sm-9") + " tracking-label"}>{labelComponent}</span>
				</div>
			</li>
		);

	}

});

module.exports = Line;