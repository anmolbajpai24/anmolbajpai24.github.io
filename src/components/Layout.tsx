import { useEffect, useRef } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SocialLinks from "./SocialLinks";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Layout() {
  const { pathname, hash } = useLocation();

  // The route effect below ignores a link to the URL we're already on, so
  // clicking "Skills" twice (after scrolling away) would do nothing.
  function scrollIfHere(id: string) {
    if (pathname === "/" && hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView();
    }
  }
  const navigationType = useNavigationType();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const lastLocation = useRef(`${pathname}${hash}`);

  useEffect(() => {
    // Skip on initial load: keep natural document focus and let the browser
    // handle scroll. On back/forward (POP), let the browser restore scroll
    // position but still move focus so the page change is announced.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Query-string changes (like the work filter tabs) aren't page changes:
    // leave scroll and focus where the user put them.
    const key = `${pathname}${hash}`;
    if (key === lastLocation.current) return;
    lastLocation.current = key;
    if (navigationType !== "POP") {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash, navigationType]);

  return (
    <div className="container">
      <header className="site-header">
        <Link to="/" className="wordmark">
          Anmol Bajpai
        </Link>
        <nav className="site-nav" aria-label="Site">
          {sections.map((s) => (
            <Link key={s.id} to={`/#${s.id}`} onClick={() => scrollIfHere(s.id)}>
              {s.label}
            </Link>
          ))}
          <a href="/Anmol_Bajpai_Resume.pdf">Resume</a>
        </nav>
        <ThemeToggle />
      </header>

      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>Anmol Bajpai · Delhi NCR, India</span>
        <SocialLinks className="footer-links" />      </footer>
    </div>
  );
}
