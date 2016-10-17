import React from 'react'
import Link from './Link'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

export default (props) => (
  <Navbar color="faded" light>
    <NavbarBrand href="/">Skill Tracker</NavbarBrand>
    <Nav className="pull-xs-right" navbar>
      <NavItem>
        <Link className="nav-link" href="/">Home</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" href="/about">About</Link>
      </NavItem>
    </Nav>
  </Navbar>
)
