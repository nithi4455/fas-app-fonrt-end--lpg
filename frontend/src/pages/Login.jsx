import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate('/profile'); // Navigate after login
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
