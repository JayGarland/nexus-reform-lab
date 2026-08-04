const fs = require('fs');
const path = require('path');
const os = require('os');
const { verifyRepository } = require('../verify_state_consistency');

const realRepoRoot = path.resolve(__dirname, '../..');
const logsDir = path.join(realRepoRoot, 'state', 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const testLogs = [];
testLogs.push(`================================================================================`);
testLogs.push(`STATE CONSISTENCY NEGATIVE & POSITIVE FIXTURE TEST SUITE LOG`);
testLogs.push(`Timestamp: ${new Date().toISOString()}`);
testLogs.push(`Real Repository Root: ${realRepoRoot}`);
testLogs.push(`================================================================================`);

let negativePassed = 0;
let positivePassed = 0;
let totalTestFailures = 0;

function createTempFixtureRepo(mutatorFn) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'reform-lab-fixture-'));
  
  // Copy state/, handoff/, WAKE.md, MEMORY_MAP.md, and survey registry
  fs.mkdirSync(path.join(tmpDir, 'state'), { recursive: true });
  fs.mkdirSync(path.join(tmpDir, 'handoff'), { recursive: true });
  fs.mkdirSync(path.join(tmpDir, 'research/prior-art/e1-e2'), { recursive: true });

  const filesToCopy = [
    'state/CURRENT_PHASE.md',
    'state/CURRENT_VERDICT.md',
    'state/EXTERNAL_VERDICT_HISTORY.md',
    'state/NEXT_ACTION.md',
    'state/STATE_MODEL.md',
    'handoff/HELLO.md',
    'handoff/SESSION_LOG.md',
    'WAKE.md',
    'MEMORY_MAP.md',
    'research/prior-art/e1-e2/CANDIDATE_REGISTRY.md'
  ];

  filesToCopy.forEach((rel) => {
    const src = path.join(realRepoRoot, rel);
    const dest = path.join(tmpDir, rel);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });

  // Apply custom mutation
  mutatorFn(tmpDir);
  return tmpDir;
}

function cleanupTempRepo(tmpDir) {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {
    // ignore cleanup errors
  }
}

function runFixtureTest(name, expectedSuccess, mutatorFn) {
  testLogs.push(`\n--------------------------------------------------------------------------------`);
  testLogs.push(`Fixture Name: ${name}`);
  testLogs.push(`Expected Verifier Success: ${expectedSuccess ? 'YES (PASS)' : 'NO (FAIL)'}`);

  const tmpRepo = createTempFixtureRepo(mutatorFn);
  
  // Pass gitRoot = realRepoRoot so git parent & commit existence queries execute against actual git repository
  const result = verifyRepository(tmpRepo, { gitRoot: realRepoRoot });
  cleanupTempRepo(tmpRepo);

  const testPassed = (result.success === expectedSuccess);
  testLogs.push(`  Actual Verifier Success: ${result.success ? 'YES' : 'NO'}`);
  testLogs.push(`  Detected Failure Reasons Count: ${result.failuresCount}`);
  testLogs.push(`  Test Case Result: ${testPassed ? 'PASSED' : 'FAILED'}`);

  if (testPassed) {
    if (expectedSuccess) {
      positivePassed++;
    } else {
      negativePassed++;
    }
  } else {
    totalTestFailures++;
    testLogs.push(`  ERROR: Test case ${name} did not produce expected exit behavior!`);
  }
}

// 1. Negative Fixture 1: Unknown verdict in EXTERNAL_VERDICT_HISTORY.md
runFixtureTest('1_unknown_verdict', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('CONFIRMED FOR REVIEWED SCOPE', 'CONFIRMED-ish');
  fs.writeFileSync(p, content, 'utf8');
});

// 2. Negative Fixture 2: Duplicate State Consistency subject row in CURRENT_VERDICT.md
runFixtureTest('2_duplicate_subject', false, (dir) => {
  const p = path.join(dir, 'state/CURRENT_VERDICT.md');
  let content = fs.readFileSync(p, 'utf8');
  content += '\n| **State Consistency** | `CONFIRMED` | [`STATE_MODEL.md`](STATE_MODEL.md) | Duplicate row |\n';
  fs.writeFileSync(p, content, 'utf8');
});

// 3. Negative Fixture 3: Missing Cold-Start Recoverability row in CURRENT_VERDICT.md
runFixtureTest('3_missing_subject', false, (dir) => {
  const p = path.join(dir, 'state/CURRENT_VERDICT.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.split(/\r?\n/).filter(l => !l.includes('Cold-Start Recoverability')).join('\n');
  fs.writeFileSync(p, content, 'utf8');
});

// 4. Negative Fixture 4: PARTIAL PASS with Accepted Scope = None
runFixtureTest('4_partial_pass_no_scope', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('Dynamic Parent Lineage Verification', 'None');
  fs.writeFileSync(p, content, 'utf8');
});

// 5. Negative Fixture 5: REJECTED with Milestone Fully Accepted = yes
runFixtureTest('5_rejected_fully_accepted', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('| `REJECTED` | `no` | None', '| `REJECTED` | `yes` | None');
  fs.writeFileSync(p, content, 'utf8');
});

// 6. Negative Fixture 6: Multiple RESOLVE_FROM_GIT UNDER OUTSIDE REVIEW entries
runFixtureTest('6_multiple_unresolved_entries', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content += '| **Foundation 0.3.2g** | `RESOLVE_FROM_GIT` | `UNDER OUTSIDE REVIEW` | `no` | None | Whole milestone under review | `no` | 2026-08-03 | Extra unresolved |\n';
  fs.writeFileSync(p, content, 'utf8');
});

// 7. Negative Fixture 7: Active under review milestone exists in released gate phase (must be zero)
runFixtureTest('7_unexpected_under_review_in_released_phase', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content += '| **Foundation 0.4.2 Unexpected Review** | `RESOLVE_FROM_GIT` | `UNDER OUTSIDE REVIEW` | `no` | None | Whole milestone under review | `no` | 2026-08-03 | Extra unresolved |\n';
  fs.writeFileSync(p, content, 'utf8');
});

// 8. Negative Fixture 8: Reviewed commit is short SHA (a78709e)
runFixtureTest('8_short_sha_reviewed_commit', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('`a78709e9bf07c14d46276d60da978bfedaf2f5c4`', '`a78709e`');
  fs.writeFileSync(p, content, 'utf8');
});

// 9. Negative Fixture 9: SESSION_LOG parent SHA mismatch
runFixtureTest('9_session_log_parent_mismatch', false, (dir) => {
  const p = path.join(dir, 'handoff/SESSION_LOG.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('`31fda2f54a2346e791e63352a236824db9f17ae5`', '`0000000000000000000000000000000000000000`');
  fs.writeFileSync(p, content, 'utf8');
});

// 10. Negative Fixture 10: Multiple blockquote action statements in NEXT_ACTION.md
runFixtureTest('10_multiple_next_action_blockquotes', false, (dir) => {
  const p = path.join(dir, 'state/NEXT_ACTION.md');
  let content = fs.readFileSync(p, 'utf8');
  const targetStr = '> Submit the Global Roadmap Reconciliation, Concept and Contract Expansion Freeze, and Contract-to-Probe Matrix for outside review. Do not add new Concept Models or Minimum Contracts, implement any Engine or Runtime, run a Probe, select a Provider, connect official Nexus, or start CR-S0.';
  content = content.replace(targetStr, `${targetStr}\n> Execute forbidden world modification now!`);
  fs.writeFileSync(p, content, 'utf8');
});

// 11. Negative Fixture 11: Case-insensitive duplicate milestone in EXTERNAL_VERDICT_HISTORY.md
runFixtureTest('11_duplicate_milestone_case_variant', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content += '| **foundation 0.3.2e** | `31fda2f54a2346e791e63352a236824db9f17ae5` | `PARTIAL PASS` | `no` | Scope | Scope | `no` | 2026-08-03 | Case duplicate |\n';
  fs.writeFileSync(p, content, 'utf8');
});

// 12. Negative Fixture 12: Data row column count mismatch (8 columns instead of 9)
runFixtureTest('12_table_column_count_mismatch', false, (dir) => {
  const p = path.join(dir, 'state/EXTERNAL_VERDICT_HISTORY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('| **Clean-Room Bootstrap** | `a78709e9bf07c14d46276d60da978bfedaf2f5c4` | `CONFIRMED` | `yes` | Clean-Room Lab Setup, Charter, Invariants, Drive Manifest | None | `yes` | 2026-08-03 | Patch 0.1 verified |', '| **Clean-Room Bootstrap** | `a78709e9bf07c14d46276d60da978bfedaf2f5c4` | `CONFIRMED` | `yes` | Clean-Room Lab Setup | `yes` | 2026-08-03 | Patch 0.1 verified |');
  fs.writeFileSync(p, content, 'utf8');
});

// 13. Positive Fixture 13: Valid live repository state
runFixtureTest('13_valid_positive_fixture', true, (dir) => {
  // Unmodified copy of live valid repo files
});

// 14. Negative Fixture 14: Registry summary E2 count mismatch (summary claims E2=19 while registry contains E2=18)
runFixtureTest('14_registry_e2_count_mismatch', false, (dir) => {
  const p = path.join(dir, 'research/prior-art/e1-e2/CANDIDATE_REGISTRY.md');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('- Reached E2: 18', '- Reached E2: 19');
  fs.writeFileSync(p, content, 'utf8');
});

testLogs.push(`\n================================================================================`);
testLogs.push(`Test Suite Summary:`);
testLogs.push(`  negative fixtures passed: ${negativePassed}/13`);
testLogs.push(`  positive fixtures passed: ${positivePassed}/1`);
testLogs.push(`  test process exit code: ${totalTestFailures === 0 ? 0 : 1}`);
testLogs.push(`================================================================================`);

const logPath = path.join(logsDir, 'state_consistency_negative_tests.log');
fs.writeFileSync(logPath, testLogs.join('\n'), 'utf8');

console.log(testLogs.join('\n'));

if (totalTestFailures > 0) {
  console.error(`ERROR: ${totalTestFailures} test suite cases failed!`);
  process.exit(1);
} else {
  console.log(`SUCCESS: All negative and positive fixture test cases passed!`);
  process.exit(0);
}
