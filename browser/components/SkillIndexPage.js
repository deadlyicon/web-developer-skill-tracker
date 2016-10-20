import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Link from './Link'
import Layout from './Layout'
import { loadSkills } from '../actions'

export default class SkillsIndexPage extends Component {
  constructor(props){
    super(props)
    loadSkills()
  }

  render() {
    const { currentUser, skills } = this.props
    const skillComponents = skills ?
      Object.keys(skills).map(skillId =>
        <Skill key={skillId} skill={skills[skillId]}/>
      ) :
      null

    return <Layout currentUser={currentUser}>
      <h1>Skills</h1>
      <div>
        <Link href={`/skills/bad-link`}>bad skill</Link>
        {skillComponents}
      </div>
    </Layout>
  }
}

const Skill = ({skill}) => {
  const tags = skill.tags.map(tag =>
    <span key={tag}>{tag}</span>
  )
  return <div>
    <Link href={`/skills/${skill.slug}`}>{skill.name}</Link>
    <span>{tags}</span>
  </div>
}
