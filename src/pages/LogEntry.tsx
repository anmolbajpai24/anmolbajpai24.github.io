import { Link, useParams } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { entryBySlug, logEntries } from "../lib/markdown";
import NotFound from "./NotFound";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LogEntry() {
  const { slug } = useParams();
  const entry = slug ? entryBySlug(slug) : undefined;

  usePageMeta(
    entry
      ? `Day ${entry.day}: ${entry.title} — Anmol Bajpai`
      : "Not found — Anmol Bajpai",
    entry?.summary,
  );

  if (!entry) return <NotFound />;

  // logEntries is newest-first; "previous" = the day before this one.
  const idx = logEntries.indexOf(entry);
  const next = idx > 0 ? logEntries[idx - 1] : undefined;
  const prev = idx < logEntries.length - 1 ? logEntries[idx + 1] : undefined;

  return (
    <>
      <header className="entry-header">
        <Link className="backlink" to="/log">
          &larr; The log
        </Link>
        <h1>{entry.title}</h1>
        <div className="entry-meta">
          <span>Day {entry.day} of 22</span>
          <span>{formatDate(entry.date)}</span>
        </div>
      </header>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />

      <nav className="entry-nav" aria-label="Log entries">
        <span>
          {prev && (
            <Link to={`/log/${prev.slug}`}>&larr; Day {prev.day}</Link>
          )}
        </span>
        <span>
          {next && (
            <Link to={`/log/${next.slug}`}>Day {next.day} &rarr;</Link>
          )}
        </span>
      </nav>
    </>
  );
}
