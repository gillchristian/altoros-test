'use strict';
let bcrypt = require('bcrypt-nodejs');

module.exports = sampleUserRoutes;

function sampleUserRoutes(express, dbConnection){

  // get an instance of the Express Router ------------------------------------
  let router = express.Router();

  let table = 'users';

  // ROUTES -------------------------------------------------------------------
  router.route('/')
    // create sample user if not created --------------------------------------
    .post(function(req, res){

      let queryString = 'SELECT * from ??';

      dbConnection.query( queryString, table,(err, rows, fields)=>{
        if (err) throw err;
        if (!rows.length) {
          // save user on pass hash cb ----------------------------------------
          bcrypt.hash('password', null, null, (err, hash)=>{
            let colums = ['name', 'email', 'password']
            let user = ['altoros', 'altoros@altoros', hash]
            let queryString = 'INSERT into ?? (??) VALUES (?)';
            dbConnection.query( queryString, [table, colums, user],(err, rows, fields)=>{
              if (err) throw err;
            })
          })
        }
      });
    });
  return router;
};




