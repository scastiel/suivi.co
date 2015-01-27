
module.exports = function(app) {

	var auth = require('express').Router();

	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var jwt = require('jwt-simple');
	var moment = require('moment');

	var User = require('../model/user.js');

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy(function (username, password, done) {
		User.checkIfValidUser(username, password)
			.then(function (user) {
				done(null, user, true);
			})
			.catch(function (err) {
				done(err);
			});
	}));

	auth.use(passport.initialize());
	auth.use(passport.session());

	auth.post('/user', function (req, res) {
		User.checkIfUserExists(req.body.email)
			.then(User.createUser.bind(null, req.body.email, req.body.password))
			.then(function (user) {
				res.status(201).send(user);
			}).catch(function (err) {
				res.status(400).send({ error: err.message });
			});
	});

	auth.post('/login', function (req, res, next) {
		passport.authenticate('local', { session: false }, function (err, user, info) {
			if (user) {
				var expires = moment().add(7, 'days').valueOf();
				var token = jwt.encode({
					iss: user.id,
					exp: expires
				}, app.get('jwtTokenSecret'));

				res.status(200).json({
					token: token,
					expires: expires,
					user: user
				});
			} else {
				res.status(403).send({ error: err });
			}
		})(req, res, next);
	});

	return auth;

};
