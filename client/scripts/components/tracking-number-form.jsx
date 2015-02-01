
var TrackingNumberForm = React.createClass({
	mixins: [ React.addons.LinkedStateMixin ],
	getInitialState: function() {
		return {
			carriers: [],
			carrierCode: this.props.initialCarrierCode,
			trackingNumber: this.props.initialTrackingNumber
		};
	},
	carriersLoaded: function(carriers) {
		this.setState({
			carriers: carriers
		});
		if (this.state.carrierCode === null)
			this.state.carrierCode = carriers[0].code;
	},
	componentWillMount: function() {
		$.getJSON(this.props.carriersSource).done(this.carriersLoaded).fail(function () {
			console.log("Error loading carriers.");
		});

		var currentAppComponentWillUpdate = this.props.appComponent.componentWillUpdate;
		this.props.appComponent.componentWillUpdate = function(nextProps, nextState) {
			if (this.isMounted()) {
				this.setState({
					carrierCode: nextState.carrierCode,
					trackingNumber: nextState.trackingNumber
				});
			}
			currentAppComponentWillUpdate && currentAppComponentWillUpdate(nextProps, nextState);
		}.bind(this);
	},
	handleTrackingNumberChange: function(event) {
		this.setState({ trackingNumber: event.target.value });
	},
	handleCarrierCodeChange: function(event) {
		this.setState({ carrierCode: event.target.value });
	},
	onOkButtonClick: function(event) {
		event.preventDefault();
		var trackingNumber = this.state.trackingNumber;
		trackingNumber = trackingNumber
			.replace(/n°/i, '')
			.replace(/[^a-zA-Z0-9]/g, '')
			.trim();
		this.props.appComponent.setState({
			carrierCode: this.state.carrierCode,
			trackingNumber: trackingNumber
		}, this.props.onOkButtonClick);
	},
	render: function() {
		var carriersComponents = [];
		var carriers = this.state.carriers;
		if (carriers.length > 0) {
			for (var i in carriers) {
				if (!carriers.hasOwnProperty(i)) continue;
				var carrier = carriers[i];
				carriersComponents.push(<option value={carrier.code} key={carrier.code}>{carrier.name}</option>)
			}
		} else {
			carriersComponents.push(<option value="" key="null">Chargement...</option>)
		}
		return (
			<form role="form" onSubmit={this.onOkButtonClick}>
				<div className="form-group">
					<label htmlFor="txtTrackingNumber">Votre numéro de colis&nbsp;:</label>
					
					<div className="input-group">
						<input type="text" className="form-control input-lg" name="trackingNumber" id="txtTrackingNumber"
							placeholder="12345-67890-A" onChange={this.handleTrackingNumberChange}
							value={this.state.trackingNumber}
							autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
						<span className="input-group-btn">
					    	<button className="btn btn-default btn-lg" type="submit"
					    		disabled={this.state.trackingNumber !== '' ? '' : 'disabled'}>Valider</button>
					    </span>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = TrackingNumberForm;