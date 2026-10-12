---
day: 20
slug: day-20
title: An episode player next to the numbers
date: 2026-08-04
summary: Built the episode player. Six rollout clips, one per storyline, from the first pretrained run to the sighted network, each next to the number it produced.
---

Today's job was the episode player, so the rollout videos sit next to the
numbers they produced. One clip per storyline, from the first pretrained run
to the sighted network.

It's done. I built it with Claude Code, like the leaderboard. There are
**six clips**:

- pretrained diffusion on PushT (61.0%)
- my 90k-step diffusion policy on PushT (39.8%)
- my ACT policy on PushT (0.8%)
- pretrained ACT passing the cube between two arms, its best episode (7/10)
- the sighted network lifting the cube (99.0%)
- the blind control failing the same lift (4.2%)

The ACT clip is episode 0, which happens to be one of its 4 wins in 500, so
it's labeled as a rare success.

Nothing gets re-run to show these. The player reads mp4 files the evals
already saved. The clips are a fixed list behind a `/videos` endpoint, and
the file route only serves paths on that list, so it can't be used to read
anything else off the disk. I checked that with a path that tries to climb
out of the folder, and it got a 404.
