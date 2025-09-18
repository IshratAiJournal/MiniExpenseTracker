#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";

const dataFile = "data/expenses.json";

// make sure data file exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]");
}

function loadExpenses() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

function saveExpenses(expenses) {
  fs.writeFileSync(dataFile, JSON.stringify(expenses, null, 2));
}

yargs(hideBin(process.argv))
  .command(
    "add <amount> <description>",
    "Add a new expense",
    {},
    (argv) => {
      const expenses = loadExpenses();
      expenses.push({
        amount: argv.amount,
        description: argv.description,
        date: new Date().toISOString(),
      });
      saveExpenses(expenses);
      console.log("✅ Expense added!");
    }
  )
  .command("list", "List all expenses", {}, () => {
    const expenses = loadExpenses();
    console.log("📒 Expense List:");
    expenses.forEach((e, i) => {
      console.log(`${i + 1}. ${e.description} - ₹${e.amount} (${e.date})`);
    });
  })
  .parse();
