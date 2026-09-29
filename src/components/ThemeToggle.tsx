import { useState } from "react";

function currentTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/* An icon button, not a text link, so it doesn't read as another section in
   the nav. Shows the theme you'd switch to: a moon in light mode, a sun in
   dark mode. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);
  const [announcement, setAnnouncement] = useState("");

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    // Persistence is best-effort; a blocked localStorage must not wedge the
    // toggle out of sync with the applied theme.
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
    setTheme(next);
    setAnnouncement(`${next === "dark" ? "Dark" : "Light"} theme on`);
  }

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <>
      <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinejoin="round">
            <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
          </svg>
        )}
      </button>
      <span className="visually-hidden" role="status">
        {announcement}
      </span>
    </>
  );
}
