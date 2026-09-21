import usePageTitle from "../hooks/usePageTitle";
import { site } from "../config";

const steps = [
  {
    title: "Talk",
    text: "We learn what the site needs to do and who will use it, then agree on scope and price.",
  },
  {
    title: "Design",
    text: "You review page layouts and real content before any code is written.",
  },
  {
    title: "Build",
    text: "We build in React and Node.js and share a working preview every week.",
  },
  {
    title: "Launch",
    text: "We deploy, test on real devices, and stay on hand for fixes after go-live.",
  },
];

const stack = [
  { name: "React", use: "Pages and interface" },
  { name: "Node.js and Express", use: "APIs and server logic" },
  { name: "PostgreSQL or MongoDB", use: "Data storage" },
  { name: "Vercel, Render, Cloudflare", use: "Hosting" },
];

export default function About() {
  usePageTitle("About");

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <h1>A small team that ships.</h1>
          <p className="lead">
            {site.name} is a group of web developers who prefer plain,
            dependable tools. We build sites people can update themselves,
            and we explain what we did in words you can follow.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>How a project runs</h2>
            <ol className="steps">
              {steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2>What we build with</h2>
            <dl className="stack-list">
              {stack.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.use}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
