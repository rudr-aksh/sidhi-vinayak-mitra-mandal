import { useState } from "react";
import { apiPost } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import { site } from "../config";

const empty = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Write at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  usePageTitle("Contact");

  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await apiPost("/contact", values);
      setValues(empty);
      setStatus("sent");
    } catch (err) {
      if (err.details) setErrors(err.details);
      setServerError(err.message);
      setStatus("error");
    }
  }

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <h1>Tell us what you need.</h1>
          <p className="lead">
            Send a few lines about your project. We reply within two working
            days. You can also write to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          {status === "sent" ? (
            <div className="notice notice-success" role="status">
              <h2>Message sent</h2>
              <p>Thanks for writing. We will reply within two working days.</p>
              <button className="button button-plain" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="form">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="field-error">{errors.name}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="field-error">{errors.email}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="message">What are you planning?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="field-error">{errors.message}</p>
                )}
              </div>

              {status === "error" && (
                <p className="notice notice-error" role="alert">{serverError}</p>
              )}

              <button
                type="submit"
                className="button button-primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
