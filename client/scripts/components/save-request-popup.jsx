
var SaveRequestPopup = React.createClass({

	handleLinkClick: function(event) {
		event.preventDefault();

		this.props.appComponent.setState({ saveRequestPopup: true });

		var modalNode = this.refs.popup.getDOMNode();
		$(modalNode)
			.on('hidden.bs.modal', function (e) {
				this.props.appComponent.setState({ saveRequestPopup: false });
			}.bind(this))
			.modal('show');
	},

	render: function() {
		return (
			<div>
				<p><a href="#" onClick={this.handleLinkClick}>Créer mon compte et sauvegarder cette recherche</a></p>

				<div ref="popup" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title" id="myModalLabel">Bientôt !</h4>
							</div>
							<div className="modal-body">
								
								<p>Cette fonctionnalité n'est pas encore disponible, mais nous travaillons dur
								pour qu'elle arrive très prochainement.</p>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

})

module.exports = SaveRequestPopup;