import React from 'react'
import {Link} from 'react-router-dom'

export default function LogNav() {
  return (
    <>
        <nav>
          <ul>
            <li><Link to='/logout'>Logout</Link></li>
          </ul>
        </nav>
    </>
  )
}
