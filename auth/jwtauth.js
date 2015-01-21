var User = require('../model/user');
var jwt = require('jwt-simple');

module.exports = function(app) {
	return function jwtauth(req, res, next) {
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		console.log(token);
		if (token) {
			try {
				var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

				if (decoded.exp <= Date.now()) {
					res.status(403).end('Access token has expired');
				}

				var db = app.get('db');
				db.connectToDb()
					.then(function() {
						User.findOne({ _id: decoded.iss }, function (err, user) {
							req.user = user;
							db.disconnectFromDb();
							return next();
						});
					});

			} catch (err) {
				res.status(403).end('Invalid access token');
			}
		} else {
			res.status(403).end('No access token');
		}
	};
};
