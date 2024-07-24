// src/components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold">${expense.amount}</h2>
      <p>{expense.category}</p>
      <p>{expense.date}</p>
      <p>{expense.description}</p>
    </div>
  );
};

export default ExpenseItem;
