
var React = require('react');

var Adsense = require('./adsense.jsx');

var AdsenseLine = React.createClass({

	render: function() {

		return (
			<li className="list-group-item list-group-item-adsense">
				<Adsense adClient="ca-pub-9817974754702006" adSlot="3141552576"/>
			</li>
		);

	}

});

module.exports = AdsenseLine;
