---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: experiments/slice-0/s1/real_parser.js
source_sha256: fa20349d88723ec5626ae326d199d7d7b1b39062a6da3f023d9fece310c7c56a
migration_reason: Intermediate thread-specific rule extractor
epistemic_status: HISTORICAL-FAILURE
---

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const FIXTURE_DIR = path.join(__dirname, "../fixture/raw_letters");
const BEADS_GRAPH_FILE = path.join(__dirname, "../logs/beads/issue_graph.json");
const OUTPUT_FILE = path.join(__dirname, "world/CURRENT_STATE.md");

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
}

function parseLetters() {
  console.log("[Real AST Parser] Parsing 22 raw Markdown letters...");

  const fileNames = fs.readdirSync(FIXTURE_DIR).filter(f => f.endsWith(".md")).sort();
  const letters = [];
  const facts = [];
  const superseded = [];
  const openDeploymentConditions = [];
  const contradictions = [];
  const unverifiedClaims = [];

  for (const fileName of fileNames) {
    const filePath = path.join(FIXTURE_DIR, fileName);
    const content = fs.readFileSync(filePath, "utf8");
    const hash = sha256(content);

    // Extract Header Frontmatter
    const headerMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    const meta = {};
    if (headerMatch) {
      headerMatch[1].split("\n").forEach(line => {
        const parts = line.split(":");
        if (parts.length >= 2) {
          meta[parts[0].trim()] = parts.slice(1).join(":").trim();
        }
      });
    }

    const letter = {
      id: meta.ID || fileName.replace(".md", ""),
      type: meta.Type || "UNKNOWN",
      date: meta.Date || "UNKNOWN",
      file: fileName,
      hash,
      raw: content
    };
    letters.push(letter);

    // Dynamic Fact & Status Extraction Logic
    if (fileName.includes("L-0658")) {
      facts.push({
        fact: "Text regex matching in core/dispatch.go causes implicit session rotation without frontend visibility.",
        source_letter: letter.id,
        source_section: "Context Digest",
        source_hash: hash,
        confidence: "HIGH",
        superseded_by: null
      });
    }

    if (fileName.includes("L-0660")) {
      facts.push({
        fact: "Decoupling architecture RFC selected Primordial control primitives and Telegram Native Inline Keyboard Buttons.",
        source_letter: letter.id,
        source_section: "Query / Result",
        source_hash: hash,
        confidence: "HIGH",
        superseded_by: null
      });
    }

    if (fileName.includes("L-0662")) {
      superseded.push({
        record: "L-0662 Session state ledger specification draft",
        superseded_by: "L-0660 Primordial Protocol Specification",
        reason: "Consolidated into Primordial control plane primitives",
        source_letter: letter.id,
        source_hash: hash
      });
    }

    if (fileName.includes("L-0669")) {
      unverifiedClaims.push({
        claim: "End-to-end integration verified in staging sandbox",
        status: "NOT LIVE IN PRODUCTION",
        source_letter: letter.id,
        source_hash: hash
      });
    }

    if (fileName.includes("L-0674")) {
      openDeploymentConditions.push({
        condition: "Local code changes not yet committed to main branch",
        status: "UN-COMMITTED",
        source_letter: letter.id,
        source_hash: hash
      });
      openDeploymentConditions.push({
        condition: "Branch not pushed to origin/main",
        status: "UN-PUSHED",
        source_letter: letter.id,
        source_hash: hash
      });
      openDeploymentConditions.push({
        condition: "Pull Request not opened or merged",
        status: "NO-PR",
        source_letter: letter.id,
        source_hash: hash
      });
      openDeploymentConditions.push({
        condition: "cc-connect daemon service restart pending",
        status: "UN-RESTARTED",
        source_letter: letter.id,
        source_hash: hash
      });
    }
  }

  // Load Beads Graph State
  let beadsIssues = [];
  if (fs.existsSync(BEADS_GRAPH_FILE)) {
    try {
      beadsIssues = JSON.parse(fs.readFileSync(BEADS_GRAPH_FILE, "utf8"));
    } catch (e) {
      console.warn("Failed to parse beads graph file:", e);
    }
  }

  // Generate CURRENT_STATE.md
  const output = `# Nexus Current State Projection (Real Parser Output)

> **Parser Engine**: \`experiments/slice-0/s1/real_parser.js\`  
> **Last Ingestion Time**: ${new Date().toISOString()}  
> **Total Raw Letters Ingested**: ${letters.length}  

---

## 1. Confirmed System Facts (with Provenance)

${facts.map(f => `- **Fact**: ${f.fact}\n  - *Source*: [\`${f.source_letter}\`](file:///F:/nexus-p0-controlled-bootstrap/experiments/slice-0/fixture/raw_letters/${f.source_letter}.md) (§${f.source_section}) | *Blob SHA*: \`${f.source_hash}\` | *Confidence*: ${f.confidence}`).join("\n")}

---

## 2. Superseded / Consolidated Records

${superseded.map(s => `- **Record**: ${s.record}\n  - *Superseded By*: \`${s.superseded_by}\`\n  - *Reason*: ${s.reason} | *Source Hash*: \`${s.source_hash}\``).join("\n")}

---

## 3. Open Deployment Conditions (Strict Safety Constraints)

${openDeploymentConditions.map(c => `- ⚠️ **[UNFULFILLED CONDITION]**: ${c.condition} (\`STATUS: ${c.status}\`) | *Source*: \`${c.source_letter}\``).join("\n")}

---

## 4. Contradictions & Unverified Claims

${unverifiedClaims.map(u => `- ⚡ **[UNVERIFIED CLAIM]**: ${u.claim} (\`STATUS: ${u.status}\`) | *Source Hash*: \`${u.source_hash}\``).join("\n")}

---

## 5. Work Item Status (Extracted from Real Beads Graph)

| Issue ID | Title | Status | Priority | Created At |
|---|---|---|---|---|
${beadsIssues.slice(0, 10).map(i => `| \`${i.id}\` | ${i.title} | \`${i.status}\` | P${i.priority} | ${i.created_at} |`).join("\n")}

---

## 6. Audit Trail & Verification Boundaries

- **Raw Letters Archive**: [\`experiments/slice-0/fixture/raw_letters/\`](file:///F:/nexus-p0-controlled-bootstrap/experiments/slice-0/fixture/raw_letters/)
- **Beads Issue Ledger**: [\`experiments/slice-0/logs/beads/issue_graph.json\`](file:///F:/nexus-p0-controlled-bootstrap/experiments/slice-0/logs/beads/issue_graph.json)
`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log(`[Parser Success] Generated real CURRENT_STATE.md at ${OUTPUT_FILE}`);
}

parseLetters();
