import ProjectLayout from "../../components/ProjectLayout";

function PipelineDiagram() {
  return (
    <figure className="figure">
      <svg
        className="diagram"
        viewBox="0 0 760 140"
        role="img"
        aria-label="Diagram: spreadsheet input flows through validation and environment detection into versioned JSON, then publishes over a REST API to the live game"
      >
        <defs>
          <marker
            id="arrow2"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-2)" />
          </marker>
        </defs>

        <rect x="10" y="35" width="160" height="70" rx="3" fill="var(--bg)" stroke="var(--rule-strong)" />
        <text x="90" y="65" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="13">
          Google Sheet
        </text>
        <text x="90" y="83" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-mono)" fontSize="11">
          designers edit levels
        </text>

        <rect x="210" y="35" width="160" height="70" rx="3" fill="var(--bg)" stroke="var(--rule-strong)" />
        <text x="290" y="60" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="13">
          Apps Script
        </text>
        <text x="290" y="78" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-mono)" fontSize="11">
          validation + env
        </text>
        <text x="290" y="94" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-mono)" fontSize="11">
          detection
        </text>

        <rect x="410" y="35" width="160" height="70" rx="3" fill="var(--bg)" stroke="var(--rule-strong)" />
        <text x="490" y="65" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="13">
          Validated JSON
        </text>
        <text x="490" y="83" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-mono)" fontSize="11">
          level configs
        </text>

        <rect x="610" y="35" width="140" height="70" rx="3" fill="var(--bg)" stroke="var(--accent)" />
        <text x="680" y="65" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="13">
          REST publish
        </text>
        <text x="680" y="83" textAnchor="middle" fill="var(--ink-2)" fontFamily="var(--font-mono)" fontSize="11">
          to the right env
        </text>

        <line x1="170" y1="70" x2="204" y2="70" stroke="var(--ink-2)" markerEnd="url(#arrow2)" />
        <line x1="370" y1="70" x2="404" y2="70" stroke="var(--ink-2)" markerEnd="url(#arrow2)" />
        <line x1="570" y1="70" x2="604" y2="70" stroke="var(--ink-2)" markerEnd="url(#arrow2)" />
      </svg>
      <figcaption>
        Spreadsheet in, validated level config out — with environment
        detection standing between an admin and an accidental production
        publish.
      </figcaption>
    </figure>
  );
}

export default function LevelPipeline() {
  return (
    <ProjectLayout
      kicker="Petals Studio · 2023"
      title="Level-config pipeline"
      dek="A Google Apps Script pipeline that turns spreadsheet rows into validated JSON level configs and publishes them over a REST API — so creating game levels stopped requiring an engineer."
      facts={[
        { label: "Role", value: "Design & build, solo" },
        { label: "Stack", value: "Google Apps Script, REST APIs, JSON" },
        { label: "Users", value: "Non-technical admins" },
        { label: "Year", value: "2023" },
      ]}
    >
      <h2>The problem</h2>
      <p>
        Game levels were data, but changing that data required engineering
        time. Every new level or tweak became a ticket, and the people who
        actually design levels — who think in spreadsheets, not JSON — were
        blocked on the people who don&rsquo;t.
      </p>

      <h2>What I built</h2>
      <p>
        A pipeline that meets designers where they already work. They edit a
        Google Sheet; an Apps Script layer validates the rows, converts them
        into level-config JSON, and pushes them over a REST API. A custom
        in-sheet UI (menus and dialogs) drives the whole flow, and environment
        detection makes sure a config lands in staging or production
        deliberately, never by accident.
      </p>

      <PipelineDiagram />

      <h2>Why it mattered</h2>
      <p>
        The measure of internal tooling is who stops being a bottleneck.
        After this shipped, non-technical admins created and updated levels
        end to end without engineering help — and the validation layer meant
        the API only ever saw configs that were structurally sound. Less
        glamorous than a shop screen, and probably higher leverage.
      </p>
    </ProjectLayout>
  );
}
