const skills = require('./skills.json')
skills.forEach(skill => {
  if (!skill.slug) skill.slug = skill.name.replace(/[\.\/ ]+/g, '-')
})

exports.seed = (knex, Promise) =>
  knex('skills').del().then(() =>
    Promise.all(skills.map(skill => knex('skills').insert(skill)))
  );
