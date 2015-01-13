
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
	componentDidMount: function() {
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
		for (var i in carriers) {
			if (!carriers.hasOwnProperty(i)) continue;
			var carrier = carriers[i];
			carriersComponents.push(<option value={carrier.code} key={carrier.code}>{carrier.name}</option>)
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
			loading: false,
		};
	},
	render: function() {
		if (this.state.loading === true) {
			return (
				<p className="loading">Chargement en cours...</p>
			);
		} else if (this.props.appComponent.state.error !== null) {
			return (
				<p className="error">Une erreur s’est produite : {this.props.appComponent.state.error}</p>
			);
		} else {
			var lineComponents = [];
			var lines = this.props.appComponent.state.lines;
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
