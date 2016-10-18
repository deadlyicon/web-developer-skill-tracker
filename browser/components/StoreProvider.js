import React, { Component } from 'react'

export default class StoreProvider extends Component {

  static propTypes = {
    as: React.PropTypes.string.isRequired,
    store: React.PropTypes.shape({
      subscribe: React.PropTypes.func.isRequired,
      unsubscribe: React.PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props){
    super(props)
    this.rerender = this.rerender.bind(this)
    this.props.store.subscribe(this.rerender)
    this.state = { }
  }

  getChildProps() {
    const { store, as } = this.props
    return {
      [as]: store.value
    }
  }

  componentWillUnmount(){
    this.props.store.unsubscribe(this.rerender)
  }

  rerender(){
    this.forceUpdate()
  }

  render(){
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.getChildProps())
  }
}
