// Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import axios from 'axios';

function Logout() {
  const { logout: logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
      logoutUser(); // Update the authentication state
      navigate('/');
      alert('Logged out successfully!');
    } catch (error) {
      alert('Failed to log out');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
