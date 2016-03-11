'use strict';

let config = {
  db: {
    host: process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || null,
    database: process.env.db || 'font-awesome-store'
  },
  port: process.env.PORT || 3000,
  secret: 'nodeRocks'
}

module.exports = config;
