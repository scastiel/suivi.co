
"use strict";

module.exports = {
	all: function() {
		return {
			'colissimo': 'Colisimmo'
		};
	},
	get: function (carrier) {
		try {
			return require('./' + carrier + '.js');
		} catch (e) {
			if (e.code === 'MODULE_NOT_FOUND')
				return null;
			throw e;
		}
	}
}
