import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import Layout from './Layout'
import { loadSkillBySlug } from '../actions'

export default class SkillsShowPage extends Component {
  constructor(props){
    super(props)
    this.loadSkill(props.location.params.skillSlug)
  }

  componentWillReceiveProps(newProps){
    const params = this.props.location.params
    const newParams = newProps.location.params
    if (params.skillSlug !== newParams.skillSlug)
      this.loadSkill(newParams.skillSlug)
  }

  loadSkill(skillSlug){
    loadSkillBySlug(skillSlug)
  }

  render(){
    const { currentUser, skills, skillIdsBySlug, location } = this.props
    const { skillSlug } = location.params
    const skillId = skillIdsBySlug[skillSlug]
    if (skillId === null) return (
      <Layout currentUser={currentUser}>Skill Not Found</Layout>
    )
    const skill = skillId && skills[skillId]
    if (!skill) return (
      <Layout currentUser={currentUser}>Loading…</Layout>
    )
    return <Layout currentUser={currentUser}>
      <h1>{skill.name}</h1>
      <div>{(skill.tags || []).join(', ')}</div>
      <pre>{skill.description||''}</pre>
    </Layout>
  }
}
