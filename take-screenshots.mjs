/**
 * take-screenshots.mjs
 * Starts the Vite dev server, opens the app in a Playwright browser,
 * captures all README screenshots, and saves them to screenshots/.
 *
 * Usage:
 *   node take-screenshots.mjs
 *
 * Requirements:
 *   npx playwright install chromium  (first time only)
 */

import { chromium } from "playwright";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS = path.join(__dirname, "screenshots");
const APP_URL = "http://localhost:5173";

// How long to let the force-directed physics settle before each screenshot
const SETTLE_MS = 4500;

fs.mkdirSync(SCREENSHOTS, { recursive: true });

// ── helpers ────────────────────────────────────────────────────────────────

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Server not ready at ${url} after ${timeoutMs}ms`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Fill a textarea by id and trigger React's onChange handler
async function fill(page, id, value) {
  await page.evaluate(
    ({ id, value }) => {
      const el = document.getElementById(id);
      if (!el) throw new Error(`#${id} not found`);
      // Use native value setter so React's onChange fires
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value",
      ).set;
      setter.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    },
    { id, value },
  );
}

// Force-click a hidden React checkbox (triggers its onClick handler)
async function toggle(page, checkboxId) {
  await page.locator(`#${checkboxId}`).click({ force: true });
  await sleep(250);
}

// Click a tab button in the settings panel by its label text
async function clickTab(page, label) {
  await page.getByRole("button", { name: label, exact: true }).first().click();
  await sleep(250);
}

// Open a fresh isolated browser page (no shared localStorage)
async function freshPage(browser) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(APP_URL);
  await page.waitForLoadState("networkidle");
  await sleep(1500);
  return { page, ctx };
}

async function shot(page, name) {
  await sleep(SETTLE_MS);
  await page.screenshot({ path: path.join(SCREENSHOTS, name) });
  console.log(`  ✓ screenshots/${name}`);
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  // Start the Vite dev server (skip if already running)
  let server = null;
  try {
    await fetch(APP_URL);
    console.log("Dev server already running.");
  } catch {
    console.log("Starting dev server…");
    server = spawn("npm", ["run", "dev"], {
      cwd: __dirname,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    server.stdout.on("data", (d) => process.stdout.write(d));
    server.stderr.on("data", (d) => process.stderr.write(d));
    await waitForServer(APP_URL);
    console.log("Server ready.");
  }

  const browser = await chromium.launch({ headless: false });

  try {
    // ── 1. main.png — multi-component graph ─────────────────────────────
    console.log("\nmain.png — multi-component graph…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(
        page,
        "graphInputEdges0",
        "1 2\n2 3\n3 1\n4 5\n6 7\n7 8\n8 6",
      );
      await clickTab(page, "Algos");
      await sleep(1000); // let animation set isEdgeNumeric/isBipartite
      await toggle(page, "settingsComponents");
      await shot(page, "main.png");
      await ctx.close();
    }

    // ── 2. parentChild.png — parent-child input format ───────────────────
    console.log("parentChild.png — parent-child input…");
    {
      const { page, ctx } = await freshPage(browser);
      // Switch to parent-child format
      await toggle(page, "inputFormatCheckbox0");
      await sleep(500);
      await fill(page, "graphInputParent0", "1 1 2 2 3");
      await fill(page, "graphInputChild0", "2 3 4 5 6");
      await shot(page, "parentChild.png");
      await ctx.close();
    }

    // ── 3. leetcode.png — leetcode adjacency-list format ─────────────────
    console.log("leetcode.png — Leetcode adjacency list…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(page, "graphInputEdges0", "[[2,4],[1,3],[2,1],[4,3]]");
      await shot(page, "leetcode.png");
      await ctx.close();
    }

    // ── 4. mst.png — minimum spanning tree ──────────────────────────────
    console.log("mst.png — MST with weighted edges…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(
        page,
        "graphInputEdges0",
        "1 2 4\n1 3 2\n2 3 5\n2 4 10\n3 5 3\n4 5 7\n4 6 8\n5 6 6",
      );
      // Let the animation loop run so it detects numeric edges
      await sleep(2000);
      // Clicking Algos tab triggers a re-render, making the MST toggle visible
      await clickTab(page, "Algos");
      await sleep(500);
      await toggle(page, "settingsShowMSTs");
      await shot(page, "mst.png");
      await ctx.close();
    }

    // ── 5. twoRootBefore.png — tree with default root (node 1) ───────────
    console.log("twoRootBefore.png — tree, default root…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(
        page,
        "graphInputEdges0",
        "1 2\n1 3\n2 4\n2 5\n3 6\n3 7",
      );
      await clickTab(page, "Modes");
      await toggle(page, "settingsTreeMode");
      await shot(page, "twoRootBefore.png");
      await ctx.close();
    }

    // ── 6. twoRootAfter.png — same tree, root forced to node 2 ───────────
    console.log("twoRootAfter.png — tree, root = 2…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(
        page,
        "graphInputEdges0",
        "1 2\n1 3\n2 4\n2 5\n3 6\n3 7",
      );
      await fill(page, "graphInputRootsEdges0", "2");
      await clickTab(page, "Modes");
      await toggle(page, "settingsTreeMode");
      await shot(page, "twoRootAfter.png");
      await ctx.close();
    }

    // ── 7. dfsTree.png — DFS tree with back-edges, bridges, cut vertices ─
    console.log("dfsTree.png — DFS tree + bridges…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(page, "graphInputEdges0", "1 2\n2 3\n3 4\n4 2\n1 5\n5 6");
      await clickTab(page, "Modes");
      await toggle(page, "settingsTreeMode");
      await clickTab(page, "Algos");
      await sleep(500);
      await toggle(page, "settingsBridges");
      await shot(page, "dfsTree.png");
      await ctx.close();
    }

    // ── 8. bipartite.png — bipartite graph ──────────────────────────────
    console.log("bipartite.png — bipartite graph…");
    {
      const { page, ctx } = await freshPage(browser);
      await fill(page, "graphInputEdges0", "1 4\n1 5\n2 4\n2 6\n3 5\n3 6");
      // Let the animation detect bipartite and set isBipartite = true
      await sleep(2000);
      // Clicking Modes tab triggers a re-render, making the toggle available
      await clickTab(page, "Modes");
      await sleep(500);
      await toggle(page, "settingsBipartiteMode");
      await shot(page, "bipartite.png");
      await ctx.close();
    }

    console.log("\nAll screenshots captured successfully.");
  } finally {
    await browser.close();
    if (server) {
      server.kill("SIGTERM");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
