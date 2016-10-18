import React from 'react'
import { Container } from 'reactstrap'
import Navbar from './Navbar'

const Layout = (props) => (
  <div>
    <Navbar />
    <Container fluid>
      {props.children}
    </Container>
  </div>
)

export default Layout
