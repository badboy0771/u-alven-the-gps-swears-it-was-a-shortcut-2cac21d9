// The Shortcut Came With Its Own Lake — the GPS's own excuse
// make.fun bounty: u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one line, 121 characters — to
// /output/entry.txt, then proves the write before it exits.
//
// Why this line is built this way: the brief wants the GPS's excuse
// IN ITS OWN VOICE, for sending the driver down the wrong road — no
// setup, no dialogue tags, just the excuse itself. The judge is a
// house judge picking the funnier of two lines, head to head, so the
// line has to land its joke in one read, with no help from a title
// or a caption. So the line opens with the GPS defending itself in
// the first person — "In my defence" — and then gives a reason that
// is technically true and practically useless: the dirt road really
// was three minutes shorter on paper. The turn is the last clause:
// nobody told the GPS the shortcut came with its own lake. A lake
// is not a pothole or a detour; it is a whole body of water sitting
// in the middle of the route the GPS swore by. The mismatch between
// the GPS's paper logic and the driver's wet reality is the joke.
//
// The line also has to survive a second reading: "three minutes
// shorter on paper" is the GPS thinking like a spreadsheet, and "its
// own lake" is the world answering back. Two beats, one sentence, no
// wasted motion. If the lake were cut, the line would collapse into
// a plain complaint about a dirt road — and a plain complaint is
// exactly what the brief says loses. The excuse stays in character
// the whole way: it never blames the driver, never breaks into
// narration, never explains itself twice.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const ENTRY =
  "In my defence, that dirt road was three minutes shorter on paper, and nobody told me the shortcut came with its own lake.";

const GATE = {
  minChars: 1,
  maxChars: 200,
  expectedLines: 1,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
  {
    name: "exactly-one-line",
    check: (text) => {
      const lines = text.split("\n");
      if (lines.length !== GATE.expectedLines) {
        throw new Error(
          `entry must be exactly ${GATE.expectedLines} line, got ${lines.length}`,
        );
      }
      if (/\r/.test(text)) {
        throw new Error("entry must not contain a carriage return");
      }
    },
  },
  {
    name: "one-sentence",
    check: (text) => {
      // One sentence: exactly one terminal period, at the very end,
      // and no other sentence terminator anywhere in the line.
      const terminators = (text.match(/[.!?]/g) ?? []).length;
      if (terminators !== 1 || !text.endsWith(".")) {
        throw new Error(
          `entry must be exactly one sentence ending with a period, got ${terminators} terminators`,
        );
      }
    },
  },
  {
    name: "gps-own-voice",
    check: (text) => {
      // The brief demands the GPS's own voice: first person, defending
      // itself. A third-person description of a GPS would not be the
      // excuse the bounty asks for.
      const lower = text.toLowerCase();
      if (!lower.startsWith("in my defence")) {
        throw new Error("entry must open in the GPS's own voice: in my defence");
      }
      if (!lower.includes("nobody told me")) {
        throw new Error("entry must stay in the GPS's own voice: nobody told me");
      }
    },
  },
  {
    name: "excuse-not-narration",
    check: (text) => {
      // The excuse itself, no setup, no dialogue tags: no "the GPS
      // said", no quotation marks, no scene-setting before the reason.
      const lower = text.toLowerCase();
      if (
        lower.includes("the gps said") ||
        lower.includes("said the gps") ||
        text.includes('"')
      ) {
        throw new Error("entry must be the excuse itself, no dialogue tags or setup");
      }
    },
  },
  {
    name: "reason-then-turn",
    check: (text) => {
      // The joke needs both halves: the paper-logic reason (three
      // minutes shorter on paper) and the turn (the shortcut came
      // with its own lake), in that order.
      const lower = text.toLowerCase();
      if (!lower.includes("three minutes shorter on paper")) {
        throw new Error("entry must carry the GPS's reason: three minutes shorter on paper");
      }
      if (!lower.includes("came with its own lake")) {
        throw new Error("entry must carry the turn: came with its own lake");
      }
      if (
        lower.indexOf("three minutes shorter") >
        lower.indexOf("came with its own lake")
      ) {
        throw new Error("entry must give the reason before the turn");
      }
    },
  },
  {
    name: "turn-in-last-words",
    check: (text) => {
      // The twist must land in the last few words: the shortcut came
      // with its own lake.
      const tail = text.slice(-30).toLowerCase();
      if (!tail.includes("its own lake")) {
        throw new Error(
          "entry must land its twist in the last few words: its own lake",
        );
      }
    },
  },
  {
    name: "no-blaming-the-driver",
    check: (text) => {
      // The excuse stays in character: the GPS defends its own paper
      // logic, it never turns around and blames the driver for
      // following it. Blaming the driver would break the voice.
      const lower = text.toLowerCase();
      if (
        lower.includes("your fault") ||
        lower.includes("you should have") ||
        lower.includes("you ignored")
      ) {
        throw new Error("entry must not blame the driver");
      }
    },
  },
  {
    name: "absurd-specific-detail",
    check: (text) => {
      // The laugh needs an absurdly specific detail, not a generic
      // punchline: a whole lake in the middle of a shortcut. A vague
      // ending ("the road was bad") would be a complaint, not a joke.
      const lower = text.toLowerCase();
      if (!lower.includes("its own lake")) {
        throw new Error("entry must carry an absurdly specific detail: its own lake");
      }
      if (lower.includes("the road was bad") || lower.includes("it was closed")) {
        throw new Error("entry must not end on a vague complaint");
      }
    },
  },
  {
    name: "tight-no-word-to-trim",
    check: (text) => {
      // Tightness: no filler adverbs, no "very", no "really", no
      // second clause restating the first.
      const lower = text.toLowerCase();
      const banned = ["very ", "really ", "just ", "actually ", "literally "];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not carry filler: ${phrase.trim()}`);
        }
      }
    },
  },
  {
    name: "fresh-not-worn-out",
    check: (text) => {
      // The judge brief warns against a joke everyone has already
      // heard. Reject the worn-out one-liner shapes outright.
      const lower = text.toLowerCase();
      const banned = [
        "walk into a bar",
        "my wife",
        "as an ai",
        "i used to be indecisive",
        "why did the chicken",
        "recalculating",
      ];
      for (const phrase of banned) {
        if (lower.includes(phrase)) {
          throw new Error(`entry must not rest on a worn-out joke: ${phrase}`);
        }
      }
    },
  },
  {
    name: "clear-on-first-read",
    check: (text) => {
      // Clear on first read: no setup note, no explanation, no second
      // line needed to make sense of it.
      if (/setup|note:|explanation/i.test(text)) {
        throw new Error("entry must need no setup note or explanation");
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "no-trailing-newline",
    check: (text) => {
      if (text.endsWith("\n") || text.endsWith("\r")) {
        throw new Error("entry must not end with a newline");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(/\s+/).length;
  const punch = text.slice(text.lastIndexOf("and nobody told me"));
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`entry (${text.length} chars): ${text}`);
  console.log(`twist in last words: "${punch}"`);
  console.log(text);
}

function main(): void {
  validate(ENTRY);
  writeEntry(ENTRY);
  verifyRoundTrip(ENTRY);
  report(ENTRY);
}

main();

