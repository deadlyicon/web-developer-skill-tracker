import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Link from './Link'
import Layout from './Layout'
import state from '../state'

export default class SkillsIndexPage extends Component {
  constructor(props){
    super(props)
    state.loadSkills()
  }

  render() {
    const skills = this.props.state.skills
    const skillComponents = skills ?
      Object.keys(skills).map(skillId =>
        <Skill key={skillId} skill={skills[skillId]}/>
      ) :
      null

    return <Layout>
      <h1>Skills</h1>
      <div>{skillComponents}</div>
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
