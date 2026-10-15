import { Link } from "react-router-dom";
import ProjectLayout from "../../components/ProjectLayout";
import MediaSlot from "../../components/MediaSlot";

const DASHBOARD = "https://robotics-challenge-dashboard.onrender.com";

export default function RoboticsChallenge() {
  return (
    <ProjectLayout
      kicker="Personal project · 2026"
      title="22-day robot-learning challenge"
      dek="Twenty-two days of imitation learning in public, coming from game development with no robotics or Python background. One project the whole way: run pretrained policies, train my own, and build a dashboard that keeps every number honest. Everything ran in simulation."
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
        I also scored my policy at four earlier checkpoints. It reached 43%
        by 50,000 steps and was no better after another 40,000, although the
        training loss kept falling the whole time.
      </p>
      <MediaSlot
        className="project-hero-media"
        name="robotics/skill-curve.webp"
        alt="Line chart of PushT success rate against training step for my diffusion policy: 10% at 10,000 steps, 35% at 30,000, 43% at 50,000 and at 70,000, 40% at 90,000. A dashed line marks the pretrained baseline at 61%."
        ratio="1200 / 738"
        caption="Success rate at five checkpoints of the overnight run. The first four points come from 150 episodes each, the last from the full 500."
      />
      <p>
        On the xarm I wrote my own behaviour-cloning loop and ran it on two
        tasks. On lift, the policy succeeds 99.0% of the time when the
        cube&rsquo;s position is in its input. Trained on the same demos
        with the cube taken out, it drops to 4.2%. On push, where the arm
        slides the cube to a target, the same recipe scores 98.8%.
      </p>
      <p>
        The 99.0% needs a caveat. The simulator gives the network the
        cube&rsquo;s true position. The network is not seeing the cube
        through a camera, and the same is true of the push result.
      </p>

      <h2>The ACT number I had to correct</h2>
      <p>
        On day 5 I posted that my ACT policy scored 11% on PushT. On day 9 I
        went back through old logs to record which policy had produced each
        result, and found that the 11% came from a run where I had changed
        an inference setting, which puts it off-protocol. The run at default
        settings had used the full frozen protocol, and it scored 0.8%. That
        is the number on the leaderboard. The 11% is still listed, labelled
        as off-protocol.
      </p>

      <h2>Why the arm scored 0, then 99</h2>
      <p>
        The first network I trained with my own loop scored 0 out of 500 on
        the xarm lift. A scripted policy that reads the cube&rsquo;s true
        position from the simulator scored 20/20 on the same setup, so the
        benchmark was fine and my policy was the problem. The dataset I had
        trained on recorded the hand&rsquo;s position and the gripper angle,
        and nothing about the cube. The cube spawns somewhere new each
        episode, so the network reached for the average spot and closed on
        air.
      </p>
      <p>
        On day 16 I tested that explanation. The scripted policy recorded
        800 new demos with the cube&rsquo;s position included, and I trained
        two identical networks on them, one with the cube in its input and
        one without. On the same 500 episodes, the first scored 99.0% and
        the second 4.2%. The cube&rsquo;s position is the only difference
        between them.
      </p>
      <div className="gallery gallery--landscape">
        <MediaSlot
          name="robotics/lift-sighted.mp4"
          poster="robotics/lift-sighted-poster.webp"
          alt="Simulated xarm lowering its gripper onto a green cube, closing on it and lifting it off the table"
          ratio="1 / 1"
          caption="Episode 0 with the cube&rsquo;s position in the input. It grips and lifts in 121 steps."
        />
        <MediaSlot
          name="robotics/lift-blind.mp4"
          poster="robotics/lift-blind-poster.webp"
          alt="The same simulated xarm lowering its gripper just beside the green cube and staying there without lifting it"
          ratio="1 / 1"
          caption="The same episode without the cube&rsquo;s position. It comes down beside the cube and never lifts it before the 300-step cap."
        />
      </div>

      <h2>From a phone video to a robot</h2>
      <p>
        On day 12 I filmed about 33 seconds of my hands passing a matchbox
        from one to the other. MediaPipe tracked both wrists and the moments
        my fingers pinched, and I mapped that motion onto the two simulated
        ALOHA arms and played it back.
      </p>
      <MediaSlot
        className="project-hero-media breakout"
        name="robotics/hand-replay.mp4"
        poster="robotics/hand-replay-poster.webp"
        alt="Side by side: on the left, my hands passing a matchbox over a dark cloth. On the right, two simulated robot arms seen from above, moving their grippers along the same paths near a small red cube."
        ratio="32 / 9"
        caption="My hands on the left, the sim replaying them on the right. The grippers follow the motion and never touch the red cube."
      />
      <p>
        This was motion replay. The robot copied my motion and learned
        nothing from it. The gesture is recognisable: the right gripper
        closes when my right hand grips, and both arms come to the centre
        when my hands meet. But it scored 0 for all 33 seconds and never
        touched the cube. The closest it got was about 2cm, at the moment my
        hands made the pass.
      </p>
      <p>
        On day 13 I found one reason. The sim&rsquo;s gripper doesn&rsquo;t
        land where you command it. I sent it to six known points and read
        back where the fingertip settled. It was about 7cm off along x at
        the first point and 8 to 12cm off in 3D across the six, by a
        different amount at each pose. The arm follows its target through a
        soft constraint, so gravity pulls it away. My retargeting subtracts
        the average offset, which still leaves an error of up to about 3cm
        that depends on the pose.
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
        reads the result files the evals wrote: LeRobot&rsquo;s JSON for
        PushT and the plain-text logs from my own loop for the xarm. It
        never re-runs anything or writes to them. It has the leaderboard,
        per-episode metrics and rollout videos, with a React front end
        served by the same process. It runs on Render&rsquo;s free tier, so
        the first load after a quiet spell takes about a minute.
      </p>
      <p>
        The API has seven endpoints: <code>/summary</code>,{" "}
        <code>/runs</code>, <code>{"/runs/{id}"}</code>,{" "}
        <code>{"/runs/{id}/metrics"}</code>, <code>/curves/skill</code>,{" "}
        <code>/videos</code> and <code>/health</code>. Both leaderboard
        tables read their rows from <code>/summary</code>. The episode
        player has seven clips, from the first pretrained PushT run to the
        push network.
      </p>

      <h2>What I read</h2>
      <p>
        Some days went to reading: ARCap from Karen Liu&rsquo;s lab at
        Stanford, a paper from Imperial on teaching one arm 1,000 tasks in a
        day, and Physical Intelligence&rsquo;s π0.7. Those write-ups are in{" "}
        <Link to="/log">the log</Link> with every other day, failures
        included.
      </p>
    </ProjectLayout>
  );
}
