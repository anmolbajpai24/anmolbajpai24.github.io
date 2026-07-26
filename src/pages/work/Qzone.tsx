import ProjectLayout from "../../components/ProjectLayout";

export default function Qzone() {
  return (
    <ProjectLayout
      kicker="Petals Studio"
      title="Qzone"
      dek="The React frontend for a live quiz product. I built the interface layer between the quiz API and the player."
      facts={[
        { label: "Role", value: "Frontend engineering" },
        { label: "Stack", value: "React, REST APIs" },
        {
          label: "Live",
          value: <a href="https://qzone.live">qzone.live</a>,
        },
      ]}
    >
      <h2>What I built</h2>
      <p>Qzone is a quiz product; my part was the React frontend:</p>
      <ul>
        <li>
          <strong>State management</strong> for quiz flow — question
          progression, answer state, and scoring, kept predictable as the
          product added question types.
        </li>
        <li>
          <strong>REST API integration</strong> against the quiz backend, with
          the loading and error states a live product needs.
        </li>
        <li>
          <strong>Dynamic question rendering</strong> — the UI renders
          whatever question structure the API delivers, so new content
          doesn&rsquo;t require new frontend releases.
        </li>
      </ul>
      <p>
        The pattern it shares with my other work: interfaces driven by data,
        so content changes don&rsquo;t become code changes.
      </p>
    </ProjectLayout>
  );
}
