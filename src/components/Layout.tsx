import { useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="container">
      <header className="site-header">
        <Link to="/" className="wordmark">
          Anmol Bajpai
        </Link>
        <nav className="site-nav" aria-label="Site">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/log">Log</NavLink>
          <a href="/Anmol_Bajpai_Resume.pdf">Resume</a>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>Anmol Bajpai · Delhi NCR, India</span>
        <div className="footer-links">
          <a href="mailto:anmolbajpai24@gmail.com">Email</a>
          <a href="https://github.com/anmolbajpai24">GitHub</a>
          <a href="https://x.com/anmol_bajpai24">X</a>
          <a href="https://linkedin.com/in/anmolbajpai">LinkedIn</a>
        </div>
        <span>Set in Fraunces &amp; IBM Plex. Built by hand.</span>
      </footer>
    </div>
  );
}
