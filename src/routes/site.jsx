
var React = require('react');
var Router = require('react-router');

var routes = require('./react-routes.jsx');

module.exports = function(app) {
	return function (req, res) {
		Router.run(routes, req.url, function (Handler) {
			var content = React.renderToString(<Handler/>);
			res.render('index', {
				content: content,
				config: JSON.stringify(require('../config'))
			});
		});
	};
};

