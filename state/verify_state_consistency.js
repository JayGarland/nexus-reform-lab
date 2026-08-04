const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const allowedVerdicts = new Set([
  'PARTIAL PASS',
  'REJECTED',
  'UNDER OUTSIDE REVIEW',
  'CONFIRMED',
  'CONFIRMED FOR REVIEWED SCOPE',
  'CONFIRMED FOR RECOVERY SCOPE',
  'CONFIRMED FOR DOCTRINE SCOPE',
  'CONFIRMED FOR PLANNING SCOPE',
  'CONFIRMED FOR E1/E2 SURVEY SCOPE',
  'CONFIRMED FOR QUEUE-STRUCTURE AND EVIDENCE-BOUNDARY SCOPE',
  'CONFIRMED FOR E1/E2 COMPARISON SCOPE',
  'CONFIRMED FOR E3 SCOPE',
  'CONFIRMED FOR E3 EXECUTION-PLAN SCOPE',
  'CONFIRMED FOR CONCEPTUAL SCOPE'
]);

// ---------------------------------------------------------------------------
// Legal gate-stage registry.
//
// The active stage is selected from CURRENT_PHASE.md. Each stage declares which
// verdict categories are legal for the gate subjects while that stage is
// active. This is structural and extensible: new stages are ADDED here when a
// future outside adjudication authorizes a new gate stage; existing entries are
// not overwritten to match the current phase.
//
// A verdict category is the leading token of the verdict value before the em
// dash separator (e.g. "PARTIAL — ..." => "PARTIAL", "AUTHORIZED — ..." =>
// "AUTHORIZED", "NOT YET AUDITED" => "NOT YET AUDITED").
// ---------------------------------------------------------------------------
const GATE_STAGES = [
  {
    id: 'GLOBAL_ROADMAP_PREP',
    phaseIncludes: ['roadmap'],
    actionReference: ['roadmap'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['CONFIRMED FOR E1/E2 COMPARISON SCOPE'],
      'Astro-Han Knowledge E3': ['CONFIRMED FOR E3 SCOPE'],
      'base-llm-wiki': ['E2'],
      'Knowledge Provider Selected': ['NO'],
      'base-llm-wiki E3 Comparison Plan': ['CONFIRMED FOR E3 EXECUTION-PLAN SCOPE'],
      'base-llm-wiki Knowledge E3': ['CONFIRMED FOR E3 SCOPE'],
      'Knowledge E3 Segment': ['CLOSED'],
      'Stigmergy Carrier & Artifact Taxonomy': ['CONFIRMED FOR CONCEPTUAL SCOPE']
    }
  },
  {
    id: 'KNOWLEDGE_E3_SEGMENT_CLOSURE',
    phaseIncludes: ['closure'],
    actionReference: ['stigmergy', 'taxonomy'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['CONFIRMED FOR E1/E2 COMPARISON SCOPE'],
      'Astro-Han Knowledge E3': ['CONFIRMED FOR E3 SCOPE'],
      'base-llm-wiki': ['E2'],
      'Knowledge Provider Selected': ['NO'],
      'base-llm-wiki E3 Comparison Plan': ['CONFIRMED FOR E3 EXECUTION-PLAN SCOPE'],
      'base-llm-wiki Knowledge E3': ['CONFIRMED FOR E3 SCOPE']
    }
  },
  {
    id: 'BASE_LLM_WIKI_KNOWLEDGE_E3',
    phaseIncludes: ['base-llm-wiki'],
    actionReference: ['base-llm-wiki', 'e3'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['CONFIRMED FOR E1/E2 COMPARISON SCOPE'],
      'Astro-Han Knowledge E3': ['CONFIRMED FOR E3 SCOPE'],
      'base-llm-wiki': ['E2'],
      'Knowledge Provider Selected': ['NO'],
      'base-llm-wiki E3 Comparison Plan': ['CONFIRMED FOR E3 EXECUTION-PLAN SCOPE'],
      'base-llm-wiki Knowledge E3': ['SUBMITTED FOR OUTSIDE REVIEW']
    }
  },
  {
    id: 'KNOWLEDGE_E3_COMPARISON_PREP',
    phaseIncludes: ['preparation'],
    actionReference: ['comparison', 'plan'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['CONFIRMED FOR E1/E2 COMPARISON SCOPE'],
      'Astro-Han Knowledge E3': ['CONFIRMED FOR E3 SCOPE'],
      'base-llm-wiki': ['E2'],
      'Knowledge Provider Selected': ['NO'],
      'base-llm-wiki E3 Comparison Plan': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'ASTRO_HAN_KNOWLEDGE_E3',
    phaseIncludes: ['astro-han'],
    actionReference: ['astro-han', 'e3'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['CONFIRMED FOR E1/E2 COMPARISON SCOPE'],
      'Astro-Han Knowledge E3': ['AUTHORIZED'],
      'base-llm-wiki': ['E2']
    }
  },
  {
    id: 'KNOWLEDGE_PROVIDER_COMPARISON',
    phaseIncludes: ['knowledge'],
    actionReference: ['comparison', 'wiki'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW'],
      'Knowledge Projection Provider Comparison': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'E3_QUEUE_DEFINITION',
    phaseIncludes: ['e3'],
    actionReference: ['e3', 'probe', 'queue'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['CONFIRMED FOR E1/E2 SURVEY SCOPE'],
      'E3 Probe Queue': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'PRIOR_ART_E1E2_SURVEY',
    phaseIncludes: ['e1'],
    actionReference: ['prior-art', 'survey'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['CONFIRMED FOR PLANNING SCOPE'],
      'Prior-Art E1/E2 Survey': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'MODULARITY_DOCTRINE_RATIFICATION',
    phaseIncludes: ['ratification'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED']
    }
  },
  {
    id: 'PRIOR_ART_PLANNING',
    phaseIncludes: ['planning'],
    actionReference: ['prior-art', 'plan'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED'],
      'Prior-Art Discovery Plan': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'PRIOR_ART_DISCOVERY',
    phaseIncludes: ['prior-art'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['CONFIRMED']
    }
  },
  {
    id: 'MODULARITY_PROPOSAL_UNDER_REVIEW',
    phaseIncludes: ['modularity', 'replaceability'],
    actionReference: ['modularity', 'replaceability'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD'],
      'Modularity & Replaceability Doctrine': ['UNDER OUTSIDE REVIEW']
    }
  },
  {
    id: 'AFTER_COLD_START_KERNEL_DEFINITION',
    phaseIncludes: ['post-cold-start'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['CONFIRMED', 'CONFIRMED AT LEVEL 2'],
      'Cold-Start Recoverability': ['CONFIRMED'],
      'CR-S0 Authorization': ['WITHHELD']
    }
  },
  {
    id: 'AFTER_WORLD_AUDIT_PRE_COLD_START',
    phaseIncludes: ['cold-start'],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['PARTIAL', 'CONFIRMED'],
      'Cold-Start Recoverability': ['AUTHORIZED', 'NOT YET TESTED'],
      'CR-S0 Authorization': ['WITHHELD']
    }
  },
  {
    id: 'BEFORE_WORLD_AUDIT',
    phaseIncludes: [],
    verdicts: {
      'State Consistency': ['CONFIRMED', 'PARTIAL', 'REJECTED', 'WITHHELD'],
      'Repository-wide Persistent Artifact World': ['NOT YET AUDITED'],
      'Cold-Start Recoverability': ['NOT YET TESTED'],
      'CR-S0 Authorization': ['WITHHELD']
    }
  }
];

function getVerdictRows(content, subject) {
  const lines = content.split(/\r?\n/);
  const rows = [];

  lines.forEach((line) => {
    if (line.startsWith('|')) {
      const columns = line.split('|').map(v => v.trim());
      if (columns.length >= 4) {
        const cleanSubj = columns[1].replace(/\*\*/g, '').trim();
        if (cleanSubj === subject) {
          rows.push({
            subject: cleanSubj,
            verdict: columns[2].replace(/`/g, '').trim(),
            evidence: columns[3],
            note: columns[4] || ''
          });
        }
      }
    }
  });

  return rows;
}

function verdictCategory(verdict) {
  const idx = verdict.indexOf('\u2014');
  if (idx === -1) return verdict.trim();
  return verdict.slice(0, idx).trim();
}

function selectGateStage(phaseValue) {
  if (!phaseValue) return null;
  const lower = phaseValue.toLowerCase();
  for (const stage of GATE_STAGES) {
    if (stage.phaseIncludes.length === 0) continue;
    if (stage.phaseIncludes.every(m => lower.includes(m))) return stage;
  }
  return GATE_STAGES[GATE_STAGES.length - 1];
}

function extractPhaseToken(phaseValue) {
  if (!phaseValue) return null;
  const m = phaseValue.match(/Foundation\s+([0-9][0-9A-Za-z.]*)/i);
  return m ? m[1] : null;
}

function verifyRepository(targetRoot, options = {}) {
  const rawLogs = [];
  let totalFailures = 0;
  const gitRoot = options.gitRoot || targetRoot;

  function fail(msg) {
    rawLogs.push(`FAILED: ${msg}`);
    totalFailures++;
  }

  function checkFileExists(relPath) {
    const abs = path.join(targetRoot, relPath);
    if (!fs.existsSync(abs)) {
      fail(`File missing: ${relPath}`);
      return null;
    }
    return fs.readFileSync(abs, 'utf8');
  }

  rawLogs.push(`================================================================================`);
  rawLogs.push(`FAIL-CLOSED VERIFIER & STATE CONSISTENCY ENGINE LOG`);
  rawLogs.push(`Timestamp: ${new Date().toISOString()}`);
  rawLogs.push(`Target Repository Root: ${targetRoot}`);
  rawLogs.push(`Git Resolution Root: ${gitRoot}`);
  rawLogs.push(`================================================================================`);

  // -------------------------------------------------------------------------
  // Check 4 (resolved first): CURRENT_PHASE.md determines the legal gate stage.
  // -------------------------------------------------------------------------
  rawLogs.push(`\n[Check 4] CURRENT_PHASE.md Gate-Stage Selection...`);
  const phaseContent = checkFileExists('state/CURRENT_PHASE.md');
  let activeStage = null;
  let phaseValue = null;

  if (phaseContent) {
    const phaseMatch = phaseContent.match(/- \*\*Current Phase\*\*:\s*`([^`]+)`/);
    phaseValue = phaseMatch ? phaseMatch[1].trim() : null;
    if (!phaseValue) {
      fail(`CURRENT_PHASE.md phase value missing or malformed!`);
    } else {
      activeStage = selectGateStage(phaseValue);
      rawLogs.push(`  Current Phase: ${phaseValue}`);
      rawLogs.push(`  Selected Gate Stage: ${activeStage ? activeStage.id : 'NONE'}`);
      if (!activeStage) {
        fail(`Current phase does not map to any known legal gate stage!`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Check 1: CURRENT_VERDICT.md gate-subject presence, uniqueness & legality.
  // -------------------------------------------------------------------------
  rawLogs.push(`\n[Check 1] CURRENT_VERDICT.md Gate-Subject Validation...`);
  const verdictContent = checkFileExists('state/CURRENT_VERDICT.md');

  if (verdictContent && activeStage) {
    const gateSubjects = Object.keys(activeStage.verdicts);
    gateSubjects.forEach((subj) => {
      const rows = getVerdictRows(verdictContent, subj);
      rawLogs.push(`  Subject [${subj}]: Matching Rows Count = ${rows.length}`);

      if (rows.length === 0) {
        fail(`Subject missing from CURRENT_VERDICT.md: ${subj}`);
      } else if (rows.length > 1) {
        fail(`Duplicate subject row detected in CURRENT_VERDICT.md for: ${subj}`);
      } else {
        const row = rows[0];
        const cat = verdictCategory(row.verdict);
        const allowed = activeStage.verdicts[subj];
        if (!allowed.includes(cat)) {
          fail(`Subject [${subj}] verdict category "${cat}" is not legal for gate stage "${activeStage.id}". Allowed: ${allowed.join(', ')}`);
        } else {
          rawLogs.push(`  PASS: Subject [${subj}] category "${cat}" legal for stage "${activeStage.id}".`);
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // Check 2: Dynamic Git parent lineage verification from SESSION_LOG.md.
  // -------------------------------------------------------------------------
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
          actualParent = execSync(`git -C "${gitRoot}" rev-parse ${resSha}~1`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
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
          fail(`Strict 40-char parent SHA mismatch for ${mName}! Recorded=${recBasedOn}, Actual=${actualParent}`);
        } else {
          rawLogs.push(`  PASS: Strict 40-char parent SHA equality verified.`);
        }
      } else if (block.includes('Resulting Commit') && !block.includes('RESOLVE_FROM_GIT_HISTORY')) {
        fail(`Non-40-character commit SHA format detected in ${mName}!`);
      }
    });
  }

  // -------------------------------------------------------------------------
  // Check 3: EXTERNAL_VERDICT_HISTORY.md schema & active review isolation.
  // -------------------------------------------------------------------------
  rawLogs.push(`\n[Check 3] EXTERNAL_VERDICT_HISTORY.md Table Header & Schema Integrity...`);
  const extVerdictContent = checkFileExists('state/EXTERNAL_VERDICT_HISTORY.md');

  let verifiedHistoryEntriesCount = 0;
  let activeUnresolvedMilestone = 'NONE';
  let unresolvedCount = 0;

  if (extVerdictContent) {
    const lines = extVerdictContent.split(/\r?\n/);
    const headerLine = lines.find(l => l.includes('Milestone') && l.includes('Reviewed Commit'));

    if (!headerLine) {
      fail(`Table header missing in EXTERNAL_VERDICT_HISTORY.md!`);
    } else {
      const requiredCols = [
        'Milestone', 'Reviewed Commit', 'Outside Verdict', 'Milestone Fully Accepted',
        'Accepted Scope', 'Rejected / Unconfirmed Scope', 'Milestone Accepted as Current Authority',
        'Review Date', 'Notes'
      ];
      const headerCols = headerLine.split('|').map(c => c.trim()).filter(Boolean);
      const hasAllHeaders = requiredCols.every(c => headerCols.includes(c));

      if (!hasAllHeaders || headerCols.length !== 9) {
        fail(`Header column mismatch in EXTERNAL_VERDICT_HISTORY.md!`);
      } else {
        rawLogs.push(`  PASS: Table header structure and 9-column layout verified.`);
      }
    }

    const rows = lines.filter(line => line.startsWith('| **'));
    const seenMilestonesNormalized = new Set();

    rows.forEach((row) => {
      const cols = row.split('|').map(c => c.trim());
      if (cols.length !== 11) {
        fail(`Data row column count mismatch! Expected 9 internal columns.`);
        return;
      }

      verifiedHistoryEntriesCount++;
      const rawMilestone = cols[1].replace(/\*\*/g, '').trim();
      const normMilestone = rawMilestone.toLowerCase();

      if (seenMilestonesNormalized.has(normMilestone)) {
        fail(`Duplicate milestone entry detected (case-insensitive normalized): "${rawMilestone}"`);
      }
      seenMilestonesNormalized.add(normMilestone);

      const commitMatch = cols[2].match(/`([a-f0-9]{40})`/);
      const isResolveFromGit = cols[2].includes('RESOLVE_FROM_GIT');
      const verdict = cols[3].replace(/`/g, '').trim();
      const fullyAccepted = cols[4].replace(/`/g, '').trim();
      const acceptedScope = cols[5].trim();
      const rejectedScope = cols[6].trim();
      const currentAuthority = cols[7].replace(/`/g, '').trim();

      rawLogs.push(`--- Milestone Schema Check: ${rawMilestone} ---`);
      rawLogs.push(`  Reviewed Commit: ${commitMatch ? commitMatch[1] : (isResolveFromGit ? 'RESOLVE_FROM_GIT' : 'INVALID')}`);
      rawLogs.push(`  Outside Verdict: ${verdict}`);

      // Fail-Closed Whitelist Check
      if (!allowedVerdicts.has(verdict)) {
        fail(`Unknown outside verdict detected: "${verdict}" for milestone "${rawMilestone}"!`);
        return;
      }

      // Commit Existence & Leak Check
      if (!commitMatch) {
        if (verdict !== 'UNDER OUTSIDE REVIEW' || !isResolveFromGit) {
          fail(`Historical reviewed commit missing, invalid, or improperly unresolved for milestone "${rawMilestone}"!`);
        } else {
          unresolvedCount++;
          activeUnresolvedMilestone = rawMilestone;
        }
      } else {
        const cSha = commitMatch[1];
        let exists = false;
        try {
          const type = execSync(`git -C "${gitRoot}" cat-file -t ${cSha}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
          exists = (type === 'commit');
        } catch (e) {
          exists = false;
        }
        if (!exists) {
          fail(`Reviewed commit ${cSha} does not exist in git history!`);
        }
      }

      // Schema Validation Rules
      if (verdict === 'PARTIAL PASS') {
        if (fullyAccepted !== 'no' || currentAuthority !== 'no' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`PARTIAL PASS schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'REJECTED') {
        if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || rejectedScope === 'None') {
          fail(`REJECTED schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'UNDER OUTSIDE REVIEW') {
        if (fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no' || !isResolveFromGit) {
          fail(`UNDER OUTSIDE REVIEW schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED') {
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None') {
          fail(`CONFIRMED schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR REVIEWED SCOPE') {
        rawLogs.push(`  NOTE: Fully accepted refers only to the bounded milestone repair, not to the unreviewed repository-wide World or cold-start capability.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR REVIEWED SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR RECOVERY SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the recovery scope; execution-process claims remain CLAIMED-NOT-EVIDENCED.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR RECOVERY SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR DOCTRINE SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the doctrine scope; provider implementations and interchange details remain unconfirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR DOCTRINE SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR PLANNING SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the planning scope; candidate findings and execution remain unconfirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR PLANNING SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR E1/E2 SURVEY SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the E1/E2 survey scope; runtime behavior and installation viability remain unconfirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR E1/E2 SURVEY SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR QUEUE-STRUCTURE AND EVIDENCE-BOUNDARY SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to queue structure and evidence boundary; Knowledge-slot selection remains open.`);
        if (fullyAccepted !== 'no' || currentAuthority !== 'no' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR QUEUE-STRUCTURE AND EVIDENCE-BOUNDARY SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR E1/E2 COMPARISON SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the E1/E2 comparison scope; runtime behavior and provider selection remain unconfirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR E1/E2 COMPARISON SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR E3 SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the E3 probe scope; Nexus fit and provider selection remain unconfirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR E3 SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR E3 EXECUTION-PLAN SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the E3 execution plan; the probe result remains subject to outside review.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR E3 EXECUTION-PLAN SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      } else if (verdict === 'CONFIRMED FOR CONCEPTUAL SCOPE') {
        rawLogs.push(`  NOTE: Acceptance is bounded to the conceptual scope; no implementation or product is confirmed.`);
        if (fullyAccepted !== 'yes' || currentAuthority !== 'yes' || acceptedScope === 'None' || rejectedScope === 'None') {
          fail(`CONFIRMED FOR CONCEPTUAL SCOPE schema rules violated for milestone "${rawMilestone}"!`);
        }
      }

      // Foundation 0.3.2a Specific Check
      if (rawMilestone.includes('Foundation 0.3.2a')) {
        if (verdict !== 'REJECTED' || fullyAccepted !== 'no' || acceptedScope !== 'None' || currentAuthority !== 'no') {
          fail(`Foundation 0.3.2a specific verdict check failed!`);
        } else {
          rawLogs.push(`  PASS: Foundation 0.3.2a specific verdict check passed.`);
        }
      }

      // Doctrine Repair 0.2.1 Specific Check
      if (rawMilestone.includes('Doctrine Repair 0.2.1')) {
        const requiredScopes = ['Four-Layer One-World Doctrine', 'LLM Wiki Doctrine', 'Software 3.0 Doctrine', 'Controlled AutoResearch Doctrine'];
        const hasAllScopes = requiredScopes.every(sc => acceptedScope.includes(sc));
        if (verdict !== 'PARTIAL PASS' || fullyAccepted !== 'no' || currentAuthority !== 'no' || !hasAllScopes) {
          fail(`Doctrine Repair 0.2.1 specific verdict check failed!`);
        } else {
          rawLogs.push(`  PASS: Doctrine Repair 0.2.1 specific verdict check passed (4 scopes confirmed).`);
        }
      }
    });

    // Active Under-Review Entry Rule: a milestone phase (one carrying a
    // "Foundation <version>" token) must have exactly one active UNDER OUTSIDE
    // REVIEW entry referencing that token. A released test-execution phase
    // (no token) must have zero active entries.
    const phaseToken = extractPhaseToken(phaseValue);
    if (phaseToken) {
      if (unresolvedCount !== 1) {
        fail(`Active UNDER OUTSIDE REVIEW entry count must be exactly 1 for milestone phase "${phaseToken}"! Got unresolvedCount=${unresolvedCount}`);
      } else if (!activeUnresolvedMilestone.includes(phaseToken)) {
        fail(`Active UNDER OUTSIDE REVIEW milestone "${activeUnresolvedMilestone}" does not reference current phase token "${phaseToken}"!`);
      } else {
        rawLogs.push(`  PASS: Active UNDER OUTSIDE REVIEW entry correctly isolated (${activeUnresolvedMilestone}).`);
      }
    } else {
      if (unresolvedCount !== 0) {
        fail(`Released gate phase must have zero active UNDER OUTSIDE REVIEW entries! Got unresolvedCount=${unresolvedCount} (${activeUnresolvedMilestone})`);
      } else {
        rawLogs.push(`  PASS: No active UNDER OUTSIDE REVIEW entry in released gate phase.`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Check 5: NEXT_ACTION.md single authorized action validation.
  // -------------------------------------------------------------------------
  rawLogs.push(`\n[Check 5] NEXT_ACTION.md Blockquote Parsing & Strict Validation...`);
  const nextActionContent = checkFileExists('state/NEXT_ACTION.md');

  if (nextActionContent) {
    const actionSection = nextActionContent.split(/## Single Authorized Action/)[1];
    if (!actionSection) {
      fail(`Missing ## Single Authorized Action header in NEXT_ACTION.md!`);
    } else {
      const blockquoteLines = actionSection.split(/\r?\n/).filter(line => line.trim().startsWith('>'));

      if (blockquoteLines.length !== 1) {
        fail(`Multiple or missing blockquote action statements in NEXT_ACTION.md (count=${blockquoteLines.length})!`);
      } else {
        const parsedActionText = blockquoteLines[0].replace(/^>\s*/, '').trim();
        rawLogs.push(`  Parsed Blockquote Action Text: "${parsedActionText}"`);

        const forbiddenPhrases = [
          'start cr-s0', 'execute cr-s0',
          'run the cold-start test now', 'execute the cold-start test',
          'run the cold-start test in this instance', 'use this write-back instance',
          'launch background', 'launch agents', 'launch runners', 'launch compilers', 'launch openclaw',
          'modify existing repository files', 'modify existing files', 'modify world files',
          'implement current knowledge', 'implement stigmergy', 'implement protocol runtime',
          'implement autoresearch', 'implement wiki'
        ];
        const lower = parsedActionText.toLowerCase();
        const hasForbidden = forbiddenPhrases.some(p => lower.includes(p));

        const phaseToken = extractPhaseToken(phaseValue);
        let referencesPhase = phaseToken ? lower.includes(phaseToken) : true;
        if (!referencesPhase && activeStage && Array.isArray(activeStage.actionReference) && activeStage.actionReference.length > 0) {
          referencesPhase = activeStage.actionReference.every(t => lower.includes(t));
        }

        if (hasForbidden || !referencesPhase) {
          fail(`NEXT_ACTION.md blockquote text invalid: forbidden phrase detected=${hasForbidden}, references current phase=${referencesPhase}`);
        } else {
          rawLogs.push(`  PASS: NEXT_ACTION.md single authorized action references current phase and contains no forbidden phrases.`);
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Check 6: CANDIDATE_REGISTRY.md evidence-level arithmetic.
  //
  // Verifies registry-internal consistency:
  //   registered count = E0 + E1-only + E2
  //   at-least-E1 count = E1-only + E2
  // and that the declared Summary Counts match the table-derived counts.
  // -------------------------------------------------------------------------
  rawLogs.push(`\n[Check 6] CANDIDATE_REGISTRY.md Evidence-Level Arithmetic...`);
  const registryRel = 'research/prior-art/e1-e2/CANDIDATE_REGISTRY.md';
  const registryPath = path.join(targetRoot, registryRel);

  if (!fs.existsSync(registryPath)) {
    fail(`CANDIDATE_REGISTRY.md missing: ${registryRel}`);
  } else {
    const regContent = fs.readFileSync(registryPath, 'utf8');
    const regLines = regContent.split(/\r?\n/);
    let e0 = 0;
    let e1Only = 0;
    let e2 = 0;

    regLines.forEach((line) => {
      if (line.startsWith('| ')) {
        const cols = line.split('|').map(v => v.trim());
        if (cols.length >= 4 && cols[1] && cols[1] !== 'candidate' && !cols[1].startsWith('-')) {
          const level = cols[3];
          if (level.startsWith('E2')) e2++;
          else if (level.startsWith('E1')) e1Only++;
          else if (level.startsWith('E0')) e0++;
        }
      }
    });

    function readSummary(label) {
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const m = regContent.match(new RegExp('- ' + escaped + ':\\s+(\\d+)'));
      return m ? parseInt(m[1], 10) : null;
    }

    const sumRegistered = readSummary('Candidates registered');
    const sumAtLeastE1 = readSummary('Reached at least E1');
    const sumE2 = readSummary('Reached E2');
    const sumE0 = readSummary('E0');

    const tableRegistered = e0 + e1Only + e2;
    const tableAtLeastE1 = e1Only + e2;

    rawLogs.push(`  Table counts: E0=${e0}, E1-only=${e1Only}, E2=${e2}, registered=${tableRegistered}, at-least-E1=${tableAtLeastE1}`);
    rawLogs.push(`  Summary counts: registered=${sumRegistered}, at-least-E1=${sumAtLeastE1}, E2=${sumE2}, E0=${sumE0}`);

    if (sumRegistered === null || sumAtLeastE1 === null || sumE2 === null || sumE0 === null) {
      fail(`CANDIDATE_REGISTRY.md summary counts missing or malformed!`);
    } else {
      if (tableRegistered !== e0 + e1Only + e2) {
        fail(`Registry registered arithmetic broken: E0=${e0}, E1-only=${e1Only}, E2=${e2}.`);
      }
      if (tableAtLeastE1 !== e1Only + e2) {
        fail(`Registry at-least-E1 arithmetic broken: E1-only=${e1Only}, E2=${e2}.`);
      }
      if (tableRegistered !== sumRegistered) {
        fail(`Registry registered count mismatch: table=${tableRegistered}, summary=${sumRegistered}`);
      }
      if (tableAtLeastE1 !== sumAtLeastE1) {
        fail(`Registry at-least-E1 count mismatch: table=${tableAtLeastE1}, summary=${sumAtLeastE1}`);
      }
      if (e2 !== sumE2) {
        fail(`Registry E2 count mismatch: table=${e2}, summary=${sumE2}`);
      }
      if (e0 !== sumE0) {
        fail(`Registry E0 count mismatch: table=${e0}, summary=${sumE0}`);
      }
      if (totalFailures === 0) {
        rawLogs.push(`  PASS: Registry evidence-level arithmetic and summary counts consistent.`);
      }
    }
  }

  rawLogs.push(`================================================================================`);
  rawLogs.push(`Verification Summary:`);
  rawLogs.push(`  Target Repository Root: ${targetRoot}`);
  rawLogs.push(`  Git Resolution Root: ${gitRoot}`);
  rawLogs.push(`  Active Gate Stage: ${activeStage ? activeStage.id : 'NONE'}`);
  rawLogs.push(`  Verified History Entries Count: ${verifiedHistoryEntriesCount}`);
  rawLogs.push(`  Active UNDER OUTSIDE REVIEW Milestone: ${activeUnresolvedMilestone}`);
  rawLogs.push(`  Total Failures: ${totalFailures}`);
  rawLogs.push(`  Script Exit Code: ${totalFailures === 0 ? 0 : 1}`);
  rawLogs.push(`================================================================================`);

  return {
    success: totalFailures === 0,
    failuresCount: totalFailures,
    activeStage: activeStage ? activeStage.id : null,
    activeMilestone: activeUnresolvedMilestone,
    verifiedEntriesCount: verifiedHistoryEntriesCount,
    logs: rawLogs
  };
}

// CLI Execution Block
if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const result = verifyRepository(root);
  const logPath = path.join(root, 'state', 'logs', 'state_consistency_verification.log');
  fs.writeFileSync(logPath, result.logs.join('\n'), 'utf8');

  console.log(result.logs.join('\n'));

  if (!result.success) {
    console.error(`ERROR: ${result.failuresCount} state consistency checks failed!`);
    process.exit(1);
  } else {
    console.log(`SUCCESS: All fail-closed verifier & state consistency checks passed!`);
    process.exit(0);
  }
}

module.exports = { verifyRepository, getVerdictRows, allowedVerdicts };
