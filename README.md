# Chris Rudnew — UX Portfolio

Personal UX/UI design portfolio. Built as a static site, designed in **Figma** and developed with **Claude Code**.

## Stack

- Plain HTML/CSS/JS — no build step, no framework
- [GSAP 3.12.5](https://gsap.com/) + ScrollTrigger for animations
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Glassmorphism surfaces with `backdrop-filter` + `@supports` fallback
- WCAG AAA contrast, semantic HTML5, custom focus states
- Dark mode + high-contrast mode toggles
- Shared layout via `layout.js` web components (`<header-component>`, `<footer-component>`)

## Project Structure

```
/
├── index.html              # Homepage — hero, project cards, background bento
├── style.css               # Global design tokens and component styles
├── layout.js               # Header, footer, cursor, and settings web components
├── about.html              # About Me page
├── weact.html              # Project 1: WeAct case study
├── crimemap.html           # Project 2: Crime Map case study
├── linger.html             # Project 3: Linger scent-mapping ecosystem (FigBuild 2026)
└── assets/
    ├── Homepage-WeAct.png
    ├── Homepage-CrimeMap.png
    ├── linger-logo.png
    ├── linger-demo.mp4
    └── ...
```

## Tools Used

- **Figma** — design system, layout, and visual direction
- **[Claude Code](https://claude.ai/claude-code)** — implementation, accessibility, and animations
