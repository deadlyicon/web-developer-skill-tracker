import React from 'react'
import Layout from './Layout'

export default (props) =>
  <Layout currentUser={props.currentUser}>
    <h1>NotFound {props.location.params.path}</h1>
  </Layout>
