// One-Line Office Joke Laugh-Off — make.fun entry
// Writes one funny office joke to /output/entry.txt.
// The joke twists "stand up for yourself": the raise request is answered
// with furniture, so the worker is literally standing — still underpaid.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I asked for a raise and got a standing desk, so now I can stand up for myself while still being underpaid.";

function validateJoke(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
}

function main(): void {
  validateJoke(LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`wrote ${LINE.length} characters to ${outPath}`);
}

main();
