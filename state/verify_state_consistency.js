const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reformLabRoot = 'F:\\nexus-reform-lab';
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`STATE HARDENING & VERDICT REGISTER AUTOMATED VERIFICATION LOG (0.3.2d)`);
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

// Check B: EXTERNAL_VERDICT_HISTORY.md Validation & Unresolved Leak Prevention
rawLogs.push(`\n[Check B] EXTERNAL_VERDICT_HISTORY.md Schema & Unresolved Leak Prevention...`);
const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

let unresolvedCount = 0;
let historicalUnresolvedCount = 0;

if (extVerdictContent) {
  const rows = extVerdictContent.split(/\r?\n/).filter(line => line.startsWith('| **'));

  rows.forEach((row) => {
    const cols = row.split('|').map(c => c.trim());
    if (cols.length >= 8) {
      const milestone = cols[1];
      const commitMatch = cols[2].match(/`([a-f0-9]{40})`/);
      const isResolveFromGit = cols[2].includes('RESOLVE_FROM_GIT');
      const verdict = cols[3].replace(/`/g, '');
      const fullyAccepted = cols[4].replace(/`/g, '');
      const acceptedScope = cols[5];
      const rejectedScope = cols[6];
      const currentAuthority = cols[7].replace(/`/g, '');

      const isUnderReview = (verdict === 'UNDER OUTSIDE REVIEW');

      rawLogs.push(`--- Milestone: ${milestone} ---`);
      rawLogs.push(`  Reviewed Commit: ${commitMatch ? commitMatch[1] : (isResolveFromGit ? 'RESOLVE_FROM_GIT' : 'INVALID')}`);
      rawLogs.push(`  Outside Verdict: ${verdict}`);
      rawLogs.push(`  Fully Accepted: ${fullyAccepted}`);
      rawLogs.push(`  Milestone Current Authority: ${currentAuthority}`);

      if (!commitMatch) {
        if (!isUnderReview || !isResolveFromGit) {
          rawLogs.push(`  FAILED: Historical reviewed commit missing, invalid, or improperly unresolved!`);
          historicalUnresolvedCount++;
          totalFailures++;
        } else {
          unresolvedCount++;
          rawLogs.push(`  NOTICE: Active milestone under review unresolved (permitted max 1).`);
        }
      } else {
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

      // 0.3.2c verification check
      if (milestone.includes('Foundation 0.3.2c')) {
        if (!commitMatch || commitMatch[1] !== '8ddabe908e62d748081b587f6fa55a6c87e6db91' || verdict !== 'CONFIRMED FOR REVIEWED SCOPE' || fullyAccepted !== 'yes' || currentAuthority !== 'yes') {
          rawLogs.push(`  FAILED: Foundation 0.3.2c verdict entry inaccurate!`);
          totalFailures++;
        } else {
          rawLogs.push(`  PASS: Foundation 0.3.2c accurately closed as CONFIRMED FOR REVIEWED SCOPE.`);
        }
      }
    }
  });

  rawLogs.push(`\nUnresolved Reviewed Commit Count (Active Under Review): ${unresolvedCount}`);
  rawLogs.push(`Historical Unresolved/Invalid Count: ${historicalUnresolvedCount}`);

  if (unresolvedCount > 1) {
    rawLogs.push(`FAILED: More than one unresolved current review entry in EXTERNAL_VERDICT_HISTORY.md!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: Exactly <= 1 unresolved entry under active review.`);
  }
}

// Check C: CURRENT_PHASE.md Alignment
rawLogs.push(`\n[Check C] CURRENT_PHASE.md Alignment...`);
const phaseContent = checkFileExists('state/CURRENT_PHASE.md');

if (phaseContent) {
  if (phaseContent.includes('Persistent Memory State Model Repair') || phaseContent.includes('Foundation 0.3.2 /')) {
    rawLogs.push(`FAILED: CURRENT_PHASE.md still contains stale 0.3.2 repair phase!`);
    totalFailures++;
  } else if (phaseContent.includes('Repository-wide Persistent Artifact World Audit Preparation')) {
    rawLogs.push(`PASS: CURRENT_PHASE.md aligned to World Audit Preparation.`);
  } else {
    rawLogs.push(`FAILED: CURRENT_PHASE.md focus text mismatch.`);
    totalFailures++;
  }
}

// Check D: CURRENT_VERDICT.md Alignment
rawLogs.push(`\n[Check D] CURRENT_VERDICT.md Alignment...`);
const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');

if (verdictContent) {
  const hasStateConsistencyConfirmed = verdictContent.includes('State Consistency') && verdictContent.includes('CONFIRMED');
  const hasWorldNotAudited = verdictContent.includes('Repository-wide Persistent Artifact World') && verdictContent.includes('NOT YET AUDITED');
  const hasColdStartNotTested = verdictContent.includes('Cold-Start Recoverability') && verdictContent.includes('NOT YET TESTED');
  const hasCrS0Withheld = verdictContent.includes('CR-S0 Authorization') && verdictContent.includes('WITHHELD');

  rawLogs.push(`  State Consistency Verdict Confirmed: ${hasStateConsistencyConfirmed ? 'YES' : 'NO'}`);
  rawLogs.push(`  World Audit Status Not Yet Audited: ${hasWorldNotAudited ? 'YES' : 'NO'}`);
  rawLogs.push(`  Cold-Start Status Not Yet Tested: ${hasColdStartNotTested ? 'YES' : 'NO'}`);
  rawLogs.push(`  CR-S0 Status Withheld: ${hasCrS0Withheld ? 'YES' : 'NO'}`);

  if (!hasStateConsistencyConfirmed || !hasWorldNotAudited || !hasColdStartNotTested || !hasCrS0Withheld) {
    rawLogs.push(`FAILED: CURRENT_VERDICT.md state alignment check failed!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: CURRENT_VERDICT.md state alignment confirmed.`);
  }
}

// Check E: NEXT_ACTION.md Alignment
rawLogs.push(`\n[Check E] NEXT_ACTION.md Alignment...`);
const nextActionContent = checkFileExists('state/NEXT_ACTION.md');

if (nextActionContent) {
  if (nextActionContent.includes('Submit Foundation 0.3.2d current-state closure for outside review') && !nextActionContent.includes('Execute World Audit now')) {
    rawLogs.push(`PASS: NEXT_ACTION.md specifies single authorized submission action.`);
  } else {
    rawLogs.push(`FAILED: NEXT_ACTION.md authorizes unapproved execution or modification.`);
    totalFailures++;
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
  console.log(`SUCCESS: All state hardening, lineage & verdict alignment checks passed!`);
  process.exit(0);
}
