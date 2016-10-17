describe('/api/skills', () => {
  beforeEach(() =>
    Promise.all([
      commands.createSkill({
        name: 'polishing git commits',
      }),
      commands.createSkill({
        name: 'deploying to heroku',
      }),
    ])
  )
  describe('GET /api/skills', () => {
    it('should render 400 Not Authorized', () =>
      request('get', '/api/skills').then(response => {
        expect(response).to.have.status(200)
        const skills = response.body
        expect(skills).to.be.an('array')
        expect(skills.length).to.eql(2)
        const skillNames = skills.map(skill => skill.name).sort()
        expect(skillNames).to.eql([
          'deploying to heroku',
          'polishing git commits',
        ])
      })
    )
  })
})
