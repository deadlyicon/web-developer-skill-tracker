import React, { Component } from 'react'
import NewSkillForm from './NewSkillForm'
import Layout from './Layout'

export default class NewSkillPage extends Component {
  render() {
    const { currentUser } = this.props
    return <Layout currentUser={currentUser}>
      <h1>New Skill</h1>
      <NewSkillForm />
    </Layout>
  }
}
