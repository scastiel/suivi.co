
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Db = require('./model/db.js');

var db = new Db('mongodb://localhost:27017/suivremoncolis-dev');
app.set('db', db);

app.use(bodyParser.urlencoded({
  extended: true
})); 

app.set('port', (process.env.PORT || 3000));
app.set('jwtTokenSecret', '+!5G:RY9*Y6RgQd%LDg(d244;|AqzM_lB/;KKS?}iMt?EZ=C1e1N|x-@i^k;;cv!');

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
