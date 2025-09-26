const { backupFile } = require('../src/fileUtils');
const backupPath = backupFile('./data/expenses.json');
console.log('Backup created at:', backupPath);
