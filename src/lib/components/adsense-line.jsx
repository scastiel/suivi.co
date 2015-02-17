
var React = require('react');

var Adsense = require('./adsense.jsx');

var AdsenseLine = React.createClass({

	render: function() {

		var random = Math.floor(Math.random() * 2) + 1;
		switch (random) {
			case 1:
				adSenseComponent = <Adsense adClient="ca-pub-9817974754702006" adSlot="3141552576"/>
				break;
			case 2:
				adSenseComponent = <Adsense adClient="ca-pub-9817974754702006" adSlot="4060529370" width={234} height={60}/>
				break;
		}

		return (
			<li className="list-group-item list-group-item-adsense">
				{adSenseComponent}
			</li>
		);

	}

});

module.exports = AdsenseLine;
