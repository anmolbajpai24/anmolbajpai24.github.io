---
day: 15
slug: day-15
title: 0 out of 500
date: 2026-07-30
summary: Finished the loop, trained a small network on the arm dataset and ran the first 500-episode benchmark for this environment. It scored 0 out of 500. A scripted policy that reads the cube's true position scored 20/20, so the benchmark works and my policy doesn't.
---

The plan: finish the training loop, train the small network on the arm
dataset, then set up a benchmark for this environment with fixed episodes
and fixed seeds, and run the first exam on it.

## The network and the benchmark

The network is a plain MLP: 4 numbers in, two hidden layers of 128, 4
numbers out. It only gets the state, not the image. I trained it for 40
epochs with Adam and a squared-error loss. Final training loss was 0.358.

The benchmark follows the PushT one: 500 episodes, episode i reset with seed
1000 + i, and a 300-step cap. Success means the cube ends up at least 15cm
above where it spawned. I had to patch the environment's own success check
first. As shipped, it compared the cube's height in one coordinate frame
against a threshold in another, so it could never pass.

Score: **0 out of 500**.

Before blaming the environment, I checked it. I wrote a scripted policy that
cheats: it reads the cube's true position from the simulator and moves to
it. That scored 20/20 on the same setup. So the environment works, and my
policy has the problem.

## Two causes

First, the network can't see the cube. The state in the dataset is where the
robot's own hand is, plus the gripper angle. The cube's position isn't in
it. Each cube spawns somewhere random, so the best the network could learn
from 800 demos was the average routine: reach to where cubes usually sit,
close, lift. It reaches for the usual spot, grabs air, and can't correct,
because it has no idea where the cube is. The rollout videos show this.

Second, the teacher only ever used extremes. Its gripper commands are
exactly +1 or -1. But situations that looked the same to the network
sometimes came with a +1 and sometimes a -1, and squared error punishes big
misses, so the network learned to answer with the safe middle. A gripper
commanded to half-close never grips anything.

Tomorrow I test the first cause.
