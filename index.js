
"use strict";

var carriers = require('./lib/carriers');

function usage() {
	console.log(
		"Usage: " + process.argv[0] + " " + process.argv[1] + " <carrier> <trackingNumber>\n" +
		"Available carriers: " + Object.keys(carriers.all()).join(' ')
	);
}

if (process.argv.length < 4) {
	usage();
	process.exit(1);
}

var carrier = carriers.get(process.argv[2]);
if (carrier === null) {
	console.log("Unknown carrier: " + process.argv[2]);
	usage();
	process.exit(1);
}

carrier.extractTrackingLines(process.argv[3]).done(console.log);
