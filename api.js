
"use strict";

var express = require('express');
var app = express();

var CarrierFactory = require('./lib/carriers');
var carrierFactory = new CarrierFactory();

app.get('/guess-carrier/:trackingNumber', function (req, res, next) {
	var carriers = carrierFactory.guessFromTrackingNumber(req.params.trackingNumber);
	res.send(carriers.map(function (carrier) { return carrier.code; }));
});

app.get('/track/:carrierCode/:trackingNumber', function (req, res, next) {
	var carrier = carrierFactory.get(req.params.carrierCode);
	if (!carrier) {
		res.status(500).send({ error: { message: "Unknown carrier: " + req.params.carrierCode } });
	} else {
		carrier.extractTrackingLines(req.params.trackingNumber).done(function (lines) {
			res.send(lines);
		}, function(error) {
			res.status(500).send({ error: { message: error } });
		});
	}
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
});
