---
day: 9
slug: day-9
title: The dig that corrected my own published number
date: 2026-07-24
summary: Read about the sim2real gap during the day. At night I fixed a provenance hole in the eval API and found my ACT score had been measured off-protocol. The honest number is 0.8%.
---

Today's idea was sim2real, the gap between the simulator and the real world.
Everything I've measured in this challenge lives inside a physics engine. A
real robot adds everything the sim doesn't have: motor lag, uneven friction,
changing light, a camera that shakes, a cube slightly heavier than expected.
Policies trained in sim often fall apart on contact with reality.
Researchers attack the gap from both ends. One is to make the sim more like
reality (a Stanford paper, SimGAN, tunes the simulator until it matches
recordings of the real robot). The other is to make the policy tougher by
training it across thousands of randomized versions of the sim, so reality
is just one more variation.

The bigger thing today happened in my own tooling.

## The provenance hole

The eval API had a gap: the result files never recorded which policy made
each score. So tonight I dug through old logs and shell history and
reconstructed it for all 15 runs. Each one is now paired with the log line
that proves it.

The dig also corrected one of my own published numbers. My day 5 ACT eval at
default settings turns out to have run the full frozen protocol, same 500
episodes, same seed as the baselines. So ACT's honest on-ruler score is
**0.8%**. The 11% I reported came from a tuned inference setting, which is
off-ruler. I've updated the day 5 entry to say so.

I'd rather publish the correction than keep the nicer number. I froze the
protocol on day 1 so that comparisons would stay honest, and that has to
hold when the honest version makes my result worse.

From now on a score doesn't go on the board unless I can say which model and
settings produced it, under which protocol, with a log line to back it.
