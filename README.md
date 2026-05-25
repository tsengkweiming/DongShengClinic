# 冬勝診所 — Dong Sheng Clinic

Static clinic website built with HTML, Tailwind CSS (CDN), custom WebGL, and a lightweight Google Apps Script backend. Includes online booking, live doctor schedule integration, and CMS-managed blog content.

[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/dongshengclinic/deploys)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/tsengkweiming/DongShengClinic"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Structure

```
src/
  index.html              # Landing page (WebGL hero, schedule, blog preview)
  blog.html               # Blog listing
  appointment.html        # Online booking page
  js/
    hero-gl.js            # WebGL gradient effect
    schedule-render.js    # Fetches live schedule from Apps Script
    schedule-data.js      # Static fallback schedule (used if API is down)
    ui.js                 # Navbar, scroll effects

content/
  blog/*.md               # Blog posts managed via Netlify CMS

admin/
  index.html              # Netlify CMS (Decap CMS) entry point
  config.yml              # CMS collection config — branch: master

appointment-backend/
  Code.gs                 # Google Apps Script — booking API + schedule sheet

common/
  clinic_assets/          # Images, SVG logos, blog photos

netlify.toml              # Deploy config (publish = ".")
serve.mjs                 # Local dev server (http://localhost:3000)
```

## Features

- **Online booking** (`appointment.html`) — date picker, session availability, queue number. Backend is a Google Apps Script web app that reads/writes a Google Spreadsheet.
- **Doctor schedule** — fetched live from Apps Script (`action=schedule`). Staff update the "Schedule" sheet in Google Sheets; the site reflects changes within 5 minutes (cached).
- **Blog / CMS** — posts are Markdown files in `content/blog/`. Managed via Netlify CMS at `/admin`. Published directly to the `master` branch.
- **WebGL hero** — physics-based metaball gradient with mouse repel, click burst, and depth layering.

## Appointment backend setup

The booking system uses a Google Apps Script deployed as a web app.

1. Open [Google Apps Script](https://script.google.com), create a new project bound to your Google Spreadsheet.
2. Paste the contents of `appointment-backend/Code.gs`.
3. Deploy → **New deployment** → Web app → Execute as: **Me** → Who has access: **Anyone**.
4. Copy the `/exec` URL into `src/appointment.html` and `src/js/schedule-render.js` as `SCRIPT_URL`.

The script auto-creates two sheets on first run: **Bookings** (patient records) and **Schedule** (weekly doctor timetable). Edit the Schedule sheet directly to update doctor assignments — no code change needed.

## Local development

```bash
node serve.mjs   # serves at http://localhost:3000
```

## Live Site

- Production: https://dongshengclinic.com

## Deploy

The site is pure static HTML — no build command needed. `netlify.toml` handles URL rewrites so `src/index.html` is served at `/`.

### One-click deploy

Click the **Deploy to Netlify** button above. No build command or publish directory needed — `netlify.toml` in the repo sets both automatically.

### Manual deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir . --prod
```

## Stack

- Plain HTML + inline CSS
- [Tailwind CSS](https://tailwindcss.com) via CDN
- WebGL (hero gradient animation)
- [Noto Serif TC](https://fonts.google.com/noto/specimen/Noto+Serif+TC) + [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- [Google Apps Script](https://script.google.com) (appointment API)
- [Netlify CMS / Decap CMS](https://decapcms.org) (blog management)
- Deployed on [Netlify](https://netlify.com)
