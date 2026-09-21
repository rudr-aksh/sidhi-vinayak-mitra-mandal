import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // During development, requests to /api go to the Node server
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
