
var $ = require('jquery');
//require('bootstrap');

var React = require('react');
var Router = require('react-router');

var routes = require('../routes/react-routes.jsx');

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('app'), function() {
		ga && ga('send', 'pageview', document.location.pathname)
	});
});
