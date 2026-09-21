import { useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { site } from "../config";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            {site.name}
          </Link>
          <nav aria-label="Main">
            <ul className="nav-list">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>{site.name}</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>&copy; {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </>
  );
}
