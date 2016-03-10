'use strict';
var	mysql	  = require('mysql');
var config  = require('./../config');

module.exports = function(){
	// conect to the database --------------------------------------------------
	var dbConnection = mysql.createConnection(config.db);

	dbConnection.connect();

  return dbConnection;
}
