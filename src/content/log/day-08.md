---
day: 8
slug: day-8
title: Building the tool that stops my numbers from lying
date: 2026-07-23
summary: Started an eval harness, because three times in one week my own numbers misled me. By midnight: one URL listing all 15 runs, read live from the result files.
---

Today I started building an eval harness — the tool that tracks my
benchmark numbers so I don't have to trust my own bookkeeping.

I need one because my numbers kept misleading me this week, three different
ways:

- The **loss curve** said my diffusion policy was improving when its success
  rate had gone flat (day 4).
- The **same trained ACT model** scored 0% or 11% depending on one inference
  setting (day 5).
- A **70% from ten episodes** looks better than a 61% from five hundred,
  even though it's backed by far fewer games.

None of those are exotic failures. They're what happens by default when
results live in scattered folders and a human eyeballs them. The fix is the
same as it was for the game economies I build at work: one source of truth,
and interfaces that render *state* instead of assumptions.

By midnight the first version worked: **one URL that lists all 15 evals I
ran this week, read live from the result files** — success rates, episode
counts, rewards, videos. No copy-pasted numbers anywhere.

This kicks off the second phase of the challenge: the plan for weeks 2–3 is
to grow this into a proper eval dashboard over every run in the challenge —
the tool that would have caught the day-4 plateau in real time instead of
in hindsight.
