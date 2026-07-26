---
day: 7
slug: day-7
title: Running the brain on the body it was built for
date: 2026-07-22
summary: New simulator, new robot — two arms handing a cube across mid-air. Pretrained ACT, on its home body this time: 7 wins out of 10.
---

On day 5 I called ACT a bad fit for PushT — it wasn't built for pushing a
block around a screen. It was built for exactly this: two arms, fast
control, precise handovers. And day 6's lesson was that a brain can't drive
the wrong body.

So today: new simulator, new robot. Two arms whose job is to pick up a cube
and pass it from one gripper to the other, in the air. This time I ran a
pretrained ACT policy on the body it was actually designed for.

**7 wins out of 10.** The cube gets lifted, passed between grippers mid-air,
and caught by the other arm. I saved videos of the best win and the
failure — after a week of watching a dot nudge a block, watching two arms
coordinate a mid-air handover feels like a different sport.

Three days, one architecture, two verdicts: 11% (later corrected to 0.8%
on-protocol) on the wrong task, 7/10 on the right one. Nothing about the
network changed. The lesson from days 5 and 6 stopped being theory today:
**architecture–embodiment fit is worth more than architecture quality.**
Ask "what body and task was this brain built for?" before asking "how good
is this brain?"
