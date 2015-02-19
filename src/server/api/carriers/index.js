
"use strict";

function CarrierFactory() {
	this.carriers = {
		'colissimo': 'Colisimmo',
		'ups': 'UPS',
		'chronopost': 'Chronopost',
		'postnl': 'PostNL',
		'usps': 'USPS',
		'royalmail': 'Royal Mail'
	};
	return this;
}

CarrierFactory.prototype.all = function () {
	return Object.keys(this.carriers).map(function (carrier) {
		return this.get(carrier);
	}, this);
}

CarrierFactory.prototype.guessFromTrackingNumber = function (trackingNumber) {
	return this.all().filter(function (carrier) {
		return trackingNumber.match(carrier.regex);
	});
}

CarrierFactory.prototype.get = function (carrier) {
	try {
		return require('./' + carrier + '.js');
	} catch (e) {
		if (e.code === 'MODULE_NOT_FOUND')
			return null;
		throw e;
	}
}

module.exports = CarrierFactory;