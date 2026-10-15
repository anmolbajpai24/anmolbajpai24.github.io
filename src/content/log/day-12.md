---
day: 12
slug: day-12
title: A phone video of my hands, replayed on the sim robot
date: 2026-07-27
summary: Filmed my hands passing a matchbox, tracked them with MediaPipe and replayed the motion on the two-armed sim. It scored 0 for all 33 seconds and never touched the cube. Closest approach was about 2cm.
---

Two days ago I wrote about Human2Robot, the bet that robots can learn from
videos of people. Today I tried a small piece of it.

The plan this morning: film about 30 seconds of my hands picking up a
matchbox and passing it from one hand to the other. No robot, just a phone
video. Then MediaPipe, Google's hand-tracking library, pulls out what my
hands did (the wrist paths, and when the fingers pinch), and I translate
that onto the two-armed robot from day 7. The sim robot attempts my motion
and I put the two videos side by side.

This is replay. The robot copies my motion. It doesn't learn a skill from
it.

## What happened

The video came out at 1,979 frames, about 33 seconds. MediaPipe found both
hands in 79.1% of the frames. My right hand, the one doing the gripping, had
thumb and index finger within 6cm of each other in 56.4% of frames. The left
hand almost never closed that far (0.5%), which makes sense, because it
mostly just receives the matchbox.

I turned that into 1,649 robot steps at 50Hz and played them on the sim,
with the cube at a fixed start position.

It's recognizably my gesture. When my right hand grips, the robot's right
gripper closes and moves toward the cube. When my hands meet in the middle
for the pass, both arms come together at the center line.

The task didn't get done. The robot scored **0** for all 1,649 steps. It
never touched the cube. The closest it got was about 2cm, at the moment my
real hands made the pass, around 22 seconds in.

So the robot can move like me and still not do what I did, and the
difference is a couple of centimeters. I have that on video now. Closing
that gap takes learning, not replay, which is what the work I've been
reading about is for.
