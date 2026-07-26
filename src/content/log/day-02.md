---
day: 2
slug: day-2
title: Reading 43 minutes of human demonstrations
date: 2026-07-17
summary: Dissected the PushT dataset end to end — 206 episodes, 25,650 frames, storage formats, and what the action space actually means.
---

Before training anything, I wanted to know exactly what the model will learn
from. So day two was spent taking the `lerobot/pusht` dataset apart frame by
frame.

## What's in the box

- **206 episodes**, **25,650 frames**, recorded at **10 fps** — about
  **43 minutes** of a human pushing a block, total. That's the entire diet the
  policy gets. It still feels absurd to me that this is enough to learn
  anything, and in two days I get to find out how true that is.
- Images are stored as **(96, 96, 3) uint8** frames in AV1-encoded video, but
  the dataset delivers them to the model as **(3, 96, 96) float32** tensors
  scaled to [0, 1]. Same pixels, two very different shapes. Knowing which
  layer of the stack you're looking at saves real debugging time.
- Actions are **raw canvas coordinates in a 0–512 space**: target positions
  for the pusher, not joint angles, not deltas. Episode 0's actions span
  x ∈ [93, 375], y ∈ [71, 449].

## Episode zero, up close

Episode 0 occupies rows 0–160 of the dataset: 161 frames, 16.1 seconds. It is
an *imperfect* demonstration: the human overshoots, corrects, and still
lands the block. That imperfection is a feature: the dataset teaches recovery
behavior, not just the ideal path. I rendered it to a GIF, plotted the
trajectory, and stared at it for longer than I'd like to admit.

## API notes (LeRobot 0.6.0)

The docs and half the tutorials online refer to an older API, so for anyone
following along:

- The import is `lerobot.datasets.lerobot_dataset` — there's no `.common`
  anymore.
- `episode_data_index` is gone; per-episode row ranges live in
  `ds.meta.episodes[i]["dataset_from_index"]` / `["dataset_to_index"]`.
- Passing `episodes=[0]` to the dataset constructor loads a single episode,
  which makes poking at one episode fast.

**Worth remembering:** look at your training data at the level of individual
frames and actions before you spend GPU-hours on it. Everything I found today
(the coordinate action space, the imperfect demos, the format split) changes
how I'll read the training curves tomorrow.
