// src/components/ExpenseList.js
import React, { useState } from 'react';

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  const [editing, setEditing] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const startEditing = (expense) => {
    setEditing(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
  };

  const handleEdit = (id) => {
    editExpense({ id, description, amount: parseFloat(amount), category, date });
    setEditing(null);
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Expenses</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses to show.</p>
      ) : (
        <>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="border-b border-gray-200 py-2">
                {editing === expense.id ? (
                  <div>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleEdit(expense.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>{expense.description}</span>
                    <span>${expense.amount.toFixed(2)}</span>
                    <span>{expense.category}</span>
                    <span>{expense.date}</span>
                    <button
                      onClick={() => startEditing(expense)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h4 className="text-lg font-bold">Total Expense: ${totalExpense.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
