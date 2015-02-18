
var request = require("request").defaults({ jar: true });
var $ = require('cheerio');

function openTrackingPage (trackingNumber) {

	return new Promise(function (resolve, reject) {
		
		request
			.get('http://www.postnl.post/details/?barcodes=' + trackingNumber)
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
	return str.trim().replace(/\s+/, ' ');
}

function extractTrackingLinesFromPage (body) {

	return new Promise(function (resolve, reject) {

		var parsedHTML = $.load(body);
		var lines = [];
		parsedHTML('#datatables tr.detail').map(function (i, tr) {

			var dateTime = removeExtraSpaces($(tr).find('td:nth-child(1)').text());
			var dateTimeElements = dateTime.split(/\s+/);
			var date = dateTimeElements[0].replace(/(\d\d)-(\d\d)-(\d\d\d\d)/, '$1/$2/$3');;
			var time = dateTimeElements[1].replace(/(\d\d):(\d\d)/, '$1h$2');

			var line = {
    			date: date,
    			time: time,
    			label: removeExtraSpaces($(tr).find('td:nth-child(2)').text()),
    			location: ''
    		};
			lines.push(line);

		});

		if (lines.length > 0)
			resolve(lines);
		else
			reject("Invalid tracking number.");

	});

}

function extractTrackingLines(trackingNumber) {

	return openTrackingPage(trackingNumber).then(extractTrackingLinesFromPage);

}

module.exports = {
	code: 'postnl',
	name: 'PostNL',
	regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/,
	extractTrackingLines: extractTrackingLines
};
