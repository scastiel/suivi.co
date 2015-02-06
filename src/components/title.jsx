
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Title = React.createClass({

	render: function() {
		return (
			<div>
				<h1 className="big-title">
					<Link activeClassName="" to="app">
						<img src="/assets/logo.png" className="logo"/>
						Suivi.co
						<small>Le suivi de vos colis sur un site unique</small>
					</Link>
				</h1>
			</div>
		);
	}

});

module.exports = Title;
