'use strict';
let mysql = require('mysql');

module.exports = productsRoutes;

function productsRoutes(express, dbConnection){

	// get an instance of the Express Router ------------------------------------
	let router = express.Router();
	let table = 'products';
  let tokenVerify = require('./../middleware/tokenVerify');

  // ROUTES -------------------------------------------------------------------
	router.route('/')
		// get all the products ---------------------------------------------------
		.get( (req, res)=>{

      let queryString = 'SELECT * from ??';

			dbConnection.query( queryString, table,(err, rows, fields)=>{
				if (err) throw err;
				res.json(rows);
			});
		})
		// add a single product ---------------------------------------------------
		.post( (req, res)=>{

			let columns = ['name', 'desc', 'price', 'stock', 'icon'];
			let product = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.stock,
        req.body.icon
      ];
      let queryString = 'INSERT into ?? (??) VALUES (?)';

			dbConnection.query(queryString, [table, columns, product],(err)=>{
				if (err){
					res.json(err);
				}
				else {
					res.send('product Created!!!');
				}
			});
		});

	// --- ROUTES ---------------------------------------------------------------
	router.route('/:_id')
		// get an user by its id --------------------------------------------------
		.get( (req, res)=>{

			let queriedProduct = { id: req.params._id };
      let queryString = 'SELECT * from ?? WHERE ?';

			dbConnection.query(queryString, [table, queriedProduct], (err, row, fields)=>{
				if (err) throw err;
				res.json(row);
			});
		})
		// update an user ---------------------------------------------------------
		.put( (req, res)=>{

			let queriedProduct = { id: req.params._id };
			let product = [ ];

      if (req.body.name) product.push({name: req.body.name});
      if (req.body.desc) product.push({desc: req.body.desc});
      if (req.body.price) product.push({price: req.body.price});
      if (req.body.stock) product.push({stock: req.body.stock});
      if (req.body.icon) product.push({icon: req.body.icon});

			let fields = product.map( value => mysql.escape(value) );

			let queryString = 'UPDATE ?? SET ' + fields.join(",") + ' WHERE ?';

			dbConnection.query(queryString, [table, queriedProduct], err=>{
				if (err){
					res.send(err);
					throw err;
				}
				else
					res.send('product Updated!!!');
			});
		});

  // --- token virification middalware used from here -------------------------
  // --- following on this router requests ------------------------------------
  // --- are required to provide a token --------------------------------------
  router.use( tokenVerify );

	router.route('/:_id')
		// remove a user ----------------------------------------------------------
		.delete( (req, res)=>{

			let queriedProduct = {
				id: req.params._id
			};

			let queryString = 'DELETE FROM ?? WHERE ?';

			dbConnection.query(queryString, [table, queriedProduct],err=>{
				if (err){
					res.send(err);
					throw err;
				}
				else
					res.send('product Deleted!!!');
			});
		});

	router.route('/check')
		// check if a product name is available -----------------------------------
		.post( (req, res)=>{
      let name = {name: req.body.name}
      let id = req.body.id || '';
      let queryString = 'SELECT * from ?? WHERE ?';

      dbConnection.query(queryString, [table, name], (err, rows, fields)=>{
        if (err){
          res.send(err);
          throw err;
        }
        else {
          let available = !rows.length;
          if (rows.length) available = rows[0].id == id;
          res.send({available: available})
        }
      })
    });

	return router;
};
