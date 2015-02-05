
var Footer = React.createClass({
	render: function() {
		return (
			<footer className="footer">
				<div className="container">
					<p className="text-muted">
						&copy; <a href="https://twitter.com/scastiel">Sébastien Castiel</a> 2015 – Une remarque&nbsp;? <a href="mailto:sebastien@suivi.co">sebastien@suivi.co</a> – Parler de nous&nbsp;: 
						<span className="addthis_sharing_toolbox"></span>
					</p>
				</div>
		    </footer>
		);
	}
})

module.exports = Footer;
