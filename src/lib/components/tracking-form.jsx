
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var TrackingForm = React.createClass({
	mixins: [ React.addons.LinkedStateMixin, Router.Navigation ],

	getInitialState: function() {
		return {
			trackingNumber: this.props.initialTrackingNumber
		};
	},
	handleTrackingNumberChange: function(event) {
		this.setState({ trackingNumber: event.target.value });
	},
	handleFormSubmit: function(event) {
		event.preventDefault();
		var tn = this.beautifyTrackingNumber(this.state.trackingNumber || '');
		if (tn) {
			this.transitionTo('track', {}, { tn: tn })
		}
	},
	beautifyTrackingNumber: function(trackingNumber) {
		return trackingNumber
			.replace(/n°/i, '')
			.replace(/[^a-zA-Z0-9]/g, '');
	},
	render: function() {
		return (
			<form role="form" className="enterTrackingInfo" onSubmit={this.handleFormSubmit} action={this.makeHref('track')}>
				<div className="form-group">
					<label htmlFor="txtTrackingNumber">Votre numéro de colis&nbsp;:</label>
					
					<div className="input-group">
						<input type="text" className="form-control input-lg" name="tn" id="txtTrackingNumber"
							placeholder="12345-67890-A" onChange={this.handleTrackingNumberChange}
							value={this.state.trackingNumber}
							autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
						<span className="input-group-btn">
							<button type="submit" ref="okButton" className={"btn btn-default btn-lg" + (this.beautifyTrackingNumber(this.state.trackingNumber || '') ? '' : ' disabled')}>
					    		Valider
							</button>
					    </span>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = TrackingForm;