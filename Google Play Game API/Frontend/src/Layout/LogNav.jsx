import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from "../utils/logout";

export default function LogNav() {
  const Navigate = useNavigate()
  const handleLogout = async() => {
    try {
      await logout()
      Navigate('/')
    } catch (error) {
      console.error(`Error in logging out`, error)
    }
  }
  return (
    <>
        <nav>
          <ul>
            <li><Link to='/welcome'>Home</Link></li>
            <li><Link to='/library'>Library</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <button onClick={handleLogout}>Logout</button>
          </ul>
        </nav>
    </>
  )
}
