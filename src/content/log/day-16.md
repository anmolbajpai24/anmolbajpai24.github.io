---
day: 16
slug: day-16
title: Same benchmark, with the cube's position added
date: 2026-07-31
summary: Trained two identical networks on the same 800 scripted demos. The one given the cube's position scored 99.0% on the frozen benchmark and the one without it scored 4.2%. The position comes from the sim, not from a camera.
---

My guess for yesterday's 0 was that the network couldn't read the cube's
position. Today I tested that. The plan: add the cube's position to what the
network sees, then run the same 500-episode benchmark with the same seeds.
If sight was the problem, the number goes up.

I checked the dataset first. There is no cube position in it anywhere. The
state is hand xyz plus gripper, and the only other thing in there is the
84x84 image. So the network was blind, confirmed. It also meant I couldn't
add the cube to the existing demos. I needed new ones.

## New demos

Yesterday's scripted policy, the one that asks the sim where the cube is and
moves to it, played 800 episodes while I recorded the cube's position along
with everything else. It succeeded in 793 of them and I dropped the other 7.
The demos use seeds 5000 to 5799, so none of the benchmark's seeds (1000 to
1499) were trained on.

Then I trained two networks on those demos with the same recipe as
yesterday. One gets 7 numbers, with the cube's xyz included. The other gets
the same demos with the cube stripped out, so 4 numbers. The second one is
the control. It shows how much of any improvement comes from the better
teacher alone.

Seeing, here, means the sim tells the network the cube's true position. It
is not looking through a camera.

## Results

Same 500-episode benchmark, same seeds:

| Network | Demos from | Sees the cube? | Success |
|---|---|---|---|
| Yesterday's network | TD-MPC agent | no | 0/500 = 0.0% |
| New network, blind | scripted policy | no | 21/500 = 4.2% |
| New network, sighted | scripted policy | yes | 495/500 = **99.0%** |

The two new networks share the teacher, the demos, the architecture and the
training recipe. The cube's position in the input is the only difference
between 4.2% and 99.0%. The better teacher on its own moved the score from
0.0% to 4.2%.

One thing I didn't expect: the sighted network lifts in about 130 steps, and
its teacher takes about 181. The scripted policy switches phases on a step
timer. The network can't see a timer, so it reacts to where things are and
finishes about 50 steps sooner.

Reading the cube's position off the camera image is the part I haven't done.
