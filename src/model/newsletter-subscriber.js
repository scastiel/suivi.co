
var mongoose = require('mongoose');

var newsletterSubscriberSchema = mongoose.Schema({
	signupDate: { type: Date, default: Date.now },
	email: { type: String, required: true, unique: true }
});

var NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);

module.exports = NewsletterSubscriber;
