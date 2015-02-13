
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var basicAuth = require('basic-auth');
var mustacheExpress = require('mustache-express');
var compression = require('compression')

var React = require('react');
var Router = require('react-router');
require("node-jsx").install({ extension: ".jsx" });

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

mongoose.connect(process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/suivremoncolis-dev');
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		process.exit(0);
	});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.set('port', (process.env.PORT || 3000));
app.set('jwtTokenSecret', process.env.JWT_TOKEN_SECRET || '+!5G:RY9*Y6RgQd%LDg(d244;|AqzM_lB/;KKS?}iMt?EZ=C1e1N|x-@i^k;;cv!');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/../../views/');

require('./routes/compat')(app);

var apiRoutes = require('./routes/api.js');
app.use('/api', apiRoutes);

var newsletterRouter = require('./routes/newsletter');
app.use('/newsletter', newsletterRouter);


var Sitemap = require('express-sitemap');
var sitemap = new Sitemap({
    map: {
        '/': ['get']
    },
    url: process.env.CANONICAL_HOST
});
app.get('/sitemap.xml', function(req, res) {
	sitemap.XMLtoWeb(res);
});
app.get('/robots.txt', function(req, res) {
    sitemap.TXTtoWeb(res);
});

app.use(express.static(__dirname + '/../../public'));

var reactRoute = require('./routes/site.jsx')(app);
app.use(reactRoute);

var server = app.listen(app.get('port'), function () {
	console.log('Listening on port %s', server.address().port)
});
