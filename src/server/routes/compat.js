

module.exports = function(app) {

	app.get('/comment-ca-marche', function (req, res) { res.redirect(301, '/#comment-ca-marche'); });
	app.get('/les-transporteurs', function (req, res) { res.redirect(301, '/#les-transporteurs'); });

	var trackRoute = function (req, res) {
		res.redirect(301, '/suivre?tn=' + req.params.trackingNumber);
	};

	app.get('/suivre/:trackingNumber', trackRoute);
	app.get('/track/:trackingNumber', trackRoute);
	app.get('/track/:carrierCode/:trackingNumber', trackRoute);

}
