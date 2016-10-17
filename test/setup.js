console.log('test/setup.js')

const { knex, queries, commands } = require('../server/database');

global.knex = knex
global.queries = queries
global.commands = commands

beforeEach(() => {
  return knex.migrate.latest().then(() => knex.truncateAllTables() )
})
