
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Db = require('./model/db.js');
var basicAuth = require('basic-auth');

if (process.env.CANONICAL_HOST) {
	app.use(function(req, res, next) {
		var canonicalHostParts = process.env.CANONICAL_HOST.split(':');
		var host = canonicalHostParts[0];
		var port = canonicalHostParts[1] || 80;
		if (req.hostname !== host) {
			var redirectUrl =
				req.protocol + '://'
				+ process.env.CANONICAL_HOST
				+ req.originalUrl;
			res.redirect(301, redirectUrl);
		} else {
			next();
		}
	});
}

if (process.env.HTTP_USER && process.env.HTTP_PASS) {
	app.use(function(req, res, next) {
		var user = basicAuth(req);
		if (!user || user.name != process.env.HTTP_USER || user.pass != process.env.HTTP_PASS) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    		return res.sendStatus(401);
		}
		return next();
	});
}

var db = new Db(process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/suivremoncolis-dev');
app.set('db', db);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 3000));
app.set('jwtTokenSecret', process.env.JWT_TOKEN_SECRET || '+!5G:RY9*Y6RgQd%LDg(d244;|AqzM_lB/;KKS?}iMt?EZ=C1e1N|x-@i^k;;cv!');

var jwtauth = require('./auth/jwtauth.js')(app);

var authRoutes = require('./auth/routes.js')(app);
app.use('/auth', authRoutes);

var apiRoutes = require('./api/routes.js');
app.use('/api', [ jwtauth.needsToBeLoggedIn, jwtauth.needsToBeBetaUser ], apiRoutes);

var indexRoute = function (req,res){
	res.sendfile(__dirname + '/client/public/index.html');
};
app.get('/', indexRoute);
app.get('/track/*', indexRoute);

app.get('/config.js', function(req, res) {
	var config = {
		analyticsId: process.env.ANALYTICS_ID || "UA-58859109-1"
	};
	res.set('Content-Type', 'application/javascript');
	res.end('var Config = ' + JSON.stringify(config) + ';');
});

app.use(express.static('client/public'));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port)
});
