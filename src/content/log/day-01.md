---
day: 1
slug: day-1
title: A pretrained policy, and a ruler I'm not allowed to touch
date: 2026-07-16
summary: Set up LeRobot on a Windows laptop, evaluated a pretrained diffusion policy on PushT, and froze the evaluation protocol every later model will be judged by — 61.0%.
---

Day one was about getting a real robot-learning policy running on my own
hardware and, more importantly, setting up a measuring stick I can trust for
the next three weeks.

The task is **PushT**: a simulated tabletop where a round pusher has to shove a
T-shaped block onto a target outline. It's a standard benchmark for imitation
learning — simple to describe, surprisingly hard to do well, because the block
rotates and slides in ways that punish sloppy contact.

## Setup

Everything runs in WSL2 (Ubuntu 24.04) on my Windows laptop with an RTX 4060
(8 GB). I used [LeRobot](https://github.com/huggingface/lerobot) 0.6.0 and
PyTorch with its bundled CUDA runtime — no separate toolkit install needed,
which was a pleasant surprise.

Two things bit me before the first episode ever rendered:

- LeRobot's pip extras are split by simulator **and** by policy. `[pusht]`
  gets you the environment but not the diffusion policy — that needs
  `[diffusion]` too.
- The official pretrained checkpoint (`lerobot/diffusion_pusht`) is in an old
  Hub format. On lerobot ≥ 0.4 it fails with a 404 for
  `policy_preprocessor.json`. The fix is a bundled migration script
  (`python -m lerobot.processor.migrate_policy_normalization`), which is easy
  once you know it exists and baffling until you do.

## The frozen ruler

A quick sanity run of 3 episodes gave 2 successes at about 48 seconds per
episode — the policy denoises its actions over 100 DDPM steps, so this is not
a fast benchmark on a laptop GPU.

Then the important part. I defined the evaluation protocol for the entire
challenge and froze it: **500 episodes, batch 4, synchronous environments,
seed 1000**. Under that protocol, the pretrained policy scores **61.0%**
(305/500).

That number is now the reference ruler. Every policy I train from here on gets
measured by exactly the same protocol — same seed, same episode count, no
exceptions. The temptation to "improve" the eval midway is exactly how people
end up with numbers that can't be compared to anything, so the protocol is
frozen even where it's imperfect.

**Worth remembering:** a failed episode can have a *higher* summed reward than
a successful one, because successes terminate early and stop accumulating
reward. Sum-of-reward is a trap on this benchmark; success rate and
max-reward-per-episode are the honest metrics.
