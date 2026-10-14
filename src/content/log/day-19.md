---
day: 19
slug: day-19
title: The dashboard gets a leaderboard
date: 2026-08-03
summary: Started the dashboard that puts the challenge's results in one place. The leaderboard is done. PushT and xarm sit in separate tables, and the PushT rows are read live from the eval API.
---

I'm building a dashboard so the findings of this challenge can be viewed in
one place. It will have a leaderboard for the eval numbers and a player for
the rollout videos.

Tonight the leaderboard got done. It's a React front end on top of the eval
API from days 8 to 10. PushT and xarm are in their own tables, because they
are scored on different protocols and a row from one shouldn't sit next to a
row from the other.

The three PushT rows (61.0, 39.8, 0.8) come live from `/summary`. The xarm
rows (0.0, 4.2, 99.0) are written into the front end for now. The API only
reads the result files LeRobot writes, and my xarm evals are plain-text logs
from my own loop. The off-protocol results have a table of their own with a
label on it, including the scripted policy's 20/20.

One bug on the way. The live panel first showed raw JSON, because the front
end guessed the wrong shape for the `/summary` response. Fixing that turned
up a second problem. The API sends success rate as a percentage already, and
the front end's formatter treated anything at or below 1 as a fraction. ACT's
0.8% would have been displayed as **80.0%**. It now prints the number as it
arrives.

The built front end is served by the same FastAPI process as the API, so the
whole thing starts with one command.
