'use strict';
module.exports = function(app, express, dbConnection){

  // get an instance of the Express Router ------------------------------------
  var router = express.Router();

  var table = 'icons';

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
