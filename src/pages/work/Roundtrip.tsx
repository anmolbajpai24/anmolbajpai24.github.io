import ProjectLayout from "../../components/ProjectLayout";
import MediaSlot from "../../components/MediaSlot";

/* Phone captures (390x844 @2x) from app.roundtrip.one, using a demo trip. */
const PHONE = "195 / 422";

const screens = [
  { name: "roundtrip/itinerary.webp", alt: "Roundtrip trip view: a strip of seven days colour-coded by city, with the plan for day one in Lisbon", caption: "Day by day, colour-coded by city" },
  { name: "roundtrip/day-trip.webp", alt: "Roundtrip showing day three, a day trip to Sintra, highlighted in its own colour", caption: "A day trip gets its own colour" },
  { name: "roundtrip/map.webp", alt: "Map of Portugal with the trip's route from Lisbon through Sintra to Porto", caption: "The route on a map" },
  { name: "roundtrip/budget.webp", alt: "Roundtrip budget: €687 spent of €1,800, broken down by category, with a list of expenses", caption: "Budget, split by category" },
  { name: "roundtrip/pack.webp", alt: "Shared packing list grouped by category, three of eight items checked off", caption: "Packing, checked off together" },
  { name: "roundtrip/bookings.webp", alt: "Bookings list with three of five bookings done", caption: "Bookings, chased until done" },
  { name: "roundtrip/share-code.webp", alt: "Trip-ready screen showing a six-letter code to share with trip-mates", caption: "Join with a six-letter code" },
  { name: "roundtrip/ai-draft.webp", alt: "AI-drafted plan for all seven days, each tagged with its city", caption: "Gemini's first draft of the days" },
];

export default function Roundtrip() {
  return (
    <ProjectLayout
      kicker="Personal project · 2026"
      title="Roundtrip"
      dek="A trip planner for groups. One person creates a trip and shares a six-letter code, and everyone on it sees the same plan. I built it for a 24-day trip and we used it every day we were away."
      facts={[
        { label: "Role", value: "Design & engineering, solo" },
        { label: "Stack", value: "React, Supabase, Gemini" },
        {
          label: "Try it",
          value: <a href="https://app.roundtrip.one">app.roundtrip.one</a>,
        },
        {
          label: "Code",
          value: <a href="https://github.com/anmolbajpai24/RoundTrip">GitHub</a>,
        },
      ]}
    >
      <h2>Why I built it</h2>
      <p>
        I was planning a 24-day trip with a group, and the plan lived in a
        spreadsheet, three chat threads and a folder of screenshots. Nobody
        knew which version was current. So I built Roundtrip, and we used it
        every day of that trip.
      </p>
      <p>
        Most of what&rsquo;s in it came from things that annoyed us while we
        were actually travelling. Packing had to be per person, but the budget
        had to be shared. Notes had to work with no signal. And nobody wanted
        to make an account before they could even see the plan, so you
        don&rsquo;t have to.
      </p>

      <h2>What&rsquo;s in it</h2>
      <p>
        Each day has its plan, the weather, and a suggestion for what to wear.
        Around that there&rsquo;s a map of the route, a shared budget that
        works out who owes whom at the end, packing lists, a booking checklist,
        a documents wallet for tickets and PDFs, and an outfit planner with
        photos.
      </p>
      <p>
        It installs to the home screen and works offline. Each phone keeps a
        copy of the trip in IndexedDB and queues any edits made without
        signal, then syncs them through Supabase once it&rsquo;s back online.
      </p>

      <div className="gallery gallery--phones breakout">
        {screens.map((s) => (
          <MediaSlot key={s.name} name={s.name} alt={s.alt} caption={s.caption} ratio={PHONE} />
        ))}
      </div>

      <h2>The AI parts</h2>
      <p>
        When you create a trip, Gemini drafts a first plan for the places and
        dates you picked. You can keep it and edit from there, or discard it
        and write the days yourself.
      </p>
      <p>
        The other one is virtual try-on. You upload one photo of yourself,
        which stays private, and any outfit in your closet can be rendered on
        you. By default it runs on the free IDM-VTON model on Hugging Face and
        takes 30 to 90 seconds. With a Gemini key it switches to Gemini 2.5
        Flash Image, at about four cents an image. Results are cached per
        outfit, so nothing gets generated twice unless you ask. Both features
        run in a server function, which keeps the API keys out of the browser.
      </p>

      <h2>How it&rsquo;s built</h2>
      <p>
        Vite and React on Supabase. Sign-in is anonymous first: everything
        works as a guest in one browser, and linking an email or Google
        account later carries the same identity to your other devices.
      </p>
      <p>
        The trip itself is shared. Days, notes, expenses, bookings and
        documents sync for everyone on it, and the documents sit in a private
        storage bucket only members can read. Packing lists, outfit photos
        and your own notes stay yours. Vitest covers the tests, Sentry catches
        errors, and GitHub Actions runs CI and takes versioned backups of the
        database.
      </p>
    </ProjectLayout>
  );
}
