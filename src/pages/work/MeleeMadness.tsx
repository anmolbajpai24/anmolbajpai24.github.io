import ProjectLayout from "../../components/ProjectLayout";
import MediaSlot from "../../components/MediaSlot";

function EconomyDiagram() {
  return (
    <figure className="figure breakout">
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
        inventory say, with no hand-synced content.
      </figcaption>
    </figure>
  );
}

const screens = [
  { name: "melee-madness/shop.webp", alt: "Melee Madness shop with category tabs, item grid and unlock button", caption: "Shop" },
  { name: "melee-madness/daily-mission.webp", alt: "Daily mission leaderboard with ranked players and a share card", caption: "Daily mission leaderboard" },
  { name: "melee-madness/match-results.webp", alt: "End-of-match results screen showing the score and each player's kills", caption: "Match results" },
  { name: "melee-madness/profile.webp", alt: "Player profile with match stats and empty showcase slots", caption: "Profile" },
  { name: "melee-madness/profile-showcase-slots.webp", alt: "Player profile with showcase cards placed in its slots", caption: "Profile with showcase cards" },
  { name: "melee-madness/showcase.webp", alt: "Showcase screen with a grid of mission cards", caption: "Showcase" },
];

export default function MeleeMadness() {
  return (
    <ProjectLayout
      kicker="Petals Studio · May 2023 to Jul 2026"
      title="Melee Madness"
      dek="Every screen players touch in a live multiplayer mobile brawler, built in Unity UI Toolkit on a library of reusable controls, and wired to a live PlayFab economy."
      facts={[
        { label: "Role", value: "UI implementation, meta-game systems" },
        {
          label: "Stack",
          value: "Unity UI Toolkit (UXML/USS), C#, PlayFab Economy V2",
        },
        { label: "Platform", value: "Live multiplayer mobile game" },
        {
          label: "Play it",
          value: (
            <a href="https://play.google.com/store/apps/details?id=studio.petals.game.cc">
              Google Play
            </a>
          ),
        },
      ]}
    >
      <MediaSlot
        className="project-hero-media breakout"
        name="melee-madness/ui-walkthrough.mp4"
        poster="melee-madness/ui-walkthrough-poster.webp"
        controls
        alt="Screen recording moving through the Melee Madness UI"
        ratio="20 / 9"
        caption="A walk through the shipped UI, recorded from the public Play Store build."
      />

      <h2>What I built</h2>
      <p>
        I built all of the game&rsquo;s UI screens in Unity UI Toolkit, using
        UXML for structure and USS for styling. That covers the shop, the
        player profile and showcase, match results, daily missions and their
        leaderboard, plus everything around them.
      </p>

      <div className="gallery gallery--landscape breakout">
        {screens.map((s) => (
          <MediaSlot key={s.name} name={s.name} alt={s.alt} caption={s.caption} ratio="20 / 9" />
        ))}
      </div>

      <h2>A control library instead of one-off screens</h2>
      <p>
        I built a library of reusable custom UI Toolkit controls, so a new
        screen was mostly a matter of putting tested parts together rather
        than starting from zero. Most of them are configured from UXML
        attributes, so a screen could use one without anyone writing code.
        A fix or style change to a shared control showed up on every screen
        that used it.
      </p>

      <h3 id="controls">Controls I built</h3>
      <dl className="control-list">
        <div>
          <dt>Glare button</dt>
          <dd>
            The game&rsquo;s main call-to-action button. Glare effect,
            animation type and speed, loop timing, size, text size and click
            sound are all set as UXML attributes. The animation runs on an
            interval rather than transition events, so it keeps playing when
            a hidden button is shown again.
          </dd>
        </div>
        <div>
          <dt>Linear gradient and box shadow</dt>
          <dd>
            UI Toolkit had no built-in gradients or drop shadows, so I drew
            them myself. The gradient generates its own mesh with a
            configurable direction, colours and opacity, and the shadow takes
            radius, scale, offset and colour from UXML.
          </dd>
        </div>
        <div>
          <dt>Orientation section and aspect-ratio element</dt>
          <dd>
            Layout helpers for a game that runs on many phone shapes. The
            orientation section swaps a screen between portrait and
            landscape layouts, and the aspect-ratio element keeps cards and
            previews at a fixed shape whatever the screen size.
          </dd>
        </div>
        <div>
          <dt>Carousel and tabbed menu</dt>
          <dd>
            A carousel with configurable direction, transition speed and
            autoplay that pauses while the player is interacting with it, and
            a reusable tab control used across menus.
          </dd>
        </div>
        <div>
          <dt>Diagonal reveal</dt>
          <dd>
            A shutter-style diagonal wipe between screens, driven by USS
            transitions and timed hand-offs between each stage.
          </dd>
        </div>
        <div>
          <dt>Render-texture preview and share card</dt>
          <dd>
            Renders a 3D model into a texture that can be shown inside UI
            Toolkit, used for reward previews. The daily mission share card
            uses the same render-texture approach to capture a piece of UI
            as an image.
          </dd>
        </div>
        <div>
          <dt>Language-specific fonts</dt>
          <dd>
            Font assets for Arabic, Urdu (Nastaliq), Bengali and Devanagari,
            so the UI could display those scripts correctly.
          </dd>
        </div>
      </dl>

      <h2 id="economy">The economy behind the screens</h2>
      <ul>
        <li>
          I owned the <strong>PlayFab Economy V2 integration</strong>. I
          modelled the combo and weapon catalog with links in both directions,
          so the game can answer &ldquo;what does this combo need?&rdquo; and
          &ldquo;what do these weapons unlock?&rdquo; from either side.
        </li>
        <li>
          I wrote <strong>bulk catalog-import tooling</strong> that published
          items programmatically, which is how weekly content drops and event
          items went live instead of being clicked through a dashboard.
        </li>
        <li>
          The <strong>shop and combo screens render locked and unlocked
          content</strong> straight from the live catalog and the
          player&rsquo;s inventory, so the UI can&rsquo;t drift out of sync
          with the backend.
        </li>
      </ul>

      <EconomyDiagram />

      <h2>What I took from it</h2>
      <p>
        The client renders state, not assumptions. Every padlock and price
        tag on screen traces back to the live catalog and the player&rsquo;s
        inventory, which is what let designers reshape the economy without
        anyone touching UI code.
      </p>
    </ProjectLayout>
  );
}
