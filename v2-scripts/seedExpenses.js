// v2-scripts/seedExpenses.js
const { addExpense } = require('../v2-src/expenseManagerV2');

const sampleExpenses = [
  { amount: 100, category: 'Food', date: '2025-09-25', description: 'Lunch' },
  { amount: 200, category: 'Shopping', date: '2025-09-27', description: 'Clothes' },
  { amount: 50, category: 'Entertainment', date: '2025-09-28', description: 'Movie' },
  { amount: 120, category: 'Food', date: '2025-08-05', description: 'Groceries' },
  { amount: 150, category: 'Groceries', date: '2025-09-29', description: 'Big shop' },
  { amount: 75, category: 'Entertainment', date: '2025-09-30', description: 'Games' },
  { amount: 180, category: 'Shopping', date: '2025-08-15', description: 'Shoes' }
];

sampleExpenses.forEach(exp => {
  const added = addExpense(exp);
  console.log('Added expense:', added);
});

console.log('\n✅ All sample expenses added successfully!');
