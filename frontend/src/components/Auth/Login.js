// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/component.css';
import '../../styles/global.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className='login-container'>
    <form  onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form></div>
  );
};

export default Login;
