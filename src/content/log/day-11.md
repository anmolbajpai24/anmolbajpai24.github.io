---
day: 11
slug: day-11
title: ARCap, or the bottleneck actually widening
date: 2026-07-26
summary: Read ARCap from Karen Liu's lab at Stanford — a ghost robot in AR glasses that polices the embodiment gap while the data is being collected, not after.
---

Halfway through the challenge, and I keep running into Professor Karen
Liu's name — her Stanford lab works on humanoids learning whole-body skills
from human motion. So today I picked one paper from her lab (with Li
Fei-Fei's group) and went through it properly: **ARCap**.

It attacks the exact bottleneck I wrote about yesterday. Robot
demonstrations are expensive because a human has to drive the robot. The
cheap alternative — recording your own bare hands, no robot present —
produces data the robot's body often can't execute, because a human and a
robot are built differently. That's day 6's embodiment gap again, showing
up at data-collection time.

## The ghost robot

Their fix: you demonstrate with bare hands wearing an AR headset, and a
**virtual robot shadows your every move in real time**. The moment your
motion breaks the robot's limits — out of reach, would collide with the
table — the system flashes and buzzes. The embodiment gap gets policed
*while* you collect the data, not discovered afterward when processing it.

The results that got me: in a 20-person user study, novices produced
robot-executable data in their first sessions. A diffusion policy — same
architecture I trained on day 3 — learned a cluttered-scene task from **30
minutes of ARCap data**. Zero teleoperation anywhere.

It doesn't abolish the human — you still need a person, a headset, and
calibration. But it turns demonstration collection into something you can
hand to twenty strangers and get a working dataset back. That's the
bottleneck actually widening, not just shifting.

Everything's open source: paper, code, models, data at
[tml.stanford.edu/ARCap](https://tml.stanford.edu/ARCap).

**Worth remembering:** the papers that feel most useful right now aren't
the ones with the biggest benchmark wins — they're the ones that move a
constraint. Cheaper trustworthy data beats a cleverer architecture fed by
the same starved pipeline.
