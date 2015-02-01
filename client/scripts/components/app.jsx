
var NavBar = require('./nav-bar.jsx');
var PackageTracker = require('./package-tracker.jsx');
var LoginForm = require('./login-form.jsx');

var App = React.createClass({
	getInitialState: function() {
		return {
			trackingNumber: '',
			carrierCode: null,
			lines: [],
			error: null,
			auth: this.props.initialAuth
		};
	},
	componentWillMount: function() {
		if (this.state.auth) {
			var expireDate = new Date(this.state.auth.expires);
			var now = new Date();
			if (now >= expireDate)
				this.setState({ auth: null });
		}
	},
	track: function() {
		if (this.refs.packageTracker)
			this.refs.packageTracker.track();
	},
	signin: function(email, password, callback) {
		$.post(this.props.loginPostUri, {
			username: email,
			password: password
		})
		.done(function(data) {
			localStorage.auth = JSON.stringify(data);
			this.setState({ auth: data });
			callback(null, data);
		}.bind(this))
		.fail(function(res) {
			callback("Adresse e-mail ou mot de passe incorrect.", null);
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				<PackageTracker
					ref="packageTracker"
					appComponent={this}
					carriersSource={this.props.carriersSource}
					packageTrackingSource={this.props.packageTrackingSource}
					packageTrackingSourceWithoutCarrier={this.props.packageTrackingSourceWithoutCarrier} />
			</div>
		);
	}
});

module.exports = App;