import React, { Component } from 'react'
import Router from '../Router'
import state from '../state'

export default class App extends Component {
  constructor(props){
    super(props)
    this.rerender = this.rerender.bind(this)
    state.subscribe(this.rerender)
  }

  componentWillUnmount(){
    state.unsubscribe(this.rerender)
  }

  rerender(){
    this.forceUpdate()
  }

  render(){
    console.log('STATE', JSON.parse(JSON.stringify(state.getState())))
    return <Router state={state.getState()} />
  }
}

// DEBUGGING
window.DEBUG = window.DEBUG || {}
window.DEBUG.state = state
window.DEBUG.React = React
