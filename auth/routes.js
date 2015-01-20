
var auth = require('express').Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Db = require('../model/db.js');
var User = require('../model/user.js');

var db = new Db('mongodb://localhost:27017/suivremoncolis-dev');

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	db.connectToDb().then(
		function() {
			User.findById(id, function (err, user) {
				done(err, user);
			});
		}
	).then(db.disconnectFromDb);
});

passport.use(new LocalStrategy(function (username, password, done) {
	db.connectToDb()
		.then(User.checkIfValidUser.bind(null, username, password))
		.then(function(user) {
			db.disconnectFromDb().then(function() {
				done(null, user, true);
			});
		})
		.catch(function(err) {
			db.disconnectFromDb().then(function() { done(err); });
		});
}));

auth.use(passport.initialize());
auth.use(passport.session());

auth.post('/user', function (req, res) {
	db.connectToDb()
		.then(User.checkIfUserExists.bind(null, req.body.email))
		.then(User.createUser.bind(null, req.body.email, req.body.password))
		.then(function (user) {
			db.disconnectFromDb().then(function() {
				res.status(201).send(user);
			});
		}).catch(function (err) {
			db.disconnectFromDb().then(function() {
				res.status(400).send({ error: err.message });
			});
		});
});

auth.post('/login', function(req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (user) {
			res.status(200).send(true);
		} else {
			res.status(403).send({ error: err });
		}
	})(req, res, next);
});

module.exports = auth;