import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../utils/authContext";
import LogNav from '../Layout/LogNav';


export default function Welcome() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <LogNav/>
      
    </>
  )
}
