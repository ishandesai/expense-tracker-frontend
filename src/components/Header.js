// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>
      <nav>
        <Link to="/" className="mr-4 hover:text-gray-300">Dashboard</Link>
        <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
        <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
