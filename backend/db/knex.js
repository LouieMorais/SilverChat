// db/knex.js
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

knex.raw('SELECT 1+1 AS result').then(() =>{
    console.log('Database connection successful using Knex.');
}).catch((err) => {
    console.error('Databse connection failed:', err);
});

module.exports = knex;