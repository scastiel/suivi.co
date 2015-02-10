
window.jQuery = require('jquery');
require('bootstrap');

var React = require('react');
var Router = require('react-router');

var routes = require('../routes/react-routes.jsx');

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('app'), function() {
		ga && ga('send', 'pageview', document.location.pathname)
	});
});

var $ = window.jQuery;
$(document).ready(function() {
	$('[data-spy="scroll"]').on('activate.bs.scrollspy', function (event) {
		history.replaceState({}, "", $("a[href^='#']", event.target).attr("href"));
	});
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});
