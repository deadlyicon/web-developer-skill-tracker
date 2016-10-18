import express from 'express'
import {queries, commands} from '../database'
const router = new express.Router()

// INDEX
router.get('/', (request, response, next) => {
  queries.getSkills().then(skills => {
    response.json(skills)
  }).catch(next)
})

// SHOW
router.get('/:skillSlug', (request, response, next) => {
  const { skillSlug } = request.params
  queries.getSkillBySlug(skillSlug).then(skill => {
    if (!skill) return next()
    response.json(skill)
  }).catch(next)
})

// CREATE
router.post('/', (request, response, next) => {
  const attributes = request.body
  commands.createSkill(attributes).then(skill => {
    response.status(skill ? 201 : 400)
    response.json(skill)
  }).catch(next)
})


export default router
