const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../v2-data/expensesV2.json');

function loadExpenses() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function saveExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

function addExpense(expense) {
  const expenses = loadExpenses();
  expense.id = Date.now();
  expenses.push(expense);
  saveExpenses(expenses);
  return expense;
}

function listExpenses() {
  return loadExpenses();
}

function editExpense(id, updatedFields) {
  const expenses = loadExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return null;
  expenses[index] = { ...expenses[index], ...updatedFields };
  saveExpenses(expenses);
  return expenses[index];
}

function deleteExpense(id) {
  const expenses = loadExpenses();
  const newExpenses = expenses.filter(e => e.id !== id);
  saveExpenses(newExpenses);
  return newExpenses.length !== expenses.length;
}

function findExpenseById(id) {
  const expenses = loadExpenses();
  return expenses.find(e => e.id === id) || null;
}

module.exports = {
  addExpense,
  listExpenses,
  editExpense,
  deleteExpense,
  findExpenseById,
  DATA_FILE
};
