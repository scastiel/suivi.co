
"use strict";

var express = require('express');
var app = express();

var api = require('./api/routes.js');
app.use('/api', api);

var indexRoute = function (req,res){
	res.sendfile(__dirname + '/www/index.html');
}

app.get('/', indexRoute);
app.get('/track/*', indexRoute);

app.use(express.static('www'));


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
});
