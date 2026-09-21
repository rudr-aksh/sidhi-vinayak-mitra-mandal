import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects, services } from "./data.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === "production";
const messagesFile = path.join(__dirname, "data", "messages.jsonl");

app.set("trust proxy", 1);
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

// ---------- API routes ----------

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    service: "brightline-api",
    uptimeSeconds: Math.round(process.uptime()),
    time: new Date().toISOString(),
  });
});

app.get("/api/projects", (req, res) => res.json(projects));
app.get("/api/services", (req, res) => res.json(services));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again in a few minutes." },
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body = {}) {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const details = {};

  if (name.length < 2 || name.length > 80) {
    details.name = "Enter your name (2 to 80 characters).";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 120) {
    details.email = "Enter a valid email address.";
  }
  if (message.length < 10 || message.length > 2000) {
    details.message = "Write a message of 10 to 2000 characters.";
  }

  return { values: { name, email, message }, details };
}

app.post("/api/contact", contactLimiter, async (req, res, next) => {
  try {
    const { values, details } = validateContact(req.body);

    if (Object.keys(details).length > 0) {
      return res
        .status(400)
        .json({ error: "Please fix the highlighted fields.", details });
    }

    const entry = { ...values, receivedAt: new Date().toISOString() };

    // Messages are stored in a local file. On hosts with a temporary disk
    // (like Render's free plan), swap this for an email service or a database.
    await fs.mkdir(path.dirname(messagesFile), { recursive: true });
    await fs.appendFile(messagesFile, JSON.stringify(entry) + "\n");

    console.log(`New message from ${values.name} <${values.email}>`);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Any unknown /api path returns JSON instead of an HTML page
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

// ---------- Serve the React build in production ----------

if (isProduction) {
  const dist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(dist));
  app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
}

// ---------- Error handler ----------

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our side. Please try again." });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
