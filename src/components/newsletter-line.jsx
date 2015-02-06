
var React = require('react');
var $ = require('jquery');

var NewsletterSignupForm = require('./newsletter-signup-form/newsletter-signup-form.jsx');

var NewsletterLine = React.createClass({

	handleClick: function(event) {

		$(event.target).hide();
		ga && ga('send', 'event', 'alert-subscribe', 'click');

	},

	render: function() {

		return (
			<li className="list-group-item newsletter" key="newsletter">
				<a onClick={this.handleClick} href="#newsletter-line" data-toggle="collapse">
					M'abonner aux alertes pour ce colis
				</a>
				<div id="newsletter-line" className="collapse">
					<p>
						Cette fonctionnalité est actuellement en cours de développement.<br/>
						Abonnez-vous à notre newsletter pour être informé de sa sortie :
					</p>
					<NewsletterSignupForm/>
				</div>
			</li>
		);

	}

});

module.exports = NewsletterLine;
