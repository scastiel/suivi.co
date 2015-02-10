
var React = require('react');
var DocumentTitle = require('react-document-title');

var Page = React.createClass({
	render: function() {
		return (
			<div>
				<a name={this.props.id}/>
				<article className="page" id={this.props.id}>
					<h2 className="page-header">{this.props.title}</h2>
					<div className="panel">
						<div className="panel-body">
							{this.props.children}
						</div>
					</div>
				</article>
			</div>
		);
	}
});

module.exports = Page;