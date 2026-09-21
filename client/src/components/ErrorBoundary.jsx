import { Component } from "react";

// Shows a message instead of a blank page if something crashes while rendering.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div style={{ padding: "3rem 1.5rem", maxWidth: "40rem", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem" }}>Something went wrong.</h1>
          <p>Please reload the page. If it keeps happening, contact the site owner.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
