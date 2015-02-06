
var Reflux = require('reflux');
var NewsletterActions = require('./newsletter-actions');

var NewsletterStore = Reflux.createStore({

	init: function() {
        this.listenTo(NewsletterActions.signup, this.onSignup);
    },

    onSignup: function(email) {
    	$.post('/newsletter/signup', { email: email }, 'json')
    		.done(function(result) {
    			this.trigger({ ok: true, error: null });
    		}.bind(this))
    		.fail(function(xhr) {
    			if (xhr.status === 409) {
    				this.trigger({ ok: false, error: "EMAIL_ALREADY_EXISTS" });
    			} else {
    				this.trigger({ ok: false, error: "UNKNOWN_ERROR" });
    			}
    		}.bind(this));
    }

});

module.exports = NewsletterStore;