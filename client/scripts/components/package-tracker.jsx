
var TrackingNumberForm = require('./tracking-number-form.jsx');
var Lines = require('./lines.jsx');

var PackageTracker = React.createClass({
	track: function () {
		this.refs.linesComponent.setState({
			loading: true
		});
		this.props.appComponent.setState({
			lines: [],
			error: null
		});

		var trackingData = {
			user: this.props.appComponent.state.auth.user.username,
			carrierCode: this.props.appComponent.state.carrierCode,
			trackingNumber: this.props.appComponent.state.trackingNumber
		};

		document.title = 'Suivre mon colis : ' + this.props.appComponent.state.carrierCode + ' – ' + this.props.appComponent.state.trackingNumber;

		var uri = this.props.packageTrackingSource
			.replace(':carrierCode', this.props.appComponent.state.carrierCode)
			.replace(':trackingNumber', this.props.appComponent.state.trackingNumber);
		$.getJSON(uri)
			.done(function (lines) {
				this.refs.linesComponent.setState({
					loading: false
				});
				this.props.appComponent.setState({
					lines: lines,
					error: null
				});

				trackingData.success = true;

			}.bind(this))
			.fail(function (xhr) {

				if (xhr.responseJSON) {
					var error = xhr.responseJSON.error;
					this.refs.linesComponent.setState({
						loading: false
					});
					this.props.appComponent.setState({
						error: error
					});
				}

				trackingData.success = false;
				trackingData.error = xhr.responseJSON ? xhr.responseJSON.error : 'unknown';

			}.bind(this))
			.always(function () {
				this.props.appComponent.replaceHistory();

				console.log(trackingData);
				this.props.appComponent.props.ga('send', 'event', 'tracker', 'track', trackingData);
			}.bind(this))
	},
	handleOkButtonClick: function(event) {
		event && event.preventDefault();
		this.track();
		this.props.appComponent.pushHistory();
	},
	componentDidMount: function () {
	    if (this.props.appComponent.state.trackingNumber && this.props.appComponent.state.carrierCode) {
	     	this.handleOkButtonClick();
	    }
	},
	render: function() {
		return (
			<div className="package-tracker">
				<section id="trackingNumberForm" className="enterTrackingInfo">
					<TrackingNumberForm
						carriersSource={this.props.carriersSource}
						packageTrackingSource={this.props.packageTrackingSource}
						onOkButtonClick={this.handleOkButtonClick}
						ref="trackingNumberFormComponent"
						packageTracker={this}
						appComponent={this.props.appComponent}/>
				</section>
				<section id="trackingLinesSection">
					<Lines ref="linesComponent"
						packageTracker={this}
						appComponent={this.props.appComponent}/>
				</section>
			</div>
		);
	}
});

module.exports = PackageTracker;