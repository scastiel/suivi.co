
var React = require('react');
var DocumentTitle = require('react-document-title');

var Page = React.createClass({
	render: function() {
		return (
			<DocumentTitle title={this.props.title + " – Suivez vos colis sur un site unique – Suivi.co"}>
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
			</DocumentTitle>
		);
	}
});

module.exports = Page;