---
day: 4
slug: day-4
title: 39.8%, and a plateau the loss curve hid
date: 2026-07-19
summary: My own policy scored 39.8% under the frozen protocol. Skill stopped improving at 50k steps while the loss kept falling for the rest of the run.
---

Eval day. My from-scratch policy, measured by the same frozen protocol as the
pretrained reference, scored **39.8%** (199/500). The reference scores 61.0%.

So 45% of the reference training got about 65% of the reference skill. I'll
take it. The checkpoint sweep was more interesting than the final number,
though.

## The plateau

I evaluated the intermediate checkpoints too (150 episodes each, a rougher
count but the same settings every time):

| Checkpoint | Success rate |
|---|---|
| 10k steps | 10.0% |
| 30k steps | 34.7% |
| 50k steps | 43.3% |
| 70k steps | 43.3% |
| 90k (final, frozen protocol) | 39.8% |

Skill plateaued by 50,000 steps. The loss kept falling through the whole
back half of the run, from 0.005 down to 0.002. Going by the loss alone, I
would have said the model was still improving.

Loss and success rate measure different things. Loss measures per-frame
imitation on states a human visited. Success rate measures 300-step rollouts
through states the policy itself reaches, with its errors compounding. The
last four hours of training improved the first and did nothing for the
second.

(To be precise: this is a plateau, not a decline. The drop from 43.3% to
39.8% is within sampling error at these episode counts, so I'm not claiming
the policy got worse.)

## How mine fails vs. how the reference fails

The failures differ more than the success rates suggest:

- My policy misses completely, never touching the block, in 16 of 500
  episodes. The pretrained reference does that once in 500.
- Average max reward per episode is 0.845 for mine and 0.945 for the
  reference. The reference's failures are mostly near misses. A good share
  of mine are total misses.

## An open question I haven't answered

Four of my episodes reached a max reward of about 1.0, with the block
essentially on target, and still counted as failures. Either the policy
nudges the block off after arriving, or success means holding position in a
way I don't understand yet. I don't know which, so I'm writing it down for a
later day instead of guessing.

I only caught the plateau because the eval was frozen and comparable across
checkpoints. The loss would never have shown it.
