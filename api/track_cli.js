
"use strict";

var CarrierFactory = require('./lib/carriers');
var carrierFactory = new CarrierFactory();

function usage() {
	console.log(
		"Usage: " + process.argv[0] + " " + process.argv[1] + " <carrier> <trackingNumber>\n" +
		"Available carriers: " + carrierFactory.all().map(function(carrier) { return carrier.code; }).join(' ')
	);
}

if (process.argv.length == 3) {
	var possibleCarriers = carrierFactory.guessFromTrackingNumber(process.argv[2])
		.map(function (carrier) {
			return carrier.code;
		})
	console.log("Possible carriers: " + possibleCarriers.join(' '));
	process.exit(0);
}

if (process.argv.length < 4) {
	usage();
	process.exit(1);
}

var carrier = carrierFactory.get(process.argv[2]);
if (carrier === null) {
	console.log("Unknown carrier: " + process.argv[2]);
	usage();
	process.exit(1);
}

carrier.extractTrackingLines(process.argv[3]).done(console.log);
