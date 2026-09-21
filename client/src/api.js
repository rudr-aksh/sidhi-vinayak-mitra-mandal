// Empty in development (Vite proxies /api) and when Node serves the site.
// Set VITE_API_URL if the API lives on a different address.
const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const type = res.headers.get("content-type") || "";
  const isJson = type.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  // If the server answered with a web page instead of JSON, the API is not
  // connected (for example, VITE_API_URL is missing on the hosting site).
  if (body === null) {
    throw new Error(
      res.ok
        ? "The API is not connected. Check the VITE_API_URL setting."
        : `Request failed (${res.status})`
    );
  }

  if (!res.ok) {
    const error = new Error(body.error || `Request failed (${res.status})`);
    error.details = body.details;
    throw error;
  }
  return body;
}

export const apiGet = (path, signal) => request(path, { signal });

export const apiPost = (path, data) =>
  request(path, { method: "POST", body: JSON.stringify(data) });
