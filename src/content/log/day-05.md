---
day: 5
slug: day-5
title: A second architecture, and the setting that mattered more than training
date: 2026-07-20
summary: Trained ACT in under 2 hours, then watched the same trained model score 0% or 11% depending on one inference setting.
---

New architecture day. ACT predicts a whole chunk of future moves in one shot,
so it's one network call per decision instead of a hundred. Instead of
deciding one move, looking again and deciding the next, it commits to a
short burst of moves and executes them before re-planning.

After day 3 the training run was quick: under 2 hours where diffusion took
ten and a half, and 52M parameters against diffusion's 263M. Training loss
looked perfect.

Then the first eval scored basically **0%**. One win in 350 episodes.

## The fix wasn't retraining

By default, ACT predicts 100 moves and executes all 100 blind before looking
again. That's fine for the slow bimanual arm it was designed for. On PushT
the block reacts to every push, so after 100 moves without looking, the
policy is acting on a world that has already changed.

Same trained model, one setting changed, which is how many moves it makes
before stopping to look:

| Execute before re-looking | Success rate |
|---|---|
| 1 move (look every step) | 0%, too twitchy to build a push |
| 100 moves (all blind) | 0%, shoving at empty space |
| 8 moves, then look | 11% |

Nothing was retrained. The only change was how often it checks what
happened.

So the scoreboard read: pretrained diffusion 61%, my diffusion 40%, my ACT
11%. ACT is a bad fit for this task, and that's the honest result. It's
built for high-frequency arm control, not reactive pushing.

*(Correction from day 9: that 11% was measured under a tuned inference
setting, not the frozen protocol. ACT's number on the frozen protocol is
0.8%. Day 9's entry covers how I found that out.)*

I hadn't expected an inference setting to matter this much. From now on,
when I report a score I'll report the settings it was run with.
