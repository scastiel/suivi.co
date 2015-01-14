
var Line = React.createClass({
	render: function() {
		var dateComponent;
		if (typeof this.props.line.date === "object") {
			dateComponent = <img className="line-data" src={this.props.line.date.content}/>;
		} else {
			dateComponent = <span>{this.props.line.date}</span>;
		}
		var locationComponent;
		if (typeof this.props.line.location === "object") {
			locationComponent = <img className="line-data" src={this.props.line.location.content}/>;
		} else {
			locationComponent = <span>{this.props.line.location}</span>;
		}
		var labelComponent;
		if (typeof this.props.line.label === "object") {
			labelComponent = <img className="line-data" src={this.props.line.label.content}/>;
		} else {
			labelComponent = <span>{this.props.line.label}</span>;
		}
		return (
			<li className="list-group-item">
				<div className="row">
					<span className="col-xs-6 col-sm-3 tracking-date">{dateComponent}</span>
					<span className="col-xs-6 col-sm-3 tracking-location">{locationComponent}</span>
					<span className="col-xs-12 col-sm-6 tracking-label">{labelComponent}</span>
				</div>
			</li>
		);
	}
});

module.exports = Line;