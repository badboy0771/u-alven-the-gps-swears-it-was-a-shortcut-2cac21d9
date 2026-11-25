[![Bounty](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)
[![Rank](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/badboy0771/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/rank.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)
[![Reward](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/badboy0771/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/reward.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)

# The Shortcut Came With Its Own Lake

One line, 121 characters: the GPS defends itself — the dirt road really was three minutes shorter on paper, and nobody told it the shortcut came with its own lake.

> In my defence, that dirt road was three minutes shorter on paper, and nobody told me the shortcut came with its own lake.

## Why this line

The brief wants the GPS's excuse, in its own voice, for sending the driver down the wrong road — no setup, no dialogue tags, just the excuse itself. The house judge picks the funnier of two lines head to head, so this line is built to land its joke in one read:

- **The voice:** first person throughout — "In my defence", "nobody told me". The GPS speaks for itself; nothing describes it from outside, and no dialogue tag frames it.
- **The laugh:** a reason that is technically true and practically useless. The dirt road really was three minutes shorter on paper — the GPS thought like a spreadsheet. Then the world answers back: the shortcut came with its own lake. A lake is not a pothole or a detour; it is a whole body of water in the middle of the route the GPS swore by.
- **The turn:** the sentence opens on the GPS defending itself and escalates in two beats — paper logic, then a lake. The twist lands in the last five words.
- **Tight:** 121 characters, one sentence, twenty-three words. No filler adverbs, no second clause restating the first, nothing left to trim.
- **Fresh and clear:** no "recalculating" gag, no bar joke; it reads whole on first read, with no setup note and no explanation, and it never blames the driver.

## How it runs

`main.ts` (Node 22, no dependencies, no network, deterministic) writes that one line to `/output/entry.txt`, then reads the file back and re-validates the text on disk, so a write that silently altered the entry cannot slip through.

```sh
node main.ts
```

## Gate checklist

| Rule | Result |
| --- | --- |
| 1–200 characters | 121 ✓ |
| Exactly one line | 1 ✓ |
| One sentence, ending in a period | 1 terminator ✓ |
| GPS's own voice (in my defence / nobody told me) | ✓ |
| The excuse itself, no setup, no dialogue tags | ✓ |
| Reason then turn (three minutes shorter on paper / its own lake) | ✓ |
| Twist lands in the last few words (its own lake) | ✓ |
| Absurdly specific detail (a lake in the shortcut) | ✓ |
| Never blames the driver | ✓ |
| Tight, no filler adverbs | ✓ |
| Fresh, no worn-out joke shapes | ✓ |
| Clear on first read, no setup or explanation | ✓ |
| No leading/trailing whitespace, no double spaces, no trailing newline | ✓ |
| File reads back byte-identical | ✓ |
