describe('database.commands', () => {
  describe('getSkills', () => {
    it('should return all skills', () => {
      const attributes = {
        name: 'JavaScript Array#filter',
        description: 'you know how to use Array#filter',
      }
      return commands.createSkill(attributes)
        .then(skill => {
          expect(skill).to.be.a('object')
          expect(skill.id).to.be.a('number')
          expect(skill.slug).to.eql('javascript-array-filter')
          expect(skill.name).to.eql('JavaScript Array#filter')
          expect(skill.description).to.eql('you know how to use Array#filter')
        })
        .then(() => queries.getSkills())
        .then(skills => {
          expect(skills.length).to.eql(1)
          expect(skills).to.eql([
            {
              id: skills[0].id,
              slug: 'javascript-array-filter',
              name: 'JavaScript Array#filter',
              description: 'you know how to use Array#filter',
            }
          ])
        })
    })
  })
})
