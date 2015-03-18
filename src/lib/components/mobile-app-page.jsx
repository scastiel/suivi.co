
var React = require('react');
var Router = require('react-router');

var Page = require('./page.jsx');

var MobileAppPage = React.createClass({
	render: function() {
		return (
			<Page title="Suivi.co sur votre smartphone" id="suivi-co-sur-votre-smartphone">

				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<img src="/assets/mobile-app-screenshot.jpg" className="img-thumbnail"/>
					</div>
					<div className="col-xs-12 col-sm-6">
						<p>Grâce à l'appli <strong>Suivi.co</strong>&nbsp;:</p>
						<p className="text-left"><span className="fa fa-check"></span> Suivez vos colis depuis votre iPhone et votre iPad</p>
						<p className="text-left"><span className="fa fa-check"></span> Enregistrez les numéros de colis que vous attendez</p>
						<p className="text-left"><span className="fa fa-check"></span> Recevez une notification en cas de changement de statut de votre colis <span className="text-muted">(prochainement)</span></p>
						<p className="text-center" style={{marginTop: 30}}>
							<a href="https://itunes.apple.com/fr/app/suivi.co/id971915749?mt=8" target="_blank">
								<img src="/assets/app-store-logo.png" width="135"/>
							</a>
						</p>
					</div>
				</div>

			</Page>
		);
	}
});

module.exports = MobileAppPage;
