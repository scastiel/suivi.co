
var React = require('react');
var Reflux = require('reflux');
var NewsletterActions = require('./newsletter-actions');
var NewsletterStore = require('./newsletter-store');

var NewsletterSignupForm = React.createClass({

	mixins: [Reflux.ListenerMixin],

	getInitialState: function() {
		return {
			status: "initial",
			error: null
		};
	},

	componentDidMount: function() {
		this.listenTo(NewsletterStore, this.newsletterSignupStatusUpdated);
	},

	handleSubmit: function(event) {
		event.preventDefault();

		this.setState({ status: "loading" });
		NewsletterActions.signup(this.refs.email.getDOMNode().value);
	},

	newsletterSignupStatusUpdated: function(status) {
		if (status.ok === true) {
			ga && ga('send', 'event', 'newsletter', 'signup', 'success');
			this.setState({ status: "success" });
		} else {
			ga && ga('send', 'event', 'newsletter', 'signup', 'error');
			this.setState({ status: "error", error: status.error });
		}
	},

	render: function() {

		var helpText = '';
		if (this.state.status === "success") {
			helpText = "Votre inscription a bien été prise en compte.";
		} else if (this.state.status === "error") {
			if (this.state.error === "EMAIL_ALREADY_EXISTS") {
				helpText = "Il semblerait que vous soyez déjà inscrit.";
			} else {
				helpText = "Une erreur s'est produite.";
			}
		}

		return (
			<form onSubmit={this.handleSubmit} className="newsletter-signup-form form-inline" method="post" target="_blank">
				<div>
					<label htmlFor="mce-EMAIL" className="sr-only">Adresse e-mail :</label>
					<div className="input-group">
						<input ref="email" type="email" name="EMAIL" className="form-control input-sm" placeholder="Votre adresse e-mail" required="required"/>
						<span className="input-group-btn">
							<button type="submit" className={"button btn btn-default btn-sm" + (this.state.status === "loading" ? ' disabled' : '')}>
								{this.state.status === "loading" ? "En cours..." : "M'inscrire"}
							</button>
						</span>
					</div>
					<span className="help-block">{helpText}</span>
				</div>
			</form>
		);

	}

});

module.exports = NewsletterSignupForm;