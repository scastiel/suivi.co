
"use strict";

var fs = require('fs');
var express = require('express');
var api = express.Router();

var TrackingRequest = require('../model/tracking-request');

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

function logRequestForUser(req, res, next) {
	if (!req.user) return next();
	var trackingRequest = new TrackingRequest({
		user: req.user.id,
		carrierCode: req.params.carrierCode,
		trackingNumber: req.params.trackingNumber
	});
	trackingRequest.save(function(err) {
		next();
	});
}

api.get('/track/:carrierCode/:trackingNumber', [ logRequestForUser ], function (req, res, next) {
	var carrier = carrierFactory.get(req.params.carrierCode);
	if (!carrier) {
		res.status(400).send({ error: { message: "Unknown carrier: " + req.params.carrierCode } });
	} else {
		carrier.extractTrackingLines(req.params.trackingNumber).then(function (lines) {
			for (var i in lines) {
				for (var prop in lines[i]) {
					if (!lines[i].hasOwnProperty(prop)) continue;
					if (typeof lines[i][prop] === "object" && lines[i][prop].type === "image") {
						lines[i][prop].content = "data:image/png;base64," + fs.readFileSync(lines[i][prop].src).toString('base64');
						delete lines[i][prop].src;
					}
				}
			}
			res.send(lines);
		}, function(error) {
			res.status(400).send({ error: { message: error } });
		});
	}
});

module.exports = api;