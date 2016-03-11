'use strict';
let	mysql	  = require('mysql');
let config  = require('./../config');

module.exports = function(){
	// conect to the database --------------------------------------------------
  var poolConfig = config.db;
  poolConfig.connectionLimit = 10;

	let pool = mysql.createPool(poolConfig);

  return pool;
}
