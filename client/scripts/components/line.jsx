
var Line = React.createClass({
	render: function() {
		return (
			<li className="list-group-item">
				<div className="row">
					<span className="col-xs-6 col-sm-3 tracking-date">{this.props.line.date}</span>
					<span className="col-xs-6 col-sm-3 tracking-location">{this.props.line.location}</span>
					<span className="col-xs-12 col-sm-6 tracking-label">{this.props.line.label}</span>
				</div>
			</li>
		);
	}
});

module.exports = Line;