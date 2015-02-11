
var express = require('express');
var router = express.Router();

var NewsletterSubscriber = require('../model/newsletter-subscriber');

router.post('/signup', function(req, res, next) {
	NewsletterSubscriber.findOne({ email: req.body.email }, function(err, subscriber) {
		if (subscriber) {
			res.status(409).send(false);
		} else {
			subscriber = new NewsletterSubscriber({ email: req.body.email });
			subscriber.save(function(err) {
				if (err) res.status(503).send(false);
				else res.status(201).send(true);
			});
		}
	});
});

module.exports = router;
