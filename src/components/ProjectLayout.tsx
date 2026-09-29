import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";

interface Fact {
  label: string;
  value: ReactNode;
}

interface Props {
  kicker: string;
  title: string;
  dek: string;
  facts: Fact[];
  children: ReactNode;
}

export default function ProjectLayout({
  kicker,
  title,
  dek,
  facts,
  children,
}: Props) {
  usePageMeta(`${title} — Anmol Bajpai`, dek);

  return (
    <article className="project-page">
      <header className="project-header">
        <Link className="backlink" to="/">
          &larr; Work
        </Link>
        <div className="kicker" style={{ marginTop: "2rem" }}>
          {kicker}
        </div>
        <h1>{title}</h1>
        <p className="dek">{dek}</p>
      </header>

      <dl className="project-facts">
        {facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="prose">{children}</div>
    </article>
  );
}
