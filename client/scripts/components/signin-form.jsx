var SigninForm = React.createClass({

	getInitialState: function SigninForm_getInitialState() {
		return {
			signingIn: false,
			signinError: null
		};
	},

	handleSigninSubmit: function SigninForm_handleSigninSubmit(event) {
		event.preventDefault();
		var email = this.refs.signinEmail.getDOMNode().value;
		var password = this.refs.signinPassword.getDOMNode().value;
		this.setState({ signingIn: true });
		$.post(this.props.loginPostUri, {
			username: email,
			password: password
		}).done(function(data) {
			localStorage.auth = JSON.stringify(data);
			this.setState({ signinError: null });
			this.props.appComponent.setState({ auth: data });
		}.bind(this)).fail(function(res) {
			this.setState({ signinError: "Adresse e-mail ou mot de passe incorrect.", signingIn: false });
		}.bind(this));
	},

	render: function SigninForm_render() {
		return (
			<form className="form-signin" onSubmit={this.handleSigninSubmit}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">J'ai déjà un compte</h3>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<label htmlFor="signinInputEmail">Adresse e-mail</label>
							<input ref="signinEmail" type="email" id="signinInputEmail" className="form-control" placeholder="Adresse e-mail" required autofocus/>
						</div>
						<div className="form-group">
							<label htmlFor="signinInputPassword">Mot de passe</label>
							<input ref="signinPassword" type="password" id="signinInputPassword" className="form-control" placeholder="Mot de passe" required/>
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
		);
	}

});

module.exports = SigninForm;