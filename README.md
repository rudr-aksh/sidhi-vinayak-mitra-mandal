# Brightline Studio: 4-page React + Node.js website

Pages: **Home, About, Services, Portfolio, Resume, Contact** (plus a 404 page).

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
| Home projects, services      | `server/data.js` (`projects`, `services`) |
| Portfolio page items         | `server/data.js` (`portfolio`)       |
| Resume page details          | `server/data.js` (`resume`)          |
| About page text              | `client/src/pages/About.jsx`         |
| Colors and fonts             | top of `client/src/styles.css`       |

The Resume page has a "Save as PDF" button. It opens the browser's print
dialog with a clean print layout, so choose "Save as PDF" as the destination.
To show screenshots in the Portfolio, add an `image` field to an item, for
example `image: "/images/harbor.jpg"`, and put the file in `client/public/images/`.

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
  - Vercel: `client/vercel.json` already rewrites every path to `/index.html`
    so page refreshes work. Netlify: add a `_redirects` file containing
    `/*  /index.html  200`
- Backend: Render, root directory `server`, start `npm start`
  - Set env var `CLIENT_ORIGIN=https://your-frontend-url`

## Important notes

- Free hosts often have a temporary disk, so `messages.jsonl` can be wiped on
  redeploy. For real use, send contact messages by email (Nodemailer, Resend)
  or store them in a database (MongoDB Atlas, Supabase).
- Free Render services sleep when idle, so the first request can take ~30 s.
