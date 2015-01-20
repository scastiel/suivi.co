
"use strict";

var react = require('react');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', (process.env.PORT || 3000));

var api = require('./api/routes.js');
app.use('/api', api);

var auth = require('./auth/routes.js');
app.use('/auth', auth);

var indexRoute = function (req,res){
	res.sendfile(__dirname + '/client/public/index.html');
}

app.get('/', indexRoute);
app.get('/track/*', indexRoute);

app.use(express.static('client/public'));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
});
