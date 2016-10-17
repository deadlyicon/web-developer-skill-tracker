import knex from './knex'
import queries from './queries'

const firstRecord = records => records[0]

const createRecord = (table, attributes) =>
  knex
    .table(table)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)


const updateRecord = (table, id, attributes) =>
  knex
    .table(table)
    .where('id', id)
    .update(attributes)
    .returning('*')
    .then(firstRecord)


const deleteRecord = (table, id) =>
  knex
    .table(table)
    .where('id', id)
    .del()

//

const nameToSlug = name =>
  String(name).toLowerCase().replace(/[\.\/ #]+/g, '-')

const createSkill = (attributes) => {
  if (!attributes.slug) attributes.slug = nameToSlug(attributes.name)
  return createRecord('skills', attributes)
}

export default {
  createSkill,
}
