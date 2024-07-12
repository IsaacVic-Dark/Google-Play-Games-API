import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../utils/authContext";


export default function Welcome() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <div>
        {isLoggedIn ? (
          <h1>Welcome, {user.userName}</h1>
        ) : (
          <h1>Please log in</h1>
        )}
      </div>
      <h1>Welcome Page</h1>
    </>
  )
}
