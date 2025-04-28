// db/knex.js
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];