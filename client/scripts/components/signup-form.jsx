var SignupForm = React.createClass({

	getInitialState: function SignupForm_getInitialState() {
		return {
			signingUp: false,
			signupError: null,
			signupSuccess: false
		};
	},

	handleSignupSubmit: function SignupForm_handleSignupSubmit(event) {
		event.preventDefault();
		var email = this.refs.signupEmail.getDOMNode().value;
		var password = this.refs.signupPassword.getDOMNode().value;
		var password2 = this.refs.signupPassword.getDOMNode().value;
		$.post(this.props.signupPostUri, {
			email: email,
			password: password
		}).done(function(data) {
			this.setState({ signupError: null, signupSuccess: true });
		}.bind(this)).fail(function(res) {
			var data = res.responseJSON;
			if (data.error == "User already exists.") {
				this.setState({ signupError: "Un utilisateur est déjà inscrit avec cette adresse e-mail.", signingUp: false });
			} else {
				this.setState({ signupError: "Une erreur s'est produite.", signingUp: false });
			}
		}.bind(this));
	},

	render: function SignupForm_render() {
		return (
			<form className="form-signup" onSubmit={this.handleSignupSubmit}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Je m'inscris à la beta</h3>
					</div>
					<div className="panel-body">
						<div className={this.state.signupSuccess ? "hidden" : ""}>
							<div className="form-group">
								<label htmlFor="signupInputEmail">Adresse e-mail</label>
								<input ref="signupEmail" type="email" id="signupInputEmail" className="form-control" placeholder="Adresse e-mail" required autofocus/>
							</div>
							<div className="form-group">
								<label htmlFor="signupInputPassword">Mot de passe</label>
								<input ref="signupPassword" type="password" id="signupInputPassword" className="form-control" placeholder="Mot de passe" required/>
							</div>
							<div className="form-group">
								<label htmlFor="signupInputPassword2">Mot de passe (vérification)</label>
								<input ref="signupPassword2" type="password" id="signupInputPassword2" className="form-control" placeholder="Mot de passe" required/>
							</div>
							<div className="form-group">
								<button disabled={ this.state.signingUp } className="btn btn-default center-block" type="submit">
									{ this.state.signingUp ? "En cours..." : "S'inscrire" }
								</button>
							</div>
							<p className={"text-danger" + (this.state.signupError ? "" : " hidden")}>{this.state.signupError}</p>
						</div>
						<div className={this.state.signupSuccess ? "" : "hidden"}>
							<p>Merci pour votre inscription. Vous serez informé par e-mail dès que
							nous ouvrirons l'accès à la beta à des utilisateurs supplémentaires.</p>
						</div>
					</div>
				</div>
			</form>
		);
	}

});

module.exports = SignupForm;