'use strict';
module.exports = server;

// Basic Setup ================================================================
// ============================================================================
var express 	= require('express');
var app			  = express(),
	bodyParser 	= require('body-parser'),
	morgan	  	= require('morgan'),
  jwt         = require('jsonwebtoken');

var config 		= require('./config');
var secret    = config.secret;

function server(port, path){
  // App configuration ==========================================================
  // ============================================================================

  // configure our app to handle CORS requests
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

  // log requests to the console ------------------------------------------------
  app.use(morgan('dev'));

  app.use( bodyParser.json() ); // support json encode bodies
  app.use( bodyParser.urlencoded({extended: true}) ); // support encoded bodies

  // Routes =====================================================================
  // ============================================================================

  // set static files location
  // used for requests that our frontend will make
  app.use(express.static(path));

  // basic api route :) ---------------------------------------------------------
  app.get('/api', function(req, res){
    res.json({message: 'Welcome to the express-mysql API :)'});
  });

  /*
  // API ROUTES -----------------------------------------------------------------
  // --- Authenticate ---
  let authenticateRoutes = require('./app/routes/authenticate')(app, express);
  app.use('/api/authenticate', authenticateRoutes);

  // --- token virification middalware used from here ---
  // --- following requests are required to provide a token ---
  let tokenVerify = require('./app/middleware/tokenVerify');

  app.use( tokenVerify );
  */

  var dbConnection = require('./middleware/dbConnection')();

  // --- Products ---
  let productsRoutes = require('./routes/products.routes')(app, express, dbConnection);
  app.use('/api/products', productsRoutes);

  // --- Products ---
  let iconsRoutes = require('./routes/icons.routes')(app, express, dbConnection);
  app.use('/api/icons', iconsRoutes);

  // MAIN CATCHALL ROUTE --------------------------------------------------------
  // SENDS USERS TO THE FRONT END -----------------------------------------------

  app.get('*', function(req, res){
    res.sendFile(path + '/index.html');
  });


  // Start the server ===========================================================
  // ============================================================================
  app.listen(port);
  console.log('Magic happens on port ' + port);
}
