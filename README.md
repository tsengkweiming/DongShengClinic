# 冬勝診所 — Dong Sheng Clinic

Static clinic website built with plain HTML, Tailwind CSS (CDN), and custom CSS. No build step required.

[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/dongshengclinic/deploys)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/tsengkweiming/DongShengClinic"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Structure

```
src/
  index.html        # Landing page
  blog.html         # Blog listing
  blog/*.html       # Individual blog posts
common/
  clinic_assets/    # Images, SVG logo, photos
netlify.toml        # Deploy config (publish = ".")
```

## Deploy

The site is pure static HTML — no build command needed. `netlify.toml` handles URL rewrites so that `src/index.html` is served at `/`.

### One-click deploy

Click the **Deploy to Netlify** button above. No build command or publish directory needed — `netlify.toml` in the repo sets both automatically.

### Manual deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir . --prod
```

## Local development

```bash
node serve.mjs   # serves at http://localhost:3000
```

## Stack

- HTML + inline CSS
- [Tailwind CSS](https://tailwindcss.com) via CDN
- [Noto Serif TC](https://fonts.google.com/noto/specimen/Noto+Serif+TC) + [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- Deployed on [Netlify](https://netlify.com)
