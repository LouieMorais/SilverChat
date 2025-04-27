/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      // 1. Lookup Tables
      .createTable('title', function(table) {
        table.increments('id').primary(); // SERIAL PRIMARY KEY
        table.string('name', 50).unique().notNullable();
      })
      .createTable('member_type', function(table) {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
      })
      .createTable('verification_state', function(table) {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
      })
      .createTable('member_status', function(table) {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
      })
      .createTable('gender', function(table) {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
      })
      .createTable('marital_status', function(table) {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
      })
  
      // 2. Core Data Tables
      .createTable('member', function(table) {
        table.increments('id').primary(); // SERIAL PRIMARY KEY
        table.string('email', 255).unique().notNullable();
        table.string('password_hash', 255).notNullable();
        table.string('first_name', 100).notNullable();
        table.string('middle_names', 100);
        table.string('last_name', 100).notNullable();
        table.date('date_of_birth').notNullable();
        table.text('bio');
        table.integer('gender_id').unsigned().references('id').inTable('gender').onDelete('SET NULL').onUpdate('CASCADE'); // Optional FK
        table.integer('title_id').unsigned().references('id').inTable('title').onDelete('SET NULL').onUpdate('CASCADE'); // Optional FK
        table.integer('marital_status_id').unsigned().references('id').inTable('marital_status').onDelete('SET NULL').onUpdate('CASCADE'); // Optional FK
        table.string('preferred_pronoun', 50);
        table.string('preferred_title', 50);
        table.string('preferred_gender', 50);
        table.integer('member_status_id').unsigned().notNullable().defaultTo(1).references('id').inTable('member_status').onDelete('RESTRICT').onUpdate('CASCADE'); // Default: Pending Verification
        table.integer('identity_verification_status_id').unsigned().notNullable().defaultTo(1).references('id').inTable('verification_state').onDelete('RESTRICT').onUpdate('CASCADE'); // Default: Not Started
        table.integer('address_verification_status_id').unsigned().notNullable().defaultTo(1).references('id').inTable('verification_state').onDelete('RESTRICT').onUpdate('CASCADE'); // Default: Not Started
        table.integer('member_type_id').unsigned().notNullable().defaultTo(1).references('id').inTable('member_type').onDelete('RESTRICT').onUpdate('CASCADE'); // Default: Standard
        table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now()); // TIMESTAMPTZ DEFAULT NOW()
  
        // Add indexes for frequently queried columns if needed later (e.g., email)
        table.index('email');
      })
      .createTable('address', function(table) {
        table.increments('id').primary();
        table.integer('member_id').unsigned().unique().notNullable().references('id').inTable('member').onDelete('CASCADE').onUpdate('CASCADE'); // One-to-one with CASCADE delete
        table.string('house_number_name', 50);
        table.string('street_name', 100).notNullable();
        table.string('address_line_2', 100);
        table.string('address_line_3', 100);
        table.string('town_city', 100).notNullable();
        table.string('county_province', 100);
        table.string('postcode', 10).notNullable();
        table.string('country_code', 2).notNullable().defaultTo('GB');
        table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  
        // Index on member_id is created automatically by .unique()
        table.index('postcode'); // Index postcode for potential searches
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    // Drop tables in reverse order of creation due to dependencies
    .dropTableIfExists('address')
    .dropTableIfExists('member')
    // Drop lookup tables last
    .dropTableIfExists('marital_status')
    .dropTableIfExists('gender')
    .dropTableIfExists('member_status')
    .dropTableIfExists('verification_state')
    .dropTableIfExists('member_type')
    .dropTableIfExists('title');
};