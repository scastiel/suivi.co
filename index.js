
"use strict";

var colissimo = require('./lib/carriers/colissimo');

var packageNumber = '7C00010931103';

colissimo.extractTrackingLines(packageNumber).done(console.log);
