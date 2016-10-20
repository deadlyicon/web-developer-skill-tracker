import './NewSkillForm.sass'
import React, { Component } from 'react'
import Layout from './Layout'
import { createSkill } from '../actions'

export default class NewSkillPage extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event){
    event.preventDefault()
    const name = this.refs.name.value
    const description = this.refs.description.value
    createSkill({name, description})
  }

  render() {
    return <form className="NewSkillForm" onSubmit={this.onSubmit}>
      <label>
        <div>Name</div>
        <input type="text" ref="name" />
      </label>
      <label>
        <div>Description</div>
        <textarea type="text" ref="description" />
      </label>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  }
}
