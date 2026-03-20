# Chris Rudnew — UX Portfolio

Personal UX/UI design portfolio. Built as a single-page static site, designed in **Figma** and developed with **Claude Code**.

## Stack

- Plain HTML/CSS/JS — no build step, no framework
- [GSAP 3.12.5](https://gsap.com/) + ScrollTrigger for animations
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Glassmorphism surfaces with `backdrop-filter` + `@supports` fallback
- WCAG AAA contrast, semantic HTML5, custom focus states
- Dark mode + high-contrast mode toggles

## Project Structure

```
/
├── index.html          # Entire site — fonts, styles, markup, and scripts
└── assets/
    ├── Homepage-WeAct.png
    ├── Homepage-CrimeMap.png
    └── Homepage-Placeholder.png
```

## Deploying to GitHub Pages

1. Push this repo to GitHub (repo name: `<username>.github.io` for a user site, or any name for a project site)
2. Go to **Settings → Pages → Source → Deploy from branch → main / root**
3. Add your project screenshots to `assets/` before pushing
4. Done — GitHub Pages serves `index.html` from the root automatically

## Before You Deploy Checklist

- [x] Add `assets/Homepage-WeAct.png`
- [x] Add `assets/Homepage-CrimeMap.png`
- [x] Add `assets/Homepage-Placeholder.png`
- [ ] Add MacEwan University logo URL to bento card 01 (`src=""` in the `.bento-logo` img)
- [ ] Add University of Toronto logo URL to bento card 02 (`src=""` in the `.bento-logo` img)
- [ ] Update the `href="#"` links on project cards to point to real case study pages

## Tools Used

- **Figma** — design system, layout, and visual direction
- **[Claude Code](https://claude.ai/claude-code)** — implementation, accessibility, and animations
