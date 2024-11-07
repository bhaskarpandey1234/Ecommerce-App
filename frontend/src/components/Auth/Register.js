// src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/component.css';
import '../../styles/global.css';
const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    register({ email, password, name });
  };

  return (
    <div className='login-container'>
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
