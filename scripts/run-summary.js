const { getMonthlySummary } = require("../src/monthlySummary");

const sample = [
  { date: "2025-09-01", amount: 50 },
  { date: "2025-09-02", amount: 30 },
  { date: "2025-08-29", amount: 20 }
];

console.log(getMonthlySummary(sample));
