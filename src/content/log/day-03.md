---
day: 3
slug: day-3
title: Ten and a half hours on a laptop GPU
date: 2026-07-18
summary: Trained a 262M-parameter diffusion policy from scratch on the RTX 4060 — 90,000 steps, loss 0.883 → 0.002, and a near-miss with a missing drive mount.
---

Training day. I trained a diffusion policy from scratch on the PushT dataset,
on the same laptop GPU that runs my evals.

## The run

| | |
|---|---|
| Steps | 90,000 (reference recipe: ~200,000) |
| Wall clock | 10 h 41 m (12:54 → 23:35) |
| Throughput | 2.34 steps/s, batch 64 |
| VRAM | ~5 GB of 8 GB |
| Parameters | 262,709,026 |
| Loss | 0.883 → 0.002 |
| Checkpoints | 9 |

I chose 90k steps because that's what fits in one long run on my hardware.
That's 45% of the reference recipe, which sets up a question I genuinely
didn't know the answer to: how much of the skill do you get for half the
compute? Tomorrow's frozen eval answers that.

## The near-miss

Checkpoints were configured to write to my external drive at `/mnt/d`. What I
didn't know: **WSL does not auto-mount drives that were plugged in after
boot**. `/mnt/d` simply didn't exist, and the run would have died at its
first checkpoint write, an hour in — silently, while I was busy trusting it.
I caught it by listing the directory during preflight, and mounted the drive
with `drvfs` live under the running trainer.

## LeRobot training gotchas

- `push_to_hub` defaults to **true**. If you don't want your half-trained
  policy uploaded to the Hugging Face Hub, you have to say so explicitly.
- The trainer takes no `--env.*` flags at all — evaluation is a separate
  concern from training in 0.6.0.
- `accelerate` isn't in the base install; training needs the
  `lerobot[training]` extra.

The run finished at 23:35 with nine checkpoints and a loss curve that looked
almost suspiciously good (0.883 down to 0.002). Whether a beautiful loss
curve means a policy that can push a block, I find out on day 4.

**Worth remembering:** a preflight answer is pasted output, not "yes it
works." If I haven't seen the command's output, the check didn't happen.
