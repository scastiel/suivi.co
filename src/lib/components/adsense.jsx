
var React = require('react');
var displayAds = typeof window !== "undefined" ? window.displayAds : require('../config').displayAds;

var Adsense = React.createClass({

	componentDidMount: function() {
		if (displayAds === "yes")
			(adsbygoogle = window.adsbygoogle || []).push({});
	},

	render: function() {

		var adComponent;
		var adComponentProps = {
			"className": "adsbygoogle",
			"data-ad-client": this.props.adClient,
			"data-ad-slot": this.props.adSlot,
			"style": {}
		};
		var style = {};
		if (this.props.width && this.props.height) {
			adComponentProps["style"].display = "inline-block";
			adComponentProps["style"].width = this.props.width;
			adComponentProps["style"].height = this.props.height;
		} else {
			adComponentProps["style"].display = "block";
			adComponentProps["data-ad-format"] = "auto";
		}
		if (displayAds === "yes") {
			adComponent = new React.DOM.ins(adComponentProps);
		} else if (displayAds === "placeholder") {
			adComponent = new React.DOM.div(adComponentProps, "AdSense");
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