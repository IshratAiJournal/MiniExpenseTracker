function validateExpense(expense) {
    if (!expense.amount || expense.amount <= 0) return false;
    if (!expense.category || typeof expense.category !== 'string') return false;
    if (!expense.date) return false;
    return true;
}

module.exports = { validateExpense };
