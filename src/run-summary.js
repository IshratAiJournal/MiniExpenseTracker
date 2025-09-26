const { readFileSync } = require('fs');
const data = JSON.parse(readFileSync('./data/expenses.json', 'utf8'));

const summary = {};

data.forEach(exp => {
    const month = exp.date.slice(0,7); // YYYY-MM
    summary[month] = (summary[month] || 0) + exp.amount;
});

console.log('Monthly Summary:', summary);
