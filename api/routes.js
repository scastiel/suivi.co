
"use strict";

var fs = require('fs');
var express = require('express');
var api = express.Router();

var TrackingRequest = require('../model/tracking-request');

var CarrierFactory = require('./lib/carriers');
var carrierFactory = new CarrierFactory();

function remplaceImagePathsByDataUrlInLines(lines) {
	for (var i in lines) {
		for (var prop in lines[i]) {
			if (!lines[i].hasOwnProperty(prop)) continue;
			if (typeof lines[i][prop] === "object" && lines[i][prop].type === "image") {
				lines[i][prop].content = "data:image/png;base64," + fs.readFileSync(lines[i][prop].src).toString('base64');
				delete lines[i][prop].src;
			}
		}
	}
}

function logRequestForUser(req, res, next) {
	//if (!req.user) return next();
	var trackingRequest = new TrackingRequest({
		user: req.user ? req.user.id : null,
		carrierCode: req.params.carrierCode,
		trackingNumber: req.params.trackingNumber
	});
	console.log(trackingRequest);
	trackingRequest.save(function(err) {
		next();
	});
}

api.get('/carriers', function (req, res, next) {
	res.send(carrierFactory.all().map(function (carrier) {
		return { code: carrier.code, name: carrier.name };
	}));
});

api.get('/guess-carrier/:trackingNumber', function (req, res, next) {
	var carriers = carrierFactory.guessFromTrackingNumber(req.params.trackingNumber);
	res.send(carriers.map(function (carrier) { return carrier.code; }));
});

api.get('/track/:trackingNumber', [ logRequestForUser ], function (req, res, next) {
	Promise.all(carrierFactory.all().map(function (carrier) {
		return new Promise(function (resolve, reject) {
			carrier.extractTrackingLines(req.params.trackingNumber)
				.then(function(lines) {
					remplaceImagePathsByDataUrlInLines(lines);
					resolve({ carrier: carrier, lines: lines });
				})
				.catch(function(err) { resolve({ carrier: carrier, lines: false }); });
		});
	}))
	.then(function (results) {
		var filteredResults = [];
		for (var i in results) {
			if (!results.hasOwnProperty(i)) continue;
			var result = results[i];
			if (result.lines !== false)
				filteredResults.push(result);
		}
		res.send(filteredResults);
	})
	.catch(function (err) {
		console.log("Error", err);
		res.status(500).send(err);
	});
});

api.get('/track/:carrierCode/:trackingNumber', [ logRequestForUser ], function (req, res, next) {
	var carrier = carrierFactory.get(req.params.carrierCode);
	if (!carrier) {
		res.status(400).send({ error: { message: "Unknown carrier: " + req.params.carrierCode } });
	} else {
		carrier.extractTrackingLines(req.params.trackingNumber).then(function (lines) {
			remplaceImagePathsByDataUrlInLines(lines);
			res.send(lines);
		}, function(error) {
			res.status(400).send({ error: { message: error } });
		});
	}
});

module.exports = api;