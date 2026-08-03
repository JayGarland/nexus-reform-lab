const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Dynamic repository root resolution (no hardcoded absolute paths)
const reformLabRoot = path.resolve(__dirname, '..');
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`VERDICT VERIFIER REGRESSION & STATE CONSISTENCY LOG (0.3.2e)`);
rawLogs.push(`Timestamp: ${new Date().toISOString()}`);
rawLogs.push(`Resolved Laboratory Root: ${reformLabRoot}`);
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

function getVerdictRow(content, subject) {
  const lines = content.split(/\r?\n/);
  const row = lines.find(line =>
    line.startsWith('|') &&
    line.includes(`**${subject}**`)
  );

  if (!row) return null;

  const columns = row.split('|').map(value => value.trim());
  return {
    subject: columns[1].replace(/\*\*/g, ''),
    verdict: columns[2].replace(/`/g, ''),
    evidence: columns[3],
    note: columns[4]
  };
}

// 1. Check CURRENT_VERDICT.md exact row parsing
rawLogs.push(`[Check 1] CURRENT_VERDICT.md Exact Table Row Verification...`);
const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');

if (verdictContent) {
  // State Consistency
  const scRow = getVerdictRow(verdictContent, 'State Consistency');
  rawLogs.push(`  Parsed Row [State Consistency]: ${scRow ? scRow.verdict : 'NOT_FOUND'}`);
  if (!scRow || !scRow.verdict.startsWith('PARTIAL — state sources are aligned, but verifier completeness is under repair.')) {
    rawLogs.push(`  FAILED: State Consistency row verdict mismatch! Got="${scRow ? scRow.verdict : 'NULL'}"`);
    totalFailures++;
  } else {
    rawLogs.push(`  PASS: State Consistency row verdict verified.`);
  }

  // Repository-wide Persistent Artifact World
  const worldRow = getVerdictRow(verdictContent, 'Repository-wide Persistent Artifact World');
  rawLogs.push(`  Parsed Row [Repository-wide Persistent Artifact World]: ${worldRow ? worldRow.verdict : 'NOT_FOUND'}`);
  if (!worldRow || worldRow.verdict !== 'NOT YET AUDITED') {
    rawLogs.push(`  FAILED: Persistent Artifact World row verdict mismatch! Got="${worldRow ? worldRow.verdict : 'NULL'}"`);
    totalFailures++;
  } else {
    rawLogs.push(`  PASS: Persistent Artifact World row verdict verified.`);
  }

  // Cold-Start Recoverability
  const coldRow = getVerdictRow(verdictContent, 'Cold-Start Recoverability');
  rawLogs.push(`  Parsed Row [Cold-Start Recoverability]: ${coldRow ? coldRow.verdict : 'NOT_FOUND'}`);
  if (!coldRow || coldRow.verdict !== 'NOT YET TESTED') {
    rawLogs.push(`  FAILED: Cold-Start Recoverability row verdict mismatch! Got="${coldRow ? coldRow.verdict : 'NULL'}"`);
    totalFailures++;
  } else {
    rawLogs.push(`  PASS: Cold-Start Recoverability row verdict verified.`);
  }

  // CR-S0 Authorization
  const crs0Row = getVerdictRow(verdictContent, 'CR-S0 Authorization');
  rawLogs.push(`  Parsed Row [CR-S0 Authorization]: ${crs0Row ? crs0Row.verdict : 'NOT_FOUND'}`);
  if (!crs0Row || crs0Row.verdict !== 'WITHHELD') {
    rawLogs.push(`  FAILED: CR-S0 Authorization row verdict mismatch! Got="${crs0Row ? crs0Row.verdict : 'NULL'}"`);
    totalFailures++;
  } else {
    rawLogs.push(`  PASS: CR-S0 Authorization row verdict verified.`);
  }
}

// 2. Strict 40-Character SHA & Dynamic Parent Lineage Verification from SESSION_LOG.md
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

// 3. Table Header & Column Count Verification for EXTERNAL_VERDICT_HISTORY.md
rawLogs.push(`\n[Check 3] EXTERNAL_VERDICT_HISTORY.md Table Header & Column Count Integrity...`);
const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

let verifiedHistoryEntriesCount = 0;
let activeUnresolvedMilestone = 'NONE';
let unresolvedCount = 0;

if (extVerdictContent) {
  const lines = extVerdictContent.split(/\r?\n/);
  const headerLine = lines.find(l => l.includes('Milestone') && l.includes('Reviewed Commit'));

  if (!headerLine) {
    rawLogs.push(`  FAILED: Table header missing in EXTERNAL_VERDICT_HISTORY.md!`);
    totalFailures++;
  } else {
    const requiredCols = [
      'Milestone', 'Reviewed Commit', 'Outside Verdict', 'Milestone Fully Accepted',
      'Accepted Scope', 'Rejected / Unconfirmed Scope', 'Milestone Accepted as Current Authority',
      'Review Date', 'Notes'
    ];
    const headerCols = headerLine.split('|').map(c => c.trim()).filter(Boolean);
    const hasAllHeaders = requiredCols.every(c => headerCols.includes(c));

    if (!hasAllHeaders || headerCols.length !== 9) {
      rawLogs.push(`  FAILED: Header column mismatch in EXTERNAL_VERDICT_HISTORY.md!`);
      totalFailures++;
    } else {
      rawLogs.push(`  PASS: Table header structure and 9-column layout verified.`);
    }
  }

  const rows = lines.filter(line => line.startsWith('| **'));
  const seenMilestones = new Set();

  rows.forEach((row) => {
    const cols = row.split('|').map(c => c.trim());
    if (cols.length !== 11) { // 11 elements split by | including leading and trailing empty elements
      rawLogs.push(`  FAILED: Data row column count mismatch! Expected 9 internal columns.`);
      totalFailures++;
      return;
    }

    verifiedHistoryEntriesCount++;
    const milestone = cols[1].replace(/\*\*/g, '');
    if (seenMilestones.has(milestone)) {
      rawLogs.push(`  FAILED: Duplicate milestone entry detected: ${milestone}`);
      totalFailures++;
    }
    seenMilestones.add(milestone);

    const commitMatch = cols[2].match(/`([a-f0-9]{40})`/);
    const isResolveFromGit = cols[2].includes('RESOLVE_FROM_GIT');
    const verdict = cols[3].replace(/`/g, '');
    const fullyAccepted = cols[4].replace(/`/g, '');
    const acceptedScope = cols[5];
    const rejectedScope = cols[6];
    const currentAuthority = cols[7].replace(/`/g, '');

    rawLogs.push(`--- Milestone Schema Check: ${milestone} ---`);
    rawLogs.push(`  Reviewed Commit: ${commitMatch ? commitMatch[1] : (isResolveFromGit ? 'RESOLVE_FROM_GIT' : 'INVALID')}`);
    rawLogs.push(`  Outside Verdict: ${verdict}`);
    rawLogs.push(`  Fully Accepted: ${fullyAccepted}`);
    rawLogs.push(`  Accepted Scope: ${acceptedScope}`);
    rawLogs.push(`  Rejected Scope: ${rejectedScope}`);
    rawLogs.push(`  Current Authority: ${currentAuthority}`);

    // Commit Existence & Leak Check
    if (!commitMatch) {
      if (verdict !== 'UNDER OUTSIDE REVIEW' || !isResolveFromGit) {
        rawLogs.push(`  FAILED: Historical reviewed commit missing, invalid, or improperly unresolved!`);
        totalFailures++;
      } else {
        unresolvedCount++;
        activeUnresolvedMilestone = milestone;
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
      if (!exists) {
        rawLogs.push(`  FAILED: Reviewed commit ${cSha} does not exist in git history!`);
        totalFailures++;
      }
    }

    // Schema Validation Rules
    if (verdict === 'PARTIAL PASS') {
      if (fullyAccepted !== 'no' || currentAuthority !== 'no' || acceptedScope === 'None' || rejectedScope === 'None') {
        rawLogs.push(`  FAILED: PARTIAL PASS schema rules violated for ${milestone}!`);
        totalFailures++;
      }
    } else if (verdict === 'REJECTED') {
      if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || rejectedScope === 'None') {
        rawLogs.push(`  FAILED: REJECTED schema rules violated for ${milestone}!`);
        totalFailures++;
      }
    } else if (verdict === 'UNDER OUTSIDE REVIEW') {
      if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || !isResolveFromGit) {
        rawLogs.push(`  FAILED: UNDER OUTSIDE REVIEW schema rules violated for ${milestone}!`);
        totalFailures++;
      }
    } else if (verdict === 'CONFIRMED') {
      if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None') {
        rawLogs.push(`  FAILED: CONFIRMED schema rules violated for ${milestone}!`);
        totalFailures++;
      }
    } else if (verdict === 'CONFIRMED FOR REVIEWED SCOPE') {
      rawLogs.push(`  NOTE: Fully accepted refers only to the bounded milestone repair, not to the unreviewed repository-wide World or cold-start capability.`);
      if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
        rawLogs.push(`  FAILED: CONFIRMED FOR REVIEWED SCOPE schema rules violated for ${milestone}!`);
        totalFailures++;
      }
    }

    // Foundation 0.3.2a Specific Check
    if (milestone.includes('Foundation 0.3.2a')) {
      if (verdict !== 'REJECTED' || fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no') {
        rawLogs.push(`  FAILED: Foundation 0.3.2a specific verdict check failed!`);
        totalFailures++;
      } else {
        rawLogs.push(`  PASS: Foundation 0.3.2a specific verdict check passed.`);
      }
    }

    // Doctrine Repair 0.2.1 Specific Check
    if (milestone.includes('Doctrine Repair 0.2.1')) {
      const requiredScopes = ['Four-Layer One-World Doctrine', 'LLM Wiki Doctrine', 'Software 3.0 Doctrine', 'Controlled AutoResearch Doctrine'];
      const hasAllScopes = requiredScopes.every(sc => acceptedScope.includes(sc));
      if (verdict !== 'PARTIAL PASS' || fullyAccepted !== 'no' || currentAuthority !== 'no' || !hasAllScopes) {
        rawLogs.push(`  FAILED: Doctrine Repair 0.2.1 specific verdict check failed!`);
        totalFailures++;
      } else {
        rawLogs.push(`  PASS: Doctrine Repair 0.2.1 specific verdict check passed (4 scopes confirmed).`);
      }
    }
  });

  // Active Under Review Entry Rule
  if (unresolvedCount !== 1 || !activeUnresolvedMilestone.includes('Foundation 0.3.2e')) {
    rawLogs.push(`  FAILED: Active UNDER OUTSIDE REVIEW entry count mismatch! Got unresolvedCount=${unresolvedCount}, activeMilestone=${activeUnresolvedMilestone}`);
    totalFailures++;
  } else {
    rawLogs.push(`  PASS: Active UNDER OUTSIDE REVIEW entry correctly isolated to Foundation 0.3.2e.`);
  }
}

// 4. Check CURRENT_PHASE.md Alignment
rawLogs.push(`\n[Check 4] CURRENT_PHASE.md Alignment...`);
const phaseContent = checkFileExists('state/CURRENT_PHASE.md');

if (phaseContent) {
  if (phaseContent.includes('Verdict Verifier Regression Repair / Foundation 0.3.2e') && phaseContent.includes('FOUNDATION 0.3.2d PARTIAL PASS')) {
    rawLogs.push(`  PASS: CURRENT_PHASE.md correctly set to Foundation 0.3.2e.`);
  } else {
    rawLogs.push(`  FAILED: CURRENT_PHASE.md content mismatch!`);
    totalFailures++;
  }
}

// 5. Check NEXT_ACTION.md Blockquote Parsing
rawLogs.push(`\n[Check 5] NEXT_ACTION.md Blockquote Parsing & Strict Text Verification...`);
const nextActionContent = checkFileExists('state/NEXT_ACTION.md');

if (nextActionContent) {
  const actionSection = nextActionContent.split(/## Single Authorized Action/)[1];
  if (!actionSection) {
    rawLogs.push(`  FAILED: Missing ## Single Authorized Action header in NEXT_ACTION.md!`);
    totalFailures++;
  } else {
    const blockquoteMatch = actionSection.match(/^>\s*([^\r\n]+)/m);
    const parsedActionText = blockquoteMatch ? blockquoteMatch[1].trim() : '';

    rawLogs.push(`  Parsed Blockquote Action Text: "${parsedActionText}"`);

    const expectedText = 'Submit Foundation 0.3.2e verdict-verifier regression repair for outside review. Do not run the repository-wide World Audit, cold-start test, or CR-S0 yet.';
    const forbiddenPhrases = ['execute the World audit now', 'modify World files', 'run cold-start', 'start CR-S0', 'launch agents'];

    const hasForbidden = forbiddenPhrases.some(p => parsedActionText.toLowerCase().includes(p.toLowerCase()));

    if (parsedActionText !== expectedText || hasForbidden) {
      rawLogs.push(`  FAILED: NEXT_ACTION.md blockquote text mismatch or forbidden phrases detected!`);
      totalFailures++;
    } else {
      rawLogs.push(`  PASS: NEXT_ACTION.md single authorized action text strictly verified.`);
    }
  }
}

rawLogs.push(`================================================================================`);
rawLogs.push(`Verification Summary:`);
rawLogs.push(`  Parsed Repository Root: ${reformLabRoot}`);
rawLogs.push(`  Verified History Entries Count: ${verifiedHistoryEntriesCount}`);
rawLogs.push(`  Active UNDER OUTSIDE REVIEW Milestone: ${activeUnresolvedMilestone}`);
rawLogs.push(`  Foundation 0.3.2d Verdict: PARTIAL PASS`);
rawLogs.push(`  Total Failures: ${totalFailures}`);
rawLogs.push(`  Script Exit Code: ${totalFailures === 0 ? 0 : 1}`);
rawLogs.push(`================================================================================`);

const logPath = path.join(logsDir, 'state_consistency_verification.log');
fs.writeFileSync(logPath, rawLogs.join('\n'), 'utf8');

console.log(rawLogs.join('\n'));

if (totalFailures > 0) {
  console.error(`ERROR: ${totalFailures} state consistency checks failed!`);
  process.exit(1);
} else {
  console.log(`SUCCESS: All verdict verifier regression & state consistency checks passed!`);
  process.exit(0);
}
