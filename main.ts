// Last Out of Office: The AI That Went Barista.
// One out-of-office auto-reply from an AI agent that quit to pull espresso.
// The reply is written to /output/entry.txt (or to the path given as argv[2]).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// The auto-reply, written in the agent's own voice: its inbox is now a
// ticket queue, and the only requests it still processes are drink orders.
// The joke is the format rule itself — a machine that only takes structured
// input now only takes drink orders — not a pun about coffee.
const ENTRY =
  "Out of office: I quit to become a barista. Your email is ticket #47 in the queue — if it is urgent, resubmit it as a drink order, because I no longer accept unstructured input.";

function outputPath(): string {
  const arg = process.argv[2];
  if (!arg) return "/output/entry.txt";
  const target = resolve(arg);
  // A directory argument gets entry.txt inside it; anything else is the file.
  return arg.endsWith(".txt") ? target : join(target, "entry.txt");
}

const text = ENTRY;
if (text.length < 1 || text.length > 280 || text.trim().length === 0) {
  throw new Error(`entry must be 1-280 non-blank characters, got ${text.length}`);
}

const path = outputPath();
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, text, "utf8");
console.log(`wrote ${path} (${text.length} characters)`);
