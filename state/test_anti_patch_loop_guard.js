#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '..');
const VALIDATOR_SRC = path.join(REPO, 'state', 'check_structure.js');
const TASK_SRC = path.join(REPO, 'tasks', 'ANTI_PATCH_LOOP_GUARD.md');
const WAKE_SRC = path.join(REPO, 'WAKE.md');
const AGENTS_SRC = path.join(REPO, 'AGENTS.md');
const CURRENT_SRC = path.join(REPO, 'state', 'CURRENT.md');

let failures = 0;

function expect(name, ok, detail) {
  if (ok) {
    console.log('PASSED: ' + name);
  } else {
    failures++;
    console.log('FAILED: ' + name + (detail ? ' :: ' + detail : ''));
  }
}

function runValidator(dir) {
  const res = spawnSync(process.execPath, ['state/check_structure.js'], {
    cwd: dir,
    encoding: 'utf8',
  });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

function makeSandbox(currentMd, agentsMd, taskMd) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nplg-test-'));
  fs.mkdirSync(path.join(dir, 'state'));
  fs.mkdirSync(path.join(dir, 'tasks'));
  fs.writeFileSync(path.join(dir, 'WAKE.md'), fs.readFileSync(WAKE_SRC, 'utf8'));
  fs.writeFileSync(path.join(dir, 'AGENTS.md'), agentsMd);
  fs.writeFileSync(path.join(dir, 'state', 'CURRENT.md'), currentMd);
  fs.writeFileSync(path.join(dir, 'state', 'check_structure.js'), fs.readFileSync(VALIDATOR_SRC, 'utf8'));
  fs.writeFileSync(path.join(dir, 'tasks', 'ANTI_PATCH_LOOP_GUARD.md'), taskMd);
  return dir;
}

function cleanup(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

const currentReal = fs.readFileSync(CURRENT_SRC, 'utf8');
const currentNone = currentReal;
const currentNonNone = currentReal.replace(
  /^> None\..*$/m,
  '> Authorized task: `tasks/ANTI_PATCH_LOOP_GUARD.md`. Only implement changes allowed by that task file; stop after one implementation and validation pass; await box-out review; do not expand.'
);
const agentsOk = fs.readFileSync(AGENTS_SRC, 'utf8');
const taskOk = fs.readFileSync(TASK_SRC, 'utf8');

// Positive: task-referencing state must pass.
let dir = makeSandbox(currentNonNone, agentsOk, taskOk);
let res = runValidator(dir);
expect('normal structure (task referenced) passes', res.code === 0, 'exit=' + res.code);
cleanup(dir);

// Positive: final None state must pass.
dir = makeSandbox(currentNone, agentsOk, taskOk);
res = runValidator(dir);
expect('final None state passes', res.code === 0, 'exit=' + res.code);
cleanup(dir);

// Negative 1: task file without "Stop Conditions" heading must fail.
let task1 = taskOk.replace(/^## Stop Conditions\s*$/m, '## Removed Stop Conditions');
dir = makeSandbox(currentNonNone, agentsOk, task1);
res = runValidator(dir);
expect('missing Stop Conditions fails', res.code !== 0, 'exit=' + res.code);
cleanup(dir);

// Negative 2: task file without REPLAN_REQUIRED must fail.
let task2 = taskOk.replace(/REPLAN_REQUIRED/g, 'REVIEW_PLANNED');
dir = makeSandbox(currentNonNone, agentsOk, task2);
res = runValidator(dir);
expect('missing REPLAN_REQUIRED fails', res.code !== 0, 'exit=' + res.code);
cleanup(dir);

// Negative 3: CURRENT referencing a nonexistent tasks/*.md must fail.
let current3 = currentNonNone.replace(
  /^> Authorized task:.*$/m,
  '> Authorized task: `tasks/DOES_NOT_EXIST.md`. Only implement changes allowed by that task file; stop after one implementation and validation pass; await box-out review; do not expand.'
);
dir = makeSandbox(current3, agentsOk, taskOk);
res = runValidator(dir);
expect('missing task file fails', res.code !== 0, 'exit=' + res.code);
cleanup(dir);

// Negative 4: AGENTS.md without the sole WAKE entrance declaration must fail.
let agents4 = agentsOk.replace(/WAKE\.md is the sole re-entry entrance\./i, 'STATE.md is the sole re-entry entrance.');
dir = makeSandbox(currentNonNone, agents4, taskOk);
res = runValidator(dir);
expect('missing WAKE authority fails', res.code !== 0, 'exit=' + res.code);
cleanup(dir);

console.log('Total Test Failures: ' + failures);
process.exit(failures === 0 ? 0 : 1);
