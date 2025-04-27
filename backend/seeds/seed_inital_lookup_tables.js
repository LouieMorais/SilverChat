/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in reverse order of dependency (if any)
  // We delete lookup tables which don't depend on each other here.
  // npx knex seed:run
  await knex('marital_status').del();
  await knex('gender').del();
  await knex('member_status').del();
  await knex('verification_state').del();
  await knex('member_type').del();
  await knex('title').del();

  // Inserts seed entries
  await knex('title').insert([
    {id: 1, name: 'Mr'},
    {id: 2, name: 'Mrs'},
    {id: 3, name: 'Ms'},
    {id: 4, name: 'Miss'},
    {id: 5, name: 'Mx'},
    {id: 6, name: 'Dr'},
    {id: 7, name: 'Prof'},
    {id: 8, name: 'Prefer not to say'},
    {id: 9, name: 'Other'}
  ]);

  await knex('member_type').insert([
    {id: 1, name: 'Standard'},
    {id: 2, name: 'Former'},
    {id: 3, name: 'Admin'},
    {id: 4, name: 'Family'},
    {id: 5, name: 'Supporter'}
  ]);

  await knex('verification_state').insert([
    {id: 1, name: 'Not Started'},
    {id: 2, name: 'Pending Review'},
    {id: 3, name: 'Verified'},
    {id: 4, name: 'Failed'},
    {id: 5, name: 'Requires Resubmission'}
  ]);

  await knex('member_status').insert([
    {id: 1, name: 'Pending Verification'},
    {id: 2, name: 'Active'},
    {id: 3, name: 'Suspended'},
    {id: 4, name: 'Under Investigation'},
    {id: 5, name: 'Expelled'}
  ]);

  await knex('gender').insert([
    {id: 1, name: 'Woman'},
    {id: 2, name: 'Man'},
    {id: 3, name: 'Non-binary'},
    {id: 4, name: 'Prefer not to say'},
    {id: 5, name: 'Other'}
  ]);

  await knex('marital_status').insert([
    {id: 1, name: 'Single'},
    {id: 2, name: 'Married'},
    {id: 3, name: 'Civil Partnership'},
    {id: 4, name: 'Divorced'},
    {id: 5, name: 'Widowed'},
    {id: 6, name: 'Prefer not to say'}
  ]);
};