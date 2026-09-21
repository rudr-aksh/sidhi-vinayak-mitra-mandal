import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePageTitle from "../hooks/usePageTitle";
import { site } from "../config";

function StatusPanel() {
  const { data, error, loading, ms } = useFetch("/status");

  let result;
  if (loading) {
    result = <p className="status-line">Connecting to the server...</p>;
  } else if (error) {
    result = (
      <>
        <p className="status-line status-bad">No response</p>
        <p className="status-help">
          The API isn't reachable. Start it with <code>npm run dev</code> from
          the project folder.
        </p>
      </>
    );
  } else {
    result = (
      <>
        <p className="status-line status-good">
          <span className="pulse" aria-hidden="true" />
          200 OK in {ms} ms
        </p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </>
    );
  }

  return (
    <aside className="status-panel" aria-live="polite" aria-label="Live server check">
      <p className="status-request">GET /api/status</p>
      {result}
    </aside>
  );
}

export default function Home() {
  usePageTitle("");
  const { data: projects, error, loading } = useFetch("/projects");

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>{site.tagline}</h1>
            <p className="lead">
              {site.name} builds React front ends and Node.js back ends for
              small businesses and teams. You get a site that is quick,
              tidy, and simple to maintain.
            </p>
            <div className="button-row">
              <Link to="/contact" className="button button-primary">
                Start a project
              </Link>
              <Link to="/services" className="button button-plain">
                See services
              </Link>
            </div>
          </div>
          <StatusPanel />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Recent projects</h2>

          {loading && <p className="muted">Loading projects...</p>}
          {error && (
            <p className="notice notice-error">
              Projects could not be loaded. Check that the API is running.
            </p>
          )}

          {projects && (
            <ul className="rows">
              {projects.map((project) => (
                <li key={project.id} className="row">
                  <div className="row-main">
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <p className="row-meta">{project.stack.join(", ")}</p>
                  <p className="row-year">{project.year}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <h2>Have a site or app in mind?</h2>
          <Link to="/contact" className="button button-dark">
            Tell us about it
          </Link>
        </div>
      </section>
    </>
  );
}
