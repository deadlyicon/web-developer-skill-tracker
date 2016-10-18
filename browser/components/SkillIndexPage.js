import React from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Link from './Link'
import Layout from './Layout'
import StoreProvider from './StoreProvider'
import skillsStore from '../stores/skillsStore'

export default (props) => (
  <Layout>
    <StoreProvider store={skillsStore} as="skills">
      <SkillsIndexPage />
    </StoreProvider>
  </Layout>
)


const SkillsIndexPage = (props) => {
  const skills = props.skills ?
    props.skills.map(skill =>
      <Skill key={skill.id} {...skill} />
    ) :
    null

  return <div>
    <h1>Skills</h1>
    <div>{skills}</div>
  </div>
}


const Skill = (props) => {
  return <div>
    <Link href={`/skills/${props.slug}`}>{props.name}</Link>
  </div>
}
