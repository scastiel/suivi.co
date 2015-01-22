
var TrackingNumberForm = React.createClass({
	mixins: [ React.addons.LinkedStateMixin ],
	getInitialState: function() {
		return {
			carriers: []
		}
	},
	carriersLoaded: function(carriers) {
		this.setState({
			carriers: carriers
		});
		if (this.props.appComponent.state.carrierCode === null)
			this.props.appComponent.state.carrierCode = carriers[0].code;
	},
	componentWillMount: function() {
		$.getJSON(this.props.carriersSource).done(this.carriersLoaded).fail(function () {
			console.log("Error loading carriers.");
		});
	},
	handleTrackingNumberChange: function(event) {
		this.props.appComponent.setState({ trackingNumber: event.target.value });
	},
	handleCarrierCodeChange: function(event) {
		this.props.appComponent.setState({ carrierCode: event.target.value });
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
			<form role="form">
				<div className="form-group">
					<label htmlFor="txtTrackingNumber">Votre numéro de colis&nbsp;:</label>
					<input type="text" className="form-control input-lg" name="trackingNumber" id="txtTrackingNumber"
						placeholder="12345-67890-A" onChange={this.handleTrackingNumberChange}
						value={this.props.appComponent.state.trackingNumber}/>
				</div>
				<div className="form-group">
					<label htmlFor="selectCarrier">Transporteur&nbsp;:&nbsp;</label>
					<select className="form-control inline-input" name="carrier" id="selectCarrier"
						onChange={this.handleCarrierCodeChange} value={this.props.appComponent.state.carrierCode}>
						{carriersComponents}
					</select>
				</div>
				<button type="submit" className="btn btn-default btn-lg" onClick={this.props.onOkButtonClick}
					disabled={this.props.appComponent.state.trackingNumber !== '' && this.props.appComponent.state.carrierCode !== null ? '' : 'disabled'}>
					Valider
				</button>
			</form>
		);
	}
});

module.exports = TrackingNumberForm;