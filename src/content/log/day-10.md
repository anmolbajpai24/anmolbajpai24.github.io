---
day: 10
slug: day-10
title: A three-row table the API can't accidentally corrupt
date: 2026-07-25
summary: Studied Human2Robot — learning robot skills from human video. Then finished the eval API: a /summary endpoint that structurally refuses to compare unlike things.
---

Today's idea: **Human2Robot** — teaching robots from humans directly.

The 43 minutes of demonstrations my policies learned from required a human
to sit there and drive the robot — teleoperation, one demo at a time.
Every dataset like it is made the same way. That's the bottleneck of
imitation learning: robot data doesn't exist until someone manufactures it,
slowly, by hand.

Meanwhile the internet holds millions of hours of humans just doing things
— cooking, folding, fixing, pouring. Human2Robot's bet is learning from
that directly: watch a human video, extract what the hands did, translate
it to a robot's body. No teleoperation at all. The hard part is the
translation — my hands aren't grippers, my arm isn't their arm, and video
shows what happened, not the forces behind it.

## The eval API is finished

Three new endpoints tonight: `/summary` serves the headline table, per-run
metrics come as chart-ready arrays, and my day-4 skill curve is now served
live from the actual result files.

The design decision I care about most: **the summary table has exactly
three rows** — the only runs tested under identical settings.

| Policy | Frozen-protocol success |
|---|---|
| Pretrained diffusion | 61.0% |
| My diffusion (day 3) | 39.8% |
| My ACT (day 5) | 0.8% |

Everything else stays visible in the API, just labeled as tested under
different settings — so the table *can't* accidentally compare unlike
things. After day 9's provenance dig, I wanted that rule enforced by the
structure of the data, not by me remembering it.
