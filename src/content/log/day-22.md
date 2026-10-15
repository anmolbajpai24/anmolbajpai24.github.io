---
day: 22
slug: day-22
title: The dashboard is live
date: 2026-08-06
summary: Last day. The dashboard is live on Render, with the frozen tables, the labeled off-protocol results and the episode player on one page.
---

Last day of the challenge. The job was to finish the dashboard and have it
live by the evening.

It's live at
[robotics-challenge-dashboard.onrender.com](https://robotics-challenge-dashboard.onrender.com).

It runs on Render's free tier as one process, with FastAPI serving both the
API and the built React front end. The build installs three Python
packages and no LeRobot, because the dashboard only reads result files that
are already in the repo. It never re-runs an eval. The free instance sleeps
after about 15 minutes idle, so the first load after a quiet spell takes
around a minute.

On the page: the PushT table (61.0, 39.8, 0.8), the xarm lift table (99.0,
4.2, 0.0), the off-protocol results with their labels, and the episode
player with its six clips. Yesterday's push result isn't on the page yet.
(Its row and its clip were added after the challenge ended.)

The public URL was checked against a local run. `/summary` returned the same
three frozen rows, and a video file came back at 69,978 bytes, the same size
as the local copy.

That's the 22 days. All of it ran in simulation on one laptop, and I came in
new to robotics and Python.
