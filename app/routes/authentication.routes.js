'use strict';
let	mysql	= require('mysql');
let config	= require('./../config');
let jwt     = require('jsonwebtoken');
let bcrypt = require('bcrypt-nodejs');

module.exports = authenticate;

function authenticate(express, dbConnection){

  let secret = process.env.SECRET || config.secret;
  let table = 'users';

  // get an instance of the Express Router ------------------------------------
  let router = express.Router();

  // User =====================================================================
  // ==========================================================================

  // --- ROUTES ---------------------------------------------------------------
  router.route('/')

    // get all the users ------------------------------------------------------
    .post(function(req, res){

      let email = req.body.email || req.params.email || req.query.email;
      let password = req.body.password || req.params.password || req.query.password;

      // --- mail name --------------------------------------------------------
      let queryString = 'SELECT ?? from ?? WHERE ?? = ?';
      let queryColumns = 'password';
      let emailColumn = 'email';

      dbConnection.query(
        queryString,
        [queryColumns, table, emailColumn, email],
        (err, row, fields)=>{
          // --- error --------------------------------------------------------
          if (err) throw err;

          let user = row[0];

          // --- user not found -----------------------------------------------
          if( !row.length )
            res.json({success: false, message: 'Usuario no encontrado.'});

          // --- user found ---------------------------------------------------
          else {
            // --- password check ---------------------------------------------
            let passwordCheck = bcrypt.compareSync(password, user.password)

            // --- wrong password ---------------------------------------------
            if ( !passwordCheck )
              res.json({success: false, message: 'Contraseña inválida.'});
            else {
              // --- passowrd is right ----------------------------------------
              // --- create token ---------------------------------------------
              let userData = { name: user.name, email };
              let tokenConfig = {expiresIn: 60 * 60 * 24};
              let token = jwt.sign(userData, secret, tokenConfig);

              res.json({ success: true, message: 'Usuario autenticado.', token });
            }
          }
      });

    });

  return router;
};
