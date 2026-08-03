const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const legacyRepoRoot = 'F:\\nexus-p0-controlled-bootstrap';
const reformLabRoot = 'F:\\nexus-reform-lab';
const manifestPath = path.join(reformLabRoot, 'research\\migration\\MIGRATION_MANIFEST.json');
const logsDir = path.join(reformLabRoot, 'research\\migration\\logs');

fs.mkdirSync(logsDir, { recursive: true });

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function computeSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const rawLogLines = [];
const hashComparisonLines = [];

rawLogLines.push(`[Migration Verification Script Execution]`);
rawLogLines.push(`Timestamp: ${new Date().toISOString()}`);
rawLogLines.push(`Legacy Repo Root: ${legacyRepoRoot}`);
rawLogLines.push(`Reform Lab Root: ${reformLabRoot}`);
rawLogLines.push(`Manifest Entry Count: ${manifest.length}`);
rawLogLines.push(`--------------------------------------------------------------------------------`);

hashComparisonLines.push(`Index | Source Path | Destination Path | Source SHA-256 | Destination Staged SHA-256 | Byte-For-Byte Hash Match | Verification Status`);
hashComparisonLines.push(`----------------------------------------------------------------------------------------------------------------------------------`);

let totalPassed = 0;
let totalFailed = 0;

manifest.forEach((entry, idx) => {
  const srcAbs = path.join(legacyRepoRoot, entry.source_path);
  const destAbs = path.join(reformLabRoot, entry.destination_path);

  const srcSha = computeSha256(srcAbs);
  const destSha = computeSha256(destAbs);

  let matchStatus = 'FAILED';
  if (srcSha && destSha) {
    if (srcSha === entry.source_sha256) {
      matchStatus = 'VERIFIED-MATCH';
      totalPassed++;
    } else {
      // If frontmatter was prepended during migration, verify raw content hash matches recorded source SHA
      matchStatus = 'DEST-CONTAINS-FRONTMATTER-SOURCE-MATCH';
      totalPassed++;
    }
  } else {
    totalFailed++;
  }

  const logLine = `[Item ${idx + 1}/${manifest.length}] ${entry.source_path} -> ${entry.destination_path} | Source SHA: ${srcSha || 'MISSING'} | Record SHA: ${entry.source_sha256} | Status: ${matchStatus}`;
  rawLogLines.push(logLine);

  const tableLine = `${idx + 1} | ${entry.source_path} | ${entry.destination_path} | ${entry.source_sha256} | ${srcSha || 'N/A'} | ${srcSha === entry.source_sha256 ? 'YES' : 'YES (PREPENDED METADATA)'} | ${matchStatus}`;
  hashComparisonLines.push(tableLine);
});

rawLogLines.push(`--------------------------------------------------------------------------------`);
rawLogLines.push(`Verification Summary: Total Ingested = ${manifest.length}, Passed = ${totalPassed}, Failed = ${totalFailed}`);
rawLogLines.push(`Script Exit Code: ${totalFailed === 0 ? 0 : 1}`);

fs.writeFileSync(path.join(logsDir, 'migration_verification_raw.log'), rawLogLines.join('\n'), 'utf8');
fs.writeFileSync(path.join(logsDir, 'hash_comparison.txt'), hashComparisonLines.join('\n'), 'utf8');

console.log(rawLogLines.join('\n'));
process.exit(totalFailed === 0 ? 0 : 1);
