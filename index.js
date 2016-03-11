'use strict';

let server = require('./app/server');

// --- start the server ---
let port = process.env.PORT || 3000;

server(port, __dirname);
