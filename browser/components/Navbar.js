import React from 'react'
import Link from './Link'
import { Navbar as BootstrapNavbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const Navbar = (props) => (
  <BootstrapNavbar color="faded" light>
    <NavbarBrand href="/">Skill Tracker</NavbarBrand>
    <Nav className="pull-xs-right" navbar>
      <NavItem>
        <Link className="nav-link" href="/">Home</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" href="/skills">Skills</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" href="/about">About</Link>
      </NavItem>
    </Nav>
  </BootstrapNavbar>
)
export default Navbar
