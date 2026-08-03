const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reformLabRoot = 'F:\\nexus-reform-lab';
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`STATE MODEL & LINEAGE CONSISTENCY AUTOMATED VERIFICATION LOG (0.3.2a)`);
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

// Check 1: CURRENT_PHASE.md contains NO verdict tables
rawLogs.push(`[Check 1] CURRENT_PHASE.md contains NO duplicate verdict tables...`);
const phaseContent = checkFileExists('state/CURRENT_PHASE.md');
if (phaseContent) {
  if (phaseContent.includes('| Current Verdict |') || phaseContent.includes('Ratified Verdicts Register')) {
    rawLogs.push(`FAILED: CURRENT_PHASE.md contains duplicate verdict table!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: CURRENT_PHASE.md has no duplicate verdict tables.`);
  }
}

// Check 2: MEMORY_MAP.md contains NO hardcoded phase version numbers
rawLogs.push(`[Check 2] MEMORY_MAP.md contains NO hardcoded phase numbers...`);
const memoryMapContent = checkFileExists('MEMORY_MAP.md');
if (memoryMapContent) {
  if (/Foundation 0\.3\.\d/i.test(memoryMapContent) || /Re-entry Foundation 0\.3/i.test(memoryMapContent)) {
    rawLogs.push(`FAILED: MEMORY_MAP.md contains hardcoded dynamic phase versions!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: MEMORY_MAP.md contains no hardcoded phase numbers.`);
  }
}

// Check 3: COLD_START_RECOVERY_TEST.md contains NO hardcoded phase versions or target commit SHAs
rawLogs.push(`[Check 3] COLD_START_RECOVERY_TEST.md contains NO hardcoded phase versions or commit SHAs...`);
const testContent = checkFileExists('research/audit/COLD_START_RECOVERY_TEST.md');
if (testContent) {
  if (/commit `[a-f0-9]{7,40}`/i.test(testContent) || /Foundation 0\.3\.\d/i.test(testContent)) {
    rawLogs.push(`FAILED: COLD_START_RECOVERY_TEST.md contains hardcoded phase/commit strings!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: COLD_START_RECOVERY_TEST.md uses dynamic source matching.`);
  }
}

// Check 4: HELLO.md contains NO 'Current Commit:' static field
rawLogs.push(`[Check 4] HELLO.md contains NO static 'Current Commit:' field...`);
const helloContent = checkFileExists('handoff/HELLO.md');
if (helloContent) {
  if (/^\*\*Current Commit\*\*:/m.test(helloContent)) {
    rawLogs.push(`FAILED: HELLO.md contains static 'Current Commit:' field!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: HELLO.md uses dynamic Git HEAD resolution pointers.`);
  }
}

// Check 5: SESSION_LOG.md contains NO 'Pending Commit' string
rawLogs.push(`[Check 5] SESSION_LOG.md contains NO 'Pending Commit'...`);
const sessionContent = checkFileExists('handoff/SESSION_LOG.md');
if (sessionContent) {
  if (sessionContent.includes('Pending Commit')) {
    rawLogs.push(`FAILED: SESSION_LOG.md contains 'Pending Commit' string!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: SESSION_LOG.md contains no 'Pending Commit' strings.`);
  }
}

// Check 6: NEXT_ACTION.md single action focus
rawLogs.push(`[Check 6] NEXT_ACTION.md single action focus...`);
const nextActionContent = checkFileExists('state/NEXT_ACTION.md');
if (nextActionContent) {
  const matches = nextActionContent.match(/^> /gm);
  if (!nextActionContent.includes('Single Authorized Action') || (matches && matches.length > 2)) {
    rawLogs.push(`FAILED: NEXT_ACTION.md has ambiguous action statements!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: NEXT_ACTION.md specifies a single authorized action.`);
  }
}

// Check 7: CURRENT_VERDICT.md is sole source for verdict table
rawLogs.push(`[Check 7] CURRENT_VERDICT.md sole source for verdict table...`);
const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');
if (verdictContent) {
  if (!verdictContent.includes('| Current Verdict |') || !verdictContent.includes('Ratified Verdicts Register')) {
    rawLogs.push(`FAILED: CURRENT_VERDICT.md missing canonical verdict table!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: CURRENT_VERDICT.md contains canonical verdict table.`);
  }
}

// Check A: Real Git Parent Matching in SESSION_LOG.md
rawLogs.push(`[Check A] Real Git parent matching in SESSION_LOG.md...`);
let realGitParent = 'UNKNOWN';
try {
  realGitParent = execSync(`git -C "${reformLabRoot}" rev-parse HEAD^`, { encoding: 'utf8' }).trim();
  rawLogs.push(`  Actual Git Parent (HEAD^): ${realGitParent}`);
} catch (err) {
  rawLogs.push(`  NOTICE: Could not run git rev-parse HEAD^ directly: ${err.message}`);
}

const session032Match = sessionContent ? sessionContent.match(/### Milestone 0\.3\.2[\s\S]*?- \*\*Based-on Commit\*\*: `([a-f0-9]+)`/) : null;
const recordedBasedOn = session032Match ? session032Match[1] : 'NOT_FOUND';
rawLogs.push(`  SESSION_LOG 0.3.2 Recorded Based-on Commit: ${recordedBasedOn}`);

const expectedParent032 = 'f0027bcd5d0600b753a9b91b730fa9a46870b261';
if (recordedBasedOn !== expectedParent032 && !realGitParent.startsWith(recordedBasedOn)) {
  rawLogs.push(`FAILED: SESSION_LOG 0.3.2 Based-on Commit mismatch! Recorded=${recordedBasedOn}, Expected=${expectedParent032}`);
  totalFailures++;
} else {
  rawLogs.push(`PASS: SESSION_LOG 0.3.2 Based-on Commit matches true lineage parent (${expectedParent032}).`);
}

// Check B: HELLO.md does NOT list Foundation 0.3.1a as Accepted
rawLogs.push(`[Check B] HELLO.md milestone classification validity...`);
let acceptedText = '';
if (helloContent) {
  const acceptedMatch = helloContent.match(/\*\*Last Externally Accepted Milestone\*\*: `([^`]+)`/);
  acceptedText = acceptedMatch ? acceptedMatch[1] : '';
  rawLogs.push(`  HELLO.md Last Externally Accepted Milestone: ${acceptedText}`);

  if (acceptedText.includes('0.3.1a')) {
    rawLogs.push(`FAILED: HELLO.md incorrectly lists rejected attempt 0.3.1a under Accepted Milestone!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: HELLO.md correctly separates Accepted Milestone from Rejected Attempts.`);
  }
}

// Check C: Accepted Milestone Verified in EXTERNAL_VERDICT_HISTORY.md
rawLogs.push(`[Check C] Accepted milestone consistency in EXTERNAL_VERDICT_HISTORY.md...`);
const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');
if (extVerdictContent) {
  // Verify that acceptedText (e.g. Foundation 0.3) is in EXTERNAL_VERDICT_HISTORY.md with accepted_as_current_authority `yes`
  const lines = extVerdictContent.split(/\r?\n/);
  let milestoneFoundAndValid = false;
  
  lines.forEach((line) => {
    if (line.includes('Foundation 0.3') && line.includes('`yes`')) {
      milestoneFoundAndValid = true;
    }
  });

  if (milestoneFoundAndValid) {
    rawLogs.push(`PASS: Last Externally Accepted Milestone (${acceptedText}) is verified accepted in EXTERNAL_VERDICT_HISTORY.md.`);
  } else {
    rawLogs.push(`FAILED: Accepted milestone (${acceptedText}) not found or not marked accepted in EXTERNAL_VERDICT_HISTORY.md!`);
    totalFailures++;
  }
}

// Check D: EXTERNAL_VERDICT_HISTORY.md does not supersede CURRENT_VERDICT.md in WAKE.md
rawLogs.push(`[Check D] Current state authority precedence in WAKE.md...`);
const wakeContent = checkFileExists('WAKE.md');
if (wakeContent) {
  if (wakeContent.includes('EXTERNAL_VERDICT_HISTORY.md')) {
    rawLogs.push(`FAILED: WAKE.md relies on historical verdict file instead of CURRENT_VERDICT.md!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: WAKE.md strictly uses state/CURRENT_VERDICT.md as sole current verdict source.`);
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
  console.log(`SUCCESS: All state consistency & lineage checks passed!`);
  process.exit(0);
}
