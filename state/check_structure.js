#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_FILES = [
  'WAKE.md',
  'state/CURRENT.md',
  'MAINLINE.md',
  'REVOLUTION.md',
  'INVARIANTS.md',
  'research/synthesis/FIVE_POINT_FRAMEWORK.md',
  'research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md',
];

const REQUIRED_WAKE_SEQUENCE = [
  'state/CURRENT.md',
  'MAINLINE.md',
  'REVOLUTION.md',
  'research/synthesis/FIVE_POINT_FRAMEWORK.md',
  'research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md',
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

// 1. Required entry, state, invariant, and doctrine files exist and are non-empty.
const contents = new Map();
for (const rel of REQUIRED_FILES) {
  contents.set(rel, readRequired(rel));
}

const current = contents.get('state/CURRENT.md') || '';
const wake = contents.get('WAKE.md') || '';
const mainline = contents.get('MAINLINE.md') || '';

// 2. Exactly one authorized Next Action exists in canonical runtime state.
const actionMatches = current.match(/^##\s+\d*\.?\s*Authorized Next Action\s*$/gm) || [];
if (actionMatches.length !== 1) {
  fail('expected exactly one "Authorized Next Action" section, found ' + actionMatches.length);
}

// 3. CURRENT explicitly declares its unique runtime-state authority and scoped phase.
if (!/ONLY canonical source for current operational state/i.test(current)) {
  fail('state/CURRENT.md does not declare unique runtime-state authority');
}
if (!/LLM Wiki Real Usage & Content Quality Validation/.test(current)) {
  fail('state/CURRENT.md does not contain the authorized Wiki validation phase');
}

// 4. WAKE includes the mandatory chain in order.
let previousIndex = -1;
for (const rel of REQUIRED_WAKE_SEQUENCE) {
  const index = wake.indexOf(rel);
  if (index < 0) {
    fail('WAKE.md mandatory sequence missing: ' + rel);
    continue;
  }
  if (index <= previousIndex) {
    fail('WAKE.md mandatory sequence out of order at: ' + rel);
  }
  previousIndex = index;
}

// 5. MAINLINE links the three doctrine sources and states the projection/mirror boundaries.
for (const rel of [
  'REVOLUTION.md',
  'research/synthesis/FIVE_POINT_FRAMEWORK.md',
  'research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md',
]) {
  if (!mainline.includes(rel)) {
    fail('MAINLINE.md missing doctrine link: ' + rel);
  }
}
if (!/knowledge projections/i.test(mainline)) {
  fail('MAINLINE.md missing LLM Wiki projection boundary');
}
if (!/Mirror only/i.test(mainline)) {
  fail('MAINLINE.md missing Drive mirror boundary');
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
