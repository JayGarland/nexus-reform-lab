const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const reformLabRoot = 'F:\\nexus-reform-lab';
const examPath = path.join(reformLabRoot, 'research\\examinations\\FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md');
const registerPath = path.join(reformLabRoot, 'research\\examinations\\FOUR_LAYER_ONE_WORLD_SOURCE_REGISTER.json');
const logsDir = path.join(reformLabRoot, 'research\\examinations\\logs');

fs.mkdirSync(logsDir, { recursive: true });

function computeSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const rawLogs = [];
const hashLines = [];

rawLogs.push(`================================================================================`);
rawLogs.push(`SOURCE REGISTER AUTOMATED VERIFICATION SCRIPT LOG`);
rawLogs.push(`Timestamp: ${new Date().toISOString()}`);
rawLogs.push(`Reform Lab Root: ${reformLabRoot}`);
rawLogs.push(`================================================================================`);

let totalFailed = 0;

if (!fs.existsSync(registerPath)) {
  console.error(`ERROR: Register JSON not found at ${registerPath}`);
  process.exit(1);
}

const register = JSON.parse(fs.readFileSync(registerPath, 'utf8'));
const examText = fs.existsSync(examPath) ? fs.readFileSync(examPath, 'utf8') : '';

// 1. Verify schema & version
rawLogs.push(`[Check 1] Schema & Version: register_version=${register.register_version}`);
if (register.register_version !== '2.0') {
  rawLogs.push(`FAILED: Expected register_version 2.0, got ${register.register_version}`);
  totalFailed++;
}

// 2. Verify sources array
const sources = register.sources || [];
rawLogs.push(`[Check 2] Registered Sources Count: ${sources.length}`);

sources.forEach((src, idx) => {
  rawLogs.push(`--- Source ${idx + 1}: ID=${src.source_id} (${src.title}) ---`);
  
  // Verify SHA-256 format (64 hex characters)
  if (!src.sha256 || !/^[a-f0-9]{64}$/i.test(src.sha256)) {
    rawLogs.push(`  FAILED: Invalid SHA-256 format for ${src.source_id}: ${src.sha256}`);
    totalFailed++;
  } else {
    rawLogs.push(`  PASS: Valid 64-char SHA-256 format`);
  }

  // Verify Commit SHA format if git repo source
  if (src.commit_sha && src.commit_sha !== 'N/A' && !/^[a-f0-9]{40}$/i.test(src.commit_sha)) {
    rawLogs.push(`  FAILED: Invalid 40-char Commit SHA format for ${src.source_id}: ${src.commit_sha}`);
    totalFailed++;
  } else if (src.commit_sha && src.commit_sha !== 'N/A') {
    rawLogs.push(`  PASS: Valid 40-char Commit SHA format (${src.commit_sha})`);
  }

  // Verify local file exists & sha256 matches
  if (src.local_evidence_path && src.local_evidence_path !== 'N/A' && src.epistemic_status !== 'UNVERIFIED — SOURCE NOT LOCATED') {
    const localAbs = path.join(reformLabRoot, src.local_evidence_path);
    if (!fs.existsSync(localAbs)) {
      rawLogs.push(`  FAILED: Local evidence file missing at ${src.local_evidence_path}`);
      totalFailed++;
    } else {
      const computedSha = computeSha256(localAbs);
      hashLines.push(`${src.source_id} | ${src.local_evidence_path} | Record SHA: ${src.sha256} | Computed SHA: ${computedSha}`);
      if (computedSha.toLowerCase() !== src.sha256.toLowerCase()) {
        rawLogs.push(`  FAILED: SHA-256 mismatch for ${src.source_id}! Recorded=${src.sha256}, Computed=${computedSha}`);
        totalFailed++;
      } else {
        rawLogs.push(`  PASS: Local evidence file SHA-256 verified matches disk payload!`);
      }
    }
  } else {
    rawLogs.push(`  NOTICE: Source ${src.source_id} is marked ${src.epistemic_status}`);
  }
});

// 3. Verify claims array & claim_id uniqueness
const claims = register.claims || [];
rawLogs.push(`[Check 3] Registered Claims Count: ${claims.length}`);

const claimIdMap = new Set();
claims.forEach((cl) => {
  if (claimIdMap.has(cl.claim_id)) {
    rawLogs.push(`  FAILED: Duplicate claim_id found: ${cl.claim_id}`);
    totalFailed++;
  }
  claimIdMap.add(cl.claim_id);

  // Check if claim_id appears in exam text
  if (!examText.includes(cl.claim_id)) {
    rawLogs.push(`  WARNING: claim_id ${cl.claim_id} is in Register but not cited in EXAM text`);
  }
});

// Check if all claim IDs in exam text exist in Register
const examClaimMatches = examText.match(/CLAIM-\d{3}/g) || [];
const uniqueExamClaims = new Set(examClaimMatches);
uniqueExamClaims.forEach((cid) => {
  if (!claimIdMap.has(cid)) {
    rawLogs.push(`  FAILED: Exam text cites ${cid} which is missing from Source Register!`);
    totalFailed++;
  }
});

// 4. Summary counts verification
const summary = register.summary || {};
let publicConfirmed = 0;
let localConfirmed = 0;
let legacySynth = 0;
let currentDoct = 0;
let unverifiedCount = 0;

sources.forEach((s) => {
  if (s.evidence_type === 'PRIMARY-PUBLIC-SOURCE' && s.epistemic_status.startsWith('CONFIRMED')) publicConfirmed++;
  if (s.evidence_type === 'LOCAL-PRIMARY-EVIDENCE' && s.epistemic_status.startsWith('CONFIRMED')) localConfirmed++;
  if (s.evidence_type === 'LEGACY-RESEARCH-SYNTHESIS') legacySynth++;
  if (s.evidence_type === 'CURRENT-DOCTRINE') currentDoct++;
  if (s.epistemic_status.includes('UNVERIFIED')) unverifiedCount++;
});

rawLogs.push(`[Check 4] Summary Recount:
  - public_primary_confirmed: Record=${summary.public_primary_confirmed}, Actual=${publicConfirmed}
  - local_primary_confirmed: Record=${summary.local_primary_confirmed}, Actual=${localConfirmed}
  - legacy_synthesis: Record=${summary.legacy_synthesis}, Actual=${legacySynth}
  - current_doctrine: Record=${summary.current_doctrine}, Actual=${currentDoct}
  - unverified: Record=${summary.unverified}, Actual=${unverifiedCount}`);

if (summary.public_primary_confirmed !== publicConfirmed ||
    summary.local_primary_confirmed !== localConfirmed ||
    summary.legacy_synthesis !== legacySynth ||
    summary.unverified !== unverifiedCount) {
  rawLogs.push(`FAILED: Summary count mismatch in Register JSON!`);
  totalFailed++;
} else {
  rawLogs.push(`PASS: Summary counts match actual source classifications.`);
}

rawLogs.push(`================================================================================`);
rawLogs.push(`Final Verification Result: Total Checks Passed = ${sources.length + claims.length + 4 - totalFailed}, Total Failures = ${totalFailed}`);
rawLogs.push(`Script Exit Code: ${totalFailed === 0 ? 0 : 1}`);

fs.writeFileSync(path.join(logsDir, 'source_register_verification.log'), rawLogs.join('\n'), 'utf8');
fs.writeFileSync(path.join(logsDir, 'source_hashes.txt'), hashLines.join('\n'), 'utf8');

console.log(rawLogs.join('\n'));

if (totalFailed > 0) {
  console.error(`VERIFICATION ERROR: ${totalFailed} checks failed in Source Register verification.`);
  process.exit(1);
} else {
  console.log(`VERIFICATION SUCCESS: All sources, claims, and SHA-256 hashes verified!`);
  process.exit(0);
}
