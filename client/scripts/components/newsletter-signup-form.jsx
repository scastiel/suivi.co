
var React = require('react');

var NewsletterSignupForm = React.createClass({

	handleSubmit: function() {
		ga && ga('send', 'event', 'newsletter', 'signup');
	},

	render: function() {

		return (
			<form onSubmit={this.handleSubmit} className="newsletter-signup-form form-inline" action={Config.newsletterSignupFormAction} method="post" target="_blank">
				<div>
					<label htmlFor="mce-EMAIL" className="sr-only">Adresse e-mail :</label>
					<div className="input-group">
						<input type="email" name="EMAIL" className="form-control input-sm" placeholder="Votre adresse e-mail" required="required"/>
						<span className="input-group-btn">
							<button type="submit" className="button btn btn-default btn-sm">M'inscrire</button>
						</span>
					</div>
				</div>
			</form>
		);

	}

});

module.exports = NewsletterSignupForm;