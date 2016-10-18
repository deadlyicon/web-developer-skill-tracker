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

const createUser = (attributes) =>
  createRecord('users', attributes)

const findOrCreateUserFromGithubProfile = (githubProfile) => {
  const github_id = githubProfile.id
  const userAttributes = {
    github_id: github_id,
    name: githubProfile.name,
    email: githubProfile.email,
    avatar_url: githubProfile.avatar_url,
  }
  return knex.table('users').where('github_id', github_id).first('*')
    .then(user => user ? user : createUser(userAttributes))
}

const nameToSlug = name =>
  String(name).toLowerCase().replace(/[\.\/ #]+/g, '-')

const createSkill = (attributes) => {
  if (!attributes.slug) attributes.slug = nameToSlug(attributes.name)
  return createRecord('skills', attributes)
}

export default {
  createSkill,
  createUser,
  findOrCreateUserFromGithubProfile,
}
