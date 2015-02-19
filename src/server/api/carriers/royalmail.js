
var request = require("request").defaults({ jar: true });
var $ = require('cheerio');
var moment = require('moment');

function openTrackingPage (trackingNumber) {

	return new Promise(function (resolve, reject) {
		
		request
			.post('https://www.royalmail.com/track-your-item', {
				timeout: 5000,
				form: {
					tracking_number: trackingNumber,
					op: 'Track item',
					form_build_id: 'form-b8944419f737356550bc0b6c2323615d',
					form_id: 'rml_track_trace_search_form'
				}
			})
			.on('response', function(response) {
				var body = '';
		        response.setEncoding('utf8');

		        response.on('data', function (chunk) {
		            body += chunk;
		        });

		        response.on('end', function() {
		            resolve(body);
		        });
			})
			.on('error', function(err) {
	        	reject(err);
	        });
		
	});

}

function removeExtraSpaces(str) {
	return str.trim().replace(/\s+/, ' ');
}

function extractTrackingLinesFromPage (body) {

	return new Promise(function (resolve, reject) {

		var parsedHTML = $.load(body);
		
		var line;

		var statusElement = parsedHTML('.status');
		var status;
		if (statusElement) {
			status = removeExtraSpaces($(statusElement[0]).find('.strong').text() + '\n' + $(statusElement[0]).find('p:nth-child(2)').text());
			
			if (!status.match(/^Please try again/)) {

				var dateElement = parsedHTML('.result .time p');
				var date, time;
				if (dateElement) {
					var dateString = $(dateElement[0]).text().replace(/^Last\supdate:\s/, '');
					var dateObj = moment(dateString, 'D MMM YYYY, h:mA', 'en');
					if (dateObj.isValid()) {
						date = dateObj.format('DD/MM/YYYY');
						time = dateObj.format('HH:mm');
					}
				}

				if (date) {
					line = {
						date: date,
						time: time,
						label: status,
						location: ''
					};
				}

			}
		}

		if (line)
			resolve([ line ]);
		else
			reject("Invalid tracking number.");

	});

}

function extractTrackingLines(trackingNumber) {

	return openTrackingPage(trackingNumber).then(extractTrackingLinesFromPage);

}

module.exports = {
	code: 'royalmail',
	name: 'Royal Mail',
	regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/,
	extractTrackingLines: extractTrackingLines
};
