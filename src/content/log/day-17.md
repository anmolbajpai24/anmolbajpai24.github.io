---
day: 17
slug: day-17
title: 1,000 tasks in a day, mostly without training
date: 2026-08-01
summary: Read a paper from a lab at Imperial that taught one robot arm 1,000 tasks in a day, one demo per task. They mostly stopped training networks and retrieve the closest demo they already have.
---

A lab at Imperial says they taught one robot arm 1,000 tasks in a day, with
one demo per task. I spent today reading their paper to find out how. It's
[Learning a Thousand Tasks in a Day](https://arxiv.org/abs/2511.10110), by
Dreczkowski et al.

The trick is that they mostly stopped training networks. Every task splits
in two: align the gripper to the object, then replay what the human's demo
did. When a new task shows up, the robot retrieves the closest demo it
already has and doesn't learn from scratch.

The numbers they report: one demo per task, **1,000 tasks**, under 24 hours
of human demo time, checked with over 5,000 real rollouts. They report 10x
better data efficiency than behavior cloning when demos are scarce.

Behavior cloning is what I did on days 15 and 16. I used 800 demos for one
task, and my network still had to be told where the cube was. The replay
half reminded me of day 12, where my own replay missed the cube by about
2cm.

I only read the paper. I didn't run any of it.
