import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { logEntries } from "../lib/markdown";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LogIndex() {
  usePageMeta(
    "Robot-learning log — Anmol Bajpai",
    "A 22-day robot-learning challenge, documented day by day: LeRobot, diffusion policies, frozen evals, real numbers.",
  );

  return (
    <>
      <header className="entry-header">
        <div className="kicker">The log</div>
        <h1 className="page-title">22 days of robot learning</h1>
        <p className="page-intro">
          I&rsquo;m teaching myself robot learning in 22 days, in public. The
          rules: every claim gets a number, every model is measured by the
          same frozen evaluation protocol set on day 1 (500 episodes, seed
          1000 — the pretrained reference scores 61.0%), and failures get
          written up with the same care as wins. Hardware is a laptop RTX
          4060, which keeps me honest about compute. I also post each day on{" "}
          <a href="https://x.com/anmol_bajpai24">X</a> as I go.
        </p>
      </header>

      <ul className="log-list">
        {logEntries.map((e) => (
          <li key={e.slug}>
            <Link className="log-row" to={`/log/${e.slug}`}>
              <span className="log-day">Day {e.day}</span>
              <span className="log-title">{e.title}</span>
              <span className="log-date">{formatDate(e.date)}</span>
              <p className="log-summary">{e.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
