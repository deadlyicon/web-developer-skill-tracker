describe('database.queries', () => {
  describe('getSkills', () => {
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
    it('should return all skills', () => {
      return queries.getSkills().then(skills => {
        expect(skills).to.be.an('array')
        expect(skills.length).to.eql(2)
        const skillNames = skills.map(skill => skill.name).sort()
        expect(skillNames).to.eql([
          'deploying to heroku',
          'polishing git commits',
        ])
        const skillSlugs = skills.map(skill => skill.slug).sort()
        expect(skillSlugs).to.eql([
          'deploying-to-heroku',
          'polishing-git-commits',
        ])
      })
    })
  })
})
