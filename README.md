# JARVIS × Khanishk — Cinematic Personal Portfolio

A premium, futuristic, cinematic personal portfolio website built with React, Vite, and TypeScript. JARVIS — a personal AI interface — introduces its creator, Khanishk, through a multi-stage cinematic experience.

## ✨ Features

- **JARVIS Boot Sequence** — full-viewport cinematic AI activation with 3D holographic core
- **JARVIS Narration** — animated typewriter dialogue with optional browser speech synthesis
- **Kinetic Hero** — oversized variable typography with animated role ticker
- **Project Universe** — interactive glassmorphism project cards with expandable details
- **Skills Dashboard** — animated progress bars with category filtering
- **Custom Cursor** — rAF-driven dot + ring with zero re-renders
- **Contact** — functional mailto form with client-side validation
- **Dark mode first** — obsidian / cyan / violet / electric blue palette

## 🛠 Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Animation | Framer Motion |
| 3D Core | React Three Fiber + Three.js (lazy-loaded) |
| Styling | CSS Modules + CSS Custom Properties |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

## 🚀 Setup

### Prerequisites
- Node.js 18+ (tested on v24)
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## 📁 Project Structure

```
src/
├── styles/
│   ├── tokens.css        # Design tokens (palette, type scale, spacing)
│   └── global.css        # Global reset + utility classes
├── data/
│   ├── copy.ts           # All text content (edit here, not in components)
│   ├── projects.ts       # Project data including TODO URLs
│   └── skills.ts         # Skill categories and proficiency levels
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useActiveSection.ts
│   └── useCursor.ts
├── components/
│   ├── cursor/           # Custom cursor (desktop only)
│   ├── nav/              # Responsive navigation
│   ├── scenes/           # Boot, Intro, Hero, About, Projects, Skills, Contact, Footer
│   ├── three/            # Three.js AI core + CSS fallback
│   └── ui/               # GlowButton, SectionReveal, ParticleField
└── lib/
    └── utils.ts
```

## ✏️ Customization

### Content
All text lives in `src/data/copy.ts`. Edit without touching components.

### Skills
All proficiency values are in `src/data/skills.ts`. These are self-assessed estimates — confirm values before publishing.

### Projects
Project data is in `src/data/projects.ts`. Fill in `repoUrl` and `demoUrl` when GitHub/live links are ready — they only render when populated.

### Profile Photo
Place your photo at `public/profile.jpg` and update the About component to reference it.

## ♿ Accessibility

- Semantic HTML throughout
- Skip-to-content link
- All interactive elements keyboard-focusable with visible focus rings
- `prefers-reduced-motion` respected in every animated component
- ARIA labels on icon-only controls
- `role="progressbar"` with `aria-valuenow` on skill bars
- No autoplay audio — voice is opt-in only

## 📞 Contact

- Email: tkhanishk0@gmail.com
- Phone: +91 96668 77792

## ⚡ Performance Notes

- Three.js AI Core is lazy-loaded — CSS fallback shows instantly
- Particles capped at 55 desktop / 20 mobile, paused off-screen
- All animations use `transform` + `opacity` for GPU compositing
- Fonts loaded with `display=swap` to prevent FOIT

## 📋 Before Publishing Checklist

- [ ] Confirm all skill proficiency percentages in `src/data/skills.ts`
- [ ] Add GitHub repo URLs in `src/data/projects.ts`
- [ ] Add live demo URLs in `src/data/projects.ts`
- [ ] Add social media links in `src/data/copy.ts` (contact.social)
- [ ] Add profile photo to `public/`
- [ ] Expand About bio with verified personal details
- [x] Run `npm run build` and verify zero TypeScript errors (Verified & passing)
- [ ] Test contact form opens email client correctly
