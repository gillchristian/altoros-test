'use strict';

let config = {
  db: {
    host: process.env.host || 'fontawesomestore.db.11105068.hostedresource.com',
    user: process.env.user || 'fontawesomestore',
    password: process.env.password || 'asdQWE!@#123',
    database: process.env.db || 'fontawesomestore'
  },
  port: process.env.PORT || 3000,
  secret: 'nodeRocks'
}

module.exports = config;
