---
day: 14
slug: day-14
title: Writing the training loop by hand
date: 2026-07-29
summary: Started writing a training loop myself, on a third simulator where a single arm lifts a cube. Loaded the dataset, checked shapes and ranges, and spent the evening on batching, normalization and the optimizer.
---

Until now, training has been a command I run. Today I started writing the
loop myself, because I want to know what that machinery is. Show the network
a situation, it guesses a move, measure how wrong the guess was, nudge every
weight a little, repeat across thousands of examples.

I'm doing it on LeRobot's third simulator, a single arm (an xarm) that lifts
a cube, with its ready-made dataset, `lerobot/xarm_lift_medium`.

## Tonight

I got the simulator and the dataset loaded and checked the shapes and ranges
before writing any training code. There are 800 episodes and 20,000
frames. Each frame has an 84x84 image, a 4-number state (the hand's xyz and
the gripper angle) and a 4-number action, each between -1 and 1. The demos
come from a trained RL agent (TD-MPC), not a human, and the quality is
mixed: final reward per episode runs from -0.05 to 1.35, with a mean of
0.39.

The rest of the evening went on the concepts the loop needs before the code
makes sense.

Batching first. The network doesn't learn from one example at a time. It
looks at a few hundred at once (256 in my loop) and takes one step on their
average error, so one odd example can't drag the weights around.

Then why networks want normalized numbers. The raw state values sit in
different ranges. The hand's x runs from about 1.2 to 1.8 and its y from
about -0.06 to 0.5. I rescale each one to mean 0 and standard deviation 1,
so an input doesn't count for more because its numbers happen to be bigger.

Last, what the optimizer does with a gradient. The gradient says, for every
weight, which direction makes the error smaller. The optimizer (Adam here)
decides how big a step to take that way.

The loop isn't finished. Tomorrow I complete it, train the network, and set
up a benchmark for this environment.
