'use strict';

var ULT = require('./ULT');

class KLT {

	constructor(data) {

		for(var key in data){
			this[key] = data[key];
		}

		this.ULTs = this.ULTs.map(ult => new ULT(ult));

	}

	/* Deberia tener una estrategia para ver cual usar depende cual sea el algoritmo para los ults */
	/* Por ahora solamente voy a pensar el caso que tenga un 1 ULT */
	getNextResource(){
		return this.ULTs[0].getNextResource();
	}

	/**
	 * Devuelve los ults, esta pensado para que el output pueda ser polimorfico con los ULTs
	 * Para que sea más claro fijarse que en ULT existe el mismo metodo y devuelve a si mismo
	 * @return {Array}
	 */
	getSubTasks(){
		return this.ULTs;
	}

	/* Devuelta, esto es para cuando hay mas de un ULT, todavia no esta hecho */
	getStartTime(){
		return this.ULTs[0].getStartTime();
	}

	getId(){
		return this.id;
	}

	/** Es cuando el kernel le da el recurso que necesita
	* Se lo descuenta de lo necesario
	* @param {string} resource El dispositivo que se ejecuta
	* @param {number} time por cuanto tiempo puede ejecutar
	* @return {number} el ULT que lo ejecuto
	*/
	giveResource(resource, time){
		this.ULTs[0].giveResource(resource, time);
		return this.ULTs[0].id;
	}

	/**
	* Devuelve si el proceso ya termino
	* Termino si todas sus rafagas ya se ejecutaron
	*/
	hasEnded(){
		return this.ULTs.every( ult => ult.hasEnded() );
	}

};

module.exports = KLT;
