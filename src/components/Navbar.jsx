import React from 'react'
import { NavLink } from 'react-router'
const Navbar = () => {
  return (
    <nav>
      <div>
        <p>Cyrpto-Tracker</p>
      </div>
      <ul>
        <NavLink to="/" ></NavLink>
      </ul>
    </nav>
  )
}

export default Navbar
