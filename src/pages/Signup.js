// src/pages/Signup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // Perform signup logic
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
