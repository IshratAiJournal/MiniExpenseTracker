# Feature Plan: Monthly Expense Summary

Goal
Add a feature to calculate and display a monthly expense summary.

Steps
1. Read expenses from JSON storage (data file).
2. Group expenses by month/year (YYYY-MM).
3. Sum amounts per month.
4. Output a console table or JSON.

Function signature
`function getMonthlySummary(expenses) -> Object`

Tests
- empty list -> {}
- multiple months -> grouped sums
- invalid entries -> ignored
