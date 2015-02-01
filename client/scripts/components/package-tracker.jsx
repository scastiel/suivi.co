
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

		var uri = this.props.packageTrackingSourceWithoutCarrier
			.replace(':trackingNumber', this.props.appComponent.state.trackingNumber);
		$.getJSON(uri)
			.done(function (results) {
				var lines, carrier;
				for (result of results) {
					if (result.lines !== false) {
						lines = result.lines;
						carrier = result.carrier;
						break;
					}
				}
				this.refs.linesComponent.setState({
					loading: false
				});
				if (lines) {
					this.props.appComponent.setState({
						lines: lines,
						detectedCarrier: carrier,
						error: null
					});
				} else {
					this.props.appComponent.setState({
						error: "Le numéro de colis n'a pas été reconnu."
					});
				}
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