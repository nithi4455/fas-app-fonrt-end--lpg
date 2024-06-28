import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      navigate('/login');
    } catch (error) {
      alert('Registration failed : ' + error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
