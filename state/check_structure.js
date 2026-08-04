#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_FILES = [
  'WAKE.md',
  'state/CURRENT.md',
];

const SHA_RE = /\b[0-9a-fA-F]{40}\b/g;
const HEX_RE = /^[0-9a-fA-F]{40}$/;

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

// 1. Required entry and state files exist and are non-empty.
const contents = new Map();
for (const rel of REQUIRED_FILES) {
  contents.set(rel, readRequired(rel));
}

const current = contents.get('state/CURRENT.md') || '';
const wake = contents.get('WAKE.md') || '';

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

// 6. Any 40-character SHA token must be legal hex.
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
