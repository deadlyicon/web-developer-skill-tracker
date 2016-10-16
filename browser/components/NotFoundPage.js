import React from 'react'
import Navbar from './Navbar'

export default (props) =>
  <div>
    <Navbar />
    <h1>NotFound {props.location.params.path}</h1>
  </div>
