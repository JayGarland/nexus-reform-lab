const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const allowedVerdicts = new Set([
  'PARTIAL PASS',
  'REJECTED',
  'UNDER OUTSIDE REVIEW',
  'CONFIRMED',
  'CONFIRMED FOR REVIEWED SCOPE'
]);

function getVerdictRows(content, subject) {
  const lines = content.split(/\r?\n/);
  const rows = [];

  lines.forEach((line) => {
    if (line.startsWith('|')) {
      const columns = line.split('|').map(v => v.trim());
      if (columns.length >= 4) {
        const cleanSubj = columns[1].replace(/\*\*/g, '').trim();
        if (cleanSubj === subject) {
          rows.push({
            subject: cleanSubj,
            verdict: columns[2].replace(/`/g, '').trim(),
            evidence: columns[3],
            note: columns[4] || ''
          });
        }
      }
    }
  });

  return rows;
}

function verifyRepository(targetRoot, options = {}) {
  const rawLogs = [];
  let totalFailures = 0;
  const gitRoot = options.gitRoot || targetRoot;

  function fail(msg) {
    rawLogs.push(`FAILED: ${msg}`);
    totalFailures++;
  }

  function checkFileExists(relPath) {
    const abs = path.join(targetRoot, relPath);
    if (!fs.existsSync(abs)) {
      fail(`File missing: ${relPath}`);
      return null;
    }
    return fs.readFileSync(abs, 'utf8');
  }

  rawLogs.push(`================================================================================`);
  rawLogs.push(`FAIL-CLOSED VERIFIER & STATE CONSISTENCY ENGINE LOG`);
  rawLogs.push(`Timestamp: ${new Date().toISOString()}`);
  rawLogs.push(`Target Repository Root: ${targetRoot}`);
  rawLogs.push(`Git Resolution Root: ${gitRoot}`);
  rawLogs.push(`================================================================================`);

  // Check 1: CURRENT_VERDICT.md Exact Subject Uniqueness & Verdict Parsing
  rawLogs.push(`[Check 1] CURRENT_VERDICT.md Exact Subject Uniqueness & Verdict Parsing...`);
  const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');

  if (verdictContent) {
    const subjects = [
      { name: 'State Consistency', prefix: 'PARTIAL — state sources align and major verifier rules exist, but fail-closed behavior is awaiting negative-fixture proof.' },
      { name: 'Repository-wide Persistent Artifact World', exact: 'NOT YET AUDITED' },
      { name: 'Cold-Start Recoverability', exact: 'NOT YET TESTED' },
      { name: 'CR-S0 Authorization', exact: 'WITHHELD' }
    ];

    subjects.forEach((subj) => {
      const rows = getVerdictRows(verdictContent, subj.name);
      rawLogs.push(`  Subject [${subj.name}]: Matching Rows Count = ${rows.length}`);

      if (rows.length === 0) {
        fail(`Subject missing from CURRENT_VERDICT.md: ${subj.name}`);
      } else if (rows.length > 1) {
        fail(`Duplicate subject row detected in CURRENT_VERDICT.md for: ${subj.name}`);
      } else {
        const row = rows[0];
        if (subj.exact && row.verdict !== subj.exact) {
          fail(`Subject [${subj.name}] verdict mismatch! Expected="${subj.exact}", Got="${row.verdict}"`);
        } else if (subj.prefix && !row.verdict.startsWith(subj.prefix)) {
          fail(`Subject [${subj.name}] verdict prefix mismatch! ExpectedPrefix="${subj.prefix}", Got="${row.verdict}"`);
        } else {
          rawLogs.push(`  PASS: Subject [${subj.name}] verified (${row.verdict}).`);
        }
      }
    });
  }

  // Check 2: Dynamic Git Parent Lineage Verification from SESSION_LOG.md
  rawLogs.push(`\n[Check 2] Dynamic Git parent lineage verification from SESSION_LOG.md...`);
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
          actualParent = execSync(`git -C "${gitRoot}" rev-parse ${resSha}~1`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
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
          fail(`Strict 40-char parent SHA mismatch for ${mName}! Recorded=${recBasedOn}, Actual=${actualParent}`);
        } else {
          rawLogs.push(`  PASS: Strict 40-char parent SHA equality verified.`);
        }
      } else if (block.includes('Resulting Commit') && !block.includes('RESOLVE_FROM_GIT_HISTORY')) {
        fail(`Non-40-character commit SHA format detected in ${mName}!`);
      }
    });
  }

  // Check 3: EXTERNAL_VERDICT_HISTORY.md Validation & Header/Column Integrity
  rawLogs.push(`\n[Check 3] EXTERNAL_VERDICT_HISTORY.md Table Header & Schema Integrity...`);
  const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

  let verifiedHistoryEntriesCount = 0;
  let activeUnresolvedMilestone = 'NONE';
  let unresolvedCount = 0;

  if (extVerdictContent) {
    const lines = extVerdictContent.split(/\r?\n/);
    const headerLine = lines.find(l => l.includes('Milestone') && l.includes('Reviewed Commit'));

    if (!headerLine) {
      fail(`Table header missing in EXTERNAL_VERDICT_HISTORY.md!`);
    } else {
      const requiredCols = [
        'Milestone', 'Reviewed Commit', 'Outside Verdict', 'Milestone Fully Accepted',
        'Accepted Scope', 'Rejected / Unconfirmed Scope', 'Milestone Accepted as Current Authority',
        'Review Date', 'Notes'
      ];
      const headerCols = headerLine.split('|').map(c => c.trim()).filter(Boolean);
      const hasAllHeaders = requiredCols.every(c => headerCols.includes(c));

      if (!hasAllHeaders || headerCols.length !== 9) {
        fail(`Header column mismatch in EXTERNAL_VERDICT_HISTORY.md!`);
      } else {
        rawLogs.push(`  PASS: Table header structure and 9-column layout verified.`);
      }
    }

    const rows = lines.filter(line => line.startsWith('| **'));
    const seenMilestonesNormalized = new Set();

    rows.forEach((row) => {
      const cols = row.split('|').map(c => c.trim());
      if (cols.length !== 11) {
        fail(`Data row column count mismatch! Expected 9 internal columns.`);
        return;
      }

      verifiedHistoryEntriesCount++;
      const rawMilestone = cols[1].replace(/\*\*/g, '').trim();
      const normMilestone = rawMilestone.toLowerCase();

      if (seenMilestonesNormalized.has(normMilestone)) {
        fail(`Duplicate milestone entry detected (case-insensitive normalized): "${rawMilestone}"`);
      }
      seenMilestonesNormalized.add(normMilestone);

      const commitMatch = cols[2].match(/`([a-f0-9]{40})`/);
      const isResolveFromGit = cols[2].includes('RESOLVE_FROM_GIT');
      const verdict = cols[3].replace(/`/g, '').trim();
      const fullyAccepted = cols[4].replace(/`/g, '').trim();
      const acceptedScope = cols[5].trim();
      const rejectedScope = cols[6].trim();
      const currentAuthority = cols[7].replace(/`/g, '').trim();

      rawLogs.push(`--- Milestone Schema Check: ${rawMilestone} ---`);
      rawLogs.push(`  Reviewed Commit: ${commitMatch ? commitMatch[1] : (isResolveFromGit ? 'RESOLVE_FROM_GIT' : 'INVALID')}`);
      rawLogs.push(`  Outside Verdict: ${verdict}`);

      // Fail-Closed Whitelist Check
      if (!allowedVerdicts.has(verdict)) {
        fail(`Unknown outside verdict detected: "${verdict}" for milestone "${rawMilestone}"!`);
        return;
      }

      // Commit Existence & Leak Check
      if (!commitMatch) {
        if (verdict !== 'UNDER OUTSIDE REVIEW' || !isResolveFromGit) {
          fail(`Historical reviewed commit missing, invalid, or improperly unresolved for milestone "${rawMilestone}"!`);
        } else {
          unresolvedCount++;
          activeUnresolvedMilestone = rawMilestone;
        }
      } else {
        const cSha = commitMatch[1];
        let exists = false;
        try {
          const type = execSync(`git -C "${gitRoot}" cat-file -t ${cSha}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
          exists = (type === 'commit');
        } catch (e) {
          exists = false;
        }
        if (!exists) {
          fail(`Reviewed commit ${cSha} does not exist in git history!`);
        }
      }

      // Schema Validation Rules
      if (verdict === 'PARTIAL PASS') {
        if (fullyAccepted !== 'no' || currentAuthority !== 'no' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`PARTIAL PASS schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'REJECTED') {
        if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || rejectedScope === 'None') {
          fail(`REJECTED schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'UNDER OUTSIDE REVIEW') {
        if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || !isResolveFromGit) {
          fail(`UNDER OUTSIDE REVIEW schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED') {
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None') {
          fail(`CONFIRMED schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR REVIEWED SCOPE') {
        rawLogs.push(`  NOTE: Fully accepted refers only to the bounded milestone repair, not to the unreviewed repository-wide World or cold-start capability.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR REVIEWED SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      }

      // Foundation 0.3.2a Specific Check
      if (rawMilestone.includes('Foundation 0.3.2a')) {
        if (verdict !== 'REJECTED' || fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no') {
          fail(`Foundation 0.3.2a specific verdict check failed!`);
        } else {
          rawLogs.push(`  PASS: Foundation 0.3.2a specific verdict check passed.`);
        }
      }

      // Doctrine Repair 0.2.1 Specific Check
      if (rawMilestone.includes('Doctrine Repair 0.2.1')) {
        const requiredScopes = ['Four-Layer One-World Doctrine', 'LLM Wiki Doctrine', 'Software 3.0 Doctrine', 'Controlled AutoResearch Doctrine'];
        const hasAllScopes = requiredScopes.every(sc => acceptedScope.includes(sc));
        if (verdict !== 'PARTIAL PASS' || fullyAccepted !== 'no' || currentAuthority !== 'no' || !hasAllScopes) {
          fail(`Doctrine Repair 0.2.1 specific verdict check failed!`);
        } else {
          rawLogs.push(`  PASS: Doctrine Repair 0.2.1 specific verdict check passed (4 scopes confirmed).`);
        }
      }
    });

    // Active Under Review Entry Rule: Must be EXACTLY 1 and match Foundation 0.3.2f
    if (unresolvedCount !== 1 || !activeUnresolvedMilestone.includes('Foundation 0.3.2f')) {
      fail(`Active UNDER OUTSIDE REVIEW entry count/name mismatch! Got unresolvedCount=${unresolvedCount}, activeMilestone=${activeUnresolvedMilestone}`);
    } else {
      rawLogs.push(`  PASS: Active UNDER OUTSIDE REVIEW entry correctly isolated to Foundation 0.3.2f.`);
    }
  }

  // Check 4: CURRENT_PHASE.md Alignment
  rawLogs.push(`\n[Check 4] CURRENT_PHASE.md Alignment...`);
  const phaseContent = checkFileExists('state/CURRENT_PHASE.md');

  if (phaseContent) {
    if (phaseContent.includes('Fail-Closed Verifier & Negative-Fixture Proof / Foundation 0.3.2f') && phaseContent.includes('FOUNDATION 0.3.2e PARTIAL PASS')) {
      rawLogs.push(`  PASS: CURRENT_PHASE.md correctly set to Foundation 0.3.2f.`);
    } else {
      fail(`CURRENT_PHASE.md content mismatch!`);
    }
  }

  // Check 5: NEXT_ACTION.md Blockquote Parsing & Strict Text Verification
  rawLogs.push(`\n[Check 5] NEXT_ACTION.md Blockquote Parsing & Strict Text Verification...`);
  const nextActionContent = checkFileExists('state/NEXT_ACTION.md');

  if (nextActionContent) {
    const actionSection = nextActionContent.split(/## Single Authorized Action/)[1];
    if (!actionSection) {
      fail(`Missing ## Single Authorized Action header in NEXT_ACTION.md!`);
    } else {
      const blockquoteLines = actionSection.split(/\r?\n/).filter(line => line.trim().startsWith('>'));
      
      if (blockquoteLines.length !== 1) {
        fail(`Multiple or missing blockquote action statements in NEXT_ACTION.md (count=${blockquoteLines.length})!`);
      } else {
        const parsedActionText = blockquoteLines[0].replace(/^>\s*/, '').trim();
        rawLogs.push(`  Parsed Blockquote Action Text: "${parsedActionText}"`);

        const expectedText = 'Submit Foundation 0.3.2f fail-closed verifier and negative-fixture proof for outside review. Do not run the repository-wide World audit, cold-start test, or CR-S0 yet.';
        const forbiddenPhrases = ['execute the World audit now', 'modify World files', 'run cold-start', 'start CR-S0', 'launch agents'];

        const hasForbidden = forbiddenPhrases.some(p => parsedActionText.toLowerCase().includes(p.toLowerCase()));

        if (parsedActionText !== expectedText || hasForbidden) {
          fail(`NEXT_ACTION.md blockquote text mismatch or forbidden phrases detected!`);
        } else {
          rawLogs.push(`  PASS: NEXT_ACTION.md single authorized action text strictly verified.`);
        }
      }
    }
  }

  rawLogs.push(`================================================================================`);
  rawLogs.push(`Verification Summary:`);
  rawLogs.push(`  Target Repository Root: ${targetRoot}`);
  rawLogs.push(`  Git Resolution Root: ${gitRoot}`);
  rawLogs.push(`  Verified History Entries Count: ${verifiedHistoryEntriesCount}`);
  rawLogs.push(`  Active UNDER OUTSIDE REVIEW Milestone: ${activeUnresolvedMilestone}`);
  rawLogs.push(`  Total Failures: ${totalFailures}`);
  rawLogs.push(`  Script Exit Code: ${totalFailures === 0 ? 0 : 1}`);
  rawLogs.push(`================================================================================`);

  return {
    success: totalFailures === 0,
    failuresCount: totalFailures,
    activeMilestone: activeUnresolvedMilestone,
    verifiedEntriesCount: verifiedHistoryEntriesCount,
    logs: rawLogs
  };
}

// CLI Execution Block
if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const result = verifyRepository(root);
  const logPath = path.join(root, 'state', 'logs', 'state_consistency_verification.log');
  fs.writeFileSync(logPath, result.logs.join('\n'), 'utf8');

  console.log(result.logs.join('\n'));

  if (!result.success) {
    console.error(`ERROR: ${result.failuresCount} state consistency checks failed!`);
    process.exit(1);
  } else {
    console.log(`SUCCESS: All fail-closed verifier & state consistency checks passed!`);
    process.exit(0);
  }
}

module.exports = { verifyRepository, getVerdictRows, allowedVerdicts };
