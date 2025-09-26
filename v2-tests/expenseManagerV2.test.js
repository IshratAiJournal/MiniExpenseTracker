const { addExpense, getMonthlySummary } = require('../v2-src/expenseManagerV2');

test('Add expense and check monthly summary', () => {
  addExpense({ amount: 50, category: 'Food', date: '2025-09-25' });
  const summary = getMonthlySummary();
  expect(summary['2025-09']).toBeGreaterThanOrEqual(50);
});
