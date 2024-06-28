import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
export const AuthContext = createContext(); // Named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          setIsAuthenticated(false);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
