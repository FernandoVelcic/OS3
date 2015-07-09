var React 			= require('react');
var Actions			= require('../../actions/Actions');
var TasksStore 		= require('../../stores/TasksStore');
var ResultsStore	= require('../../stores/ResultsStore');

var InputButtons = React.createClass({

	getInitialState: function(){
		return {
			selectedAlgorithm: 'Fake',
			algorithms: ResultsStore.getAlgorithms()
		};
	},

	onNewKLT: function () {
		Actions.addKLT();
	},

	onGenerate: function (event) {
		Actions.confirmKLTs("Fake");
	},

	handleUsesUltClick: function(event){
		TasksStore.toggleUseUlts();
	},

	onSelectedAlgorithm: function(algorithm){
		var self = this;
		return function(event){
			self.setState({ selectedAlgorithm: algorithm });
		};
	},

	render: function(){

		var kltOrProcessDescription = this.props.useUlts ? ' KLT' : ' proceso';

		/* Por ahora no estan implementados los ults */
		var checkBoxStyle = {display: 'none'};

		return (

			<div className="ui center aligned grid">


				<div className="four wide column">
					<a onClick={this.onNewKLT} className="ui primary button">Agregar {kltOrProcessDescription}</a>
				</div>

				<div className="four wide left aligned column ui checkbox" style={checkBoxStyle} id="div-checkbox">
					<input id="useUlts" type="checkbox" checked={this.props.useUlts} onChange={this.handleUsesUltClick} />
					<label htmlFor="useUlts">
						Usar ULTS
					</label>
				</div>

				<div className="four wide column">
					<label id="algoritmo-label">Algoritmo: </label>
					<div className="ui compact menu">
						<div className="ui simple dropdown item">
							{this.state.selectedAlgorithm}
							<i className="dropdown icon"></i>
							<div className="menu">
								{this.state.algorithms.map(function(algorithm){
									return <div className="item" onClick={this.onSelectedAlgorithm(algorithm.description)}>{algorithm.description}</div>
								}, this)}
							</div>
						</div>
					</div>
				</div>

				<div className="four wide column">
					<a onClick={this.onGenerate} className="ui primary button">Simular</a>
				</div>

			</div>

		);
	}


});

module.exports = InputButtons;
