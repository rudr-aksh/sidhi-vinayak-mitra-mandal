import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePageTitle from "../hooks/usePageTitle";

const filters = ["All", "Websites", "Web apps", "APIs"];

function Thumb({ item }) {
  if (item.image) {
    return <img className="thumb thumb-image" src={item.image} alt={`${item.name} screenshot`} loading="lazy" />;
  }
  return (
    <div className={`thumb thumb-${item.category.replace(/\s+/g, "-").toLowerCase()}`} aria-hidden="true">
      <span>{item.name}</span>
    </div>
  );
}

export default function Portfolio() {
  usePageTitle("Portfolio");
  const { data: items, error, loading } = useFetch("/portfolio");
  const [active, setActive] = useState("All");

  const visible = items
    ? items.filter((item) => active === "All" || item.category === active)
    : [];

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <h1>Selected work.</h1>
          <p className="lead">
            Sites, apps, and APIs we have built and launched. Filter by type to
            see what fits your project.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects by type">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className="filter"
                aria-pressed={active === name}
                onClick={() => setActive(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {loading && <p className="muted">Loading portfolio...</p>}
          {error && (
            <p className="notice notice-error">
              The portfolio could not be loaded. Check that the API is running.
            </p>
          )}

          {items && visible.length === 0 && (
            <p className="muted">No projects in this group yet.</p>
          )}

          <ul className="work-grid">
            {visible.map((item) => (
              <li key={item.id} className="work-item">
                <Thumb item={item} />
                <div className="work-body">
                  <p className="work-meta">
                    {item.category}, {item.year}
                  </p>
                  <h2>{item.name}</h2>
                  <p>{item.details}</p>
                  <p className="work-stack">{item.stack.join(", ")}</p>
                  {(item.liveUrl || item.repoUrl) && (
                    <p className="work-links">
                      {item.liveUrl && (
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                          View live site
                        </a>
                      )}
                      {item.repoUrl && (
                        <a href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                          View code
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="button-row section-end">
            <Link to="/contact" className="button button-primary">
              Start a project like this
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
