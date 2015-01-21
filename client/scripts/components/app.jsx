
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
			auth: null
		};
	},
	replaceHistory: function() {
		this.props.router.replaceHistory(this);
	},
	pushHistory: function() {
		this.props.router.pushState(this);
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
	render: function() {
		if (this.state.auth) {
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
					<LoginForm appComponent={this} loginPostUri={this.props.loginPostUri}/>
				</div>
			);
		}
	}
});

module.exports = App;