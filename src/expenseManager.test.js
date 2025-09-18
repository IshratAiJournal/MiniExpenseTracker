const fs = require('fs');
const path = require('path');
const { addExpense, listExpenses, topCategories } = require('../src/expenseManager');

const TEST_FILE = path.join(__dirname, 'test-expenses.json');

beforeEach(() => {
  fs.writeFileSync(TEST_FILE, '[]', 'utf8');
});
afterEach(() => {
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
});

test('adds an expense', () => {
  const e = addExpense({ category: 'Food', amount: 100, description: 'Pizza' }, TEST_FILE);
  const list = listExpenses(TEST_FILE);
  expect(list.length).toBe(1);
  expect(list[0].category).toBe('Food');
  expect(list[0].amount).toBe(100);
});

test('top categories works', () => {
  addExpense({ category: 'Food', amount: 100 }, TEST_FILE);
  addExpense({ category: 'Bills', amount: 200 }, TEST_FILE);
  addExpense({ category: 'Food', amount: 50 }, TEST_FILE);
  const tops = topCategories(2, TEST_FILE);
  expect(tops[0].category).toBe('Bills');
  expect(tops[0].total).toBe(200);
  expect(tops[1].category).toBe('Food');
  expect(tops[1].total).toBe(150);
});
