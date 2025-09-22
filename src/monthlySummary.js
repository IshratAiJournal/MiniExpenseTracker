function getMonthlySummary(expenses) {
  if (!Array.isArray(expenses)) {
    throw new Error("Expenses must be an array");
  }

  const summary = {};

  for (const exp of expenses) {
    if (!exp.date || isNaN(Date.parse(exp.date)) || typeof exp.amount !== "number") {
      continue; // skip invalid entries
    }
    const d = new Date(exp.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    summary[key] = (summary[key] || 0) + exp.amount;
  }

  return summary;
}

module.exports = { getMonthlySummary };
