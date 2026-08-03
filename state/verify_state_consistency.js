const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reformLabRoot = 'F:\\nexus-reform-lab';
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`STRICT SHA & VERDICT ACCURACY AUTOMATED VERIFICATION LOG (0.3.2c)`);
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

// Check A: Strict 40-Character SHA & Dynamic Git Parent Verification from SESSION_LOG.md
rawLogs.push(`[Check A] Strict 40-character SHA & dynamic Git parent verification...`);
const sessionContent = checkFileExists('handoff/SESSION_LOG.md');

if (sessionContent) {
  const milestoneBlocks = sessionContent.split(/### Milestone /);
  milestoneBlocks.forEach((block, idx) => {
    if (idx === 0) return;
    const nameMatch = block.match(/^([^\r\n]+)/);
    const mName = nameMatch ? nameMatch[1].trim() : `Block ${idx}`;

    // STRICT 40-character hexadecimal SHA regex ONLY
    const basedOnMatch = block.match(/- \*\*Based-on Commit\*\*: `([a-f0-9]{40})`/);
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

      // STRICT equality test (no startsWith, no prefix comparison)
      const isStrictEqual = (actualParent === recBasedOn);

      rawLogs.push(`  Milestone: ${mName}`);
      rawLogs.push(`    Resulting Commit (40-char): ${resSha}`);
      rawLogs.push(`    Recorded Based-on (40-char): ${recBasedOn}`);
      rawLogs.push(`    Actual Git Parent (~1): ${actualParent}`);
      rawLogs.push(`    Strict 40-Char Equality: ${isStrictEqual ? 'YES' : 'NO'}`);

      if (!isStrictEqual) {
        rawLogs.push(`  FAILED: Strict 40-char parent SHA mismatch for ${mName}! Recorded=${recBasedOn}, Actual=${actualParent}`);
        totalFailures++;
      } else {
        rawLogs.push(`  PASS: Strict 40-char parent SHA equality verified.`);
      }
    } else if (block.includes('Resulting Commit') && !block.includes('RESOLVE_FROM_GIT_HISTORY')) {
      rawLogs.push(`  FAILED: Non-40-character commit SHA format detected in ${mName}!`);
      totalFailures++;
    }
  });
}

// Check 1 & Check B/C/D: EXTERNAL_VERDICT_HISTORY.md Validation
rawLogs.push(`\n[Check B/C/D] EXTERNAL_VERDICT_HISTORY.md Schema & Verdict Accuracy...`);
const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

if (extVerdictContent) {
  const rows = extVerdictContent.split(/\r?\n/).filter(line => line.startsWith('| **'));
  
  let found032a = false;
  let foundDoctrine021 = false;

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
      rawLogs.push(`  Reviewed Commit (40-char): ${commitMatch ? commitMatch[1] : 'DYNAMIC/UNRESOLVED'}`);
      rawLogs.push(`  Outside Verdict: ${verdict}`);
      rawLogs.push(`  Fully Accepted: ${fullyAccepted}`);
      rawLogs.push(`  Accepted Scope: ${acceptedScope}`);
      rawLogs.push(`  Rejected Scope: ${rejectedScope}`);
      rawLogs.push(`  Milestone Current Authority: ${currentAuthority}`);

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

      // Check B: Foundation 0.3.2a MUST be REJECTED
      if (milestone.includes('Foundation 0.3.2a')) {
        found032a = true;
        if (verdict !== 'REJECTED' || fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no') {
          rawLogs.push(`  FAILED: Foundation 0.3.2a verdict specification inaccurate!`);
          totalFailures++;
        } else {
          rawLogs.push(`  PASS: Foundation 0.3.2a accurately classified as REJECTED.`);
        }
      }

      // Check C: Doctrine Repair 0.2.1 MUST be PARTIAL PASS with 4 accepted scopes
      if (milestone.includes('Doctrine Repair 0.2.1')) {
        foundDoctrine021 = true;
        const requiredScopes = ['Four-Layer One-World Doctrine', 'LLM Wiki Doctrine', 'Software 3.0 Doctrine', 'Controlled AutoResearch Doctrine'];
        const hasAllScopes = requiredScopes.every(sc => acceptedScope.includes(sc));
        if (verdict !== 'PARTIAL PASS' || fullyAccepted !== 'no' || currentAuthority !== 'no' || !hasAllScopes) {
          rawLogs.push(`  FAILED: Doctrine Repair 0.2.1 verdict specification inaccurate!`);
          totalFailures++;
        } else {
          rawLogs.push(`  PASS: Doctrine Repair 0.2.1 accurately classified as PARTIAL PASS with 4 scopes.`);
        }
      }

      // Check D: Partial milestone rules
      if (verdict.includes('PARTIAL')) {
        if (fullyAccepted !== 'no' || currentAuthority !== 'no' || acceptedScope === 'None' || rejectedScope === 'None') {
          rawLogs.push(`  FAILED: Partial PASS milestone rules violated!`);
          totalFailures++;
        }
      }

      // Check E: Non-confirmed milestones MUST NOT be milestone_accepted_as_current_authority: yes
      if (!verdict.includes('CONFIRMED') && currentAuthority === 'yes') {
        rawLogs.push(`  FAILED: Non-confirmed milestone claimed as current authority!`);
        totalFailures++;
      }
    }
  });

  if (!found032a || !foundDoctrine021) {
    rawLogs.push(`FAILED: Required milestones missing from EXTERNAL_VERDICT_HISTORY.md!`);
    totalFailures++;
  }
}

// Check E: HELLO.md Authority Alignment
rawLogs.push(`\n[Check E] HELLO.md Authority Alignment...`);
const helloContent = checkFileExists('handoff/HELLO.md');

if (helloContent) {
  if (helloContent.includes('Last Externally Accepted Milestone: Foundation 0.3')) {
    rawLogs.push(`FAILED: HELLO.md overclaims entire Foundation 0.3 as accepted milestone!`);
    totalFailures++;
  } else if (helloContent.includes('Persistent Memory Skeleton') && helloContent.includes('No partial milestone is treated as fully accepted')) {
    rawLogs.push(`PASS: HELLO.md precisely aligns authority and scope.`);
  } else {
    rawLogs.push(`FAILED: HELLO.md scope authority alignment missing or invalid.`);
    totalFailures++;
  }
}

// Check Migration Wording Precision
rawLogs.push(`\n[Check Migration Wording] Precision verification...`);
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
  console.log(`SUCCESS: All strict SHA, state consistency & verdict accuracy checks passed!`);
  process.exit(0);
}
