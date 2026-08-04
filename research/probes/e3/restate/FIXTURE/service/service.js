import { endpoint, object } from "@restatedev/restate-sdk";
import { appendFileSync, writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const TRACE_FILE = process.env.RS_TRACE_FILE;

function trace(step) {
  if (TRACE_FILE) {
    try {
      appendFileSync(TRACE_FILE, `${new Date().toISOString()} ${step}\n`);
    } catch {}
  }
}

const COUNTER_FILE = process.env.RS_COUNTER_FILE;

async function readCount() {
  try {
    return Number(readFileSync(COUNTER_FILE, "utf8")) || 0;
  } catch {
    return 0;
  }
}

async function bumpCount() {
  const c = (await readCount()) + 1;
  writeFileSync(COUNTER_FILE, String(c), "utf8");
  return c;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const WORKSPACE_DIR = process.env.RS_WORKSPACE_DIR;

function touchWorkspace(path, content) {
  const abs = `${WORKSPACE_DIR}/${path}`;
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content, "utf8");
}

const workItem = object({
  name: "WorkItem",
  handlers: {
    // Step 1: create a bounded Work Item with dependency edges
    async init(ctx, { id, deps, title }) {
      ctx.set("deps", deps);
      ctx.set("title", title);
      ctx.set("status", "CREATED");
      return { id, status: "CREATED", deps, title };
    },

    // Step 3: claim (atomic/exclusive per key via virtual object serialization)
    async claim(ctx, { claimant }) {
      const existing = await ctx.get("claimant");
      if (existing && existing !== claimant) {
        return { claimed: false, reason: "already-claimed", claimant: existing };
      }
      ctx.set("claimant", claimant);
      ctx.set("status", "CLAIMED");
      return { claimed: true, claimant, status: "CLAIMED" };
    },

    // Steps 4+5: establish an Attempt and persist one intermediate state inside it
    async startAttempt(ctx, { attemptId }) {
      ctx.set("attemptId", attemptId);
      ctx.set("status", "IN_PROGRESS");
      const partial = await ctx.run("do-portion", async () => {
        trace("RUN do-portion executed");
        await sleep(200);
        return { done: 1, intermediate: "portion-1" };
      });
      ctx.set("intermediate", partial.intermediate);
      return { attemptId, status: "IN_PROGRESS", intermediate: partial.intermediate };
    },

    // Durable execution with journaled steps + durable timers (used for crash test)
    async runDurable(ctx, { attemptId, steps }) {
      ctx.set("attemptId", attemptId);
      ctx.set("status", "RUNNING");
      let progress = 0;
      for (let i = 0; i < steps; i++) {
        const r = await ctx.run(`step-${i}`, async () => {
          trace(`RUN step-${i} executed`);
          await sleep(600);
          return { step: i };
        });
        await ctx.sleep(1800);
        await ctx.set("progress", i + 1);
        progress = i + 1;
      }
      ctx.set("status", "COMPLETED");
      return { attemptId, progress, status: "COMPLETED" };
    },

    // Retry lineage test: durable step that fails transiently then succeeds
    async flaky(ctx, { attemptId }) {
      ctx.set("attemptId", attemptId);
      ctx.set("status", "RETRYING");
      const res = await ctx.run("flaky-step", async () => {
        const count = await readCount();
        await bumpCount();
        trace(`RUN flaky-step executed attempt#${count}`);
        if (count < 3) {
          throw new Error("transient failure");
        }
        return { ok: true, attempts: count };
      }, { maxRetryAttempts: 10 });
      ctx.set("flakyResult", res);
      ctx.set("status", "DONE");
      return res;
    },

    // External workspace interaction: handler performs its own side effect.
    // Restate does NOT journal external state; only the invocation result is journaled.
    async touchWorkspace(ctx, { path, content }) {
      trace("HANDLER touchWorkspace invoked");
      touchWorkspace(path, content);
      return { wrote: path };
    },

    // Step 9: submit an Output
    async finish(ctx, { output }) {
      ctx.set("output", output);
      ctx.set("status", "DONE");
      return { status: "DONE", output };
    },

    // Read current K/V state for one work item key
    async state(ctx) {
      return {
        deps: await ctx.get("deps"),
        title: await ctx.get("title"),
        status: await ctx.get("status"),
        claimant: await ctx.get("claimant"),
        attemptId: await ctx.get("attemptId"),
        intermediate: await ctx.get("intermediate"),
        progress: await ctx.get("progress"),
        output: await ctx.get("output"),
        flakyResult: await ctx.get("flakyResult"),
      };
    },
  },
});

endpoint()
  .bind(workItem)
  .listen(9080)
  .then(() => trace("SERVICE listening on 9080"))
  .catch((e) => {
    trace(`SERVICE error ${e}`);
    throw e;
  });
