import ProjectLayout from "../../components/ProjectLayout";

export default function Roundtrip() {
  return (
    <ProjectLayout
      kicker="Personal project · 2026"
      title="Roundtrip"
      dek="A group-trip planning PWA: one shared itinerary everyone edits, built for a specific 24-day trip and then used on it every single day."
      facts={[
        { label: "Role", value: "Design & engineering, solo" },
        { label: "Stack", value: "React, TypeScript, Supabase" },
        {
          label: "Live",
          value: <a href="https://roundtrip.one">roundtrip.one</a>,
        },
        { label: "Status", value: "Shipped, used daily on a 24-day trip" },
      ]}
    >
      <h2>The problem</h2>
      <p>
        Group trips get planned in the worst possible tools: a chat thread
        where decisions scroll away, and a spreadsheet nobody opens on their
        phone. I had a 24-day trip abroad coming up with exactly that dynamic,
        so I built the tool I wanted to exist.
      </p>

      <h2>What it does</h2>
      <ul>
        <li>
          A <strong>shared day-by-day itinerary</strong> with maps and weather
          inline, so &ldquo;where are we going and what&rsquo;s it like
          outside&rdquo; is one screen, not three apps.
        </li>
        <li>
          Trip-mates <strong>join with a short code</strong> and edit the same
          trip with <strong>live sync</strong>. No accounts to talk anyone
          into, no owner bottleneck.
        </li>
        <li>
          Packing lists, outfits, budget tracking, and bookings live alongside
          the itinerary.
        </li>
        <li>
          It&rsquo;s a <strong>PWA</strong>: installs to the home screen and
          works offline, because the moments you need your itinerary most are
          precisely the moments you have no signal.
        </li>
      </ul>

      <h2>The proof</h2>
      <p>
        The honest test of a planning tool is whether people keep opening it
        after day three. We used Roundtrip every day, for all 24 days of the
        trip it was built for.
      </p>

      <h2>What&rsquo;s next</h2>
      <p>
        I&rsquo;m adding an AI layer: LLM-generated itinerary drafts and
        chat-based plan editing (&ldquo;push everything on Tuesday back two
        hours&rdquo;). The interesting engineering problem is making LLM edits
        respect the same sync and conflict rules as human edits. An agent is
        just another trip-mate, with the same permissions and the same audit
        trail.
      </p>
    </ProjectLayout>
  );
}
