import React, { Component } from 'react'
import Router from '../Router'
import { subscribe, unsubscribe, getState } from '../state'
import { loadCurrentUser } from '../actions'

export default class App extends Component {
  constructor(props){
    super(props)
    this.rerender = this.rerender.bind(this)
    subscribe(this.rerender)
    loadCurrentUser()
  }

  componentWillUnmount(){
    unsubscribe(this.rerender)
  }

  rerender(){
    requestAnimationFrame(() => this.forceUpdate())
  }

  render(){
    const props = getState()
    return <Router {...props} />
  }
}

// DEBUGGING
window.DEBUG = window.DEBUG || {}
window.DEBUG.getState = getState
window.DEBUG.React = React
