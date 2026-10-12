---
day: 2
slug: day-2
title: Reading 43 minutes of human demonstrations
date: 2026-07-17
summary: Took the PushT dataset apart. 206 episodes, 25,650 frames, how it's stored, and what the action numbers mean.
---

Before training anything, I wanted to know exactly what the model learns
from. So I spent day two going through the `lerobot/pusht` dataset frame by
frame.

## What's in the box

- 206 episodes, 25,650 frames, recorded at 10 fps. That's about
  **43 minutes** of a human pushing a block, and it's everything the policy
  gets. It still seems too little to learn anything from. In two days I find
  out.
- Images are stored as (96, 96, 3) uint8 frames in AV1-encoded video, but the
  dataset hands them to the model as (3, 96, 96) float32 tensors scaled to
  [0, 1]. Same pixels, different shapes. It helps to know which of the two
  you're looking at when something breaks.
- Actions are raw canvas coordinates in a 0 to 512 space. They are target
  positions for the pusher, not joint angles and not deltas. Episode 0's
  actions span x from 93 to 375 and y from 71 to 449.

## Episode zero, up close

Episode 0 takes up rows 0 to 160 of the dataset: 161 frames, 16.1 seconds. It
isn't a clean demonstration. The human overshoots, corrects, and still lands
the block. That's useful, because it means the dataset contains recoveries
as well as the ideal path. I rendered it to a GIF, plotted the trajectory,
and looked at it for longer than I'd like to admit.

## API notes (LeRobot 0.6.0)

The docs and half the tutorials online use an older API. For anyone
following along:

- The import is `lerobot.datasets.lerobot_dataset`. There's no `.common`
  anymore.
- `episode_data_index` is gone. Per-episode row ranges live in
  `ds.meta.episodes[i]["dataset_from_index"]` and `["dataset_to_index"]`.
- Passing `episodes=[0]` to the dataset constructor loads a single episode,
  which makes poking at one episode fast.

I'm glad I did this before spending GPU hours. The actions being raw
coordinates and the demos being imperfect both change how I'll read
tomorrow's training curves.
