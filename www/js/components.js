
var TrackingNumberForm = React.createClass({
	mixins: [ React.addons.LinkedStateMixin ],
	getInitialState: function() {
		return {
			trackingNumber: '',
			selectedCarrierCode: null,
			carriers: []
		}
	},
	carriersLoaded: function(carriers) {
		this.setState({
			carriers: carriers
		});
		this.state.selectedCarrierCode = carriers[0].code;
	},
	componentDidMount: function() {
		$.getJSON(this.props.carriersSource).done(this.carriersLoaded).fail(function () {
			console.log("Error loading carriers.");
		});
	},
	render: function() {
		var carriersComponents = [];
		var carriers = this.state.carriers;
		for (var i in carriers) {
			if (!carriers.hasOwnProperty(i)) continue;
			var carrier = carriers[i];
			carriersComponents.push(<option value={carrier.code}>{carrier.name}</option>)
		}
		return (
			<form role="form">
				<div className="form-group">
					<label htmlFor="txtTrackingNumber">Votre numéro de colis&nbsp;:</label>
					<input type="text" className="form-control input-lg" name="trackingNumber" id="txtTrackingNumber"
						placeholder="12345-67890-A" valueLink={this.linkState('trackingNumber')}/>
				</div>
				<div className="form-group">
					<label htmlFor="selectCarrier">Transporteur&nbsp;:&nbsp;</label>
					<select className="form-control inline-input" name="carrier" id="selectCarrier"
						valueLink={this.linkState('selectedCarrierCode')}>
						{carriersComponents}
					</select>
				</div>
				<button type="submit" className="btn btn-default btn-lg" onClick={this.props.onOkButtonClick}
					disabled={this.state.trackingNumber !== '' && this.state.selectedCarrierCode !== null ? '' : 'disabled'}>
					Valider
				</button>
			</form>
		);
	}
});

var Line = React.createClass({
	render: function() {
		return (
			<li className="list-group-item">
				<div className="row">
					<span className="col-xs-6 col-sm-3 tracking-date">{this.props.line.date}</span>
					<span className="col-xs-6 col-sm-3 tracking-location">{this.props.line.location}</span>
					<span className="col-xs-12 col-sm-6 tracking-label">{this.props.line.label}</span>
				</div>
			</li>
		);
	}
});

var Lines = React.createClass({
	getInitialState: function() {
		return {
			lines: [],
			loading: false,
			error: null
		};
	},
	render: function() {
		if (this.state.loading === true) {
			return (
				<p className="loading">Chargement en cours...</p>
			);
		} else if (this.state.error !== null) {
			return (
				<p className="error">Une erreur s’est produite : {this.state.error}</p>
			);
		} else {
			var lineComponents = [];
			var lines = this.state.lines;
			for (var i in lines) {
				if (!lines.hasOwnProperty(i)) continue;
				lineComponents.push(<Line line={lines[i]} key={i}/>);
			}
			return (
				<ul className="list-group">
					{lineComponents}
				</ul>
			);
		}
	}
});

var App = React.createClass({
	handleOkButtonClick: function(event) {
		event.preventDefault();
		this.refs.linesComponent.setState({
			loading: true,
			lines: [],
			error: null
		});
		var trackingNumber = this.refs.trackingNumberFormComponent.state.trackingNumber;
		var selectedCarrierCode = this.refs.trackingNumberFormComponent.state.selectedCarrierCode;
		var uri = this.props.packageTrackingSource
			.replace(':carrierCode', selectedCarrierCode)
			.replace(':trackingNumber', trackingNumber);
		$.getJSON(uri)
			.done(function (lines) {
				this.refs.linesComponent.setState({
					loading: false,
					lines: lines,
					error: null
				});
			}.bind(this))
			.fail(function (xhr) {
				if (xhr.responseJSON) {
					var error = xhr.responseJSON.error;
					this.refs.linesComponent.setState({
						loading: false,
						error: error
					});
				}
			}.bind(this));
	},
	render: function() {
		return (
			<div>
				<section id="trackingNumberForm" className="enterTrackingInfo">
					<TrackingNumberForm carriersSource={this.props.carriersSource} onOkButtonClick={this.handleOkButtonClick}
						ref="trackingNumberFormComponent"/>
				</section>
				<section id="trackingLinesSection">
					<Lines ref="linesComponent"/>
				</section>
			</div>
		);
	}
});
