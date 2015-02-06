
var React = require('react');

var NewsletterSignupForm = require('./newsletter-signup-form.jsx');

var NewsletterLine = React.createClass({

	render: function() {

		return (
			<li className="list-group-item newsletter" key="newsletter">
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						Vous aimez <strong>Suivi.co</strong> ?<br/>
						Abonnez-vous à notre newsletter
						pour ne rien manquer des évolutions de notre service !
					</div>
					<div className="col-xs-12 col-sm-6">
						<NewsletterSignupForm/>
					</div>
				</div>
			</li>
		);

	}

});

module.exports = NewsletterLine;
