import { Link } from "react-router-dom";
import ProjectLayout from "../../components/ProjectLayout";
import MediaSlot from "../../components/MediaSlot";

const DASHBOARD = "https://robotics-challenge-dashboard.onrender.com";

export default function RoboticsChallenge() {
  return (
    <ProjectLayout
      kicker="Personal project · 2026"
      title="22-day robot-learning challenge"
      dek="Twenty-two days of imitation learning in public, coming from game development with no robotics or Python background. One project the whole way: run pretrained policies, train my own, and build a dashboard that keeps every number honest."
      facts={[
        { label: "Stack", value: "LeRobot, PyTorch, FastAPI, React" },
        { label: "Dashboard", value: <a href={DASHBOARD}>Live results</a> },
        {
          label: "Code",
          value: <a href="https://github.com/anmolbajpai24/robotics-challenge">GitHub</a>,
        },
        {
          label: "Updates",
          value: <a href="https://x.com/anmol_bajpai24">On X</a>,
        },
      ]}
    >
      <MediaSlot
        className="project-hero-media"
        name="robotics/demo.mp4"
        poster="robotics/demo-poster.webp"
        alt="Short demo: a pretrained diffusion policy solving PushT, ACT transferring a cube between two ALOHA arms, and my behaviour-cloning policy lifting a cube on the xarm"
        ratio="4 / 3"
        caption="Pretrained diffusion solving PushT, ACT passing a cube on ALOHA, and my own policy lifting on the xarm."
      />

      <h2>The numbers</h2>
      <p>
        Every result is scored against a frozen protocol: 500 episodes with
        the same seeds and settings every time, so a run from day 3 can be
        compared with one from day 16. On PushT, the official pretrained
        diffusion policy scores 61.0%. Mine, trained from scratch for 90,000
        steps overnight on an RTX 4060, scores 39.8%. ACT at default settings
        managed 0.8%, and it stays on the leaderboard anyway.
      </p>
      <p>
        On the xarm lift task I wrote my own behaviour-cloning loop. When the
        cube&rsquo;s position is in the state it sees, the policy lifts it
        99.0% of the time. Trained on the same demos with the cube taken out,
        it drops to 4.2%.
      </p>

      <h2>From a phone video to a robot</h2>
      <p>
        On day 12 I filmed my own hand on my phone, tracked it with
        MediaPipe, and retargeted the motion into a trajectory for the
        simulated ALOHA arms.
      </p>

      <h2>The dashboard</h2>
      <MediaSlot
        className="project-hero-media breakout"
        name="robotics/dashboard.webp"
        alt="The eval dashboard's leaderboard: PushT and xarm lift success rates, each under its frozen protocol"
        ratio="1600 / 1145"
        caption="The leaderboard, one table per task, each with its protocol written on it."
      />
      <p>
        The <a href={DASHBOARD}>dashboard</a> is a small FastAPI app that
        reads the eval files LeRobot writes. It never re-runs anything or
        writes to them. It has the leaderboard, per-episode metrics and
        rollout videos, with a React front end served by the same process.
        It runs on Render&rsquo;s free tier, so the first load after a quiet
        spell takes about a minute.
      </p>
      <p>
        The day-by-day write-ups, failures included, are in{" "}
        <Link to="/log">the log</Link>.
      </p>
    </ProjectLayout>
  );
}
