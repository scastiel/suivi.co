
var request = require("request").defaults({ jar: true });
var $ = require('cheerio');
var moment = require('moment');

function openTrackingPage (trackingNumber) {

	return new Promise(function (resolve, reject) {
		
		request
			.get('https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=' + trackingNumber)
			.on('response', function(response) {
				var body = '';
		        response.setEncoding('utf8');

		        response.on('data', function (chunk) {
		            body += chunk;
		        });

		        response.on('end', function() {
		            resolve(body);
		        });
			});
		
	});

}

function removeExtraSpaces(str) {
	return str.trim().replace(/\s+/g, ' ');
}

function extractTrackingLinesFromPage (body) {

	return new Promise(function (resolve, reject) {

		var parsedHTML = $.load(body);
		var lines = [];
		parsedHTML('#tc-hits tr.detail-wrapper').map(function (i, tr) {

			var dateString = removeExtraSpaces($(tr).find('td:nth-child(1)').text());
			var date = moment(dateString, 'MMM D, YYYY , h:m a', 'en');

			var line = {
    			date: date.format('DD/MM/YYYY'),
    			time: date.format('HH[h]mm'),
    			label: removeExtraSpaces($(tr).find('td:nth-child(2)').text()),
    			location: removeExtraSpaces($(tr).find('td:nth-child(3)').text())
    		};
			lines.push(line);

		});

		if (lines.length > 0) {
			var elements = parsedHTML('#tc-hits .tracking-summary-details');
			var summary = elements[0];
			if (summary) {
				lines[0].label += "\n" + removeExtraSpaces($(summary).text());
			}
			resolve(lines);
		} else {
			reject("Invalid tracking number.");
		}

	});

}

function extractTrackingLines(trackingNumber) {

	return openTrackingPage(trackingNumber).then(extractTrackingLinesFromPage);

}

module.exports = {
	code: 'usps',
	name: 'USPS',
	regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/,
	extractTrackingLines: extractTrackingLines
};
