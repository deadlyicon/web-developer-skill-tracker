const skills = require('./skills.json')

const nameToSlug = name =>
  String(name).toLowerCase().replace(/[\.\/ #]+/g, '-')

const firstRecord = records => records[0]

exports.seed = (knex, Promise) => {

  const emptyTables = () =>
    Promise.all([
      knex('user_skills').del(),
      knex('skill_tags').del(),
      knex('skills').del(),
      knex('tags').del(),
    ])

  const createSkills = () => {
    const skillAttributes = skills.map(({name, description}) => ({
      slug: nameToSlug(name),
      name,
      description,
    }))
    return Promise.all(skillAttributes.map(skill =>
      knex('skills').insert(skill).returning('*').then(firstRecord)
    ))
  }

  const createTags = () => {
    const tagNames = []
    skills.forEach(skill => {
      skill.tags.forEach(name => {
        if (tagNames.indexOf(name) === -1) tagNames.push(name)
      })
    })
    const tagAttributes = tagNames.map(name => ({
      slug: nameToSlug(name),
      name,
    }))
    return Promise.all(tagAttributes.map(tag =>
      knex('tags').insert(tag).returning('*').then(firstRecord)
    ))
  }

  const createSkillTags = (skillRecords, tagRecords) => {
    let queries = []
    skills.forEach(skill => {
      const skillId = skillRecords.find(sr => sr.name === skill.name).id
      skill.tags.forEach(tagName => {
        const tagId = tagRecords.find(tr => tr.name === tagName).id
        const query = knex('skill_tags').insert({
          skill_id: skillId,
          tag_id: tagId,
        })
        queries.push(query)
      })
    })
    return Promise.all(queries)
  }

  return emptyTables()
    .then(() => Promise.all([createSkills(), createTags()]))
    .then((results => createSkillTags(results[0], results[1])))
}
