
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
			}.bind(this))
	},
	handleOkButtonClick: function() {
		this.track();
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
						appComponent={this.props.appComponent}
						initialCarrierCode={this.props.appComponent.state.carrierCode}
						initialTrackingNumber={this.props.appComponent.state.trackingNumber}/>
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