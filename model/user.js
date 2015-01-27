
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	beta: { type: Boolean }
});

userSchema.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.statics.checkIfUserExists = function(email) {
	return new Promise(function (resolve, reject) {
		User.findOne({ email: email }, function (err, user) {
			if (err) {
				reject(err);
			} else if (user) {
				reject(new Error("User already exists."));
			} else {
				resolve(user);
			}
		});
	});
};

userSchema.statics.createUser = function(email, password) {
	return new Promise(function (resolve, reject) {
		var newUser = new User({ username: email, email: email, password: password, beta: true });
		newUser.save(function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(newUser);
			}
		});
	});
};

userSchema.statics.checkIfValidUser = function(email, password) {
	return new Promise(function (resolve, reject) {
		User.findOne({ email: email }, function (err, user) {
			if (err) {
				reject(err);
			} else if (user) {
				user.comparePassword(password, function (err, isMatch) {
					if (err) return done(err);
					if (isMatch) {
						resolve(user);
					} else {
						reject('Invalid password');
					}
				});
			} else {
				reject('Unknown user');
			}
		});

	});
};

var User = mongoose.model('User', userSchema);

module.exports = User;