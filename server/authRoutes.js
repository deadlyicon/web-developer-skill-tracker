import express from 'express'
import { queries, commands } from './database'
import GithubOauth from 'express-github-oauth'

const router = express.Router()

router.get('/login_via_github', GithubOauth.redirectToLoginViaGithub)

const findOrCreateUser = (githubProfile) => {
  return Promise.resolve({})
}

router.get(GithubOauth.callbackPath, GithubOauth.oauthCallbackHanler(
  commands.findOrCreateUserFromGithubProfile
))

router.post('/logout', (request, response, next) => {
  request.session = null
  response.json({})
})

router.get('/session', (request, response) => {
  if (!request.session.userId) return response.json(request.session)
  queries.getUserById(request.session.userId)
    .then(user => {
      response.json({...request.session, user})
    })
});


export default router
