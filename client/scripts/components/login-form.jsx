var LoginForm = React.createClass({

	getInitialState: function LoginForm_getInitialState() {
		return {
			signingIn: false,
			signingUp: false,
			signinError: null,
			signupError: null,
			signupSuccess: false
		};
	},

	handleSigninSubmit: function LoginForm_handleSigninSubmit(event) {
		event.preventDefault();
		var email = this.refs.signinEmail.getDOMNode().value;
		var password = this.refs.signinPassword.getDOMNode().value;
		this.setState({ signingIn: true });
		$.post(this.props.loginPostUri, {
			username: email,
			password: password
		}).done(function(data) {
			sessionStorage.auth = JSON.stringify(data);
			this.setState({ signinError: null });
			this.props.appComponent.setState({ auth: data });
			this.props.appComponent.pushHistory();
		}.bind(this)).fail(function(res) {
			this.setState({ signinError: "Adresse e-mail ou mot de passe incorrect.", signingIn: false });
		}.bind(this));
	},

	handleSignupSubmit: function LoginForm_handleSignupSubmit(event) {
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

	render: function LoginForm_render() {
		return (
			<div className="row">
				<div className="col-sm-6">
					<form className="form-signin" onSubmit={this.handleSigninSubmit}>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">J'ai déjà un compte</h3>
							</div>
							<div className="panel-body">
								<div className="form-group">
									<label htmlFor="signinInputEmail">Adresse e-mail</label>
									<input ref="signinEmail" type="email" id="signinInputEmail" className="form-control" placeholder="Adresse e-mail" required autofocus defaultValue="toto@example.com"/>
								</div>
								<div className="form-group">
									<label htmlFor="signinInputPassword">Mot de passe</label>
									<input ref="signinPassword" type="password" id="signinInputPassword" className="form-control" placeholder="Mot de passe" required defaultValue="toto"/>
								</div>
								<div className="form-group">
									<button disabled={ this.state.signingIn } className="btn btn-default center-block" type="submit">
										{ this.state.signingIn ? "En cours..." : "Se connecter" }
									</button>
								</div>
								<p className={"text-danger" + (this.state.signinError ? "" : " hidden")}>{this.state.signinError}</p>
							</div>
						</div>
					</form>
				</div>
				<div className="col-sm-6">
					<form className="form-signup" onSubmit={this.handleSignupSubmit}>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Je m'inscris à la beta</h3>
							</div>
							<div className="panel-body">
								<div className={this.state.signupSuccess ? "hidden" : ""}>
									<div className="form-group">
										<label htmlFor="signupInputEmail">Adresse e-mail</label>
										<input ref="signupEmail" type="email" id="signupInputEmail" className="form-control" placeholder="Adresse e-mail" required autofocus defaultValue="toto@example.com"/>
									</div>
									<div className="form-group">
										<label htmlFor="signupInputPassword">Mot de passe</label>
										<input ref="signupPassword" type="password" id="signupInputPassword" className="form-control" placeholder="Mot de passe" required defaultValue="toto"/>
									</div>
									<div className="form-group">
										<label htmlFor="signupInputPassword2">Mot de passe (vérification)</label>
										<input ref="signupPassword2" type="password" id="signupInputPassword2" className="form-control" placeholder="Mot de passe" required defaultValue="toto"/>
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
				</div>
			</div>
		);
	}

});

module.exports = LoginForm;