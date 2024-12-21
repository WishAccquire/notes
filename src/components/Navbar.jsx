import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex flex-row gap-4 w-[500px] m-auto justify-between'>
      <NavLink to="/">
          Home
      </NavLink>
      <NavLink to="/pastes">
        Pastes
        </NavLink>
    </div>
  )
}

export default Navbar
