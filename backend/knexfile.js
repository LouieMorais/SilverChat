// Commands used
// npm install knex -g
// npm install knex --save-dev
// npx knex init
// npx knex migrate:make create_alpha1_schema
// npx knex migrate:latest --knexfile=knexfile.js
// response: Created Migration: W:\learning\SilverChat\backend\migrations\20250427000900_create_alpha1_schema.js
// npx knex seed:make seed_inital_lookup_tables  
// npx knex seed:run 

// Load environment variables from .env file
require('dotenv').config({ path: './.env' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg', // postgreSQL
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2, 
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  staging: {
    // client: 'pg', // postgreSQL
    // connection: {
    //   user: process.env.STAGING_DB_USER,
    //   password: process.env.STAGING_DB_PASSWORD,
    //   host: process.env.STAGING_DB_HOST || '127.0.0.1',
    //   port: process.env.STAGING_DB_PORT || 5432,
    //   database: process.env.STAGING_DB_NAME, // filename: './dev.sqlite3'
    // },
    // pool: {
    //   min: 2, 
    //   max: 10,
    // },
    // migrations: {
    //   tableName: 'knex_migrations',
    //   directory: './migrations',
    // },
    // seeds: {
    //   directory: './seeds',
    // },
  },

  production: {
    // client: 'pg', // postgreSQL
    // connection: {
    //   user: process.env.PROD_DB_USER,
    //   password: process.env.PROD_DB_PASSWORD,
    //   host: process.env.PROD_DB_HOST || '127.0.0.1',
    //   port: process.env.PROD_DB_PORT || 5432,
    //   database: process.env.PROD_DB_NAME, // filename: './dev.sqlite3'
    // },
    // pool: {
    //   min: 2, 
    //   max: 10,
    // },
    // migrations: {
    //   tableName: 'knex_migrations',
    //   directory: './migrations',
    // },
    // seeds: {
    //   directory: './seeds',
    // },
  }

};
