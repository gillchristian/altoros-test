'use strict';
module.exports = iconsRoutes;

function iconsRoutes(express, dbConnection){

  // get an instance of the Express Router ------------------------------------
  let router = express.Router();

  let table = 'icons';

  // --- token virification middalware used from here -------------------------
  // --- following on this router requests ------------------------------------
  // --- are required to provide a token --------------------------------------
  let tokenVerify = require('./../middleware/tokenVerify');

  router.use( tokenVerify );

  // ROUTES -------------------------------------------------------------------
  router.route('/')
    // get all the icons ------------------------------------------------------
    .get(function(req, res){

      let queryString = 'SELECT * from ??';

      dbConnection.query( queryString, table,(err, rows, fields)=>{
        if (err) throw err;
        console.log(rows.length + ' -> icons retrived');
        res.json(rows);
      });
    });
  return router;
};


