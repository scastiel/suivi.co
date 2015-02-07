
var React = require('react');

var Page = React.createClass({
	render: function() {
		return (
			<div className="page">
				<div className="panel">
					<div className="panel-body">
						<div className="page-header">
							<h2>{this.props.title}</h2>
						</div>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Page;