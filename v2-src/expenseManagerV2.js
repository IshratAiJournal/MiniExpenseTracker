'use strict';

const fs = require('fs');

const dataDir = './v2-data';
const dataFile = `${dataDir}/expensesV2.json`;

// Ensure data folder and file exist
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]', 'utf8');
}

// Read expenses safely
function readExpenses() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    const arr = JSON.parse(raw || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    fs.writeFileSync(dataFile, '[]', 'utf8');
    return [];
  }
}

// Write expenses safely
function writeExpenses(arr) {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2), 'utf8');
}

// Validate expense object
function validateExpenseObj(exp) {
  if (!exp || typeof exp.amount !== 'number' || !exp.date || !exp.category) return false;
  return true;
}

// Add a new expense
function addExpense({ amount, category, date, description = '' }) {
  const normalized = {
    amount: Number(amount),
    category: String(category).trim(),
    date: new Date(date).toISOString().slice(0, 10),
    description: String(description),
  };

  if (!validateExpenseObj(normalized)) {
    throw new Error(
      'Invalid expense. Use { amount: number, category: string, date: "YYYY-MM-DD", description?: string }'
    );
  }

  const expenses = readExpenses();
  const expense = {
    id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    ...normalized,
  };
  expenses.push(expense);
  writeExpenses(expenses);
  return expense;
}

// Get all expenses
function getAllExpenses() {
  return readExpenses();
}

// Monthly total per month
function getMonthlySummary() {
  const expenses = readExpenses();
  const summary = {};
  expenses.forEach(exp => {
    const month = exp.date.slice(0, 7);
    summary[month] = (summary[month] || 0) + exp.amount;
  });
  return summary;
}

// Monthly total per category
function getMonthlyCategorySummary() {
  const expenses = readExpenses();
  const out = {};

  expenses.forEach(e => {
    if (!e.amount || !e.date) return;
    const month = e.date.slice(0, 7);
    if (!out[month]) out[month] = { total: 0, categories: {} };
    out[month].total += e.amount;
    const cat = e.category || 'Uncategorized';
    out[month].categories[cat] = (out[month].categories[cat] || 0) + e.amount;
  });

  return out;
}

module.exports = {
  addExpense,
  getAllExpenses,
  getMonthlySummary,
  getMonthlyCategorySummary,
};
