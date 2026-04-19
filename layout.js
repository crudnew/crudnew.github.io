/* ============================================================
   layout.js — shared header, footer, and site-wide behaviour
   Usage in HTML:
     <header-component></header-component>
     <footer-component></footer-component>
   Then load this script before your page scripts:
     <script src="./layout.js"></script>
============================================================ */

/* ---- Header HTML ----
   Two-pill floating header:
   1. .nav-pill    — center pill: serif wordmark + in-page section links with a
                     sliding highlighter that tracks scroll position.
                     Wordmark clicks: scroll-to-top on index, home nav elsewhere.
                     Section links are populated at init from [data-nav-label].
   2. .extras-pill — right pill: About (internal) | LinkedIn ↗ · Contact ↗ | cog.
                     Identical on every page. */
const HEADER_HTML = `
<header>
  <div class="header-spacer" aria-hidden="true"></div>
  <nav class="nav-pill" aria-label="Page sections">
    <a href="/" class="nav-pill-name" aria-label="Chris Rudnew — home">Chris Rudnew</a>
    <span class="nav-pill-divider nav-pill-divider--name" aria-hidden="true"></span>
    <div class="nav-pill-sections" role="tablist" aria-label="Jump to section">
      <span class="nav-highlighter" aria-hidden="true"></span>
    </div>
  </nav>
  <button class="nav-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-sheet">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
    </svg>
  </button>
  <div class="extras-pill" aria-label="Site links and settings">
    <a class="extras-item extras-internal" href="/about.html" data-path="/about.html">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>About</span>
    </a>
    <span class="extras-divider" aria-hidden="true"></span>
    <a class="extras-item extras-external" href="https://linkedin.com/in/chris-rudnew" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn profile (opens in new tab)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      <span class="extras-label">LinkedIn</span>
    </a>
    <a class="extras-item extras-external" href="mailto:crudnew@gmail.com" aria-label="Email Chris">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <span class="extras-label">Contact</span>
    </a>
  </div>
  <div class="settings-wrap">
      <button class="settings-btn" aria-label="Accessibility settings" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      <div class="settings-bubbles" role="group" aria-label="Accessibility options">
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="dark-toggle-btn" aria-label="Toggle dark mode" data-tooltip="Dark Mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="contrast-toggle-btn" aria-label="Toggle high contrast mode" data-tooltip="High Contrast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 3v18" stroke-width="1.5"/>
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>
          </svg>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="motion-toggle-btn" aria-label="Toggle reduced motion" data-tooltip="Reduce Motion">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
      </div>
  </div>
</header>
<div class="nav-sheet" id="nav-sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="nav-sheet-scrim" data-nav-close></div>
  <div class="nav-sheet-panel">
    <button class="nav-sheet-close" aria-label="Close menu" data-nav-close>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
      </svg>
    </button>
    <a class="nav-sheet-home" href="/" aria-label="Chris Rudnew — go to home">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
        <polyline points="9 21 9 12 15 12 15 21"/>
      </svg>
      Chris Rudnew — Home
    </a>
    <div class="nav-sheet-group nav-sheet-sections" aria-label="Page sections"></div>
    <div class="nav-sheet-group nav-sheet-extras" aria-label="Site links"></div>
  </div>
</div>`;

/* ---- Footer HTML ---- */
const FOOTER_HTML = `
<footer>
  <div class="footer-cta" aria-label="Get in touch">
    <span class="footer-avail-chip">
      <span class="footer-avail-dot" aria-hidden="true"></span>
      Available for UX/UI roles
    </span>
    <p class="footer-cta-text">Feel free to reach out!</p>
    <a href="mailto:crudnew@gmail.com" class="footer-cta-btn">Get in touch</a>
  </div>
  <div class="footer-divider" aria-hidden="true"></div>
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="/about.html">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      About Me
    </a>
    <a href="https://linkedin.com/in/chris-rudnew" rel="noopener noreferrer" target="_blank">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      LinkedIn
    </a>
    <a href="mailto:crudnew@gmail.com">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      Contact
    </a>
  </nav>
  <div class="footer-bottom">
    <p class="footer-copyright">&copy; 2026 Chris Rudnew</p>
    <button class="footer-top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
      Back to top
    </button>
  </div>
</footer>`;

/* ---- Inject components + initialise everything ---- */
function initLayout() {

  /* Replace <header-component> */
  document.querySelectorAll('header-component').forEach(el => {
    el.outerHTML = HEADER_HTML;
  });

  /* Mark active internal page on the extras pill */
  document.querySelectorAll('.extras-item[data-path]').forEach(a => {
    const path = a.getAttribute('data-path');
    const current = location.pathname.replace(/\/index\.html$/, '/');
    if (path === current || path === location.pathname) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Typewriter — type name in on every page load */
  const _nameEl = document.querySelector('.nav-pill-name');
  if (_nameEl && motionOk()) {
    _twIn(_nameEl);
  }

  /* Page-tint fade — fires after the typewriter finishes so the color
     settles in as a natural follow-on to the name appearing.
     Typewriter lead (260ms) + 12 chars × 68ms ≈ 1076ms; add a breath. */
  const _tintDelay = motionOk() ? 1150 : 0;
  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('tint-filled');
      });
    });
  }, _tintDelay);

  /* ---- Center-pill section scrollspy ---- */
  initSectionNav();

  /* ---- Mobile menu sheet ---- */
  initNavSheet();

  /* Replace <footer-component> */
  document.querySelectorAll('footer-component').forEach(el => {
    el.outerHTML = FOOTER_HTML;
  });

  /* ---- Settings & Accessibility ---- */
  const darkToggle     = document.getElementById('dark-toggle-btn');
  const contrastToggle = document.getElementById('contrast-toggle-btn');
  const motionToggle   = document.getElementById('motion-toggle-btn');

  /* ---- Header hide / show on scroll ---- */
  const _header = document.querySelector('body > header');
  if (_header) {
    _header.style.transition = 'background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)';
    let _lastY = window.scrollY;
    let _scrollLocked = false; // true during programmatic nav-link scrolls
    let _scrollLockTimer = null;

    /* Public hook: section nav calls this to suppress the hide logic. */
    window._headerLockScroll = function () {
      _scrollLocked = true;
      _header.style.transform = 'translateY(0)';
      clearTimeout(_scrollLockTimer);
      /* Release lock ~800ms after the last scroll event settles */
      const release = () => {
        clearTimeout(_scrollLockTimer);
        _scrollLockTimer = setTimeout(() => {
          _scrollLocked = false;
          _lastY = window.scrollY;
        }, 400);
      };
      window.addEventListener('scroll', release, { passive: true, once: false });
      /* Belt-and-suspenders: always release after 2s max */
      _scrollLockTimer = setTimeout(() => { _scrollLocked = false; _lastY = window.scrollY; }, 2000);
    };

    window.addEventListener('scroll', function () {
      if (_scrollLocked || _mouseNearTop) return;
      const y = window.scrollY;
      _header.style.transform = (y > _lastY && y > 80) ? 'translateY(-110%)' : 'translateY(0)';
      _lastY = y;
    }, { passive: true });

    /* Show header when mouse hovers within 60px of the top edge */
    let _mouseNearTop = false;
    document.addEventListener('mousemove', function (e) {
      const near = e.clientY < 60;
      if (near === _mouseNearTop) return;
      _mouseNearTop = near;
      if (near) {
        _header.style.transform = 'translateY(0)';
      } else {
        /* Only re-hide if scroll position still warrants it */
        const y = window.scrollY;
        if (y > 80) _lastY = y - 1; // nudge so next scroll re-evaluates cleanly
      }
    }, { passive: true });
  }

  if (!darkToggle || !contrastToggle || !motionToggle) return; // guard if header wasn't injected

  // Sync button state with current attribute (set early in <head>)
  if (document.documentElement.getAttribute('data-theme')    === 'dark')    darkToggle.setAttribute('aria-checked', 'true');
  if (document.documentElement.getAttribute('data-contrast') === 'high')    contrastToggle.setAttribute('aria-checked', 'true');
  if (document.documentElement.getAttribute('data-motion')   === 'reduced') motionToggle.setAttribute('aria-checked', 'true');

  /* ---- On/Off pop-out helper ---- */
  function _showState(btn, isOn) {
    const el = btn.querySelector('.settings-state');
    if (!el) return;
    el.textContent = isOn ? 'On' : 'Off';
    el.classList.remove('settings-state--exit');
    el.classList.add('settings-state--visible');
    clearTimeout(btn._stateTimer);
    btn._stateTimer = setTimeout(() => {
      el.classList.add('settings-state--exit');
      setTimeout(() => {
        el.classList.remove('settings-state--visible', 'settings-state--exit');
      }, 250);
    }, 1200);
  }

  darkToggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.setAttribute('aria-checked', String(!isDark));
    _showState(this, !isDark);
  });

  contrastToggle.addEventListener('click', function () {
    const isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
    const next = isHigh ? 'normal' : 'high';
    document.documentElement.setAttribute('data-contrast', next);
    localStorage.setItem('contrast', next);
    this.setAttribute('aria-checked', String(!isHigh));
    _showState(this, !isHigh);
  });

  motionToggle.addEventListener('click', function () {
    const isReduced = document.documentElement.getAttribute('data-motion') === 'reduced';
    const next = isReduced ? 'normal' : 'reduced';
    localStorage.setItem('motion', next);
    this.setAttribute('aria-checked', String(!isReduced));
    _showState(this, !isReduced);
    // Reload so GSAP and CSS pre-hides are applied correctly from the start
    setTimeout(() => location.reload(), 700);
  });

  /* Settings bubble hover / keyboard */
  const settingsWrap = document.querySelector('.settings-wrap');
  let leaveTimer = null;

  function openSettings() {
    clearTimeout(leaveTimer);
    settingsWrap.classList.add('is-open');
    settingsWrap.querySelector('.settings-btn').setAttribute('aria-expanded', 'true');
  }
  function closeSettings() {
    settingsWrap.classList.remove('is-open');
    settingsWrap.querySelector('.settings-btn').setAttribute('aria-expanded', 'false');
  }

  settingsWrap.addEventListener('mouseenter', openSettings);
  settingsWrap.addEventListener('mouseover',  openSettings);
  settingsWrap.addEventListener('mouseleave', () => { leaveTimer = setTimeout(closeSettings, 150); });
  settingsWrap.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSettings(); settingsWrap.querySelector('.settings-btn').focus(); }
  });

  /* ---- Custom cursor ---- */
  const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, dx = 0, dy = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    if (motionOk()) {
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
    } else {
      dx = mx; dy = my;
    }
    dot.style.cssText  = `left:${mx - 4}px;top:${my - 4}px`;
    ring.style.cssText = `left:${dx - 18}px;top:${dy - 18}px`;
    requestAnimationFrame(tick);
  })();

  // Base hover targets — pages can add more via addCursorHover()
  addCursorHover('a, button');

  if ('ontouchstart' in window) { dot.style.display = 'none'; ring.style.display = 'none'; }
}

/* ============================================================
   SECTION NAV — populate center pill from [data-nav-label] sections,
   track active section with IntersectionObserver, animate highlighter.
============================================================ */
function initSectionNav() {
  const pill = document.querySelector('.nav-pill');
  const container = pill && pill.querySelector('.nav-pill-sections');
  const nameEl = pill && pill.querySelector('.nav-pill-name');
  if (!pill || !container || !nameEl) return;

  const sections = Array.from(document.querySelectorAll('[data-nav-label]'));
  const divider = pill.querySelector('.nav-pill-divider--name');

  // Build section anchors
  const highlighter = container.querySelector('.nav-highlighter');
  sections.forEach(sec => {
    const id = sec.id;
    const label = sec.getAttribute('data-nav-label');
    if (!id || !label) return;
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.className = 'nav-pill-section';
    a.textContent = label;
    a.setAttribute('data-target', id);
    container.appendChild(a);
  });

  // Gather all "items" the highlighter can track: name + section links.
  // Name is the implicit "top" target.
  const sectionLinks = Array.from(container.querySelectorAll('.nav-pill-section'));
  const items = [nameEl, ...sectionLinks];

  // Hide divider + sections container when there are no sections on the page
  if (sectionLinks.length === 0) {
    if (divider) divider.style.display = 'none';
    container.style.display = 'none';
    return;
  }

  // Smooth-scroll section clicks (respect reduce-motion).
  const smoothBehaviour = motionOk() ? 'smooth' : 'auto';
  sectionLinks.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('data-target');
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (window._headerLockScroll) window._headerLockScroll();
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: smoothBehaviour });
      history.replaceState(null, '', `#${id}`);
    });
  });

  // Name click: navigate to "/" on all pages — reloads on index, navigates home elsewhere.

  // Highlighter positioning
  function moveHighlighter(activeEl) {
    if (!activeEl) {
      highlighter.style.opacity = '0';
      return;
    }
    const pillRect = container.getBoundingClientRect();
    const rect = activeEl.getBoundingClientRect();
    const left = rect.left - pillRect.left;
    highlighter.style.opacity = '1';
    highlighter.style.width = `${rect.width}px`;
    highlighter.style.transform = `translateX(${left}px)`;
  }

  // If the active item is the wordmark (outside the sections container),
  // we hide the highlighter entirely and instead mark the name as active.
  function setActive(key) {
    items.forEach(el => el.removeAttribute('aria-current'));
    if (key === '__top__') {
      nameEl.setAttribute('aria-current', 'true');
      highlighter.style.opacity = '0';
      return;
    }
    const link = sectionLinks.find(a => a.getAttribute('data-target') === key);
    if (link) {
      link.setAttribute('aria-current', 'true');
      moveHighlighter(link);
    }
  }

  // IntersectionObserver — find the section whose top is closest below header clearance.
  let currentKey = '__top__';
  setActive(currentKey);

  const visible = new Map(); // id -> intersectionRatio
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
      else visible.delete(e.target.id);
    });
    // Pick the section with the largest visible ratio; if none, we're "at top".
    let bestId = null, bestRatio = 0;
    visible.forEach((ratio, id) => {
      if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
    });
    // When near page top (hero area) prefer __top__
    const next = (window.scrollY < 200 || !bestId) ? '__top__' : bestId;
    if (next !== currentKey) { currentKey = next; setActive(currentKey); }
  }, { rootMargin: '-120px 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  sections.forEach(sec => io.observe(sec));

  // Keep the highlighter in the right spot on resize.
  window.addEventListener('resize', () => {
    if (currentKey !== '__top__') {
      const link = sectionLinks.find(a => a.getAttribute('data-target') === currentKey);
      if (link) moveHighlighter(link);
    }
  });
}

/* ============================================================
   MOBILE NAV SHEET — on narrow viewports, the center pill
   collapses and this hamburger-triggered sheet exposes the
   same sections + extras in a stacked list.
============================================================ */
function initNavSheet() {
  const sheet = document.getElementById('nav-sheet');
  const openBtn = document.querySelector('.nav-menu-btn');
  if (!sheet || !openBtn) return;

  const sectionsGroup = sheet.querySelector('.nav-sheet-sections');
  const extrasGroup = sheet.querySelector('.nav-sheet-extras');

  // Mirror section links into the sheet
  document.querySelectorAll('.nav-pill-section').forEach(link => {
    const clone = link.cloneNode(true);
    clone.className = 'nav-sheet-link';
    clone.addEventListener('click', () => closeSheet());
    sectionsGroup.appendChild(clone);
  });
  if (!sectionsGroup.children.length) sectionsGroup.hidden = true;

  // Mirror extras (About, LinkedIn, Contact) into the sheet
  document.querySelectorAll('.extras-pill .extras-item').forEach(link => {
    const clone = link.cloneNode(true);
    clone.classList.remove('extras-item', 'extras-internal', 'extras-external');
    clone.classList.add('nav-sheet-link');
    clone.addEventListener('click', () => closeSheet());
    extrasGroup.appendChild(clone);
  });

  let lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('is-open'));
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = sheet.querySelector('a, button:not([data-nav-close])');
    if (firstLink) firstLink.focus();
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { sheet.hidden = true; }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openBtn.addEventListener('click', openSheet);
  sheet.querySelectorAll('[data-nav-close]').forEach(el => el.addEventListener('click', closeSheet));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !sheet.hidden) closeSheet();
  });
}

/* Public helper — returns true when motion animations are allowed.
   Checks both the manual toggle and the OS preference.               */
function motionOk() {
  return document.documentElement.getAttribute('data-motion') !== 'reduced' &&
         !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* Public helper — call from any page to extend cursor hover targets.
   Example: addCursorHover('.card, .bento-card');                       */
function addCursorHover(selector) {
  const ring = document.querySelector('.cursor-ring');
  if (!ring) return;
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

/* ============================================================
   TYPEWRITER — header name
   Types in on load, erases fast on internal navigation.
============================================================ */
const _TW_NAME    = 'Chris Rudnew';
const _TW_TYPE_MS = 68;   // ms per char — type in
const _TW_ERASE_MS = 26;  // ms per char — erase (faster)

function _twIn(el) {
  let i = 0;
  el.textContent = '';
  function tick() {
    i++;
    el.textContent = _TW_NAME.slice(0, i) + (i < _TW_NAME.length ? '|' : '');
    if (i < _TW_NAME.length) setTimeout(tick, _TW_TYPE_MS);
  }
  setTimeout(tick, 260); // small lead delay
}

function _twOut(el, cb) {
  let s = el.textContent.replace('|', '').length;
  if (s === 0) { cb(); return; }
  function tick() {
    s--;
    el.textContent = _TW_NAME.slice(0, s) + '|';
    if (s > 0) setTimeout(tick, _TW_ERASE_MS);
    else { el.textContent = ''; cb(); }
  }
  tick();
}

/* Intercept internal link clicks — erase name then navigate */
document.addEventListener('click', function (e) {
  if (e.defaultPrevented) return;
  const link = e.target.closest('a[href]');
  if (!link) return;
  if (link.target === '_blank') return;           // external tab
  if (link.protocol === 'mailto:') return;        // email
  if (link.protocol === 'tel:') return;           // phone
  if (link.hostname !== location.hostname) return; // off-site
  if (link.href === location.href) return;         // same page
  if (link.pathname === location.pathname && link.search === location.search) return; // same-page hash anchor

  if (document.documentElement.getAttribute('data-motion') === 'reduced') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  e.preventDefault();
  const dest = link.href;
  const nameEl = document.querySelector('.nav-pill-name');
  if (nameEl) {
    _twOut(nameEl, () => { location.href = dest; });
  } else {
    location.href = dest;
  }
});

/* Run after DOM is ready (handles both async and defer loading) */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLayout);
} else {
  initLayout();
}

/* Re-run typewriter when page is restored from bfcache (back/forward button) */
window.addEventListener('pageshow', function (e) {
  if (!e.persisted) return;
  const nameEl = document.querySelector('.nav-pill-name');
  if (nameEl &&
      document.documentElement.getAttribute('data-motion') !== 'reduced' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    _twIn(nameEl);
  }
});
