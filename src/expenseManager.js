const fs = require('fs');
const path = require('path');

function getDataFilePath(customPath) {
  if (customPath) return customPath;
  return path.join(__dirname, '..', 'data', 'expenses.json');
}

function readExpenses(customPath) {
  const fp = getDataFilePath(customPath);
  try {
    if (!fs.existsSync(fp)) return [];
    const raw = fs.readFileSync(fp, 'utf8');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeExpenses(expenses, customPath) {
  const fp = getDataFilePath(customPath);
  fs.writeFileSync(fp, JSON.stringify(expenses, null, 2), 'utf8');
}

function addExpense({ date, category, amount, description, vendor }, customPath) {
  const expenses = readExpenses(customPath);
  const expense = {
    id: Date.now(),
    date: date || new Date().toISOString(),
    category: category || 'Uncategorized',
    amount: Number(amount) || 0,
    description: description || '',
    vendor: vendor || ''
  };
  expenses.push(expense);
  writeExpenses(expenses, customPath);
  return expense;
}

function listExpenses(customPath) {
  return readExpenses(customPath);
}

function topCategories(limit = 5, customPath) {
  const expenses = readExpenses(customPath);
  const map = {};
  expenses.forEach(e => {
    map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
  });
  const arr = Object.keys(map).map(k => ({ category: k, total: map[k] }));
  arr.sort((a, b) => b.total - a.total);
  return arr.slice(0, limit);
}

function topVendors(limit = 5, customPath) {
  const expenses = readExpenses(customPath);
  const map = {};
  expenses.forEach(e => {
    const v = e.vendor || 'Unknown';
    map[v] = (map[v] || 0) + Number(e.amount || 0);
  });
  const arr = Object.keys(map).map(k => ({ vendor: k, total: map[k] }));
  arr.sort((a, b) => b.total - a.total);
  return arr.slice(0, limit);
}

module.exports = { addExpense, listExpenses, topCategories, topVendors, readExpenses, writeExpenses };
