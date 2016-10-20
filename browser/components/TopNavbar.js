import './TopNavbar.sass'
import React from 'react'
import Link from './Link'
import { logout } from '../actions'

const TopNavbar = (props) => {
  const { currentUser } = props
  const skillsLink = <Link key="Skills" href="/skills">Skills</Link>
  const aboutLink = <Link key="About" href="/about">About</Link>
  let rightLinks
  if (currentUser) {
    rightLinks = [
      <img key="avatar" className="TopNavbar-avatar" src={currentUser.avatar_url} />,
      <div key="name">{currentUser.name}</div>,
      <Link key="NewSkill" href="/skills/new">New Skill</Link>,
      skillsLink,
      aboutLink,
      <LogoutLink key="logout" currentUser={currentUser} />,
    ]
  }else{
    rightLinks = [
      skillsLink,
      aboutLink,
      <a key="login" href="/login_via_github">Login</a>,
    ]
  }
  return <div className="TopNavbar flex-columns">
    <Link href="/">Skill Tracker</Link>
    <div className="flex-grow" />
    {rightLinks}
  </div>
}
export default TopNavbar

const LogoutLink = (props) => {
  const logout = (event) => {
    event.preventDefault()
    logout()
  }
  return <Link onClick={logout}>Logout</Link>
}
