
"use strict";

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

var api = require('./api/routes.js');
app.use('/api', api);

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
