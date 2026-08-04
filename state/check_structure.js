#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_FILES = [
  'WAKE.md',
  'state/CURRENT.md',
  'AGENTS.md',
];

const SHA_RE = /\b[0-9a-fA-F]{40}\b/g;
const HEX_RE = /^[0-9a-fA-F]{40}$/;

const ACTION_HEADING_RE = /^##\s+\d*\.?\s*Authorized Next Action\s*$/m;

const TASK_REQUIRED_HEADINGS = [
  'Goal',
  'Acceptance Criteria',
  'Allowed Changes',
  'Forbidden Changes',
  'Stop Conditions',
  'Evidence Required',
  'Box-Out Review Boundary',
];

let failures = 0;

function fail(msg) {
  failures++;
  console.log('FAILED: ' + msg);
}

function readRequired(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    fail('required file missing: ' + rel);
    return '';
  }
  const content = fs.readFileSync(abs, 'utf8');
  if (content.trim().length === 0) {
    fail('required file is empty: ' + rel);
  }
  return content;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sectionBody(text, headingRe) {
  const lines = text.split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headingRe.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start < 0) {
    return '';
  }
  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      break;
    }
    body.push(lines[i]);
  }
  return body.join('\n');
}

// 1. Required entry, state, and agent rule files exist and are non-empty.
const contents = new Map();
for (const rel of REQUIRED_FILES) {
  contents.set(rel, readRequired(rel));
}

const current = contents.get('state/CURRENT.md') || '';
const wake = contents.get('WAKE.md') || '';
const agents = contents.get('AGENTS.md') || '';

// 2. Exactly one Authorized Next Action exists in canonical runtime state.
const actionMatches = current.match(/^##\s+\d*\.?\s*Authorized Next Action\s*$/gm) || [];
if (actionMatches.length !== 1) {
  fail('expected exactly one "Authorized Next Action" section, found ' + actionMatches.length);
}

// 3. CURRENT declares its unique runtime-state authority and a scoped current phase.
if (!/ONLY canonical source for current operational state/i.test(current)) {
  fail('state/CURRENT.md does not declare unique runtime-state authority');
}
if (!/Current Authorized Subproject Phase/i.test(current)) {
  fail('state/CURRENT.md does not declare a Current Authorized Subproject Phase');
}

// 4. WAKE references state/CURRENT.md as the current-state source.
if (!/state\/CURRENT\.md/.test(wake)) {
  fail('WAKE.md does not reference state/CURRENT.md');
}

// 5. Archive is not declared as a current authorization source in CURRENT.
if (!/archive/i.test(current)) {
  fail('state/CURRENT.md does not state the archive boundary');
}

// 6. AGENTS.md must declare WAKE.md as the sole re-entry entrance.
if (!/WAKE\.md is the sole re-entry entrance/i.test(agents)) {
  fail('AGENTS.md does not declare WAKE.md as the sole re-entry entrance');
}

// 7. AGENTS.md must contain the anti-patch-loop stop rules and the replan signal.
if (!/REPLAN_REQUIRED/.test(agents)) {
  fail('AGENTS.md does not contain REPLAN_REQUIRED');
}
if (!/2 corrective attempts/i.test(agents)) {
  fail('AGENTS.md does not contain the stop-after-2-corrective-attempts rule');
}
if (!/3rd corrective patch/i.test(agents)) {
  fail('AGENTS.md does not contain the stop-after-3rd-corrective-patch rule');
}

// 8. A non-None Authorized Next Action must reference a valid bounded task file.
const actionBody = sectionBody(current, ACTION_HEADING_RE);
const isNone = /^\s*>?\s*None\b/i.test(actionBody.trim());
if (!isNone) {
  const taskRefs = actionBody.match(/tasks\/[A-Za-z0-9_./-]+\.md/g) || [];
  if (taskRefs.length === 0) {
    fail('Authorized Next Action is not None but does not reference any tasks/*.md file');
  }
  for (const ref of taskRefs) {
    const taskPath = path.join(ROOT, ref);
    if (!fs.existsSync(taskPath)) {
      fail('referenced task file missing: ' + ref);
      continue;
    }
    const taskContent = fs.readFileSync(taskPath, 'utf8');
    if (taskContent.trim().length === 0) {
      fail('referenced task file is empty: ' + ref);
      continue;
    }
    for (const heading of TASK_REQUIRED_HEADINGS) {
      const headingRe = new RegExp('^#{1,2}\\s*' + escapeRegExp(heading) + '\\s*$', 'm');
      if (!headingRe.test(taskContent)) {
        fail('task file missing required heading "' + heading + '": ' + ref);
      }
    }
    if (!/REPLAN_REQUIRED/.test(taskContent)) {
      fail('task file missing REPLAN_REQUIRED: ' + ref);
    }
    if (!/MUST NOT[\s\S]{0,80}ACCEPTED/i.test(taskContent) && !/executor[^.\n]{0,60}ACCEPTED/i.test(taskContent)) {
      fail('task file does not forbid executor self-ACCEPTED: ' + ref);
    }
  }
}

// 9. Any 40-character SHA token must be legal hex.
for (const [rel, content] of contents.entries()) {
  const tokens = content.match(SHA_RE) || [];
  for (const token of tokens) {
    if (!HEX_RE.test(token)) {
      fail(rel + ' contains malformed SHA token: ' + token);
    }
  }
}

console.log('Total Failures: ' + failures);
process.exit(failures === 0 ? 0 : 1);
