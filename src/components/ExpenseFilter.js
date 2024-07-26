// src/components/ExpenseFilter.js
import React, { useState } from 'react';

const ExpenseFilter = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('month');
  const [month, setMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const handleFilter = () => {
    onFilter({ filterType, month, startDate, endDate, category });
  };

  const handleClearFilter = () => {
    setMonth('');
    setStartDate('');
    setEndDate('');
    setCategory('');
    onFilter({ filterType: '', month: '', startDate: '', endDate: '', category: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-bold mb-4">Filter Expenses</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Filter Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="month">Month</option>
          <option value="duration">Duration</option>
          <option value="category">Category</option>
        </select>
      </div>

      {filterType === 'month' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      {filterType === 'duration' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </>
      )}

      {filterType === 'category' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Apply Filter
      </button>
      <button onClick={handleClearFilter} className="bg-gray-500 text-white px-4 py-2 rounded">
        Clear Filter
      </button>
    </div>
  );
};

export default ExpenseFilter;
