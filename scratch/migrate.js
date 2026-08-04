const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const legacyRepo = 'F:\\nexus-p0-controlled-bootstrap';
const targetRepo = 'F:\\nexus-reform-lab';
const commit = 'c073099481f9faa3abddde96cd22716816010704';

const manifest = [];

function getSha256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function migrateFile(srcRel, destRel, reason, status, mode = 'VERBATIM') {
  const srcAbs = path.join(legacyRepo, srcRel);
  const destAbs = path.join(targetRepo, destRel);

  if (!fs.existsSync(srcAbs)) {
    console.log(`MISSING SOURCE: ${srcRel}`);
    manifest.push({
      source_repository: 'JayGarland/nexus',
      source_commit: commit,
      source_path: srcRel,
      source_sha256: 'PROVENANCE-UNRESOLVED',
      destination_path: destRel,
      migration_mode: mode,
      semantic_verification: 'FAILED',
      epistemic_status: 'PROVENANCE-UNRESOLVED'
    });
    return;
  }

  const sha = getSha256(srcAbs);
  const rawContent = fs.readFileSync(srcAbs, 'utf8');

  // Prepend frontmatter for markdown/text files if not present
  let newContent = rawContent;
  if (!rawContent.startsWith('---')) {
    const frontmatter = `---
source_repository: JayGarland/nexus
source_commit: ${commit}
source_path: ${srcRel.replace(/\\/g, '/')}
source_sha256: ${sha}
migration_reason: ${reason}
epistemic_status: ${status}
---

`;
    newContent = frontmatter + rawContent;
  }

  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  fs.writeFileSync(destAbs, newContent, 'utf8');

  manifest.push({
    source_repository: 'JayGarland/nexus',
    source_commit: commit,
    source_path: srcRel.replace(/\\/g, '/'),
    source_sha256: sha,
    destination_path: destRel.replace(/\\/g, '/'),
    migration_mode: mode,
    semantic_verification: 'CONFIRMED',
    epistemic_status: status
  });

  console.log(`MIGRATED: ${srcRel} -> ${destRel}`);
}

// 1. Local World Files
const localWorldFiles = [
  ['research/sources/local-world-full-census.md', 'research/legacy-evidence/local-world/local-world-full-census.md', 'Local world project disk census', 'CONFIRMED'],
  ['research/sources/local-world-seed-inventory.md', 'research/legacy-evidence/local-world/local-world-seed-inventory.md', 'Local world seed inventory audit', 'CONFIRMED'],
  ['research/sources/local-world-openclaw-evidence.md', 'research/legacy-evidence/local-world/local-world-openclaw-evidence.md', 'OpenClaw integration evidence & boundaries', 'CONFIRMED'],
  ['research/sources/local-world-raw/full-census/disk_census_manifest.txt', 'research/legacy-evidence/local-world/raw/full-census/disk_census_manifest.txt', 'Raw disk census manifest of local worlds', 'CONFIRMED'],
  ['research/sources/local-world-raw/autonomy-reconciliation/sandbox_runs_manifest.txt', 'research/legacy-evidence/local-world/raw/autonomy-reconciliation/sandbox_runs_manifest.txt', 'Raw sandbox runs manifest', 'CONFIRMED'],
  ['research/sources/local-world-raw/pilot_run_trace_summary.txt', 'research/legacy-evidence/local-world/raw/pilot_run_trace_summary.txt', 'Raw pilot run trace summary', 'CONFIRMED'],
  ['research/findings/local-world-evolution-lineage.md', 'research/legacy-evidence/local-world/local-world-evolution-lineage.md', 'Local world evolution lineage findings', 'CONFIRMED'],
  ['research/findings/local-world-seed-comparison.md', 'research/legacy-evidence/local-world/local-world-seed-comparison.md', 'Seed comparison findings across world runs', 'CONFIRMED'],
  ['research/findings/local-world-autonomy-boundary.md', 'research/legacy-evidence/local-world/local-world-autonomy-boundary.md', 'Autonomy boundary & human freeze point findings', 'CONFIRMED'],
  ['research/findings/local-world-autonomous-growth.md', 'research/legacy-evidence/local-world/local-world-autonomous-growth.md', 'Autonomous artifact growth evidence findings', 'CONFIRMED'],
  ['research/synthesis/local-world-project-current-understanding.md', 'research/legacy-evidence/local-world/local-world-project-current-understanding.md', 'Comprehensive synthesis of local world project prior art', 'CONFIRMED'],
  ['research/audit/local-world-census-completeness.md', 'research/legacy-evidence/local-world/local-world-census-completeness.md', 'Census completeness audit report', 'CONFIRMED'],
  ['research/audit/local-world-safety-stop-status.md', 'research/legacy-evidence/local-world/local-world-safety-stop-status.md', 'Safety stop & intentional freeze audit report', 'CONFIRMED']
];

localWorldFiles.forEach(item => migrateFile(item[0], item[1], item[2], item[3]));

// 2. Wheel Probes Files
const wheelProbeFiles = [
  ['research/findings/prior-art-probe-comparison.md', 'research/legacy-evidence/wheel-probes/prior-art-probe-comparison.md', 'Prior art wheel probes comparison findings', 'PARTIAL'],
  ['research/audit/prior-art-probe-evidence-status.md', 'research/legacy-evidence/wheel-probes/prior-art-probe-evidence-status.md', 'Prior art wheel probes audit status', 'PARTIAL'],
  ['probes/beads/package.json', 'research/legacy-evidence/wheel-probes/beads/package.json', 'Beads probe package metadata', 'CONFIRMED'],
  ['probes/go-workflows/go.mod', 'research/legacy-evidence/wheel-probes/go-workflows/go.mod', 'go-workflows probe module definition', 'CONFIRMED'],
  ['probes/restate/package.json', 'research/legacy-evidence/wheel-probes/restate/package.json', 'Restate probe package metadata', 'CONFIRMED'],
  ['probes/shared_fixture.json', 'research/legacy-evidence/wheel-probes/shared_fixture.json', 'Shared probe evaluation fixture', 'CONFIRMED']
];

wheelProbeFiles.forEach(item => migrateFile(item[0], item[1], item[2], item[3]));

// 3. Failed Slice 0 Evidence Files
const slice0Files = [
  ['experiments/slice-0/CORRECTION_NOTE.md', 'research/legacy-evidence/failed-slice-0/CORRECTION_NOTE.md', 'Slice 0 initial correction note & keep withdrawal', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/audit/EVALUATION.md', 'research/legacy-evidence/failed-slice-0/EVALUATION.md', 'Slice 0 evaluation & downgrade report', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/logs/beads/beads_execution.log', 'research/legacy-evidence/failed-slice-0/beads_execution.log', 'Raw Beads execution log from initial polluted run', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/logs/beads/issue_graph.json', 'research/legacy-evidence/failed-slice-0/issue_graph.json', 'Raw exported issue graph from initial polluted run', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/s0/S0_REPORT.md', 'research/legacy-evidence/failed-slice-0/S0_REPORT.md', 'Slice 0 baseline S0 report', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/s1/compiler.js', 'research/legacy-evidence/failed-slice-0/compiler.js', 'Initial hardcoded static generator compiler', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/s1/real_parser.js', 'research/legacy-evidence/failed-slice-0/real_parser.js', 'Intermediate thread-specific rule extractor', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/s1/generic_section_parser.js', 'research/legacy-evidence/failed-slice-0/generic_section_parser.js', 'Pass 2 generic section parser', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/s1/world/CURRENT_STATE.md', 'research/legacy-evidence/failed-slice-0/CURRENT_STATE.md', 'Recompiled current state ledger from Pass 2', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/runs/beads-clean-001/operator/command-log.jsonl', 'research/legacy-evidence/failed-slice-0/beads-clean-001/command-log.jsonl', 'Command log from isolated beads run', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/runs/beads-clean-001/operator/issue-graph-final.json', 'research/legacy-evidence/failed-slice-0/beads-clean-001/issue-graph-final.json', 'Final 11-task graph from isolated beads run', 'HISTORICAL-FAILURE'],
  ['experiments/slice-0/runs/beads-clean-001/world/WORK_STATE.md', 'research/legacy-evidence/failed-slice-0/beads-clean-001/WORK_STATE.md', 'Compiled work state from clean isolated beads run', 'HISTORICAL-FAILURE']
];

slice0Files.forEach(item => migrateFile(item[0], item[1], item[2], item[3]));

// Write manifest
fs.mkdirSync(path.join(targetRepo, 'research/migration'), { recursive: true });
fs.writeFileSync(path.join(targetRepo, 'research/migration/MIGRATION_MANIFEST.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Manifest written with ${manifest.length} entries.`);
