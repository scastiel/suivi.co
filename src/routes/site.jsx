
var React = require('react');
var Router = require('react-router');

var routes = require('./react-routes.jsx');

module.exports = function(app) {
	return function (req, res) {
		Router.run(routes, req.url, function (Handler, other) {
			var content = React.renderToString(<Handler/>);
			if (content.indexOf("<!--404-->") !== -1)
				res.status(404);
			res.render('index', {
				content: content,
				config: require('../config')
			});
		});
	};
};

