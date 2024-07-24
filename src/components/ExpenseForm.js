// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(storedCategories);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(), // Generate a unique ID
      description,
      amount: parseFloat(amount),
      category,
      date
    };
    addExpense(newExpense);
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  const addCategory = (e) => {
    if (e.key === 'Enter' && category.trim() !== '') {
      setCategories([...categories, category]);
      localStorage.setItem('categories', JSON.stringify([...categories, category]));
      setCategory('');
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={addCategory}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <datalist id="category-list">
            {categories.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
