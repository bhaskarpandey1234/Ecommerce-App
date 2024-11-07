// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/component.css';
import '../styles/global.css';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className='navbar'>
      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {user ? (
          <>
            <li><Link to="/orders">Orders</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
