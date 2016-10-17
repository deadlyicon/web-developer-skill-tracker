process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import Knex from 'knex'
const config = require('../../../knexfile')[process.env.NODE_ENV]
const knex = Knex(config)

knex.truncateAllTables = function(){
  return Promise.all([
    knex.table('user_skills').del(),
    knex.table('users').del(),
    knex.table('skills').del(),
  ])
}

export default knex
