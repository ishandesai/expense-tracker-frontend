// src/pages/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilter from '../components/ExpenseFilter';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState('category'); // 'category' or 'monthly'
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data);
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
    setFilteredExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setFilteredExpenses(filteredExpenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense));
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const handleFilter = ({ filterType, month, startDate, endDate, category }) => {
    let filtered = expenses;
    if (filterType === 'month' && month) {
      filtered = filtered.filter((expense) => new Date(expense.date).getMonth() + 1 === parseInt(month.split('-')[1]));
    }
    if (filterType === 'duration' && startDate && endDate) {
      filtered = filtered.filter((expense) => new Date(expense.date) >= new Date(startDate) && new Date(expense.date) <= new Date(endDate));
    }
    if (filterType === 'category' && category) {
      filtered = filtered.filter((expense) => expense.category.toLowerCase().includes(category.toLowerCase()));
    }
    setFilteredExpenses(filtered);
  };

  const categories = filteredExpenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const months = filteredExpenses.reduce((acc, expense) => {
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

  const handleLogout = () => {
    logout();
  };

  // Ensure user object is not null before accessing properties
  const username = user ? user.username : 'Guest';

  return (
    <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="flex justify-between mb-4">
        <span className="text-lg">Welcome, {username}</span>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseFilter onFilter={handleFilter} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          <>
            {filteredExpenses.length === 0 ? (
              <p>No expenses found.</p>
            ) : (
              <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} editExpense={editExpense} />
            )}
          </>
        )}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Expense Charts</h3>
          <div className="flex justify-between mb-4">
            <button onClick={() => setChartView('category')} className={`px-4 py-2 rounded ${chartView === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Category
            </button>
            <button onClick={() => setChartView('monthly')} className={`px-4 py-2 rounded ${chartView === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Monthly
            </button>
          </div>
          <div className="chart-container">
            {chartView === 'category' ? (
              <Pie data={categoryChartData} />
            ) : (
              <Bar data={monthlyChartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
