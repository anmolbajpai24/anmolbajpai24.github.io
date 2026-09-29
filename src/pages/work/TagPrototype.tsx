import ProjectLayout from "../../components/ProjectLayout";
import MediaSlot from "../../components/MediaSlot";

export default function TagPrototype() {
  return (
    <ProjectLayout
      kicker="Caravel.Tech internship · Jun to Oct 2022"
      title="Hyper-casual Tag prototype"
      dek="A fully working mobile Tag game prototype in Unity, built over a four-month internship where I was the only programmer."
      facts={[
        { label: "Role", value: "Sole programmer" },
        { label: "Stack", value: "Unity, C#" },
        { label: "Size", value: "About 2,000 lines of C#" },
        { label: "Result", value: "Build size cut by 25%" },
      ]}
    >
      <div className="split breakout">
        <MediaSlot
          className="split-media"
          name="tag-prototype/gameplay.mp4"
          poster="tag-prototype/gameplay-poster.webp"
          controls
          alt="Gameplay recording of the Tag prototype on a phone: joystick movement, coins, obstacles and win and fail screens"
          ratio="9 / 20"
          caption="Gameplay capture from the prototype."
        />
        <div>
          <h2>What I built</h2>
          <p>
            I was the only programmer on the project, so the whole game loop
            was mine to write: player movement on a virtual joystick, the
            chase between players, collectibles, obstacles, and the flow
            between levels with its win and fail screens.
          </p>
          <p>
            By the end of the internship it was a complete, playable
            prototype of roughly 2,000 lines of C#.
          </p>

          <h2>Getting the build smaller</h2>
          <p>
            Hyper-casual games live or die on install size, so before handing
            it over I went through the assets and the code and cut the build
            size by 25%.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
}
