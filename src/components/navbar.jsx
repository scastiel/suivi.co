
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Navbar = React.createClass({

	render: function() {

		return (

			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Afficher/masquer le menu</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link to="app" className="navbar-brand" activeClassName="">
							<img src="/assets/logo.png" className="logo" alt="Suivez votre colis"/>
						</Link>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li>
								<Link to="app" activeClassName="">Suivez votre colis</Link>
							</li>
							<li>
								<Link to="concept">Comment ça marche ?</Link>
							</li>
							<li>
								<Link to="carriers">Les transporteurs</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

		);

	}

});

module.exports = Navbar;