# Brightline Studio: 4-page React + Node.js website

Pages: **Home, About, Services, Contact** (plus a 404 page).

- `client/` React 18 + Vite + React Router
- `server/` Node.js + Express API (services, projects, contact form)

## Run it on your computer

Requires Node.js 18.11 or newer.

```bash
npm run install:all      # installs root, client and server packages
cp server/.env.example server/.env
npm run dev              # starts API on :5000 and React on :5173
```

Open http://localhost:5173

The home page shows a live "GET /api/status" box. If it says 200 OK, the
React site and the Node server are talking to each other.

## Change the content

| What                         | Where                                |
| ---------------------------- | ------------------------------------ |
| Site name, email, tagline    | `client/src/config.js`               |
| Projects and services lists  | `server/data.js`                     |
| About page text              | `client/src/pages/About.jsx`         |
| Colors and fonts             | top of `client/src/styles.css`       |

Contact form messages are saved to `server/data/messages.jsonl`.

## Deploy (free) — option A: one service, easiest

Node serves the built React site and the API together.

1. Push this folder to GitHub.
2. On **Render** (or Railway / Koyeb) create a **Web Service** from the repo.
3. Build command: `npm run install:all && npm run build`
4. Start command: `npm start`
5. Done. Your site is at `https://your-name.onrender.com`.

## Deploy (free) — option B: split

- Frontend: Vercel / Netlify / Cloudflare Pages
  - Root directory: `client`, build: `npm run build`, output: `dist`
  - Set env var `VITE_API_URL=https://your-api.onrender.com`
  - Add a rewrite of all paths to `/index.html` (Netlify: a `_redirects`
    file containing `/*  /index.html  200`; Vercel does this for Vite apps
    automatically when configured as a SPA)
- Backend: Render, root directory `server`, start `npm start`
  - Set env var `CLIENT_ORIGIN=https://your-frontend-url`

## Important notes

- Free hosts often have a temporary disk, so `messages.jsonl` can be wiped on
  redeploy. For real use, send contact messages by email (Nodemailer, Resend)
  or store them in a database (MongoDB Atlas, Supabase).
- Free Render services sleep when idle, so the first request can take ~30 s.
