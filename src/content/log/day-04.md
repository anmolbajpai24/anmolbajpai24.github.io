---
day: 4
slug: day-4
title: 39.8%, and a plateau the loss curve hid
date: 2026-07-19
summary: My own policy scored 39.8% under the frozen protocol. The interesting part — skill stopped improving at 50k steps while the loss kept falling for the rest of the run.
---

Eval day. My from-scratch policy, measured by the same frozen protocol as the
pretrained reference: **39.8%** (199/500). The reference scores 61.0%.

So 45% of the reference training bought about 65% of the reference skill.
I'll take it. But the headline number turned out to be the least interesting
thing I learned today.

## The plateau

I swept the intermediate checkpoints (150 episodes each, quick-and-dirty but
consistent):

| Checkpoint | Success rate |
|---|---|
| 10k steps | 10.0% |
| 30k steps | 34.7% |
| 50k steps | 43.3% |
| 70k steps | 43.3% |
| 90k (final, frozen protocol) | 39.8% |

Skill plateaued by 50,000 steps. Meanwhile the loss kept falling through the
entire back half of the run, 0.005 down to 0.002, looking for all the world
like the model was still improving.

It wasn't lying, exactly. Loss and success rate grade different exams. Loss
measures per-frame imitation on states a *human* visited; success rate
measures 300-step rollouts through states the *policy itself* reaches,
compounding error included. The back half of those ten GPU-hours polished an
answer to the wrong question.

(To be precise: it's a plateau, not a decline. The 43.3% → 39.8% drop is
within sampling error at these episode counts — I'm not going to claim a
degradation I can't statistically back.)

## How mine fails vs. how the reference fails

The failure modes differ more than the success rates suggest:

- My policy **whiffs completely** — never even touches the block — in 16 of
  500 episodes. The pretrained reference does that once in 500.
- Average max-reward per episode: **0.845** (mine) vs **0.945** (reference).
  The reference's failures are photo-finishes; a meaningful share of mine are
  total misses.

## An open question I'm banking, not answering

Four of my episodes reached max-reward ≈ 1.0 — the block essentially on
target — and still counted as failures. Either the policy nudges the block
off after arriving, or success requires *holding* position in a way I don't
yet understand. I'm writing that down instead of hand-waving an explanation;
it goes on the list for a later day.

**Worth remembering:** the metric you optimize is a proxy, and it will
happily keep improving after the thing you care about has stopped. The only
way I caught this was having a frozen, comparable eval: the ruler from day 1
doing the job it was frozen for.
