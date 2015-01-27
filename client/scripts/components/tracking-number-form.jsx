
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
		this.props.appComponent.setState({
			carrierCode: this.state.carrierCode,
			trackingNumber: this.state.trackingNumber
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
					<input type="text" className="form-control input-lg" name="trackingNumber" id="txtTrackingNumber"
						placeholder="12345-67890-A" onChange={this.handleTrackingNumberChange}
						value={this.state.trackingNumber}/>
				</div>
				<div className="form-group">
					<label htmlFor="selectCarrier">Transporteur&nbsp;:&nbsp;</label>
					<select className="form-control inline-input" name="carrier" id="selectCarrier"
						onChange={this.handleCarrierCodeChange} value={this.state.carrierCode}>
						{carriersComponents}
					</select>
				</div>
				<button type="submit" className="btn btn-default btn-lg"
					disabled={this.state.trackingNumber !== '' && this.state.carrierCode !== null ? '' : 'disabled'}>
					Valider
				</button>
			</form>
		);
	}
});

module.exports = TrackingNumberForm;