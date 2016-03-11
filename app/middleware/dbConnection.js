'use strict';
let	mysql	  = require('mysql');
let config  = require('./../config');

module.exports = function(){
	// conect to the database --------------------------------------------------
	let dbConnection = mysql.createConnection(config.db);

	dbConnection.connect();

  return dbConnection;
}
