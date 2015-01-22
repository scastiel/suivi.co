
"use strict";

var tmp = require('tmp');
var fs = require('fs');
var request = require("request");

var createTempFile = Promise.denodeify(tmp.file);

function saveImageToSpecificTempFile (url, path) {
	return new Promise(function (fulfill, reject) {
		request(url)
			.pipe(fs.createWriteStream(path))
			.on('error', reject)
			.on('finish', function() { fulfill(path); });
	});
}

function saveImageToTempFile (url, extension) {
	return new Promise(function (fulfill, reject) {
		createTempFile({ postfix: '.' + extension, keep: true })
			.then(function (path) {
				saveImageToSpecificTempFile(url, path).then(fulfill);
			});
	});
};

function saveImagesToTempFiles (urls, extension) {
	return Promise.all(urls.map(function(url) {
		return saveImageToTempFile(url, extension);
	}))
}

module.exports = {
	saveImageToTempFile: saveImageToTempFile,
	saveImagesToTempFiles: saveImagesToTempFiles,
	defaults: function(options) {
		if (options.request)
			request = options.request;
		return this;
	}
};
