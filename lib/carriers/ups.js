
"use strict";

var request = require("request").defaults({ jar: true });
var $ = require('cheerio');
var Promise = require('promise');

function visitHomePage () {
	return new Promise(function (fulfill, reject) {
		request.get('http://ups.fr/?Site=Corporate&cookie=fr_fr_home&inputImgTag=&setCookie=yes')
			.on('response', fulfill)
			.on('error', reject);
	});
}

function openTrackingPage (trackingNumber) {

	return new Promise(function (fulfill, reject) {
		
		request
				.post('http://wwwapps.ups.com/WebTracking/track', { form: {
					'HTMLVersion': '5.0',
					'loc': 'fr_FR',
					'Requester': 'UPSHome',
					'WBPM_lid': 'homepage/ct1.html_pnl_trk',
					'track.x': 'Suivi',
					'trackNums': trackingNumber
				}})
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

function openDetailPage (body) {

	return new Promise(function (fulfill, reject) {
		
		var parsedHTML = $.load(body);
		var form = parsedHTML('form#detailFormid');
		var action = $(form).attr('action');
		var params = {};
		$(form).find('input').map(function (i, input) {
			params[$(input).attr('name')] = $(input).attr('value');
		});

		request
			.post(action, { form: params })
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

function removeExtraSpaces(str) {
	return str.trim().replace(/\s+/, ' ');
}

function extractTrackingLinesFromPage (body) {

	return new Promise(function (fulfill, reject) {

		var parsedHTML = $.load(body);
		var lines = [];
		parsedHTML('table.dataTable tr').map(function (i, tr) {

			if (i == 0) return;

			var line = {
    			date: removeExtraSpaces($(tr).find('td:nth-child(2)').text()),
    			time: removeExtraSpaces($(tr).find('td:nth-child(3)').text()),
    			label: removeExtraSpaces($(tr).find('td:nth-child(4)').text()),
    			location: removeExtraSpaces($(tr).find('td:nth-child(1)').text())
    		};
			lines.push(line);

		});

		fulfill(lines);

	});

}

function extractTrackingLines (trackingNumber) {

	return openTrackingPage(trackingNumber).then(openDetailPage).then(extractTrackingLinesFromPage);

}

module.exports = {
	code: 'ups',
	name: 'UPS',
	regex: /^(?:1Z[A-Z0-9]{16}|\d{12}|T\d{10}|\d{9})$/,
	extractTrackingLines: extractTrackingLines
};