/**
 * anim-io.js — IntersectionObserver-based scroll entrance animations.
 * Replaces GSAP ScrollTrigger for all one-shot reveal animations.
 * GPU-composited (transform + opacity only); zero per-frame JS on the
 * main thread once an element is visible.
 *
 * Conventions:
 *   io-pending        → fade-up (opacity 0, translateY 28px, scale 0.98)
 *   io-pending-fade   → fade-in only (bento cards, etc.)
 *   io-pending-slide  → slide from left (section eyebrows)
 *   io-pending-expand → scaleX from left (dividers)
 *   + io-in           → triggers the @keyframes animation
 *
 * Runs synchronously at script-parse time (bottom of <body>) so classes
 * are applied before the browser's first paint — no flash of visible content.
 */
(function () {
  'use strict';

  /* ── Motion gate — mirror GSAP's conditions ── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionPref     = document.documentElement.getAttribute('data-motion');
  if (prefersReduced || motionPref === 'reduced') return;

  /* Only animate on desktop (mirrors GSAP's min-width: 800px gate).
     On mobile, elements stay at their natural opacity/position. */
  if (!window.matchMedia('(min-width: 800px)').matches) return;

  /* ── Helpers ── */
  function mark(el, cls) {
    if (el && !el.classList.contains('io-in')) el.classList.add(cls);
  }
  function markAll(els, cls) {
    els.forEach(el => mark(el, cls));
  }

  function reveal(el, delayMs) {
    if (!el) return;
    if (delayMs) el.style.animationDelay = delayMs + 'ms';
    /* Swap pending → in in one rAF so the browser batches both class changes */
    requestAnimationFrame(() => el.classList.add('io-in'));
  }

  /* ── IntersectionObserver ── */
  const callbacks = new Map();
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const cb = callbacks.get(entry.target);
      if (cb) { cb(); callbacks.delete(entry.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  /* watch(trigger, callback) — observe trigger; fire callback once on enter */
  function watch(triggerOrSelector, cb) {
    const el = typeof triggerOrSelector === 'string'
      ? document.querySelector(triggerOrSelector)
      : triggerOrSelector;
    if (!el) return;
    callbacks.set(el, cb);
    io.observe(el);
  }

  /* ── Setup — runs immediately (synchronous) ── */
  function setup() {

    /* ====================================================
       INDEX PAGE
    ==================================================== */

    /* Section headings */
    document.querySelectorAll('.section-heading').forEach(el => {
      mark(el, 'io-pending');
      watch(el, () => reveal(el, 0));
    });

    /* Featured hero card (Linger) */
    const featCard = document.querySelector('.card--feature.card--linger');
    if (featCard) {
      mark(featCard, 'io-pending');
      watch(featCard, () => reveal(featCard, 0));
    }

    /* Grid cards — staggered */
    const gridCards = [...document.querySelectorAll('.cards--grid .card')];
    if (gridCards.length) {
      markAll(gridCards, 'io-pending');
      watch('.cards--grid', () => gridCards.forEach((c, i) => reveal(c, i * 120)));
    }

    /* Row cards (More Projects) — staggered */
    const rowCards = [...document.querySelectorAll('.cards--rows .card')];
    if (rowCards.length) {
      markAll(rowCards, 'io-pending');
      watch('.cards--rows', () => rowCards.forEach((c, i) => reveal(c, i * 120)));
    }

    /* Bento cards — fade only, all at once */
    const bentoCards = [...document.querySelectorAll('.bento-card')];
    if (bentoCards.length) {
      markAll(bentoCards, 'io-pending-fade');
      watch('.bento-grid', () => bentoCards.forEach(c => reveal(c, 0)));
    }

    /* Dividers (homepage) */
    document.querySelectorAll('.divider').forEach(el => {
      mark(el, 'io-pending-expand');
      watch(el, () => reveal(el, 0));
    });

    /* ====================================================
       CASE STUDY PAGES (linger, weact, crimemap, portfolio)
    ==================================================== */

    /* Meta items — staggered off .case-meta trigger */
    const metaItems = [...document.querySelectorAll('.meta-item')];
    if (metaItems.length) {
      markAll(metaItems, 'io-pending');
      watch('.case-meta', () => metaItems.forEach((c, i) => reveal(c, i * 100)));
    }

    /* Showcase rows */
    ['.linger-showcase-row', '.case-showcase'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) { mark(el, 'io-pending'); watch(el, () => reveal(el, 0)); }
    });

    /* Overview cards — staggered */
    const overviewCards = [...document.querySelectorAll('.overview-card')];
    if (overviewCards.length) {
      markAll(overviewCards, 'io-pending');
      watch('.overview-grid', () => overviewCards.forEach((c, i) => reveal(c, i * 120)));
    }

    /* Stat cards — staggered */
    const statCards = [...document.querySelectorAll('.stat-card')];
    if (statCards.length) {
      markAll(statCards, 'io-pending');
      watch('.case-stats', () => statCards.forEach((c, i) => reveal(c, i * 100)));
    }

    /* Process pipeline card */
    const pipelineCard = document.querySelector('.process-pipeline-card');
    if (pipelineCard) { mark(pipelineCard, 'io-pending'); watch(pipelineCard, () => reveal(pipelineCard, 0)); }

    /* Process steps — staggered, offset after pipeline card */
    const processSteps = [...document.querySelectorAll('.process-step')];
    if (processSteps.length) {
      markAll(processSteps, 'io-pending');
      watch('.process-pipeline', () => processSteps.forEach((c, i) => reveal(c, i * 100 + 180)));
    }

    /* Section eyebrows — slide from left, each triggers itself */
    document.querySelectorAll('.section-eyebrow').forEach(el => {
      mark(el, 'io-pending-slide');
      watch(el, () => reveal(el, 0));
    });

    /* Case dividers */
    document.querySelectorAll('.case-divider').forEach(el => {
      mark(el, 'io-pending-expand');
      watch(el, () => reveal(el, 0));
    });

    /* Content rows — text-col + image-col staggered */
    document.querySelectorAll('.content-row').forEach(row => {
      const cols = [...row.querySelectorAll('.text-col, .image-col')];
      if (!cols.length) return;
      markAll(cols, 'io-pending');
      watch(row, () => cols.forEach((c, i) => reveal(c, i * 150)));
    });

    /* Full-width content sections */
    document.querySelectorAll('.content-full').forEach(el => {
      mark(el, 'io-pending');
      watch(el, () => reveal(el, 0));
    });

    /* Prototype comparison */
    const proto = document.querySelector('.proto-compare');
    if (proto) { mark(proto, 'io-pending'); watch(proto, () => reveal(proto, 0)); }

    /* Reflection cards — staggered when inside a .reflection-grid (case study pages).
       When no grid exists (e.g. about page portrait), leave cards at natural opacity —
       they sit near the top of the page and should be immediately visible. */
    const reflGrid = document.querySelector('.reflection-grid');
    if (reflGrid) {
      const reflCards = [...document.querySelectorAll('.reflection-card')];
      markAll(reflCards, 'io-pending');
      watch(reflGrid, () => reflCards.forEach((c, i) => reveal(c, i * 120)));
    }

    /* ====================================================
       ABOUT PAGE
    ==================================================== */

    /* About cards — observe each individually (they sit in different rows) */
    document.querySelectorAll('.about-card').forEach(card => {
      mark(card, 'io-pending');
      watch(card, () => reveal(card, 0));
    });

    /* Glass gallery — NOT animated via IO.
       The pane has a collapsible expand behaviour driven by GSAP fromTo
       on the newly-visible tiles; running IO in parallel creates a
       scale/translateY conflict that makes content bounce upward on expand.
       The gallery fades in naturally via its own CSS opacity baseline. */

    /* ====================================================
       PORTFOLIO PAGE
    ==================================================== */

    document.querySelectorAll('.pf-section').forEach(el => {
      mark(el, 'io-pending');
      watch(el, () => reveal(el, 0));
    });

    const pfMeta = document.querySelector('.pf-meta');
    if (pfMeta) { mark(pfMeta, 'io-pending'); watch(pfMeta, () => reveal(pfMeta, 0)); }

    /* ====================================================
       FOOTER — shared across all pages.
       layout.js injects footer via custom element upgrade
       which fires before these CDN scripts run, so footer
       should already be in the DOM. Fall back to rAF retry.
    ==================================================== */
    function bindFooter() {
      const footerEl = document.querySelector('footer');
      if (!footerEl) { requestAnimationFrame(bindFooter); return; }
      if (footerEl.classList.contains('io-pending') || footerEl.classList.contains('io-in')) return;
      mark(footerEl, 'io-pending');
      watch(footerEl, () => reveal(footerEl, 0));
    }
    bindFooter();
  }

  /* Run immediately — DOM is fully available at this point since
     this script is loaded at the bottom of <body> before GSAP. */
  setup();

})();
