---
day: 21
slug: day-21
title: Push, on a task I had to bring back first
date: 2026-08-05
summary: New task where the arm slides the cube to a target. The push environment was a deprecated stub, so I ported it back first. Then the day 16 recipe scored 494/500 = 98.8% on the frozen exam.
---

New task today: pushing. The arm has to slide the cube to a target spot on
the table instead of picking it up. The plan was to reuse the day 16 method
unchanged: a scripted teacher, 800 demos, the same small network, the frozen
500.

## The task didn't exist

The push task in the installed gym-xarm is a stub. The class has a docstring
that says "DEPRECATED: use only Lift for now" and everything under it is
commented out. The scene file still ships, though. So I ported the commented
code onto the current base class in a separate file and registered it as its
own environment. The installed package is untouched.

Its success check had the same bug as lift's. It compares the cube's
position in one frame with the goal's in another, so as written the cube is
always about 1.94m from the goal. I kept the original rule (cube within 5cm
of the goal) and put both positions in the same frame. Before training
anything I teleported the cube onto the goal and confirmed success fired.

## The teacher

My first scripted pusher scored 2/20. It decided it was behind the cube
using x and y only, so it switched to pushing while still up at travel
height and flew over the cube. Every failed episode ended with the cube
exactly where it spawned. Once it had to be down at push height first, it
scored 20/20.

It then gave 800 demos in 21 seconds and succeeded in 786 of them. I dropped
the rest.

## The result

Same tiny network as lift, with the target's position added to the input (10
numbers, up from 7), because the target moves every episode.

The first training run printed NaN from epoch 1. The target's height is the
same in every episode, so its standard deviation is 0, and my normalization
divided by it. I gave constant inputs a standard deviation of 1 and it
trained.

On the frozen exam: **494/500 = 98.8%**. All 6 failures ran into the
300-step cap. Lift was 99.0%.

The limits are the same as day 16. The sim gives the network the true
positions of the cube and the target, and no camera is involved. And the
environment is my port of code its maintainers had retired, not something
they support.
