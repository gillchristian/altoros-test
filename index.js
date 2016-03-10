'use strict';

var server = require('./app/server');

var port = 3000 || process.env.PORT
server(port, __dirname);
