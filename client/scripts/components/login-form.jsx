
var SigninForm = require('./signin-form.jsx');
var SignupForm = require('./signup-form.jsx');

var LoginForm = React.createClass({

	render: function LoginForm_render() {
		return (
			<div className="row">
				<div className="col-sm-6">
					<SigninForm appComponent={this.props.appComponent} loginPostUri={this.props.loginPostUri}/>
				</div>
				<div className="col-sm-6">
					<SignupForm appComponent={this.props.appComponent} signupPostUri={this.props.signupPostUri}/>
				</div>
			</div>
		);
	}

});

module.exports = LoginForm;