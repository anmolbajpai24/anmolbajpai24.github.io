---
day: 11
slug: day-11
title: ARCap, or the bottleneck actually widening
date: 2026-07-26
summary: Read ARCap from Karen Liu's lab at Stanford. A ghost robot in an AR headset checks the embodiment gap while the data is being collected, not after.
---

Halfway through the challenge, and I keep running into Professor Karen
Liu's name. Her Stanford lab works on humanoids learning whole-body skills
from human motion. So today I picked one paper from her lab (with Li
Fei-Fei's group) and went through it properly: ARCap.

It goes after the bottleneck I wrote about yesterday. Robot demonstrations
are expensive because a human has to drive the robot. The cheap alternative
is recording your own bare hands with no robot present, but that produces
data the robot's body often can't execute, because a human and a robot are
built differently. That's day 6's embodiment gap again, showing up at
data-collection time.

## The ghost robot

Their fix: you demonstrate with bare hands while wearing an AR headset, and
a virtual robot shadows your every move in real time. The moment your motion
breaks the robot's limits (out of reach, or about to collide with the
table), the system flashes and buzzes. So the embodiment gap gets caught
while you collect the data, not afterward when you process it.

The results that got me: in a 20-person user study, novices produced
robot-executable data in their first sessions. A diffusion policy, the same
architecture I trained on day 3, learned a cluttered-scene task from
**30 minutes** of ARCap data, with no teleoperation anywhere.

It doesn't remove the human. You still need a person, a headset and
calibration. But you can hand the collection job to twenty strangers and get
a working dataset back, which makes the bottleneck wider and doesn't just
move it somewhere else.

Everything's open source: paper, code, models and data at
[tml.stanford.edu/ARCap](https://tml.stanford.edu/ARCap).

This is the kind of paper I find most useful right now, one that makes good
robot data cheaper to collect.
