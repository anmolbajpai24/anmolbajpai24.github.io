---
day: 7
slug: day-7
title: Running the brain on the body it was built for
date: 2026-07-22
summary: New simulator, new robot. Two arms hand a cube across in mid-air. Pretrained ACT on the body it was built for got 7 wins out of 10.
---

On day 5 I called ACT a bad fit for PushT. It wasn't built for pushing a
block around a screen. It was built for this: two arms, fast control,
precise handovers. And on day 6 I found that a brain can't drive the wrong
body.

So today I used a new simulator and a new robot. Two arms have to pick up a
cube and pass it from one gripper to the other in the air. This time I ran a
pretrained ACT policy on the body it was designed for.

It got **7 wins out of 10**. The cube gets lifted, passed between grippers
mid-air, and caught by the other arm. I saved videos of the best win and the
failure. After a week of watching a dot nudge a block, two arms handing a
cube across feels like a different sport.

Same architecture, two results in three days: 11% (later corrected to 0.8%
on-protocol) on the wrong task, 7/10 on the right one. The architecture
didn't change between the two. Before day 5 I would have asked how good a
model is. Now I'd ask first what body and task it was built for.
