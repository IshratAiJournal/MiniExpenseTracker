# === Setup Mini Expense Tracker Project ===

$root = Get-Location

# Create folders
$folders = @("src","tests","data","scripts")
foreach ($f in $folders) {
    if (-not (Test-Path $f)) { mkdir $f }
}

# Create starter files
$files = @{
    "src/index.js" = "// Entry point of Mini Expense Tracker\nconsole.log('Welcome to Mini Expense Tracker');"
    "src/fileUtils.js" = @"
const fs = require('fs');
const path = require('path');

function safeWriteJSON(filePath, data) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const tmp = filePath + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, filePath);
}

function backupFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    const now = new Date().toISOString().replace(/[:.]/g,'-');
    const backupPath = `${filePath}.backup.${now}`;
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
}

module.exports = { safeWriteJSON, backupFile };
"@
    "src/validation.js" = @"
function validateExpense(expense) {
    if (!expense.amount || expense.amount <= 0) return false;
    if (!expense.category || typeof expense.category !== 'string') return false;
    if (!expense.date) return false;
    return true;
}

module.exports = { validateExpense };
"@
    "src/run-summary.js" = @"
const { readFileSync } = require('fs');
const data = JSON.parse(readFileSync('./data/expenses.json', 'utf8'));

const summary = {};

data.forEach(exp => {
    const month = exp.date.slice(0,7); // YYYY-MM
    summary[month] = (summary[month] || 0) + exp.amount;
});

console.log('Monthly Summary:', summary);
"@
    "tests/fileUtils.test.js" = "// TODO: Add tests for fileUtils.js"
    "tests/validation.test.js" = "// TODO: Add tests for validation.js"
    "tests/monthlySummary.test.js" = "// TODO: Add tests for run-summary.js"
    "scripts/backup.js" = @"
const { backupFile } = require('../src/fileUtils');
const backupPath = backupFile('./data/expenses.json');
console.log('Backup created at:', backupPath);
"@
    "data/expenses.json" = "[]"
    "README.md" = "# Mini Expense Tracker\nTrack your expenses, generate monthly summaries, and visualize spending patterns."
    ".gitignore" = "node_modules/\ndata/*.backup.*"
}

foreach ($file in $files.Keys) {
    if (-not (Test-Path $file)) {
        $files[$file] | Out-File -FilePath $file -Encoding utf8
    }
}

# Initialize npm if package.json does not exist
if (-not (Test-Path "package.json")) {
    npm init -y
}

# Add devDependencies for testing (Jest)
npm install --save-dev jest @types/jest ts-jest typescript

Write-Host "✅ Mini Expense Tracker setup complete! Folders and files are ready."
