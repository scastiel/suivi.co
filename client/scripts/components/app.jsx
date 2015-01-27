
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
	sendAnalyticsEvent: function() {
		ga('send', 'pageview', document.location.pathname, { userId: this.state.auth ? this.state.auth.user.username : null });
	},
	componentWillMount: function() {
		if (this.state.auth) {
			var expireDate = new Date(this.state.auth.expires);
			var now = new Date();
			if (now >= expireDate)
				this.setState({ auth: null });
		}
	},
	componentDidMount: function() {
		this.sendAnalyticsEvent();
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
		if (this.state.auth) {
			if (this.state.auth.user.beta) {
				return (
					<div>
						<NavBar appComponent={this}/>
						<PackageTracker
							ref="packageTracker"
							appComponent={this}
							carriersSource={this.props.carriersSource + '?access_token=' + this.state.auth.token}
							packageTrackingSource={this.props.packageTrackingSource + '?access_token=' + this.state.auth.token} />
					</div>
				);
			} else {
				return (
					<div>
						<NavBar appComponent={this}/>
						<div className="well">
							<p>Vous n'avez pas encore accès à la beta de <em>Suivre mon colis</em>.</p>
							<p>Surveillez votre boîte mail, nous vous tiendrons informés dès que nous
							invitons de nouveaux utilisateurs à utiliser notre service :-)</p>
						</div>
					</div>
				);
			}
		} else {
			return (
				<div>
					<NavBar appComponent={this}/>
					<LoginForm appComponent={this} loginPostUri={this.props.loginPostUri} signupPostUri={this.props.signupPostUri}/>
				</div>
			);
		}
	}
});

module.exports = App;