import express from 'express'
import {queries, commands} from '../database'
const router = new express.Router()

// INDEX
router.get('/', (request, response, next) => {
  queries.getSkills().then(skills => {
    response.json(skills)
  }).catch(next)
})


export default router
