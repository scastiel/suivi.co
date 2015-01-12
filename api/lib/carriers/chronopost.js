
"use strict";

var request = require("request").defaults({ jar: true });
var $ = require('cheerio');
var Promise = require('promise');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

function openHomePage () {
	return new Promise(function (fulfill, reject) {
		request
			.get('http://www.chronopost.fr/transport-express/livraison-colis')
			.on('response', function(response) {
				var body = '';
		        response.setEncoding('utf8');

		        response.on('data', function (chunk) {
		            body += chunk;
		        });

		        response.on('end', function() {
		            fulfill(body);
		        });
			});
	});
}

function submitTrackingForm (trackingNumber, homePageBody) {
	return new Promise(function (fulfill, reject) {
		var parsedHTML = $.load(homePageBody);
	    var form = parsedHTML('form#suivreEnvoi');
	    var action = form.attr('action');
	    request
	    	.post('http://www.chronopost.fr' + action, { form: { chronoNumbers: trackingNumber } })
	    	.on('response', function (response) {
	    		var body = '';
		        response.setEncoding('utf8');
				response.on('data', function (chunk) { body += chunk; });
		        response.on('end', function() {
		            fulfill(body);
		        });
	    	});
	});
}

function extractTrackingLinesFromPage (body) {
	return new Promise(function (fulfill, reject) {
		var parsedHTML = $.load(body);
		var lines = [];

		var trs = parsedHTML('.tabListeEnvois tr');
	
		if (trs.length === 2 && $(trs[1]).find('td').length === 1)
			return reject("Invalid tracking number.");

		trs.map(function (i, tr) {
			if (i == 0) return;
			var dateTime = $(tr).find('td[headers=envoisCol1]').html().split("<br>");
			var locationLabel = $(tr).find('td[headers=envoisCol2]').html().split("<br>");
			var line = {
				date: dateTime[0].replace(/^(?:lun|mar|mer|jeu|ven|sam|dim)\s*/, ''),
				time: dateTime[1],
				location: entities.decode(locationLabel[0]),
				label: entities.decode(locationLabel[1])
			};
			lines.push(line);
		});
		fulfill(lines);
	});
}

function extractTrackingLines (trackingNumber) {
	return openHomePage()
		.then(submitTrackingForm.bind(null, trackingNumber))
		.then(extractTrackingLinesFromPage);
}

module.exports = {
	code: 'chronopost',
	name: 'Chronopost',
	regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/,
	extractTrackingLines: extractTrackingLines
};