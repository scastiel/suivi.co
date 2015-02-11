
var React = require('react');
var displayAds = typeof window !== "undefined" ? window.displayAds : require('../config').displayAds;

var Adsense = React.createClass({

	componentDidMount: function() {
		if (displayAds)
			(adsbygoogle = window.adsbygoogle || []).push({});
	},

	render: function() {

		var adComponent;
		if (displayAds === "yes") {
			adComponent = <ins className="adsbygoogle"
				     style={{"display": "inline-block", "width": this.props.width, "height": this.props.height}}
				     data-ad-client={this.props.adClient}
				     data-ad-slot={this.props.adSlot}/>;
		} else if (displayAds === "placeholder") {
			adComponent = <img src={this.props.placeholder}/>;
		} else {
			adComponent = <span/>;
		}

		return (
			<div className="adsense">
				{adComponent}
			</div>
		);

	}

});

module.exports = Adsense;