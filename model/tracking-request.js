
var mongoose = require('mongoose');

var trackingRequestSchema = mongoose.Schema({
	date: { type: Date, default: Date.now },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	carrierCode: { type: String, required: true },
	trackingNumber: { type: String, required: true }
});

var TrackingRequest = mongoose.model('TrackingRequest', trackingRequestSchema);

module.exports = TrackingRequest;