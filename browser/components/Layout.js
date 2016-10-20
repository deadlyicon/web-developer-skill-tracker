import React from 'react'
import { Container } from 'reactstrap'
import TopNavbar from './TopNavbar'

const Layout = (props) => (
  <div>
    <TopNavbar currentUser={props.currentUser} />
    <Container fluid>
      {props.children}
    </Container>
  </div>
)

export default Layout
