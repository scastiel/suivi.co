
var React = require('react');

var Footer = React.createClass({
	render: function() {
		return (
			<footer className="footer">
				<div className="container">
					<p className="text-muted">
						&copy; Sébastien Castiel 2015 – Une remarque&nbsp;? <a href="mailto:sebastien@suivi.co">sebastien@suivi.co</a> –
						Suivez-nous sur&nbsp;<a href="http://twitter.com/suivi_co" target="_blank" title="Suivi.co sur Twitter">Twitter</a>
						&nbsp;et&nbsp;<a href="http://www.facebook.com/suivi.co" target="_blank" title="Suivi.co sur Facebook">Facebook</a>.
					</p>
				</div>
		    </footer>
		);
	}
})

module.exports = Footer;
