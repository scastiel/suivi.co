
var TrackingNumberForm = require('./tracking-number-form.jsx');
var Lines = require('./lines.jsx');

var App = React.createClass({
	getInitialState: function() {
		return {
			trackingNumber: '',
			carrierCode: null,
			lines: [],
			error: null
		};
	},
	track: function () {
		this.refs.linesComponent.setState({
			loading: true
		});
		this.setState({
			lines: [],
			error: null
		});

		document.title = 'Suivre mon colis : ' + this.state.carrierCode + ' – ' + this.state.trackingNumber;

		var uri = this.props.packageTrackingSource
			.replace(':carrierCode', this.state.carrierCode)
			.replace(':trackingNumber', this.state.trackingNumber);
		$.getJSON(uri)
			.done(function (lines) {
				this.refs.linesComponent.setState({
					loading: false
				});
				this.setState({
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
					this.setState({
						error: error
					});
				}
			}.bind(this))
			.always(function () {
				this.replaceHistory();
			}.bind(this))
	},
	replaceHistory: function() {
		this.props.router.replaceHistory(this);
	},
	handleOkButtonClick: function(event) {
		event && event.preventDefault();
		this.track();
		this.props.router.pushState(this);
	},
	componentDidMount: function () {
	    if (this.state.trackingNumber && this.state.carrierCode) {
	     	this.handleOkButtonClick();
	    }
	},
	render: function() {
		return (
			<div>
				<section id="trackingNumberForm" className="enterTrackingInfo">
					<TrackingNumberForm carriersSource={this.props.carriersSource} onOkButtonClick={this.handleOkButtonClick}
						ref="trackingNumberFormComponent"
						appComponent={this}/>
				</section>
				<section id="trackingLinesSection">
					<Lines ref="linesComponent" appComponent={this}/>
				</section>
			</div>
		);
	}
});

module.exports = App;