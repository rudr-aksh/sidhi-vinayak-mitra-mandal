import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="page-head">
      <div className="container narrow">
        <h1>That page doesn't exist.</h1>
        <p className="lead">The link may be old or mistyped.</p>
        <div className="button-row">
          <Link to="/" className="button button-primary">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
