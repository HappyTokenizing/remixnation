# Happy's Remix Nation — v5

Same smooth pan-and-zoom from v4, with a new team page, refreshed copy
across every section, and the real Discord link wired up.

## What's new in v5

- **Header** — added "#1 Professional Community for AI Creators" tagline
  to the right of the wordmark (hidden under 720px to keep mobile clean)
- **JOIN THE NATION button** — now links to https://discord.gg/Fw3pb3YT
- **Hotdog section** — text updated to "Redefining Media & Entertainment"
  / "PROMPTING THE FUTURE" / "One Community." / "GROWING FAST"
- **Team section** — replaces the old logo zoom. Shows 4 Founders +
  14 Mentors with their actual photos. Each card has a unique tilt,
  duration, and delay so the wobble feels organic instead of synced.
  The banner pulls back and darkens behind it.
- **GPU section** — "Take The Leap" / "SHARE IDEAS. GROW TOGETHER."
  with stat labels updated to SUPPORT / PROMPTING / WINNING
- **Tombstone section** — "Viral hits come and go. Creations last forever."
  with the new quote
- **Closing section** — eyebrow flipped to yellow with "what are you
  waiting for?", "THE NATION" now uses the blue chrome treatment matching
  the hero, sub line updated to "vibes, tips, success — teamwork dreamwork",
  Subscribe and Follow buttons removed, Discord button restyled in yellow

## Team section

Founders (top row, yellow-bordered cards):
- Happy Remixing, JonJonJovi, V1nmon, Meeksipoo

Mentors (rows below):
- AllieRanae, RoRoTuck, Eva Caridad, Tiffany Nisbet, ZapbyZZMyth,
  MichaelTV, JesiWicks, TannerManor, Byeson, SandyZL, Weird Rocket J,
  SloppyYolk, Erin Nicole, Steve Johnson

To swap or add a member, edit the `FOUNDERS` / `MENTORS` arrays at the
top of `src/sections/TeamSection.jsx`. Drop a new image into
`public/mentors/` and reference its filename in the array.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Project structure

```
src/
├── App.jsx                    # 7 sections wired up
├── main.jsx
├── components/
│   ├── BannerStage.jsx        # pan/zoom layer + zones
│   ├── Header.jsx             # CTA links to Discord
│   ├── Logo.jsx               # wordmark + tagline
│   ├── SideNav.jsx
│   └── ZoneText.jsx
├── hooks/
│   ├── useScrollProgress.js
│   └── useViewportHeight.js
├── sections/
│   ├── HeroSection.jsx
│   ├── CatSection.jsx
│   ├── HotdogSection.jsx
│   ├── TeamSection.jsx        # ★ new
│   ├── GpuSection.jsx
│   ├── TombstoneSection.jsx
│   └── ClosingSection.jsx
└── styles/
    ├── global.css
    ├── header.css
    ├── sections.css
    └── sidenav.css

public/
├── favicon.svg
├── images/
│   ├── banner.mp4
│   └── banner.png
└── mentors/                   # ★ all 18 member photos
```

## Tweaking the team page

- **Reorder** — move entries up/down in the `FOUNDERS` or `MENTORS`
  arrays in `TeamSection.jsx`
- **Wobble amount** — `getWobble()` in `TeamSection.jsx` controls each
  card's tilt range, animation duration, and delay
- **Card size** — the grid columns are set in `sections.css` under
  `.team__row--founders` and `.team__row--mentors`
- **Founder vs Mentor styling** — yellow border + glow on founders
  is in `.team__row--founders .member__frame`
