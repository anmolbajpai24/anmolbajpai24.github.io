import { useState } from "react";

function currentTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

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

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
      <span className="visually-hidden" role="status">
        {announcement}
      </span>
    </>
  );
}
