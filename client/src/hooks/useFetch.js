import { useEffect, useState } from "react";
import { apiGet } from "../api";

// Loads data from the API and reports loading, error, and response time.
export default function useFetch(path) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
    ms: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const start = performance.now();
    setState({ data: null, error: null, loading: true, ms: null });

    apiGet(path, controller.signal)
      .then((data) =>
        setState({
          data,
          error: null,
          loading: false,
          ms: Math.round(performance.now() - start),
        })
      )
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, error: err.message, loading: false, ms: null });
      });

    return () => controller.abort();
  }, [path]);

  return state;
}
