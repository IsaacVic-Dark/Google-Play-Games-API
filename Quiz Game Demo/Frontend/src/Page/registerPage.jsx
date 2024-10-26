import React, { useState } from 'react';
import { register } from '../utils/register.js';
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      navigate('/quiz')
      alert('Register successful!');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); 
    }
  };

  const isRegisterDisabled = name === '' || email === '' || password.length < 6 || loading;

  return (
    <div className="wrapper">
      <div className="row">
        <label htmlFor="email">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="row">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <div className="errorMessage">{error}</div>
      )}

      <div className="button">
        <button onClick={handleLogin} disabled={isRegisterDisabled}>
          {loading ? 'Register in process...' : 'Register'}
        </button>
      </div>
      <div className='login'>
        <p>Do you have an account ? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
}

export default RegisterForm;
