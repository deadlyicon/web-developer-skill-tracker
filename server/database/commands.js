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
  const validationErrors = {}
  if (!attributes.description) validationErrors.description = 'Cannot be blank'
  if (!attributes.name)        validationErrors.name = 'Cannot be blank'
  if (Object.keys(validationErrors).length > 0) throwValidationError(validationErrors)

  if (!attributes.slug) attributes.slug = nameToSlug(attributes.name)
  return createRecord('skills', attributes)
    .catch(error => {
      if (error.message.includes('duplicate key value violates unique constraint "skills_slug_unique"')){
        throwValidationError({name: 'Name has already been taken'})
      }
      throw error
    })
}

const throwValidationError = (validationErrors) => {
  const error = new Error('Validation Failed')
  error.type = 'Validation Error'
  error.payload = validationErrors
  throw error
}

export default {
  createSkill,
  createUser,
  findOrCreateUserFromGithubProfile,
}
