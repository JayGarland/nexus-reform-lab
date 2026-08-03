const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reformLabRoot = 'F:\\nexus-reform-lab';
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`STATE MODEL, LINEAGE & VERDICT CONSISTENCY AUTOMATED VERIFICATION LOG (0.3.2b)`);
rawLogs.push(`Timestamp: ${new Date().toISOString()}`);
rawLogs.push(`Laboratory Root: ${reformLabRoot}`);
rawLogs.push(`================================================================================`);

let totalFailures = 0;

function checkFileExists(relPath) {
  const abs = path.join(reformLabRoot, relPath);
  if (!fs.existsSync(abs)) {
    rawLogs.push(`FAILED: File missing: ${relPath}`);
    totalFailures++;
    return null;
  }
  return fs.readFileSync(abs, 'utf8');
}

// 1. Dynamic Parent Lineage Verification from SESSION_LOG.md
rawLogs.push(`[Check Lineage] Dynamic Git parent lineage verification from SESSION_LOG.md...`);
const sessionContent = checkFileExists('handoff/SESSION_LOG.md');

if (sessionContent) {
  const milestoneBlocks = sessionContent.split(/### Milestone /);
  milestoneBlocks.forEach((block, idx) => {
    if (idx === 0) return;
    const nameMatch = block.match(/^([^\r\n]+)/);
    const mName = nameMatch ? nameMatch[1].trim() : `Block ${idx}`;
    const basedOnMatch = block.match(/- \*\*Based-on Commit\*\*: `([a-f0-9]{7,40})`/);
    const resultingMatch = block.match(/- \*\*Resulting Commit\*\*: `([a-f0-9]{40})`/);

    if (resultingMatch && basedOnMatch) {
      const resSha = resultingMatch[1];
      const recBasedOn = basedOnMatch[1];
      let actualParent = null;

      try {
        actualParent = execSync(`git -C "${reformLabRoot}" rev-parse ${resSha}~1`, { encoding: 'utf8' }).trim();
      } catch (err) {
        actualParent = 'GIT-REV-PARSE-FAILED';
      }

      const match = (actualParent === recBasedOn || (recBasedOn.length >= 7 && actualParent.startsWith(recBasedOn)));
      rawLogs.push(`  Milestone: ${mName}`);
      rawLogs.push(`    Resulting Commit: ${resSha}`);
      rawLogs.push(`    Recorded Based-on: ${recBasedOn}`);
      rawLogs.push(`    Actual Git Parent (~1): ${actualParent}`);
      rawLogs.push(`    Parent Equality: ${match ? 'YES' : 'NO'}`);

      if (!match) {
        rawLogs.push(`  FAILED: Lineage parent mismatch for ${mName}! Recorded=${recBasedOn}, Actual=${actualParent}`);
        totalFailures++;
      } else {
        rawLogs.push(`  PASS: Dynamic parent lineage verified.`);
      }
    }
  });
}

// Check 1: Reviewed Commit Existence in Git History
rawLogs.push(`\n[Check 1] Reviewed Commit Existence in Git History...`);
const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

if (extVerdictContent) {
  const rows = extVerdictContent.split(/\r?\n/).filter(line => line.startsWith('| **'));
  rows.forEach((row) => {
    const cols = row.split('|').map(c => c.trim());
    if (cols.length >= 8) {
      const milestone = cols[1];
      const commitMatch = cols[2].match(/`([a-f0-9]{40})`/);
      const verdict = cols[3].replace(/`/g, '');
      const fullyAccepted = cols[4].replace(/`/g, '');
      const acceptedScope = cols[5];
      const rejectedScope = cols[6];
      const currentAuthority = cols[7].replace(/`/g, '');

      rawLogs.push(`--- Milestone: ${milestone} ---`);
      rawLogs.push(`  Reviewed Commit: ${commitMatch ? commitMatch[1] : 'DYNAMIC/UNRESOLVED'}`);
      rawLogs.push(`  Outside Verdict: ${verdict}`);
      rawLogs.push(`  Fully Accepted: ${fullyAccepted}`);
      rawLogs.push(`  Accepted Scope: ${acceptedScope}`);
      rawLogs.push(`  Current Authority: ${currentAuthority}`);

      if (commitMatch) {
        const cSha = commitMatch[1];
        let exists = false;
        try {
          const type = execSync(`git -C "${reformLabRoot}" cat-file -t ${cSha}`, { encoding: 'utf8' }).trim();
          exists = (type === 'commit');
        } catch (e) {
          exists = false;
        }
        rawLogs.push(`  Git Commit Existence Check (${cSha}): ${exists ? 'EXISTS' : 'NOT_FOUND'}`);
        if (!exists) {
          rawLogs.push(`  FAILED: Reviewed commit ${cSha} does not exist in git history!`);
          totalFailures++;
        }
      }

      // Check 2: Partial PASS must NOT be fully accepted
      if (verdict.includes('PARTIAL') && fullyAccepted === 'yes') {
        rawLogs.push(`  FAILED: Partial PASS milestone cannot be fully accepted!`);
        totalFailures++;
      }

      // Check 3: Rejected / Partial / Under Review cannot be current authority
      if ((verdict.includes('REJECTED') || verdict.includes('PARTIAL') || verdict.includes('UNDER REVIEW') || verdict.includes('WITHHELD')) && currentAuthority === 'yes') {
        rawLogs.push(`  FAILED: Non-confirmed milestone cannot be marked current authority!`);
        totalFailures++;
      }
    }
  });
}

// Check 4: HELLO.md Accepted Scope Alignment
rawLogs.push(`\n[Check 4] HELLO.md Accepted Scope Alignment...`);
const helloContent = checkFileExists('handoff/HELLO.md');

if (helloContent) {
  if (helloContent.includes('Last Externally Accepted Milestone: Foundation 0.3')) {
    rawLogs.push(`FAILED: HELLO.md overclaims entire Foundation 0.3 as accepted milestone!`);
    totalFailures++;
  } else if (helloContent.includes('Persistent Memory Skeleton')) {
    rawLogs.push(`PASS: HELLO.md precisely specifies accepted scope as Persistent Memory Skeleton.`);
  } else {
    rawLogs.push(`FAILED: HELLO.md accepted scope specification missing or invalid.`);
    totalFailures++;
  }
}

// Check 5: Migration Wording Precision across files
rawLogs.push(`\n[Check 5] Migration Wording Precision...`);
const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');

if (verdictContent) {
  if (!verdictContent.includes('normalized text equivalence') || !verdictContent.includes('Exact destination payload SHA equality is not claimed')) {
    rawLogs.push(`FAILED: CURRENT_VERDICT.md migration wording lacks precision!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: Migration wording precisely specifies normalized text equivalence.`);
  }
}

rawLogs.push(`================================================================================`);
rawLogs.push(`Final Verification Result: Total Failures = ${totalFailures}`);
rawLogs.push(`Script Exit Code: ${totalFailures === 0 ? 0 : 1}`);

const logPath = path.join(logsDir, 'state_consistency_verification.log');
fs.writeFileSync(logPath, rawLogs.join('\n'), 'utf8');

console.log(rawLogs.join('\n'));

if (totalFailures > 0) {
  console.error(`ERROR: ${totalFailures} state consistency checks failed!`);
  process.exit(1);
} else {
  console.log(`SUCCESS: All state consistency, lineage & verdict checks passed!`);
  process.exit(0);
}
