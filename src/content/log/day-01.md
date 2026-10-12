---
day: 1
slug: day-1
title: A pretrained policy, and a ruler I'm not allowed to touch
date: 2026-07-16
summary: Set up LeRobot on a Windows laptop, evaluated a pretrained diffusion policy on PushT, and froze the evaluation protocol every later model gets judged by. It scored 61.0%.
---

Day one had two jobs: get a real robot-learning policy running on my own
laptop, and set up a way of measuring that I can trust for the next three
weeks.

The task is PushT. A round pusher has to shove a T-shaped block onto a target
outline on a simulated tabletop. It's a standard benchmark for imitation
learning. It's easy to describe and harder than it looks, because the block
rotates and slides, and a sloppy push sends it the wrong way.

## Setup

Everything runs in WSL2 (Ubuntu 24.04) on my Windows laptop with an RTX 4060
(8 GB). I used [LeRobot](https://github.com/huggingface/lerobot) 0.6.0 and
PyTorch with its bundled CUDA runtime, so I didn't need a separate toolkit
install. I had expected to.

Two things went wrong before the first episode rendered:

- LeRobot's pip extras are split by simulator and by policy. `[pusht]` gets
  you the environment but not the diffusion policy. That needs `[diffusion]`
  as well.
- The official pretrained checkpoint (`lerobot/diffusion_pusht`) is in an old
  Hub format. On lerobot 0.4 and later it fails with a 404 for
  `policy_preprocessor.json`. The fix is a bundled migration script
  (`python -m lerobot.processor.migrate_policy_normalization`). It's easy
  once you know it exists. I didn't, for a while.

## The frozen ruler

A quick sanity run of 3 episodes gave 2 successes at about 48 seconds per
episode. The policy denoises its actions over 100 DDPM steps, so this is not
a fast benchmark on a laptop GPU.

Then I defined the evaluation protocol for the whole challenge and froze it:
500 episodes, batch 4, synchronous environments, seed 1000. Under that
protocol the pretrained policy scores **61.0%** (305/500).

That number is the reference. Every policy I train from here gets measured
the same way, same seed, same episode count. If I change the eval halfway
through, the new numbers can't be compared with the old ones, so it stays
frozen even where it's imperfect.

One thing I noticed in the results: a failed episode can have a higher summed
reward than a successful one, because a success ends the episode early and
stops collecting reward. So I'm ignoring summed reward on this benchmark and
reading success rate and max reward per episode.
