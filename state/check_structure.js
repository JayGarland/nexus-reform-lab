#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_FILES = [
  'WAKE.md',
  'state/CURRENT.md',
  'MEMORY_MAP.md',
  'CHARTER.md',
  'INVARIANTS.md',
  'REVOLUTION.md',
  'handoff/HELLO.md',
];

const SHA_RE = /\b[0-9a-fA-F]{40}\b/g;
const HEX_RE = /^[0-9a-fA-F]{40}$/;

let failures = 0;

function fail(msg) {
  failures++;
  console.log('FAILED: ' + msg);
}

// 1. Required files exist.
for (const rel of REQUIRED_FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    fail('required file missing: ' + rel);
  }
}

// 2. CURRENT.md exists and is non-empty.
const currentAbs = path.join(ROOT, 'state', 'CURRENT.md');
let current = '';
if (!fs.existsSync(currentAbs)) {
  fail('state/CURRENT.md missing');
} else {
  current = fs.readFileSync(currentAbs, 'utf8');
  if (current.trim().length === 0) {
    fail('state/CURRENT.md is empty');
  }
}

// 3. Exactly one authorized Next Action.
const actionMatches = current.match(/^##\s+\d*\.?\s*Authorized Next Action\s*$/gm) || [];
if (actionMatches.length !== 1) {
  fail('expected exactly one "Authorized Next Action" section, found ' + actionMatches.length);
}

// 4. SHA format is legal (any 40-char token must be valid hex).
if (current) {
  const tokens = current.match(SHA_RE) || [];
  for (const t of tokens) {
    if (!HEX_RE.test(t)) {
      fail('malformed SHA token: ' + t);
    }
  }
}

console.log('Total Failures: ' + failures);
process.exit(failures === 0 ? 0 : 1);
