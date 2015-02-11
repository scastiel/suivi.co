
var React = require('react');

var Adsense = require('./adsense.jsx');

var AdsenseLine = React.createClass({

	render: function() {

		return (
			<li className="list-group-item">
				<Adsense adClient="ca-pub-9817974754702006" adSlot="4060529370" width={234} height={60}
					placeholder="http://placehold.it/234x60/ffffff/337ab7&amp;text=Adsense"/>
			</li>
		);

	}

});

module.exports = AdsenseLine;
