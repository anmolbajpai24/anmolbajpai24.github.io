import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Not found — Anmol Bajpai");

  return (
    <section className="hero">
      <div className="kicker">404</div>
      <h1 style={{ margin: "0.5rem 0 1rem" }}>There&rsquo;s nothing here.</h1>
      <p className="page-intro">
        The page you&rsquo;re after doesn&rsquo;t exist — or I moved it and
        didn&rsquo;t leave a note, which is worse.{" "}
        <Link to="/">Back to the start.</Link>
      </p>
    </section>
  );
}
