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
    "Robot-learning log · Anmol Bajpai",
    "A 22-day robot-learning challenge in simulation, written up day by day with the numbers.",
  );

  return (
    <>
      <header className="entry-header">
        <div className="kicker">The log</div>
        <h1 className="page-title">22 days of robot learning</h1>
        <p className="page-intro">
          I spent 22 days in July and August 2026 teaching myself robot
          learning in public. The rules were that every claim got a number
          and every model was scored on a frozen test of 500 episodes with
          fixed seeds. The PushT test was set on day 1, and the pretrained
          reference scores 61.0% on it. The xarm test came later, with the
          training loop I wrote by hand on days 14 and 15. Failures got
          written up the same way as wins. Everything ran in simulation on a
          laptop RTX 4060. I also posted each day on{" "}
          <a href="https://x.com/anmol_bajpai24">X</a>.
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
