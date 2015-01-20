
var mongoose = require('mongoose');

function Db(url) {
	this.url = url;
}

Db.prototype.connectToDb = function() {
	return new Promise(function (resolve, reject) {
		mongoose.connect(this.url);
		var db = mongoose.connection;
		db.on('error', function(err) {
			console.log('' + err);
			reject(err);
		});
		db.once('open', function() {
			resolve();
		});
	}.bind(this));
};

Db.prototype.disconnectFromDb = function() {
	return new Promise(function (resolve, reject) {
		mongoose.connection.close(function () {
			resolve(true);
		});
	});
};

module.exports = Db;
