// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState('category'); // 'category' or 'monthly'

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (updatedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)));
  };

  const categories = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const months = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    if (acc[month]) {
      acc[month] += expense.amount;
    } else {
      acc[month] = expense.amount;
    }
    return acc;
  }, {});

  const totalMonthlyExpense = Object.values(months).reduce((total, amount) => total + amount, 0);

  const categoryChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categories),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      }
    ]
  };

  const monthlyChartData = {
    labels: Object.keys(months),
    datasets: [
      {
        label: 'Expenses by Month',
        data: Object.values(months),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseForm addExpense={addExpense} />
        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} />
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Expense Chart</h3>
        <div className="mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${chartView === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setChartView('category')}
          >
            By Category
          </button>
          <button
            className={`px-4 py-2 rounded ${chartView === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setChartView('monthly')}
          >
            By Month
          </button>
        </div>
        {chartView === 'category' ? (
          <div style={{ height: '400px', width: '100%' }}>
            <Pie data={categoryChartData} />
          </div>
        ) : (
          <div style={{ height: '400px', width: '100%' }}>
            <Bar data={monthlyChartData} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-bold">Total Monthly Expense: ${totalMonthlyExpense.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Dashboard;
