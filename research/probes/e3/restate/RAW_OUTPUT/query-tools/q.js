import { readFileSync, writeFileSync } from "node:fs";
import { tableFromIPC } from "apache-arrow";

async function runQuery(sql, outFile) {
  const res = await fetch("http://localhost:9070/query", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  const buf = new Uint8Array(await res.arrayBuffer());
  const text = new TextDecoder().decode(buf);
  if (!res.ok) {
    return { status: res.status, error: text, binary: false };
  }
  if (buf.length === 0) return { status: res.status, empty: true };
  const arrowMagic = buf.slice(0, 6).join(",");
  if (arrowMagic === "65,82,82,79,87,49") {
    const table = tableFromIPC(buf);
    const rows = table.toArray().map((r) => r?.toJSON?.() ?? r);
    const json = JSON.stringify(rows, null, 2);
    if (outFile) writeFileSync(outFile, json);
    return { status: res.status, rows, json, binary: true };
  }
  return { status: res.status, text, binary: false };
}

const sql = process.argv[2];
const out = process.argv[3];
const r = await runQuery(sql, out);
console.log(JSON.stringify(r, null, 2));
