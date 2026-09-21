import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePageTitle from "../hooks/usePageTitle";

export default function Services() {
  usePageTitle("Services");
  const { data: services, error, loading } = useFetch("/services");

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <h1>What we can build for you.</h1>
          <p className="lead">
            Pick one service or combine them. Every project starts with a free
            call to agree on scope.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && <p className="muted">Loading services...</p>}
          {error && (
            <p className="notice notice-error">
              Services could not be loaded. Check that the API is running.
            </p>
          )}

          {services && (
            <ul className="rows">
              {services.map((service) => (
                <li key={service.id} className="row">
                  <div className="row-main">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <p className="row-meta">Typical time: {service.timeline}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="button-row section-end">
            <Link to="/contact" className="button button-primary">
              Ask about pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
