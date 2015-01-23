
var SigninForm = require('./signin-form.jsx');
var SignupForm = require('./signup-form.jsx');

var LoginForm = React.createClass({

	render: function LoginForm_render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-12">
						<div className="well well-lg">
							<p>Vous achetez sur Internet et recevez régulièrement des colis ?</p>
							<p>Mais savez-vous à chaque fois comment suivre ces colis ?</p>
							<p>Et si un site vous permettait de suivre n'importe quel colis, <strong>quelque soit le transporteur</strong> ?</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<SigninForm appComponent={this.props.appComponent} loginPostUri={this.props.loginPostUri}/>
					</div>
					<div className="col-sm-6">
						<SignupForm appComponent={this.props.appComponent} signupPostUri={this.props.signupPostUri}/>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = LoginForm;