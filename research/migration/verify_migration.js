const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const legacyRepoRoot = 'F:\\nexus-p0-controlled-bootstrap';
const reformLabRoot = 'F:\\nexus-reform-lab';
const commitSha = 'c073099481f9faa3abddde96cd22716816010704';

const manifestPath = path.join(reformLabRoot, 'research\\migration\\MIGRATION_MANIFEST.json');
const logsDir = path.join(reformLabRoot, 'research\\migration\\logs');

fs.mkdirSync(logsDir, { recursive: true });

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function computeSha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function stripFrontmatter(contentStr) {
  if (contentStr.startsWith('---')) {
    const lines = contentStr.split(/\r?\n/);
    if (lines[0] === '---') {
      let closeIdx = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          closeIdx = i;
          break;
        }
      }
      if (closeIdx !== -1) {
        return lines.slice(closeIdx + 1).join('\n').replace(/^[\r\n]+/, '');
      }
    }
  }
  return contentStr;
}

function normalizeLineEndings(str) {
  return str.replace(/\r\n/g, '\n');
}

const rawLogLines = [];
const tableHeader = `Index | Source Path | Commit Blob SHA | Manifest SHA | Destination Path | Dest Full SHA | Dest Payload SHA | Source==Manifest | DestPayload==Source | Verdict`;
const hashComparisonLines = [
  `==================================================================================================================================================`,
  `REPRODUCIBLE MIGRATION VERIFICATION AUDIT LOG`,
  `Source Repository Commit: ${commitSha}`,
  `Legacy Repo Path: ${legacyRepoRoot}`,
  `Reform Lab Path: ${reformLabRoot}`,
  `Execution Time: ${new Date().toISOString()}`,
  `==================================================================================================================================================`,
  ``,
  tableHeader,
  `--------------------------------------------------------------------------------------------------------------------------------------------------`
];

let totalPassed = 0;
let totalFailed = 0;

const updatedManifest = [];

manifest.forEach((entry, idx) => {
  const indexStr = (idx + 1).toString().padStart(2, '0');
  let commitSourceBuffer = null;
  let commitSourceSha = 'UNRESOLVED-BLOB';

  try {
    // Read source file directly from target git commit blob
    commitSourceBuffer = execSync(`git -C "${legacyRepoRoot}" show ${commitSha}:${entry.source_path}`, { maxBuffer: 50 * 1024 * 1024 });
    commitSourceSha = computeSha256(commitSourceBuffer);
  } catch (err) {
    commitSourceSha = 'GIT-SHOW-FAILED';
  }

  const destAbs = path.join(reformLabRoot, entry.destination_path);
  let destFullSha = 'MISSING-FILE';
  let destPayloadSha = 'MISSING-FILE';
  let destPayloadStr = '';

  if (fs.existsSync(destAbs)) {
    const destBuffer = fs.readFileSync(destAbs);
    destFullSha = computeSha256(destBuffer);

    const destContentStr = destBuffer.toString('utf8');
    destPayloadStr = stripFrontmatter(destContentStr);
    destPayloadSha = computeSha256(Buffer.from(destPayloadStr, 'utf8'));
  }

  const sourceEqualsManifest = (commitSourceSha === entry.source_sha256);
  
  // Verification against commit source: test raw payload sha OR normalized string payload match
  let destPayloadEqualsSource = false;
  if (commitSourceBuffer && destPayloadSha !== 'MISSING-FILE') {
    const sourceStr = commitSourceBuffer.toString('utf8');
    const normalizedSource = normalizeLineEndings(sourceStr).trim();
    const normalizedDestPayload = normalizeLineEndings(destPayloadStr).trim();

    destPayloadEqualsSource = (destPayloadSha === commitSourceSha) || (normalizedSource === normalizedDestPayload);
  }

  let verdict = 'FAILED';
  if (sourceEqualsManifest && destPayloadEqualsSource) {
    if (destFullSha === commitSourceSha) {
      verdict = 'VERIFIED-EXACT-BYTE-MATCH';
    } else {
      verdict = 'VERIFIED-PAYLOAD-MATCH';
    }
    totalPassed++;
  } else {
    verdict = 'FAILED';
    totalFailed++;
  }

  const logItem = `[Item ${indexStr}/${manifest.length}]
  Source Path: ${entry.source_path}
  Commit Blob SHA: ${commitSourceSha}
  Manifest Record SHA: ${entry.source_sha256}
  Destination Path: ${entry.destination_path}
  Destination Full SHA: ${destFullSha}
  Destination Payload SHA: ${destPayloadSha}
  Source == Manifest: ${sourceEqualsManifest}
  Dest Payload == Source: ${destPayloadEqualsSource}
  Verdict: ${verdict}`;

  rawLogLines.push(logItem);
  rawLogLines.push(`--------------------------------------------------------------------------------`);

  const tableRow = `${indexStr} | ${entry.source_path} | ${commitSourceSha.substring(0, 12)}... | ${entry.source_sha256.substring(0, 12)}... | ${entry.destination_path} | ${destFullSha.substring(0, 12)}... | ${destPayloadSha.substring(0, 12)}... | ${sourceEqualsManifest ? 'YES' : 'NO'} | ${destPayloadEqualsSource ? 'YES' : 'NO'} | ${verdict}`;
  hashComparisonLines.push(tableRow);

  updatedManifest.push({
    source_repository: entry.source_repository || 'JayGarland/nexus',
    source_commit: commitSha,
    source_path: entry.source_path,
    source_sha256: entry.source_sha256,
    commit_blob_sha: commitSourceSha,
    destination_path: entry.destination_path,
    destination_full_sha: destFullSha,
    destination_payload_sha: destPayloadSha,
    migration_mode: entry.migration_mode || 'VERBATIM',
    semantic_verification: verdict.startsWith('VERIFIED') ? 'CONFIRMED' : 'FAILED',
    epistemic_status: entry.epistemic_status
  });
});

const summaryLine = `Verification Summary: Total Files = ${manifest.length}, Passed = ${totalPassed}, Failed = ${totalFailed}, Exit Code = ${totalFailed === 0 ? 0 : 1}`;
rawLogLines.push(summaryLine);
hashComparisonLines.push(`----------------------------------------------------------------------------------------------------------------------------------`);
hashComparisonLines.push(summaryLine);

fs.writeFileSync(path.join(logsDir, 'migration_verification_raw.log'), rawLogLines.join('\n'), 'utf8');
fs.writeFileSync(path.join(logsDir, 'hash_comparison.txt'), hashComparisonLines.join('\n'), 'utf8');
fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2), 'utf8');

console.log(summaryLine);
if (totalFailed > 0) {
  console.error(`ERROR: ${totalFailed} files failed migration verification!`);
  process.exit(1);
} else {
  console.log(`SUCCESS: All 31 files verified against commit ${commitSha}!`);
  process.exit(0);
}
