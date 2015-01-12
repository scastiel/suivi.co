
"use strict";

var express = require('express');
var api = express.Router();

var CarrierFactory = require('./lib/carriers');
var carrierFactory = new CarrierFactory();

api.get('/carriers', function (req, res, next) {
	res.send(carrierFactory.all().map(function (carrier) {
		return { code: carrier.code, name: carrier.name };
	}));
});

api.get('/guess-carrier/:trackingNumber', function (req, res, next) {
	var carriers = carrierFactory.guessFromTrackingNumber(req.params.trackingNumber);
	res.send(carriers.map(function (carrier) { return carrier.code; }));
});

api.get('/track/:carrierCode/:trackingNumber', function (req, res, next) {
	var carrier = carrierFactory.get(req.params.carrierCode);
	if (!carrier) {
		res.status(400).send({ error: { message: "Unknown carrier: " + req.params.carrierCode } });
	} else {
		carrier.extractTrackingLines(req.params.trackingNumber).done(function (lines) {
			res.send(lines);
		}, function(error) {
			res.status(400).send({ error: { message: error } });
		});
	}
});

module.exports = api;