import React, { useState } from 'react';
import { login } from '../utils/login.js';
import { useNavigate, Link } from 'react-router-dom'
import '../styles/login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/welcome')
      alert('Login successful!');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false); 
    }
  };

  const isLoginDisabled = email === '' || password.length < 6 || loading;

  return (
    <div className="wrapper">
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
        <button onClick={handleLogin} disabled={isLoginDisabled}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <div className='signUp'>
        <p>Don't have an account ? <Link to="/register">SignUp</Link> </p>
      </div>
    </div>
  );
}

export default LoginForm;
