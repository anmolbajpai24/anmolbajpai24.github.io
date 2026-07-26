---
day: 6
slug: day-6
title: The body lives in what the numbers mean
date: 2026-07-21
summary: Tried running SmolVLA, a pretrained arm brain, on my dot-pushing task — and learned the embodiment gap isn't a shape error the computer catches for you.
---

Today's idea: **embodiment** — why you can't just download a robot brain and
run it on any robot.

The policies I've trained this week output 2 numbers per step, which tell a
dot where to move on a screen. That's the entire body they know. A real
robot arm has 6 or more joints, and a policy trained on that arm outputs 6+
numbers shaped like that specific arm's angles. A brain trained for one body
can't drive another — like handing someone fluent in piano a set of drums
and asking for the same song. They know the music; the instrument is wrong.

So I tried **SmolVLA**, Hugging Face's vision-language-action model — the
model I named on day 1 as where this challenge was headed. Bigger than
anything I've trained, and you can tell it what to do in words. But its
pretrained brain learned on a real robot arm. Could it touch my dot-pushing
task at all?

## The wall wasn't where I expected

I expected a crash: arm brain outputs 6 numbers, my task takes 2, they
don't fit. Turns out SmolVLA is built to survive exactly that — it pads
every robot's numbers up to a fixed size of 32 and trims the output back
down. Hand it a 2-number body and nothing crashes.

The real wall is what's baked into the pretrained brain:

- It expects **three cameras at 256×256**; my task has one at 384×384.
- It expects a state made of **6 arm-joint readings**; mine is the x and y
  of a dot.
- Its actions are shaped like an arm's joints; mine steer a dot.

Every row mismatches. The numbers would flow through fine — and mean
nothing.

**Worth remembering:** the body problem isn't a shape error the computer
catches for you. The body lives in what the numbers *mean*, not in how many
there are.
