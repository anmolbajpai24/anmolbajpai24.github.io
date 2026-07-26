---
day: 5
slug: day-5
title: A second architecture, and the setting that mattered more than training
date: 2026-07-20
summary: Trained ACT in under 2 hours — then watched the same trained model score 0% or 11% depending on a single inference setting.
---

New architecture day. ACT predicts a whole *chunk* of future moves in one
shot — one network call per decision instead of a hundred. Instead of
deciding one move, looking again, and deciding the next, it commits to a
short burst of moves and executes them before re-planning.

The training run was almost anticlimactic after day 3: **under 2 hours**
where diffusion took ten and a half, **52M parameters** against diffusion's
263M. Training loss looked perfect.

Then the first eval scored **basically 0%** — one win in 350 episodes.

## The fix wasn't retraining

By default, ACT predicts 100 moves and executes all 100 blind before looking
again. That's fine for the slow bimanual arm it was designed for. On PushT,
where the block reacts to every push, executing 100 moves without looking
means acting on a world that has already changed.

Same trained model, one setting changed — how many moves it makes before
stopping to look:

| Execute before re-looking | Success rate |
|---|---|
| 1 move (look every step) | 0% — too twitchy to build a push |
| 100 moves (all blind) | 0% — shoving at empty space |
| 8 moves, then look | 11% |

Nothing retrained. Just how often it checks what actually happened.

So the scoreboard read: pretrained diffusion 61%, my diffusion 40%, my ACT
11%. ACT is a bad fit for this task and that's the honest result — it's
built for high-frequency arm control, not reactive pushing.

*(Day-9 me has a correction coming: that 11% was measured under a tuned
inference setting, not the frozen protocol. ACT's honest on-ruler number
turns out to be 0.8%. The story of finding that out is its own entry.)*

**Worth remembering:** inference-time configuration can swing a policy's
performance as hard as architecture choice. "How good is the model?" is an
incomplete question — it's the model *plus* how you let it act.
