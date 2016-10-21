import './NewSkillForm.sass'
import React, { Component } from 'react'
import Layout from './Layout'
import { createSkill } from '../actions'

export default class NewSkillForm extends Component {

  static contextTypes = {
    redirectTo: React.PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.state = {
      disabled: false,
      validationErrors: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  reset(){
    this.setState({disabled: false})
    this.refs.name.value = ''
    this.refs.description.value = ''
  }

  onSubmit(event){
    event.preventDefault()
    const name = this.refs.name.value
    const description = this.refs.description.value
    this.setState({
      disabled: true,
      validationErrors: {},
    })
    createSkill({name, description})
      .then(skill => {
        this.context.redirectTo(`/skills/${skill.slug}`)
        // this.reset()
      })
      .catch(error => {
        if (error.type === 'Validation Error'){
          this.setState({
            disabled: false,
            validationErrors: error.payload,
          })
        }else{
          this.setState({
            disabled: false,
            validationErrors: {
              base: error.message
            }
          })
        }
      })
  }

  render() {
    const { disabled, validationErrors } = this.state
    return <form className="NewSkillForm" onSubmit={this.onSubmit} disabled={disabled}>
      <FormError value={validationErrors.base} />
      <label>
        <div>Name</div>
        <input type="text" ref="name" disabled={disabled} />
        <FormError value={validationErrors.name} />
      </label>
      <label>
        <div>Description</div>
        <textarea type="text" ref="description" disabled={disabled} />
        <FormError value={validationErrors.description} />
      </label>
      <div>
        <button type="submit" disabled={disabled}>Create</button>
      </div>
    </form>
  }
}


const FormError = (props) =>
  props.value ? <div>{props.value}</div> : null

