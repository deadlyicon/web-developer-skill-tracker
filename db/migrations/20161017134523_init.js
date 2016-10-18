exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) =>  {
      table.increments('id').primary()
      table.integer('github_id').unique()
      table.string('email').unique()
      table.string('name')
      table.string('avatar_url')
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
      table.string('name').unique()
      table.text('description')
    }),

    knex.schema.createTable('skill_tags', (table) => {
      table.integer('skill_id')
      table.integer('tag_id')
      table.unique(['skill_id', 'tag_id'])
    }),

    knex.schema.createTable('tags', (table) => {
      table.increments('id').primary()
      table.string('slug').unique()
      table.string('name').unique()
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
