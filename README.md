# AeroOps GCS

A responsive, multi-page **Ground Control Station** UI, stitched together from three separate design files into one clickable, Vercel-ready static site.

## Pages

| Route | File | Screen |
|-------|------|--------|
| `/` | `index.html` | Real-Time Flight Dashboard |
| `/mission` | `mission.html` | Mission Planning / Survey Grid Generator |
| `/triage` | `triage.html` | Survivor Triage & Rescue |

Each page keeps its own visual theme, but they share one navigation bar, drawer, and footer shell so you can click between them.

## Project structure

```
aeroops-gcs/
├── index.html          # Dashboard (home)
├── mission.html        # Mission planning
├── triage.html         # Survivor triage
├── assets/
│   ├── app.css         # Shared nav + drawer + workspace + footer shell
│   └── nav.js          # Active-tab highlight + mobile hamburger drawer
├── vercel.json         # cleanUrls → extensionless routes (/mission, /triage)
└── README.md
```

## How it works

- **Three isolated themes.** Each page carries its own inline `tailwind.config` (the Dashboard, Mission, and Triage palettes conflict — e.g. one overrides `borderRadius`, which would break the pills on another — so they are deliberately **not** merged). The shared shell in `assets/app.css` uses plain hex values so it looks identical everywhere regardless of each page's Tailwind config.
- **Shared navigation.** `assets/nav.js` highlights the current tab (works for both `/mission` and `/mission.html`) and drives the mobile hamburger drawer.
- **Responsive strategy.** On phones/tablets each screen is a normal scrolling document: a map "hero" on top, then the panels stacked below. At `lg:` (≥1024px) it becomes a viewport-locked HUD — the map fills the background and panels float over it (`lg:absolute`). Pixel-positioned map markers and decorative labels are hidden on small screens; the vector overlays scale with the map via SVG `viewBox` + `preserveAspectRatio="xMidYMid slice"`.

## Run locally

No build step — it's plain static HTML. Serve the folder with any static server:

```bash
# Python
python -m http.server 5173

# or Node
npx serve .
```

Then open http://localhost:5173 and click between Dashboard / Mission / Triage.

> Tip: opening the files directly with `file://` also works, but a local server is closer to how Vercel serves them (and matches the extensionless `cleanUrls` routing).

## Deploy to Vercel

This is a zero-config static deploy.

**Option A — CLI**
```bash
npm i -g vercel
cd aeroops-gcs
vercel          # preview deploy
vercel --prod   # production deploy
```

**Option B — Git / Dashboard**
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In the Vercel dashboard: **Add New… → Project**, import the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty / root)*.
4. Deploy.

`vercel.json` sets `cleanUrls: true`, so `mission.html` is served at `/mission` and `triage.html` at `/triage`. The in-page links use the `.html` names (which still work), and Vercel serves them at the clean routes too.

## Notes

- Tailwind is loaded via the Play CDN for zero-build convenience. For a production hardening pass you could compile Tailwind to a static stylesheet and drop the CDN `<script>`, but it is not required for deployment.
- Fonts (JetBrains Mono, Space Grotesk, Geist, Material Symbols) load from Google Fonts.
