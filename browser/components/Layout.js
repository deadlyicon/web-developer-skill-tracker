import React from 'react'
import { Container } from 'reactstrap'
import Navbar from './Navbar'

export default (props) => (
  <div>
    <Navbar />
    <Container fluid>
      {props.children}
    </Container>
  </div>
)
