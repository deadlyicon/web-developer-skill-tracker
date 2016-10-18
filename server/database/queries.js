import knex from './knex'

const firstRecord = records => records[0]

const getRecords = (table) =>
  knex.table(table).select('*')

const getRecordById = (table, id) =>
  knex.table(table).where('id', id).first('*')

const getSkills = () =>
  getRecords('skills').then(loadTagsForSkills)

const getSkillBySlug = (slug) =>
  knex
    .table('skills')
    .where('slug', slug)
    .then(loadTagsForSkills)
    .then(firstRecord)

const loadTagsForSkills = (skills) => {
  const skillIds = skills.map(skill => skill.id)
  return knex
    .table('tags')
    .select('*')
    .join('skill_tags', 'skill_tags.tag_id', '=', 'tags.id')
    .whereIn('skill_id', skillIds)
    .then(tags => {
      skills.forEach(skill => {
        skill.tags = tags
          .filter(tag => tag.skill_id === skill.id)
          .map(tag => tag.name)
      })
      return skills
    })
}

export default {
  getSkills,
  getSkillBySlug,
}
