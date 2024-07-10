import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../utils/authContext";
import { logout } from "../utils/logout";

export default function Welcome() {
  const { isLoggedIn, user } = useAuth();
  const handleLogout = async() => {
    try {
      await logout()
      Navigate('/')
    } catch (error) {
      console.error(`Error in logging out`, error)
    }
  }
  const Navigate = useNavigate()
  return (
    <>
      <div>
        {isLoggedIn ? (
          <h1>Welcome, {user.userName}</h1>
        ) : (
          <h1>Please log in</h1>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>Welcome Page</h1>
    </>
  )
}
