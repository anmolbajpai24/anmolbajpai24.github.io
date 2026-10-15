---
day: 8
slug: day-8
title: Building the tool that stops my numbers from lying
date: 2026-07-23
summary: Started an eval harness, because three times in one week my own numbers misled me. By midnight I had one URL listing all 15 runs, read live from the result files.
---

Today I started building an eval harness. It's the tool that tracks my
benchmark numbers so I don't have to trust my own bookkeeping.

I need one because my numbers misled me three times this week:

- The loss curve said my diffusion policy was improving when its success
  rate had gone flat (day 4).
- The same trained ACT model scored 0% or 11% depending on one inference
  setting (day 5).
- A 70% from ten episodes looks better than a 61% from five hundred, even
  though it's backed by far fewer games.

None of these are unusual. They're what happens when results live in
scattered folders and I eyeball them. The fix is the same one I use for game
economies at work: one source of truth, and a UI that reads the real state
instead of a copy of it.

By midnight the first version worked. One URL lists all **15 evals** I ran
this week, read live from the result files: success rates, episode counts,
rewards, videos. There are no copy-pasted numbers in it.

This starts the second phase of the challenge. The plan for weeks 2 and 3 is
to grow it into a proper eval dashboard over every run, the kind of tool
that would have shown me the day 4 plateau while it was happening.
