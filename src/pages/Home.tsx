import { useMemo, useRef, type KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { logEntries } from "../lib/markdown";
import { projects, tracks, type Project, type TrackId } from "../content/projects";
import MediaSlot from "../components/MediaSlot";
import SocialLinks from "../components/SocialLinks";
import portrait from "../assets/media/about/portrait.webp";

const TOTAL_DAYS = 22;
type Filter = "all" | TrackId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  ...tracks.map((t) => ({ id: t.id as Filter, label: t.label })),
];

function isFilter(v: string | null): v is Filter {
  return v !== null && filters.some((f) => f.id === v);
}

function ProjectCard({ p }: { p: Project }) {
  const inner = (
    <>
      <MediaSlot name={p.cover} alt={`${p.title} preview`} ratio={p.coverRatio ?? "16 / 10"} />
      <div className="card-body">
        <span className="card-meta">{p.meta}</span>
        <h3 className="card-title">{p.title}</h3>
        <p className="card-blurb">{p.blurb}</p>
        <ul className="tag-list" aria-label="Tools">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </>
  );

  if (!p.href) return <article className="card">{inner}</article>;
  const external = /^https?:/.test(p.href);
  return (
    <article className="card card--link">
      {external ? (
        <a className="card-link" href={p.href}>
          {inner}
        </a>
      ) : (
        <Link className="card-link" to={p.href}>
          {inner}
        </Link>
      )}
    </article>
  );
}

export default function Home() {
  usePageMeta("Anmol Bajpai · software engineer");
  const latest = logEntries[0];
  const [params, setParams] = useSearchParams();
  const raw = params.get("track");
  const active: Filter = isFilter(raw) ? raw : "all";
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.tracks.includes(active))),
    [active],
  );
  const track = tracks.find((t) => t.id === active);

  function select(id: Filter) {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("track");
    else next.set("track", id);
    setParams(next, { replace: true, preventScrollReset: true });
  }

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = -1;
    if (e.key === "ArrowRight") target = (index + 1) % filters.length;
    else if (e.key === "ArrowLeft") target = (index - 1 + filters.length) % filters.length;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = filters.length - 1;
    if (target < 0) return;
    e.preventDefault();
    select(filters[target].id);
    tabRefs.current[target]?.focus();
  }

  return (
    <>
      <section className="hero hero--portrait">
        <img
          className="hero-portrait"
          src={portrait}
          alt="Anmol Bajpai"
          width={480}
          height={480}
          decoding="async"
        />
        <div className="hero-copy">
          <p className="kicker">Software engineer · Delhi NCR, open to relocating</p>
          <h1>Hi, I&rsquo;m Anmol.</h1>
          <p className="hero-intro">
            I spent three years at Petals Studio building the UI and meta-game
            systems for Melee Madness, a live multiplayer mobile game, in Unity
            UI Toolkit. Alongside that I build web products people use, and this
            year I taught myself robot learning in public. This site has all of
            it, sorted so you can go straight to the part you care about.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              See my work
            </a>
            <a className="button" href="/Anmol_Bajpai_Resume.pdf">
              Resume (PDF)
            </a>
            <a className="button" href="mailto:anmolbajpai24@gmail.com">
              Email me
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-heading">
        <div className="work-head">
          <h2 id="work-heading" className="section-label">
            Work
          </h2>
          <div className="tabs" role="tablist" aria-label="Filter work by area">
            {filters.map((f, i) => {
              const selected = f.id === active;
              const count =
                f.id === "all" ? projects.length : projects.filter((p) => p.tracks.includes(f.id as TrackId)).length;
              return (
                <button
                  key={f.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${f.id}`}
                  aria-selected={selected}
                  aria-controls="work-panel"
                  tabIndex={selected ? 0 : -1}
                  className="tab"
                  onClick={() => select(f.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {f.label}
                  <span className="tab-count" aria-hidden="true">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0}>
          <p className="track-intro" aria-live="polite">
            {track ? track.intro : "Everything, newest and most relevant first."}
          </p>
          <div className="card-grid" key={active}>
            {visible.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {latest && (
        <section className="section">
          <h2 className="section-label">From the log</h2>
          <div>
            <p className="measure" style={{ marginBottom: "0.75rem" }}>
              A {TOTAL_DAYS}-day robot-learning challenge, written up day by day with the
              numbers and the failures.
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link to={`/log/${latest.slug}`}>
                Latest: day {latest.day}, &ldquo;{latest.title}&rdquo; &rarr;
              </Link>{" "}
              · <Link to="/log">All entries &rarr;</Link>
            </p>
          </div>
        </section>
      )}

      <section className="section" id="experience">
        <h2 className="section-label">Experience</h2>
        <ol className="timeline">
          <li className="xp-item">
            <span className="xp-role">Software Development Engineer I, Petals Studio</span>
            <span className="xp-dates">May 2023 to Jul 2026</span>
            <p>
              All the UI for Melee Madness in Unity UI Toolkit, the PlayFab
              Economy V2 integration and its catalog tooling, and the React
              frontend for Qzone. The studio shut down in July 2026.
            </p>
          </li>
          <li className="xp-item">
            <span className="xp-role">SDE Intern, Caravel.Tech</span>
            <span className="xp-dates">Jun to Oct 2022</span>
            <p>
              Sole programmer on a hyper-casual Tag game prototype in Unity;
              cut build size by 25% through asset and code optimisation.
            </p>
          </li>
          <li className="xp-item">
            <span className="xp-role">B.Tech, Computer Science, Manipal University Jaipur</span>
            <span className="xp-dates">2020 to 2024</span>
            <p>CGPA 8.2.</p>
          </li>
        </ol>
      </section>

      <section className="section" id="skills">
        <h2 className="section-label">Skills</h2>
        <dl className="skills">
          <div>
            <dt>Games & UI</dt>
            <dd>Unity, Unreal Engine, UI Toolkit (UXML/USS), C#, PlayFab Economy V2</dd>
          </div>
          <div>
            <dt>Web</dt>
            <dd>React, TypeScript, JavaScript, HTML/CSS, Supabase, Firebase, FastAPI</dd>
          </div>
          <div>
            <dt>AI & Robotics</dt>
            <dd>Python, PyTorch, LeRobot, MediaPipe, LLM APIs</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>Google Apps Script, REST APIs, Git, Figma, Postman</dd>
          </div>
        </dl>
      </section>

      <section className="section" id="contact">
        <h2 className="section-label">Contact</h2>
        <div className="measure">
          <p>
            I&rsquo;m looking for my next role, in games or in AI, and I&rsquo;m
            happy to relocate. Email is the quickest way to reach me.
          </p>
          <SocialLinks className="contact-links" showAddress />
        </div>
      </section>
    </>
  );
}
