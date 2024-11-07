// // src/context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../services/api';

// export const AuthContext = createContext();

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check for a saved token and set the user
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.defaults.headers['Authorization'] = `Bearer ${token}`;
//       // You could also fetch user data from the backend if needed here
//       setUser({}); // Set user data based on token or user endpoint
//     }
//   }, []);

//   // Login function to authenticate the user
//   const login = async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       setUser(response.data.user);
//       localStorage.setItem('token', response.data.token);
//       api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   // Register function to create a new user
//   const register = async (userData) => {
//     try {
//       await api.post('/auth/signup', userData);
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   // Logout function to clear the user and token
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     delete api.defaults.headers['Authorization'];
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for a saved token and load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data based on the saved token
      api.get('/auth/user')
        .then(response => {
          setUser(response.data.user);
          localStorage.setItem('userId', response.data.user._id); // Store userId in local storage
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
        });
    }
  }, []);

  // Login function to authenticate the user
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id); // Store userId in local storage
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Register function to create a new user
  const register = async (userData) => {
    try {
      await api.post('/auth/signup', userData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Logout function to clear the user and token
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId from local storage
    delete api.defaults.headers['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
