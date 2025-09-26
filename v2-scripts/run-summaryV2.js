// v2-scripts/run-summaryV2.js
'use strict';

const fs = require('fs');
const path = require('path');
const { getMonthlyCategorySummary } = require('../v2-src/expenseManagerV2');

// read arguments from terminal (like "2025-09" or "export")
const args = process.argv.slice(2);
const filterMonth = args[0] && args[0] !== 'export' ? args[0] : null;
const doExport = args.includes('export');

// get the summary
const summary = getMonthlyCategorySummary();

if (!summary || Object.keys(summary).length === 0) {
  console.log('{}  (no expenses yet)');
} else {
  const months = Object.keys(summary).sort();
  for (const month of months) {
    if (filterMonth && month !== filterMonth) continue;

    const s = summary[month];
    console.log(`\n📅 ${month} — total: ${s.total}`);
    const cats = Object.entries(s.categories).sort((a, b) => b[1] - a[1]);
    for (const [cat, amt] of cats) {
      console.log(`   • ${cat}: ${amt}`);
    }
  }
}

// optional: export summary to JSON file
if (doExport) {
  const outFile = path.join(process.cwd(), 'v2-data', 'summary.json');
  fs.writeFileSync(outFile, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`\n✅ Exported summary to ${outFile}`);
}
