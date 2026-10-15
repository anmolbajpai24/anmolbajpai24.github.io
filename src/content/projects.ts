export type TrackId = "games" | "ai" | "web";

export interface Track {
  id: TrackId;
  label: string;
  /** One line shown above the grid when the track is selected. */
  intro: string;
}

export const tracks: Track[] = [
  {
    id: "games",
    label: "Game UI",
    intro:
      "Three years of UI and content tooling on a live multiplayer mobile game, plus my first Unity job.",
  },
  {
    id: "ai",
    label: "AI & robotics",
    intro:
      "Robot-learning policies trained and scored in public, and the Gemini features in Roundtrip.",
  },
  {
    id: "web",
    label: "Web apps",
    intro: "A quiz product frontend I built at Petals, and a trip planner I built for my own travels.",
  },
];

export interface Project {
  slug: string;
  title: string;
  /** Short line under the title on the card. */
  meta: string;
  blurb: string;
  tracks: TrackId[];
  tags: string[];
  /** Internal route or external URL. Cards without one render unlinked. */
  href?: string;
  /** Cover image or video inside src/assets/media. */
  cover?: string;
  /** Cover aspect ratio for the card. Phone screenshots look best at 9 / 16. */
  coverRatio?: string;
}

export const projects: Project[] = [
  {
    slug: "melee-madness",
    title: "Melee Madness",
    meta: "Petals Studio · 2023 to 2026",
    blurb:
      "The UI for a live multiplayer mobile game on the Play Store. I built every screen and the control library behind them, plus the PlayFab catalog tooling that weekly content drops went through.",
    tracks: ["games"],
    tags: ["Unity UI Toolkit", "UXML/USS", "C#", "PlayFab"],
    href: "/work/melee-madness",
    cover: "cards/melee-madness.webp",
  },
  {
    slug: "robotics-challenge",
    title: "22-day robot-learning challenge",
    meta: "Public log · 2026",
    blurb:
      "Robot learning from zero, in public. My diffusion policy scores 39.8% on PushT against the pretrained 61.0%, and a phone video of my hand drives a simulated robot arm. Every number is on a live dashboard.",
    tracks: ["ai"],
    tags: ["PyTorch", "LeRobot", "MediaPipe", "FastAPI"],
    href: "/work/robotics-challenge",
    cover: "cards/robotics.webp",
  },
  {
    slug: "roundtrip",
    title: "Roundtrip",
    meta: "Side project · 2026",
    blurb:
      "A trip planner I built for a 24-day group trip. Everyone edits one shared plan, even offline, and Gemini drafts the first itinerary.",
    tracks: ["web", "ai"],
    tags: ["React", "Supabase", "Gemini", "PWA"],
    href: "/work/roundtrip",
    cover: "cards/roundtrip.webp",
  },
  {
    slug: "qzone",
    title: "Qzone",
    meta: "Petals Studio",
    blurb:
      "The React frontend for a quiz product, where new question types shipped without a frontend release. The product has since shut down.",
    tracks: ["web"],
    tags: ["React", "REST APIs"],
    href: "/work/qzone",
    cover: "cards/qzone.webp",
  },
  {
    slug: "tag-prototype",
    title: "Hyper-casual Tag prototype",
    meta: "Caravel.Tech internship · 2022",
    blurb:
      "Sole programmer on a working Unity prototype over four months, about 2,000 lines of C#. Cut the build size by 25% through asset and code optimisation.",
    tracks: ["games"],
    tags: ["Unity", "C#", "Optimisation"],
    href: "/work/tag-prototype",
    cover: "cards/tag-prototype.webp",
  },
];
