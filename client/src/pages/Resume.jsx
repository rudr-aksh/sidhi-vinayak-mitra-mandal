import useFetch from "../hooks/useFetch";
import usePageTitle from "../hooks/usePageTitle";

export default function Resume() {
  usePageTitle("Resume");
  const { data: resume, error, loading } = useFetch("/resume");

  return (
    <section className="page-head resume-page">
      <div className="container narrow">
        {loading && <p className="muted">Loading resume...</p>}
        {error && (
          <p className="notice notice-error">
            The resume could not be loaded. Check that the API is running.
          </p>
        )}

        {resume && (
          <article className="resume">
            <header className="resume-head">
              <div>
                <h1>{resume.name}</h1>
                <p className="resume-title">{resume.title}</p>
                <p className="resume-contact">
                  {resume.location}
                  <br />
                  <a href={`mailto:${resume.email}`}>{resume.email}</a>
                  <br />
                  {resume.website}
                </p>
              </div>
              <button type="button" className="button button-plain no-print" onClick={() => window.print()}>
                Save as PDF
              </button>
            </header>

            <section className="resume-block">
              <h2>Summary</h2>
              <p>{resume.summary}</p>
            </section>

            <section className="resume-block">
              <h2>Experience</h2>
              <ul className="jobs">
                {resume.experience.map((job) => (
                  <li key={job.id} className="job">
                    <div className="job-head">
                      <h3>
                        {job.role}, {job.company}
                      </h3>
                      <p className="job-period">{job.period}</p>
                    </div>
                    <ul className="job-points">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-block">
              <h2>Education</h2>
              <ul className="jobs">
                {resume.education.map((item) => (
                  <li key={item.id} className="job">
                    <div className="job-head">
                      <h3>
                        {item.title}, {item.place}
                      </h3>
                      <p className="job-period">{item.period}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-block">
              <h2>Skills</h2>
              <dl className="skills">
                {resume.skills.map((skill) => (
                  <div key={skill.group}>
                    <dt>{skill.group}</dt>
                    <dd>{skill.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        )}
      </div>
    </section>
  );
}
