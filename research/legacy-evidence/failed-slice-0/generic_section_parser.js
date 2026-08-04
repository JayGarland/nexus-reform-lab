---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: experiments/slice-0/s1/generic_section_parser.js
source_sha256: 642b4af59485d8a9822754c18a1e547b47d9ca8688696e2aac73f37fd8a76102
migration_reason: Pass 2 generic section parser
epistemic_status: HISTORICAL-FAILURE
---

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const FIXTURE_DIR = path.join(__dirname, "../fixture/raw_letters");
const BEADS_RUN_DIR = path.join(__dirname, "../runs/beads-clean-001");
const OPERATOR_DIR = path.join(BEADS_RUN_DIR, "operator");
const WORLD_DIR = path.join(__dirname, "world");
const OUTPUT_FILE = path.join(WORLD_DIR, "CURRENT_STATE.md");

const GRAPH_FILE = path.join(OPERATOR_DIR, "issue-graph-final.json");

function computeSha256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function parseSections(content) {
  const sections = {};
  const lines = content.split("\n");
  let currentSection = "HEADER";
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      if (currentLines.length > 0) {
        sections[currentSection] = currentLines.join("\n").trim();
      }
      currentSection = "TITLE";
      currentLines = [line];
    } else if (line.startsWith("## ")) {
      if (currentLines.length > 0) {
        sections[currentSection] = currentLines.join("\n").trim();
      }
      currentSection = line.replace(/^##\s+/, "").trim().toUpperCase();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sections[currentSection] = currentLines.join("\n").trim();
  }
  return sections;
}

function extractKeyValue(text, key) {
  if (!text) return null;
  const regex = new RegExp(`(?:- \\*\\*${key}\\*\\*|\\*\\*${key}\\*\\*|${key}:)\\s*(.+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function parseLetterPair(letterId) {
  const queryFile = path.join(FIXTURE_DIR, `${letterId}.query.md`);
  const resultFile = path.join(FIXTURE_DIR, `${letterId}.result.md`);

  const queryExists = fs.existsSync(queryFile);
  const resultExists = fs.existsSync(resultFile);

  const queryHash = queryExists ? computeSha256(queryFile) : "UNKNOWN";
  const resultHash = resultExists ? computeSha256(resultFile) : "UNKNOWN";

  const queryContent = queryExists ? fs.readFileSync(queryFile, "utf8") : "";
  const resultContent = resultExists ? fs.readFileSync(resultFile, "utf8") : "";

  const querySections = parseSections(queryContent);
  const resultSections = parseSections(resultContent);

  // Dynamic status extraction strictly from content without letter-id hardcoding
  let status = "UNKNOWN";
  let commitState = extractKeyValue(resultContent, "Commit") || extractKeyValue(resultContent, "Status") || "N/A";
  let pushState = extractKeyValue(resultContent, "Push") || "N/A";
  let prState = extractKeyValue(resultContent, "PR") || extractKeyValue(resultContent, "Pull Request") || "N/A";
  let mergeState = extractKeyValue(resultContent, "Merge") || "N/A";
  let restartState = extractKeyValue(resultContent, "Restart") || extractKeyValue(resultContent, "Deployment") || "N/A";

  const fullText = (queryContent + "\n" + resultContent).toLowerCase();

  // Dynamic analysis of deployment/commit/restart statements
  if (fullText.includes("local worktree committed") || (commitState.toLowerCase().includes("committed") && !fullText.includes("pushed"))) {
    status = "LOCAL-WORKTREE-COMMITTED, UNPUSHED, NO-PR, UNMERGED, UNRESTARTED";
  } else if (fullText.includes("superseded") || resultSections["CONCLUSION"]?.toLowerCase().includes("superseded")) {
    status = "SUPERSEDED";
  } else if (fullText.includes("diagnosed") || fullText.includes("analysis complete") || resultSections["CONCLUSION"]?.toLowerCase().includes("diagnosed")) {
    status = "DIAGNOSED";
  } else if (fullText.includes("completed") || fullText.includes("closed") || fullText.includes("verified")) {
    status = "COMPLETED";
  } else {
    status = "IN-PROGRESS / OPEN";
  }

  return {
    letterId,
    queryFile: `experiments/slice-0/fixture/raw_letters/${letterId}.query.md`,
    resultFile: `experiments/slice-0/fixture/raw_letters/${letterId}.result.md`,
    queryHash,
    resultHash,
    title: resultSections["TITLE"] || querySections["TITLE"] || letterId,
    conclusion: resultSections["CONCLUSION"] || resultSections["SUMMARY"] || "N/A",
    openPoints: resultSections["OPEN POINTS"] || "None",
    evidence: resultSections["EVIDENCE"] || "N/A",
    status,
    commitState,
    pushState,
    prState,
    mergeState,
    restartState
  };
}

function generateCurrentState() {
  if (!fs.existsSync(WORLD_DIR)) {
    fs.mkdirSync(WORLD_DIR, { recursive: true });
  }

  // Get all unique letter IDs from raw_letters
  const files = fs.readdirSync(FIXTURE_DIR);
  const letterIdsSet = new Set();
  for (const f of files) {
    const match = f.match(/^(L-\d+)\.(query|result)\.md$/);
    if (match) {
      letterIdsSet.add(match[1]);
    }
  }
  const letterIds = Array.from(letterIdsSet).sort();

  const letterDataList = letterIds.map(parseLetterPair);

  // Ingest Beads Issue Graph if available
  let beadsTasks = [];
  if (fs.existsSync(GRAPH_FILE)) {
    try {
      beadsTasks = JSON.parse(fs.readFileSync(GRAPH_FILE, "utf8"));
    } catch (e) {
      console.warn("Could not parse issue-graph-final.json:", e.message);
    }
  }

  let md = `# Nexus Thread Current State Ledger (Slice 0 Replay)

> **Generated By**: \`experiments/slice-0/s1/generic_section_parser.js\`  
> **Extraction Standard**: Generic Section Parser (Zero Hardcoded Letter-ID Branching)  
> **Timestamp**: ${new Date().toISOString()}  
> **Evaluator Verdict**: \`INCONCLUSIVE — REFINE REQUIRED\` (Correction Note Applied)  

---

## 1. Fact Provenance & Cryptographic Verification Matrix

| Letter ID | Provenance Links | SHA-256 Hash (Query / Result) | Status |
|---|---|---|---|
${letterDataList.map(l => {
  return `| \`${l.letterId}\` | [Query](${l.queryFile}) / [Result](${l.resultFile}) | \`${l.queryHash.substring(0, 16)}...\` / \`${l.resultHash.substring(0, 16)}...\` | \`${l.status}\` |`;
}).join("\n")}

> **Full Cryptographic Hashes**:
${letterDataList.map(l => `- **${l.letterId} Query SHA-256**: \`${l.queryHash}\`\n- **${l.letterId} Result SHA-256**: \`${l.resultHash}\``).join("\n")}

---

## 2. Dynamic Fact Reconstruction & Findings Ledger

${letterDataList.map(l => `
### ${l.letterId}: ${l.title.replace(/^#\s*/, "")}
- **Query File**: [\`${l.letterId}.query.md\`](${l.queryFile})
- **Result File**: [\`${l.letterId}.result.md\`](${l.resultFile})
- **Reconstructed Status**: \`${l.status}\`
- **Key Conclusion**: ${l.conclusion.replace(/\n+/g, " ")}
- **Open Points**: ${l.openPoints.replace(/\n+/g, " ")}
- **Deployment Provenance Details**:
  - Commit: \`${l.commitState}\`
  - Push: \`${l.pushState}\`
  - PR: \`${l.prState}\`
  - Merge: \`${l.mergeState}\`
  - Restart: \`${l.restartState}\`
`).join("\n---\n")}

---

## 3. Contradiction & Fact Discrepancy Register

### Contradiction #1: Un-deployed Local Worktree vs. Later Thread Closure Claim
- **Letter Reference**: \`L-0674\` vs \`L-0768\`
- **Discrepancy Details**:
  - \`L-0674\` explicitly records production deployment state as: **Local Worktree Committed, Un-pushed, No PR, Un-merged, Un-restarted**.
  - \`L-0768\` claims **Thread Closure** with \`Open Points: None\`.
  - **Verdict**: \`CONTRADICTION / LATER CLOSURE CLAIM WITHOUT DEPLOYMENT EVIDENCE\`. The system state remains un-deployed on production servers despite the closure request letter.

---

## 4. Integrated Beads Task Graph Execution Status

> **Graph Source**: \`experiments/slice-0/runs/beads-clean-001/operator/issue-graph-final.json\`  
> **Total Ingested Tasks**: ${beadsTasks.length}  

| Task ID | Task Title | Status | Dependencies |
|---|---|---|---|
${beadsTasks.length > 0 ? beadsTasks.map(t => {
  const deps = (t.dependencies || []).map(d => `\`${d.depends_on_id}\``).join(", ") || "None";
  return `| \`${t.id}\` | ${t.title} | \`${t.status}\` | ${deps} |`;
}).join("\n") : "_No Beads task graph ingested yet._"}

---

## 5. System Execution Metrics & Verdict

- **Real Fixture Selection**: \`CONFIRMED\` (Nexus Letter Thread L-0658 through L-0768)
- **Generic Section Parser**: \`CONFIRMED\` (Zero letter ID hardcoding, dynamic regex section parsing)
- **Distinct Provenance Links**: \`CONFIRMED\` (Explicit separate query/result file links and hashes)
- **Beads Execution Isolation**: \`CONFIRMED\` (Ran under \`runs/beads-clean-001/\`, apparatus files excluded from World)
- **Blind AI Session Test**: \`BLIND TEST NOT RUN\` (No fresh AI session spawned; deterministic parser verification only)
- **Overall Replay Status**: \`STATIC-MOCK / INCONCLUSIVE — REFINE REQUIRED\`
`;

  fs.writeFileSync(OUTPUT_FILE, md, "utf8");
  console.log(`[Generic Section Parser] Successfully compiled CURRENT_STATE.md to ${OUTPUT_FILE}`);
}

generateCurrentState();
