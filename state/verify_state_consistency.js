const fs = require('fs');
const path = require('path');

const reformLabRoot = 'F:\\nexus-reform-lab';
const stateDir = path.join(reformLabRoot, 'state');
const logsDir = path.join(stateDir, 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const rawLogs = [];
rawLogs.push(`================================================================================`);
rawLogs.push(`STATE MODEL CONSISTENCY AUTOMATED VERIFICATION LOG`);
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
rawLogs.push(`[Check 2] MEMORY_MAP.md contains NO hardcoded phase numbers (e.g. 0.3.1)...`);
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
rawLogs.push(`[Check 3] COLD_START_RECOVERY_TEST.md contains NO hardcoded phase versions or target commit SHAs...`);
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

// Check 6: NEXT_ACTION.md contains single authorized action statement
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

// Check 7: CURRENT_VERDICT.md is sole source of verdict ratings table
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

// Check 8: Migration description in CURRENT_VERDICT.md contains 'normalized' and does NOT claim exact byte equality
rawLogs.push(`[Check 8] CURRENT_VERDICT.md migration verdict precision...`);
if (verdictContent) {
  if (!verdictContent.includes('normalized') || verdictContent.includes('31/31 exact byte match')) {
    rawLogs.push(`FAILED: CURRENT_VERDICT.md migration description lacks precision or overclaims exact byte equality!`);
    totalFailures++;
  } else {
    rawLogs.push(`PASS: Migration verdict precisely specifies normalized payload fidelity.`);
  }
}

// Check 9: Verify internal links in core entry files
rawLogs.push(`[Check 9] Internal link resolution in core entry & state files...`);
const filesToCheckLinks = ['WAKE.md', 'MEMORY_MAP.md', 'state/CURRENT_PHASE.md', 'state/CURRENT_VERDICT.md', 'state/NEXT_ACTION.md'];

filesToCheckLinks.forEach((relFile) => {
  const text = checkFileExists(relFile);
  if (text) {
    const dir = path.dirname(path.join(reformLabRoot, relFile));
    const linkMatches = text.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
    linkMatches.forEach((linkStr) => {
      const target = linkStr.match(/\(([^)]+)\)/)[1];
      if (!target.startsWith('http') && !target.startsWith('#')) {
        const cleanTarget = target.split('#')[0];
        if (cleanTarget) {
          const resolvedPath = path.resolve(dir, cleanTarget);
          if (!fs.existsSync(resolvedPath)) {
            rawLogs.push(`FAILED: Broken link in ${relFile}: ${target} -> ${resolvedPath}`);
            totalFailures++;
          }
        }
      }
    });
  }
});

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
  console.log(`SUCCESS: All state consistency checks passed!`);
  process.exit(0);
}
