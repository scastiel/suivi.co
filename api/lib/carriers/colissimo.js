
"use strict";

var request = require("request").defaults({ jar: true });
var $ = require('cheerio');

var imageTemp = require('../util/image-temp').defaults({ request: request });

var baseUrl = 'http://www.colissimo.fr';

function extractLineDataFromTr (tr) {
	return new Promise(function(fulfill, reject) {
		var line = {};

		var dateImg = $(tr).find('td[headers="Date"] img');
		var dateImgUrl = dateImg ? baseUrl + '/portail_colissimo/' + $(dateImg).attr('src') : null;
		
		var labelImg = $(tr).find('td[headers="Libelle"] img');
		var labelImgUrl = labelImg ? baseUrl + '/portail_colissimo/' + $(labelImg).attr('src') : null;
		
		var locationImg = $(tr).find('td[headers="site"] img');
		var locationImgUrl = locationImg ? baseUrl + '/portail_colissimo/' + $(locationImg).attr('src') : null;

		imageTemp
			.saveImagesToTempFiles([ dateImgUrl, labelImgUrl, locationImgUrl ], 'png')
			.then(function (imgPaths) {
				var line = {
	    			date: { type: 'image', src: imgPaths[0] },
	    			label: { type: 'image', src: imgPaths[1] },
	    			location: {type: 'image', src: imgPaths[2] }
	    		};
	    		fulfill(line);
	    	})
	    	.catch(reject);
	});
}

function extractTrackingLines (trackingNumber) {
	return new Promise(function (fulfill, reject) {
		request
			.post(baseUrl + '/portail_colissimo/suivreResultatStubs.do', { form: {
				parcelnumber: trackingNumber
			}})
			.on('response', function(response) {
				var body = '';
		        response.setEncoding('utf8');

		        response.on('data', function (chunk) {
		            body += chunk;
		        });

		        response.on('end', function() {
		        	var parsedHTML = $.load(body);

		            var trs = parsedHTML('#resultatSuivreDiv table > tbody > tr');
					if (trs.length === 0)
						return reject("Invalid tracking number.");
					var promises = Array.prototype.map.call(trs, function(tr) {
						return extractLineDataFromTr(tr);
		            });
		            Promise.all(promises).then(function(lines) {
						fulfill(lines);
					})
		        });
			})
			.on('error', reject);
	});
}

module.exports = {
	code: 'colissimo',
	name: 'Colissimo',
	regex: /^[A-Z0-9]{13}$/,
	extractTrackingLines: extractTrackingLines
};
