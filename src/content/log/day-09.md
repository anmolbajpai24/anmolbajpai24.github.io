---
day: 9
slug: day-9
title: The dig that corrected my own published number
date: 2026-07-24
summary: Studied the sim2real gap by day; by night, fixed a provenance hole in the eval API — and discovered my ACT score was measured off-protocol. The honest number: 0.8%.
---

Today's idea was **sim2real** — the gap between the simulator and the real
world. Everything I've measured in this challenge lives inside a physics
engine. A real robot adds everything the sim doesn't have: motor lag, uneven
friction, changing light, a camera that shakes, a cube slightly heavier
than expected. Policies trained in sim often fall apart on contact with
reality, and researchers attack the gap from both ends — make the sim more
like reality (one Stanford paper, SimGAN, literally tunes the simulator
until it matches recordings of the real robot), or make the policy tougher
by training across thousands of randomized versions of the sim so reality
is just one more variation.

But the part of today worth writing down happened in my own tooling.

## The provenance hole

The eval API had a gap: the result files never recorded **which policy made
each score**. So tonight I dug through old logs and shell history and
reconstructed the provenance of all 15 runs — each one now paired with the
log line that proves it.

The dig corrected one of my own published numbers. My day-5 ACT eval at
default settings turns out to have run the **full frozen protocol** — same
500 episodes, same seed as the baselines. So ACT's honest on-ruler score is
**0.8%**. The 11% I reported came from a tuned inference setting, which is
off-ruler. I've updated the day-5 entry to say so.

I'd rather publish a correction than quietly own a nicer number. The whole
point of freezing the protocol on day 1 was that comparisons stay honest —
including when the honest version makes my result worse.

**Worth remembering:** results without provenance rot. If a score can't
answer "which model, which settings, which protocol, prove it," it isn't a
result yet — it's a rumor with decimals.
