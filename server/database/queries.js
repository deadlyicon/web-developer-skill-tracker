import knex from './knex'

const getRecords = (table) =>
  knex.table(table).select('*')

const getRecordById = (table, id) =>
  knex.table(table).where('id', id).first('*')

const getSkills = () =>
  getRecords('skills')

const getSkillBySlug = (slug) =>
  knex
    .table('skills')
    .where('slug', slug)
    .first()

export default {
  getSkills,
  getSkillBySlug,
}
