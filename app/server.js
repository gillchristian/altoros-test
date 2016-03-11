'use strict';
module.exports = server;

// Basic Setup ================================================================
// ============================================================================
let express 	= require('express');
let app			  = express(),
	bodyParser 	= require('body-parser'),
	morgan	  	= require('morgan'),
  jwt         = require('jsonwebtoken');

let config 		= require('./config');
let secret    = config.secret;

function server(port, path){
  // App configuration ========================================================
  // ==========================================================================

  // grab routes & middleware -------------------------------------------------
  let dbConnection = require('./middleware/dbConnection')();

  let authenticateRoutes = require('./routes/authentication.routes')(express, dbConnection);
  let iconsRoutes = require('./routes/icons.routes')(express, dbConnection);
  let productsRoutes = require('./routes/products.routes')(express, dbConnection);
  let sampleUserRoutes = require('./routes/sample-user.routes')(express, dbConnection);

  // enable CORS requests -----------------------------------------------------
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type, Authorization, x-access-token');

    next();
  });

  // log requests to the console ----------------------------------------------
  app.use(morgan('dev'));

  // support json encode bodies & encoded bodies ------------------------------
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({extended: true}) );

  // Routes ===================================================================
  // ==========================================================================

  // set static files location ------------------------------------------------
  // used for requests that our frontend will make ----------------------------
  app.use(express.static(path));

  // basic api route :) -------------------------------------------------------
  app.get('/api', function(req, res){
    res.json({message: 'Welcome to the express-mysql API :)'});
  });

  // API ROUTES ---------------------------------------------------------------
  // --- Sample ---------------------------------------------------------------
  app.use('/api/sample', sampleUserRoutes);

  // --- Authenticate ---------------------------------------------------------
  app.use('/api/authenticate', authenticateRoutes);

  // --- Icons ----------------------------------------------------------------
  app.use('/api/icons', iconsRoutes);

  // --- Products -------------------------------------------------------------
  app.use('/api/products', productsRoutes);

  // CATCHALL -----------------------------------------------------------------
  // SENDS USERS TO THE FRONT END ---------------------------------------------
  app.get('*', function(req, res){
    res.sendFile(path + '/index.html');
  });

  // Start the server =========================================================
  // ==========================================================================
  app.listen(port);
  console.log('Magic happens on port ' + port);
}
