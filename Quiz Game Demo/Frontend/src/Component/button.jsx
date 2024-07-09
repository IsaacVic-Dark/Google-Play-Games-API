import React from 'react';
import '../styles/button.jsx'; 

const Button = ({ label, onClick, style, disabled, loading }) => {
  return (
    <button 
      onClick={onClick} 
      style={style} 
      className="custom-button" 
      disabled={disabled}
    >
      {loading ? 'Logging in...' : label}
    </button>
  );
};

export default Button;


