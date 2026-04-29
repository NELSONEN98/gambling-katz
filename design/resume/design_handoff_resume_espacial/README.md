# Handoff: Space-Themed Interactive Resume

## Overview
An animated, narrative resume presented as a **space mission (NA-01)**. Visitors scroll through 5 waypoints — Liftoff → Origin → Systems → Missions → Transmit — while a rocket companion on the side tracks their progress and the starfield parallaxes in the background. The design belongs to **Nelson Arango** — Multidisciplinary Designer | Web & Front-End Developer.

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel**. They are prototypes showing the intended look, motion, and behavior — not production code to ship directly. The task for the developer is to **recreate these designs in the existing codebase** (the current repo already uses React + react-router + framer-motion + SASS) and port the components into `/src/components` and `/src/assets/scss` following the established patterns.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are locked. Recreate pixel-perfectly.

## Screens / Sections (in scroll order)

### 01 — Liftoff (Hero)
- **Purpose**: first impression; show name and role.
- **Layout**: full-viewport, centered column. Two floating planet blurs (top-right purple, bottom-left yellow). 8 decorative 8-point stars scattered.
- **Elements**:
  - Pre-flight tag: `MISSION NA-01 · PRE-FLIGHT CHECK` with pulsing yellow dot (JetBrains Mono, 11px, letter-spacing 0.3em).
  - Name: two lines `Nelson` / `Arango` (Slackey, clamp 4rem–11rem, color #ffe45e, glow shadow). Slide-up fade-in staggered.
  - Title: `Multidisciplinary Designer ✦ Web & Front-End Developer` (JetBrains Mono, uppercase, 0.25em tracking).
  - Countdown: `T-00:03` → `T-00:02` → `T-00:01` → `· LIFTOFF ·` (Codystar font, 2–3.5rem, 0.5em tracking). Starts idle, begins at 2.2 s, ticks every 900 ms.
  - Scroll hint at bottom with animated vertical gradient line.

### 02 — Origin (About)
- **Purpose**: the bio.
- **Layout**: 2-column grid (1.15fr / 1fr) — text left, animated moon right. Collapses to 1 column < 900 px.
- **Elements**:
  - Section chip `02 / About Me · Origin`.
  - Title: `Designer & dev across dimensions` (last two words in accent yellow).
  - 3 paragraphs (Nelson's bio — FullStack, React/Nest/Next, CSS/SASS, Adobe Creative Suite).
  - Stats grid 3×1: `5+ Years coding`, `20+ Shipped projects`, `∞ Curiosity`.
  - Moon component: radial-gradient body with 7 craters, dashed orbit ring with yellow satellite dot, ring-rotation 20 s linear.

### 03 — Systems (Skills)
- **Purpose**: toolkit overview.
- **Layout**: 2-col head (text + orbit visual) then 3-col grid of skill modules.
- **Elements**:
  - Orbit visual: 4 dashed concentric rings (14s/22s/34s/48s, alternating direction), central sun (radial gradient #fff → #ffe45e → #f0a020, pulsing 3s). Labels around (Frontend / Backend / Design / Motion).
  - 3 modules: Coding (React/Next/Nest/Sass/HTML5/CSS/WordPress/JS/), Design (Adobe suite + Piskel + FL Studio + CapCut), UX/UI (Design systems/Prototyping/Microinteractions/Accessibility/User flows). Each as a bordered card with topline gradient line, label + id (`MOD-01`), title, description, skill chips.

### 04 — Missions (Portfolio)
- **Purpose**: the constellation of real projects.
- **Layout**: filter pill-bar + auto-fill grid (min 320 px).
- **Elements**:
  - Filters: `Show all`, `UI / Components`, `React`, `JavaScript`, `Sass / CSS + HTML`.
  - Cards: 16:10 thumb (placeholder grid + project name centered), "PROJECT · XX-000" coord badge top-left, arrow icon top-right that rotates 45° + fills on hover, body with title, 3-line clamp description, color-coded tags.
  - 19 projects total. **First card** is `Cosmic UI Kit` → links to `projects/UIKit.html` (mini-project: live library of 14+ components grouped in Foundations / Inputs / Actions / Feedback).
  - Then: SubInvoxa, Movie Meter, React Quiz, Interactive Resume, Animal Gambling, Bankist App, Guess my number!, Arquitectura Bosque, Guitar LA, Nucleus Wallet, Escuela Cocina, Bahn BnB, Real State, Meeti, Podcast FM, La Cafetería, Tech PRO, Delivery App. (URLs in `components/Portfolio.jsx`.)

### 05 — Transmit (Contact)
- **Purpose**: CTA + social.
- **Layout**: 2-col grid inside a bordered "transmission" panel (1.5fr / 1fr).
- **Elements**:
  - Header: red pulsing dot + `INCOMING TRANSMISSION · STAND BY`.
  - Title `Ready to build something out of this world?`.
  - CTA buttons: LinkedIn (primary yellow), GitHub, Live portfolio.
  - Metadata panel right: callsign NELSONEN98, Role, Base [04.7231 · -73.8592], Status, Uplink dots.

### Persistent UI (all pages)
- **Top HUD** (fixed, mix-blend difference): left `● NA-01 · 02 · Origin`; right `UPLINK [bar] 47%`.
- **Right mission-nav**: vertical dots with hover/active labels.
- **Left rocket companion** (fixed, y driven by scroll 15% → 85%): SVG rocket + flame + `0000 KM` odometer.
- **Comet cursor**: yellow glowing dot with trailing particles (mix-blend screen).
- **Warp transitions** between Origin↔Systems, Systems↔Missions, Missions↔Transmit: static `· HYPERSPACE JUMP ·` / `· APPROACHING PORTFOLIO ·` / `· OPENING CHANNEL ·` in Codystar with side lines.

## Interactions & Behavior
- Scroll drives: HUD uplink %, active mission-nav item, rocket Y position, AppearOnScroll fade-up reveals (IntersectionObserver, threshold 0.15, 0.8 s cubic-bezier(0.22,1,0.36,1)).
- Hero countdown timer (setTimeout chain, stops at "LIFTOFF").
- Portfolio filter state; UI Kit page has full state for switches / checks / radio / slider / text / stepper / chips / tabs.
- Tweaks panel (bottom-right floating, toggled via host): star density 0.3–2×, parallax speed 0–2×, accent hue (Sun/Ice/Nebula/Aurora/Pulsar), cursor on/off, warp on/off. Applies live via CSS variables.

## State Management
- `progress` (0..1) + `activeIdx` (0..4) — driven by scroll.
- Portfolio `filter` — "all" | "uikit" | "react" | "javascript" | "sass".
- Tweaks object `{density, parallax, accent, cursor, warp}` with defaults.
- Per-section interactive state (hero countdown, UIKit components).

## Design Tokens

### Colors
- `--bg`: #05070e  /  `--bg-deep`: #020309
- `--ink`: #f6f4ef  /  `--ink-dim`: rgba(246,244,239,0.64)  /  `--ink-faint`: rgba(246,244,239,0.32)
- `--accent`: #ffe45e  /  `--accent-soft`: #ffe45e99  /  `--accent-glow`: rgba(255,228,94,0.35)
- `--purple`: #a07aff  /  `--cyan`: #7adfff  /  `--pink`: #ff7ac6  /  `--green`: #7bffbc
- `--border`: rgba(255,228,94,0.18)  /  `--panel`: rgba(255,255,255,0.03)
- Tag colors: React #61dafb, JS #ffd21e, Sass #cc6699, CSS #7adfff, HTML #f26800.

### Typography
- Display: **Slackey** (Google Fonts).
- Pixel: **Codystar 400** (Google Fonts).
- Body: **Roboto 300/400/500/700**.
- Mono: **JetBrains Mono 300/400/500**.

### Spacing / Radius / Shadow
- Section padding: 6rem 3rem (4rem 1.25rem mobile).
- Card radius: 8/10/12/16 px.
- Pill radius: 999 px.
- Key shadows: `0 0 40px #ffe45e, 0 0 80px rgba(255,228,94,0.4)` (sun); `0 20px 40px rgba(0,0,0,.5), 0 0 60px rgba(255,228,94,.08)` (card hover).

### Animations
- `twinkle` 2–5 s ease-in-out infinite (star opacity+scale).
- `pulse` 1–2 s (status dots).
- `star-pulse` 2.5 s + rotation.
- `sun-pulse` 3 s.
- `spin` N s linear (orbit rings; durations 14/22/34/48 s).
- `flame` 0.15 s alternate (rocket flame flicker).
- `rocket-bob` 3 s.
- Entrance: `slide-up` 1.2 s cubic-bezier(0.22,1,0.36,1) for hero name; `.appear` class for scroll reveals.

## Assets
- **No images required** — moon, rocket, orbits, stars and all visuals are SVG/CSS-only. Project thumbnails currently use placeholder grid + title; ideally swap to real screenshots under `/public/img/portfolio/` with the existing filenames.
- Fonts from Google Fonts.

## Files in this bundle
```
Resume.html               Entry point
styles.css                All global styles + component tokens
components/Starfield.jsx  Parallax 3-layer starfield + shooting stars
components/Cursor.jsx     Comet cursor + trail
components/Hero.jsx       Liftoff section
components/About.jsx      Origin + Moon + AppearOnScroll helper
components/Skills.jsx     Systems + orbit visual + skill modules
components/Warp.jsx       Static hyperspace transition label
components/Portfolio.jsx  Missions grid + filter + project data
components/Contact.jsx    Transmission panel
components/UI.jsx         HUD + mission-nav + rocket companion + tweaks panel
projects/UIKit.html       Mini-project: Cosmic UI Kit (linked from portfolio)
```

## Porting guidance for Nelson's existing repo
The existing repo uses **React + react-router-dom + framer-motion + SASS (BEM)**. Recommended mapping:

- Move each `components/*.jsx` into `src/components/` and convert to proper ES modules with `import` statements (replace `window.*` globals).
- Extract tokens into `src/assets/scss/_tokens.scss` (or keep as CSS custom properties on `:root`).
- Re-split `styles.css` into matching SCSS files under `src/assets/scss/ui/` following the existing naming (`_hero.scss`, `_about.scss`, `_skills.scss`, `_portfolio.scss`, `_contact.scss`, `_ui-kit.scss`).
- Replace the single-page scroll narrative with the existing multi-route setup *or* adopt the scroll-driven model and remove react-router (recommended — the new design is intentionally one continuous scroll).
- Port framer-motion animations back onto `Starfield` stars and rocket if desired; current code uses vanilla requestAnimationFrame + CSS which is smaller and faster.
- Replace project thumbnail placeholders with the real screenshots already in `/public/img/portfolio/`.
- Keep the Tweaks `postMessage` protocol only if you host this inside a design tool; otherwise strip it.
