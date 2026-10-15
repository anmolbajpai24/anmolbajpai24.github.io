---
day: 13
slug: day-13
title: The gripper doesn't go where I tell it
date: 2026-07-28
summary: Measured commanded against reached gripper position in the two-armed sim. About 7cm off along x at the first pose, 8 to 12cm in 3D across six poses, and the error changes with the pose.
---

The two-armed sim has a mode where each gripper chases a target point in
space. Yesterday's replay, and everything else I run through that mode,
assumes the position I command is the position the gripper reaches. This
morning I decided to check that.

The test: command the right gripper to a known point, step the physics 250
times so it settles, and read back where the fingertip is. Then do it at
five more points.

It doesn't go where it's told. At the first point I commanded
(0.10, 0.50, 0.10) and the fingertip settled at (0.1725, 0.5425, 0.0537).
That's **7.25cm** off along x, which is the 7 centimeters I posted. But x is
only one direction. The full 3D gap at that point is about 9.6cm, and across
the six points it runs from about 8cm to 12cm.

| Commanded target (m) | Fingertip offset in x, y, z (cm) | 3D gap (cm) |
|---|---|---|
| (0.10, 0.50, 0.10) | +7.25, +4.25, -4.63 | 9.6 |
| (0.10, 0.50, 0.15) | +6.68, +4.24, -3.59 | 8.7 |
| (0.20, 0.50, 0.10) | +9.55, +4.24, -1.66 | 10.6 |
| (0.00, 0.50, 0.10) | +5.48, +4.26, -3.82 | 7.9 |
| (0.10, 0.40, 0.10) | +5.99, +0.61, -5.37 | 8.1 |
| (0.10, 0.60, 0.10) | +9.48, +7.03, -3.80 | 12.4 |

The fingertip always ends up off in the same direction, further along x and
y and below the target. The amount is different at every pose.

The cause is in the sim's own task file. The arm is tied to its target with
a soft weld, not a rigid lock, so gravity and the arm's own geometry pull
the resting point away from the commanded one.

My retargeting code subtracts a fixed average offset of (7.0, 4.2, -4.0)cm
for the right arm, mirrored in x for the left. That's good to roughly 3cm
either way, because the real error depends on the pose. The leftover is part
of why yesterday's replay missed the cube by a couple of centimeters at the
pass.
