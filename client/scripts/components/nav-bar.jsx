
var NavBar = React.createClass({

	logout: function(event) {
		event.preventDefault();
		delete(sessionStorage.auth);
		this.props.appComponent.setState({ auth: null });
	},

	render: function() {
		var userUl;
		if (this.props.appComponent.state.auth) {
			userUl =
				<ul className="nav navbar-nav navbar-right">
					<li>
						<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
							{this.props.appComponent.state.auth.user.email} <span className="caret"></span>
						</a>
						<ul className="dropdown-menu" role="menu">
                			<li><a href="#" onClick={this.logout}>Déconnexion</a></li>
                		</ul>
					</li>
				</ul>;
		} else {
			userUl =
				<ul className="nav navbar-nav navbar-right">
					<p className="navbar-text">Non connecté</p>
				</ul>;
		}
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span className="sr-only">Afficher/masquer la navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="/">
			      	<img alt="" src="/assets/logo.png"/>
			      </a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      {userUl}
			    </div>
			  </div>
			</nav>
		);
	}

});

module.exports = NavBar;