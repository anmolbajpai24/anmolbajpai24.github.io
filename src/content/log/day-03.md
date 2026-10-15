---
day: 3
slug: day-3
title: Ten and a half hours on a laptop GPU
date: 2026-07-18
summary: Trained a 263M-parameter diffusion policy from scratch on the RTX 4060. 90,000 steps, loss 0.883 down to 0.002, and a near miss with a drive that wasn't mounted.
---

Training day. I trained a diffusion policy from scratch on the PushT dataset,
on the same laptop GPU that runs my evals.

## The run

| | |
|---|---|
| Steps | 90,000 (reference recipe: ~200,000) |
| Wall clock | 10 h 41 m (12:54 to 23:35) |
| Throughput | 2.34 steps/s, batch 64 |
| VRAM | ~5 GB of 8 GB |
| Parameters | 262,709,026 |
| Loss | 0.883 to 0.002 |
| Checkpoints | 9 |

I chose 90k steps because that's what fits in one long run on my hardware.
It's 45% of the reference recipe. I didn't know how much skill you get for
about half the compute, and tomorrow's frozen eval will tell me.

## The near miss

Checkpoints were set to write to my external drive at `/mnt/d`. I didn't
know that WSL doesn't auto-mount drives plugged in after boot. `/mnt/d`
didn't exist, and the run would have died at its first checkpoint write, an
hour in, while I assumed it was fine. I caught it by listing the directory
during preflight, and mounted the drive with `drvfs` while the trainer kept
running.

## LeRobot training gotchas

- `push_to_hub` defaults to true. If you don't want a half-trained policy
  uploaded to the Hugging Face Hub, you have to say so.
- The trainer takes no `--env.*` flags at all. In 0.6.0, evaluation is
  separate from training.
- `accelerate` isn't in the base install. Training needs the
  `lerobot[training]` extra.

The run finished at 23:35 with nine checkpoints and a loss that went from
0.883 to 0.002. That looks very good. Whether it means the policy can push a
block, I find out on day 4.

Since the drive scare, I only count a preflight check as done if I've seen
the command's output myself.
