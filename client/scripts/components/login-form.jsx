var LoginForm = React.createClass({

	getInitialState: function LoginForm_getInitialState() {
		return {
			connecting: false,
			error: null
		};
	},

	handleSubmit: function LoginForm_handleSubmit(event) {
		event.preventDefault();
		var email = this.refs.email.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;
		this.setState({ connecting: true });
		$.post(this.props.loginPostUri, {
			username: email,
			password: password
		}).done(function(data) {
			sessionStorage.auth = JSON.stringify(data);
			this.setState({ error: null });
			this.props.appComponent.setState({ auth: data });
			this.props.appComponent.pushHistory();
		}.bind(this)).fail(function(res) {
			this.setState({ error: "Adresse e-mail ou mot de passe incorrect.", connecting: false });
		}.bind(this));
	},

	render: function LoginForm_render() {
		return (
			<form className="form-signin" onSubmit={this.handleSubmit}>
				<p>Le service est actuellement en phase de test.</p>
				<div className="form-group">
					<label htmlFor="inputEmail" className="sr-only">Adresse e-mail</label>
					<input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Adresse e-mail" required autofocus defaultValue="toto@example.com"/>
					<label htmlFor="inputPassword" className="sr-only">Mot de passe</label>
					<input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" required defaultValue="toto"/>
				</div>
				<div className="form-group">
					<button disabled={ this.state.connecting } className="btn btn-lg btn-default btn-block" type="submit">
						{ this.state.connecting ? "En cours..." : "Valider" }
					</button>
				</div>
				<p className={"text-danger" + (this.state.error ? "" : " hidden")}>{this.state.error}</p>
			</form>
		);
	}

});

module.exports = LoginForm;