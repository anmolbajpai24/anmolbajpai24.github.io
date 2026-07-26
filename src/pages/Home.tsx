import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { logEntries } from "../lib/markdown";

const TOTAL_DAYS = 22;

export default function Home() {
  usePageMeta("Anmol Bajpai — software engineer");
  const latest = logEntries[0];

  return (
    <>
      <section className="hero">
        <h1>
          Game systems by day. <em>Robot policies</em> by night.
        </h1>
        <p className="hero-intro">
          I&rsquo;m Anmol — a software engineer at Petals Studio, where I build
          the meta-game and economy systems behind a live multiplayer mobile
          game. Outside work I ship web products people actually use, and right
          now I&rsquo;m teaching myself robot learning in public: a 22-day
          challenge, documented day by day, numbers and failures included.
        </p>
      </section>

      <section className="now-strip">
        <div className="section-label">
          <span className="pulse" aria-hidden="true" />
          Now · day {latest?.day ?? 4} of {TOTAL_DAYS}
        </div>
        <div>
          <p className="measure" style={{ marginBottom: "0.75rem" }}>
            Trained a 262-million-parameter diffusion policy from scratch on my
            laptop overnight. It scores 39.8% on PushT under a frozen
            500-episode eval — the pretrained reference gets 61.0%. Best
            finding so far: the skill plateaued halfway through the night while
            the loss curve kept promising progress.
          </p>
          <Link to="/log">Read the log &rarr;</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Selected work</div>
        <ul className="work-list">
          <li>
            <Link className="work-link" to="/work/roundtrip">
              <span className="work-title">Roundtrip</span>
              <span className="work-year">2026 · Personal</span>
              <p className="work-blurb">
                A group-trip planning PWA — shared itinerary, live sync,
                offline support. Built for one specific 24-day trip, then used
                on it every day.
              </p>
            </Link>
          </li>
          <li>
            <Link className="work-link" to="/work/melee-madness">
              <span className="work-title">Melee Madness meta-game</span>
              <span className="work-year">2023– · Petals Studio</span>
              <p className="work-blurb">
                Shop, progression, rewards, and the PlayFab economy behind them
                for a live multiplayer mobile brawler.
              </p>
            </Link>
          </li>
          <li>
            <Link className="work-link" to="/work/qzone">
              <span className="work-title">Qzone</span>
              <span className="work-year">Petals Studio</span>
              <p className="work-blurb">
                The React frontend for a live quiz product — state management,
                REST integration, dynamic question rendering.
              </p>
            </Link>
          </li>
          <li>
            <Link className="work-link" to="/work/level-pipeline">
              <span className="work-title">Level-config pipeline</span>
              <span className="work-year">2023 · Petals Studio</span>
              <p className="work-blurb">
                A spreadsheet-to-API pipeline that lets non-engineers create
                and publish game levels safely.
              </p>
            </Link>
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="section-label">Experience</div>
        <div>
          <div className="xp-item">
            <span className="xp-role">
              Software Development Engineer I, Petals Studio
            </span>
            <span className="xp-dates">May 2023 – present</span>
            <p>
              Player-facing systems for Melee Madness in Unity UI Toolkit, the
              PlayFab Economy V2 integration and its catalog tooling, and the
              React frontend for Qzone.
            </p>
          </div>
          <div className="xp-item">
            <span className="xp-role">SDE Intern, Caravel.Tech</span>
            <span className="xp-dates">Jun – Oct 2022</span>
            <p>
              Sole programmer on a hyper-casual Tag game prototype in Unity;
              cut build size 25% through asset and code optimization.
            </p>
          </div>
          <div className="xp-item">
            <span className="xp-role">
              B.Tech, Computer Science — Manipal University Jaipur
            </span>
            <span className="xp-dates">2020 – 2024</span>
            <p>CGPA 8.2.</p>
          </div>
          <p className="mono muted" style={{ fontSize: "0.8rem", marginTop: "1.5rem" }}>
            C# · TypeScript · React · Unity UI Toolkit · PlayFab · Supabase ·
            PyTorch/LeRobot (learning)
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Contact</div>
        <div className="measure">
          <p>
            If you&rsquo;re building in AI or robotics and need an engineer who
            ships — or you just want to talk about diffusion policies, game
            economies, or group-trip logistics — email is the fastest way to
            reach me.
          </p>
          <p style={{ marginBottom: 0 }}>
            <a href="mailto:anmolbajpai24@gmail.com">
              anmolbajpai24@gmail.com
            </a>{" "}
            · <a href="https://github.com/anmolbajpai24">GitHub</a> ·{" "}
            <a href="https://linkedin.com/in/anmolbajpai">LinkedIn</a> ·{" "}
            <a href="/Anmol_Bajpai_Resume.pdf">Resume (PDF)</a>
          </p>
        </div>
      </section>
    </>
  );
}
