exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) =>  {
      table.increments('id').primary()
      table.string('email').unique()
      table.string('password')
      table.timestamps()
    }),

    knex.schema.createTable('user_skills', (table) => {
      table.integer('user_id')
      table.integer('skill_id')
      table.unique(['user_id', 'skill_id'])
    }),

    knex.schema.createTable('skills', (table) => {
      table.increments('id').primary()
      table.string('slug').unique()
      table.string('name')
      table.text('description')
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('user_skills'),
    knex.schema.dropTable('skills'),
  ])
};
