import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav.css'

export default function Nav() {
  return (
    <>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav>
    </>
  )
}
