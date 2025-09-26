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
    const backupPath = ${filePath}.backup.;
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
}

module.exports = { safeWriteJSON, backupFile };
