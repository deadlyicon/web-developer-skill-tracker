import React from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Layout from './Layout'
import StoreProvider from './StoreProvider'


export default (props) => (
  <Layout>
    <StoreProvider store={skillsStore} as="skills">
      <SkillsShowPage {...props} />
    </StoreProvider>
  </Layout>
)

const SkillsShowPage = (props) => {
  const { skillSlug } = props.location.params
  const skill = props.skills && props.skills
    .find(skill => skill.slug === skillSlug)

  if (!skill) return <div>Loading…</div>
  return <div>
    <h1>{skill.name}</h1>
    <pre>{skill.description||''}</pre>
  </div>
}
