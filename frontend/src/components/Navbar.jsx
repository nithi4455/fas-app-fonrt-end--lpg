import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">Gas Booking System</Link>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/profile" className="mr-4">Profile</Link>  
              <button onClick={logout} className="mr-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
