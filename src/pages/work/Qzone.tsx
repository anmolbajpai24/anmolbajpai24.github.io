import ProjectLayout from "../../components/ProjectLayout";

export default function Qzone() {
  return (
    <ProjectLayout
      kicker="Petals Studio"
      title="Qzone"
      dek="The React frontend for a quiz product. I built the interface layer between the quiz API and the player."
      facts={[
        { label: "Role", value: "Frontend engineering" },
        { label: "Stack", value: "React, REST APIs" },
        { label: "Status", value: "Shut down; site no longer online" },
        {
          label: "See it",
          value: (
            <a href="https://www.instagram.com/qzone.live/">Instagram</a>
          ),
        },
      ]}
    >
      <h2>What I built</h2>
      <p>
        Qzone was a quiz product; my part was the React frontend. The
        product has since shut down and its website is offline, but its{" "}
        <a href="https://www.instagram.com/qzone.live/">Instagram page</a>{" "}
        still shows what it looked like.
      </p>
      <ul>
        <li>
          <strong>State management</strong> for quiz flow: question
          progression, answer state, and scoring, kept predictable as the
          product added question types.
        </li>
        <li>
          <strong>REST API integration</strong> against the quiz backend, with
          the loading and error states a live product needed.
        </li>
        <li>
          <strong>Dynamic question rendering</strong>. The UI renders
          whatever question structure the API delivers, so new content
          didn&rsquo;t require new frontend releases.
        </li>
      </ul>
      <p>
        The pattern it shares with my other work: interfaces driven by data,
        so content changes don&rsquo;t become code changes.
      </p>
    </ProjectLayout>
  );
}
