import ProjectLayout from "../../components/ProjectLayout";

function EconomyDiagram() {
  return (
    <figure className="figure">
      <svg
        className="diagram"
        viewBox="0 0 760 250"
        role="img"
        aria-label="Diagram: bulk import tooling feeds the PlayFab catalog; catalog and player inventory both feed the Unity UI screens"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        {/* Bulk import tooling */}
        <rect x="20" y="20" width="200" height="60" rx="3" />
        <text className="dt" x="120" y="45" textAnchor="middle">
          Bulk catalog import
        </text>
        <text x="120" y="63" textAnchor="middle">
          publish items programmatically
        </text>

        {/* Catalog */}
        <rect x="20" y="150" width="200" height="76" rx="3" />
        <text className="dt" x="120" y="178" textAnchor="middle">
          PlayFab Economy V2
        </text>
        <text x="120" y="196" textAnchor="middle">
          combo ⇄ weapon catalog,
        </text>
        <text x="120" y="212" textAnchor="middle">
          bidirectionally linked
        </text>

        {/* Inventory */}
        <rect x="290" y="150" width="190" height="76" rx="3" />
        <text className="dt" x="385" y="182" textAnchor="middle">
          Player inventory
        </text>
        <text x="385" y="200" textAnchor="middle">
          owned vs locked state
        </text>

        {/* UI */}
        <rect className="box-accent" x="550" y="110" width="190" height="116" rx="3" />
        <text className="dt" x="645" y="145" textAnchor="middle">
          Unity UI Toolkit
        </text>
        <text x="645" y="163" textAnchor="middle">
          shop &amp; combo screens
        </text>
        <text x="645" y="181" textAnchor="middle">
          render live catalog +
        </text>
        <text x="645" y="197" textAnchor="middle">
          inventory state
        </text>

        {/* Arrows */}
        <line x1="120" y1="80" x2="120" y2="144" markerEnd="url(#arrow)" />
        <line x1="220" y1="188" x2="284" y2="188" markerEnd="url(#arrow)" />
        <line x1="480" y1="188" x2="544" y2="188" markerEnd="url(#arrow)" />
        <line x1="220" y1="160" x2="544" y2="128" markerEnd="url(#arrow)" />
        <text x="380" y="132" textAnchor="middle">
          item definitions
        </text>
      </svg>
      <figcaption>
        The shape of the system: catalog changes publish through tooling, and
        the UI renders whatever the live catalog and the player&rsquo;s
        inventory say — no hand-synced content.
      </figcaption>
    </figure>
  );
}

export default function MeleeMadness() {
  return (
    <ProjectLayout
      kicker="Petals Studio · 2023 – present"
      title="Melee Madness meta-game"
      dek="Everything players touch between matches of a live multiplayer mobile brawler — the shop, progression, rewards, combo unlocks, and the economy that feeds them."
      facts={[
        { label: "Role", value: "Meta-game & economy systems" },
        {
          label: "Stack",
          value: "Unity UI Toolkit (UXML/USS), C#, PlayFab Economy V2",
        },
        { label: "Type", value: "Live multiplayer mobile game" },
        { label: "Since", value: "May 2023" },
      ]}
    >
      <h2>Context</h2>
      <p>
        In a live multiplayer game, the &ldquo;meta-game&rdquo; is everything
        outside the match itself: what you unlock, what you buy, how you
        progress. It&rsquo;s where a game earns its living, and it changes
        constantly. The systems behind it have to survive that content churn
        without an engineer hand-wiring every update.
      </p>
      <p>
        This is shipped work on my employer&rsquo;s product, so I&rsquo;m
        describing the systems rather than showing internal material.
      </p>

      <h2>What I built</h2>
      <ul>
        <li>
          The <strong>player-facing meta-game screens</strong> — shop,
          progression, rewards, combo unlocks — in Unity UI Toolkit
          (UXML/USS), on top of a library of reusable custom controls I built
          so new screens compose from tested parts instead of starting from
          zero.
        </li>
        <li>
          The <strong>economy integration on PlayFab Economy V2</strong>: I
          modeled the combo and weapon catalog with bidirectional links, so
          the game can answer both &ldquo;what does this combo need?&rdquo;
          and &ldquo;what do these weapons unlock?&rdquo; from either
          direction.
        </li>
        <li>
          <strong>Bulk catalog-import tooling</strong> that publishes items
          programmatically, turning catalog updates from a click-through chore
          in a dashboard into a reviewed, repeatable operation.
        </li>
        <li>
          <strong>Dynamic shop and combo screens</strong> that render locked
          vs. unlocked content from live catalog and inventory state, so the
          UI can&rsquo;t drift out of sync with what the backend economy says.
        </li>
      </ul>

      <EconomyDiagram />

      <h2>What made it interesting</h2>
      <p>
        The client renders <em>state</em>, not assumptions. Every locked
        padlock and every price tag on screen traces back to the live catalog
        and the player&rsquo;s inventory. That single rule is what lets
        designers reshape the economy without anyone touching UI code.
      </p>
    </ProjectLayout>
  );
}
