// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <nav>
        <Link to="/" className="mr-4 hover:text-gray-300">Dashboard</Link>
        {user ? (
          <div className="relative inline-block text-left">
            <button className="flex items-center">
              <span className="mr-2">{user.username}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg">
              <button onClick={() => navigate('/update-details')} className="block px-4 py-2 hover:bg-gray-200">Update Details</button>
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
