/* ============================================================
   layout.js — shared header, footer, and site-wide behaviour
   Usage in HTML:
     <header-component></header-component>
     <footer-component></footer-component>
   Then load this script before your page scripts:
     <script src="./layout.js"></script>
============================================================ */

/* Always start at the top on load/reload — prevents browser scroll restoration */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

/* ---- Disable hover/pointer work while scrolling ----
   When the cursor sweeps across elements mid-scroll, their :hover transitions
   fire and repaint every frame (worst offender: the project-card grid, which
   animates box-shadow + image transform + overlay on hover). Adding
   html.is-scrolling flips pointer-events off so no :hover can trigger; it's
   cleared a short SETTLE_MS after the last scroll/wheel/touch event. */
(function () {
  const root = document.documentElement;
  const SETTLE_MS = 90; // clear is-scrolling this long after the last scroll event
  let idleTimer = null;

  function onScrollActivity() {
    root.classList.add('is-scrolling');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { root.classList.remove('is-scrolling'); idleTimer = null; }, SETTLE_MS);
  }

  const opts = { passive: true };
  ['wheel', 'touchmove', 'scroll'].forEach((ev) =>
    window.addEventListener(ev, onScrollActivity, opts)
  );
})();

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
  <nav class="nav-pill" aria-label="Primary">

    <!-- LEFT zone — identity -->
    <div class="nav-pill-left">
      <a href="/" class="nav-pill-name" aria-label="Chris Rudnew — home">Chris Rudnew</a>
    </div>

    <span class="nav-pill-divider nav-pill-divider--name" aria-hidden="true"></span>

    <!-- NAV list — in-page section anchors only (varies per page) -->
    <div class="nav-pill-center">
      <div class="nav-pill-sections" role="tablist" aria-label="Jump to section">
        <span class="nav-highlighter" aria-hidden="true"></span>
      </div>
    </div>

    <!-- RIGHT zone — About (page nav) · connect · résumé · preferences -->
    <div class="nav-pill-right">

      <a class="nav-pill-pagelink" href="/about" data-path="/about" data-cursor="view">About</a>

      <span class="nav-pill-divider" aria-hidden="true"></span>

      <div class="nav-pill-social" aria-label="Social links">
    <a class="extras-item extras-external" href="https://linkedin.com/in/chris-rudnew" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn profile (opens in new tab)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      <span class="extras-label">LinkedIn</span>
    </a>
    <span class="extras-divider" aria-hidden="true"></span>
    <a class="extras-item extras-external" href="mailto:crudnew@gmail.com" aria-label="Email Chris">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <span class="extras-label">Contact</span>
    </a>
      </div>

      <span class="nav-pill-divider" aria-hidden="true"></span>

      <!-- Résumé — the single solid accent action -->
      <a class="nav-pill-resume" href="https://drive.google.com/file/d/1xz3PiAWFq54sbzW0McHqeSko3fiKA5zy/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Résumé</a>

      <span class="nav-pill-divider" aria-hidden="true"></span>

      <button class="nav-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-sheet">
        <span class="burger-bar" aria-hidden="true"></span>
        <span class="burger-bar" aria-hidden="true"></span>
        <span class="burger-bar" aria-hidden="true"></span>
      </button>

      <div class="settings-wrap">
      <button class="settings-btn" aria-label="Display preferences" aria-expanded="false">
        <svg class="display-cog" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        <span class="display-label">Display</span>
        <svg class="display-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M6 9l6 6 6-6"/>
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
          <span class="settings-bubble-label">Dark Mode</span>
          <span class="settings-toggle" aria-hidden="true"><span class="settings-toggle-knob"></span></span>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="contrast-toggle-btn" aria-label="Toggle high contrast mode" data-tooltip="High Contrast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 3v18" stroke-width="1.5"/>
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>
          </svg>
          <span class="settings-bubble-label">High Contrast</span>
          <span class="settings-toggle" aria-hidden="true"><span class="settings-toggle-knob"></span></span>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="motion-toggle-btn" aria-label="Toggle reduced motion" data-tooltip="Reduce Motion">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span class="settings-bubble-label">Reduce Motion</span>
          <span class="settings-toggle" aria-hidden="true"><span class="settings-toggle-knob"></span></span>
          <span class="settings-state" aria-hidden="true"></span>
        </button>
      </div>
      </div>

    </div><!-- /.nav-pill-right -->
  </nav>
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
    <a href="/about" data-cursor="view">
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

  /* Mark active internal page (e.g. About) in the bar */
  document.querySelectorAll('[data-path]').forEach(a => {
    const path = a.getAttribute('data-path');
    const current = location.pathname.replace(/\/index\.html$/, '/');
    if (path === current || path === location.pathname) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Typewriter — type name in on every page load.
     During intro: name stays empty here, then types in when intro:done fires
     (the typed center name fades out around the same moment — clean handoff). */
  const _nameEl = document.querySelector('.nav-pill-name');
  const _introActive = window._introWillRun || document.documentElement.classList.contains('intro-running');
  if (_nameEl && motionOk() && !_introActive) {
    _twIn(_nameEl);
  } else if (_nameEl && _introActive) {
    _nameEl.textContent = '';
    // Fire the typewriter when the intro completes so the nav name appears
    // naturally as a fresh moment (no FLIP, no "name flying" cross-screen).
    document.addEventListener('intro:done', function () {
      if (motionOk()) _twIn(_nameEl);
      else _nameEl.textContent = _TW_NAME;
    }, { once: true });
  }

  /* Page-tint fade — fires after the typewriter finishes so the color
     settles in as a natural follow-on to the name appearing.
     Typewriter lead (260ms) + 12 chars × 68ms ≈ 1076ms; add a breath.
     With intro, push the tint fade so it lands after the hero entrance. */
  const _tintDelay = motionOk() ? (_introActive ? 2200 : 1150) : 0;
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

  /* ---- Intermediate collapse: at mid widths the unified bar folds its
     center nav + social + résumé into the hamburger sheet (≤799px is full
     mobile, handled by CSS media query). ---- */
  (function () {
    var check = function () {
      var w = window.innerWidth;
      document.body.classList.toggle('nav-collapsed', w > 799 && w <= 1050);
    };
    window.addEventListener('resize', check, { passive: true });
    check();
  }());

  /* Replace <footer-component> */
  document.querySelectorAll('footer-component').forEach(el => {
    el.outerHTML = FOOTER_HTML;
  });

  /* Enforce footer typography — overrides any page-level :root font reassignments
     (e.g. portfolio.css sets --font-body to Orbitron; footer always stays Inter). */
  const _footerStyle = document.createElement('style');
  _footerStyle.textContent = 'footer, footer * { font-family: Inter, system-ui, -apple-system, sans-serif !important; }';
  document.head.appendChild(_footerStyle);

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
    let _scrollRaf = false; // RAF guard — coalesces multiple scroll events per frame

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

    /* Deadzone: ignore tiny scroll deltas so trackpad/settle jitter near a stop
       can't rapidly flip the header show/hide direction. Ignore moves smaller
       than this AND leave _lastY untouched on those frames, so jitter never
       accumulates across the threshold. Real scrolling still triggers once net
       movement exceeds the deadzone. */
    const _HIDE_DEADZONE = 8;
    window.addEventListener('scroll', function () {
      if (_scrollLocked || _mouseNearTop || _scrollRaf) return;
      _scrollRaf = true;
      requestAnimationFrame(function () {
        _scrollRaf = false;
        const y = window.scrollY;
        const dy = y - _lastY;
        if (Math.abs(dy) < _HIDE_DEADZONE) return;
        _header.style.transform = (dy > 0 && y > 80) ? 'translateY(-110%)' : 'translateY(0)';
        _lastY = y;
      });
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
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
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

  /* Settings menu open/close — fully JS-managed (no CSS :focus-within, so that
     clicking a *toggle* inside doesn't pin the menu open). Two ways to stay open:
       • hovering  → transient (closes shortly after the pointer leaves)
       • clicking the Display/cog button → PINNED (stays open until the button is
         clicked again or you click anywhere outside the menu). */
  const settingsWrap = document.querySelector('.settings-wrap');
  const settingsBtn = settingsWrap.querySelector('.settings-btn');
  let leaveTimer = null;
  let pinned = false;

  function openSettings() {
    clearTimeout(leaveTimer);
    settingsWrap.classList.add('is-open');
    settingsBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSettings() {
    clearTimeout(leaveTimer);
    settingsWrap.classList.remove('is-open');
    settingsBtn.setAttribute('aria-expanded', 'false');
    pinned = false;
  }

  /* Display/cog button: pin open, or close if already pinned open.
     (Also the open/close path on touch, where there's no hover.) */
  settingsBtn.addEventListener('click', e => {
    e.preventDefault();
    if (settingsWrap.classList.contains('is-open') && pinned) {
      closeSettings();
    } else {
      openSettings();
      pinned = true;
    }
  });

  /* Hover — transient open; closes after leaving unless pinned by a click. */
  settingsWrap.addEventListener('mouseenter', openSettings);
  settingsWrap.addEventListener('mouseover',  openSettings);
  settingsWrap.addEventListener('mouseleave', () => {
    if (!pinned) leaveTimer = setTimeout(closeSettings, 150);
  });

  /* Click anywhere outside the menu closes it (covers the pinned state). */
  document.addEventListener('pointerdown', e => {
    if (!settingsWrap.contains(e.target)) closeSettings();
  });

  /* Keyboard: open while focus is inside, close when it leaves; Esc closes. */
  settingsWrap.addEventListener('focusin', openSettings);
  settingsWrap.addEventListener('focusout', e => {
    if (!settingsWrap.contains(e.relatedTarget)) closeSettings();
  });
  settingsWrap.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSettings(); settingsBtn.focus(); }
  });

  /* ---- Custom cursor ---- */
  if (window.matchMedia('(pointer: coarse)').matches) return;
  /* Skip the custom cursor entirely under reduced motion — the per-frame
     RAF loop, hover-driven size changes, and inline-style mutations are all
     incompatible with the spirit of reduced motion. */
  if (!motionOk()) return;

  const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  const ringLabel = document.createElement('span'); ringLabel.className = 'cursor-label';
  ring.appendChild(ringLabel);
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, dx = 0, dy = 0;
  let _lastDotX = null, _lastDotY = null, _lastRingX = null, _lastRingY = null;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  /* Use transform:translate() instead of left/top — runs on the GPU compositor,
     no layout triggers. Dirty-check prevents any write when cursor is stationary,
     dropping idle style-recalcs from ~120/sec to near zero. */
  (function tick() {
    if (motionOk()) {
      /* Zero lag — ring tracks the pointer 1:1 (same as the dot). No trailing
         to visually wait on or misread placement; all the cursor's motion/
         personality lives in the hover state, not in catch-up. */
      dx = mx; dy = my;
    } else {
      dx = mx; dy = my;
    }
    const dotX  = mx - 4,           dotY  = my - 4;
    /* Wide "View" pill sits to the RIGHT of the real pointer (arrow points back
       at it); the circle/compact states stay centered on the pointer. */
    const ringX = Math.round(dx + (window.__cursorWide ? 14 : -18)), ringY = Math.round(dy - 18);
    if (dotX !== _lastDotX || dotY !== _lastDotY) {
      dot.style.transform = `translate(${dotX}px,${dotY}px)`;
      _lastDotX = dotX; _lastDotY = dotY;
    }
    if (ringX !== _lastRingX || ringY !== _lastRingY) {
      ring.style.transform = `translate(${ringX}px,${ringY}px)`;
      _lastRingX = ringX; _lastRingY = ringY;
    }
    requestAnimationFrame(tick);
  })();

  /* ---- Cursor pills — one pass over every interactive element ----
       external / new-tab / email / tel        → "↗" badge
       content-entry links (body links, project cards via their stretched <a>,
         and anything tagged data-cursor="view": the About links, Linger's
         prototype-flow tabs, etc.)             → "← View" pill
       header/footer chrome + action buttons    → plain ring grow (no label)
     Per-element override: data-cursor="view | ext | none".                 */
  (function () {
    function pill(el, text, mode) {
      el.addEventListener('mouseenter', function () {
        ringLabel.textContent = text;
        ring.classList.remove('hovering', 'is-view', 'is-ext');
        ring.classList.add('is-label', mode);
        window.__cursorWide = true;
      });
      el.addEventListener('mouseleave', function () {
        ring.classList.remove('is-label', 'is-view', 'is-ext');
        ringLabel.textContent = '';
        window.__cursorWide = false;
      });
    }
    function grow(el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hovering'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hovering'); });
    }
    document.querySelectorAll('a[href], button, [data-cursor]').forEach(function (el) {
      var ov = el.getAttribute('data-cursor');
      if (ov === 'none') return;
      var external = el.matches('a[target="_blank"], a[href^="mailto:"], a[href^="tel:"]');
      if (ov === 'ext' || external) pill(el, '↗', 'is-ext');
      else if (ov === 'view' || (el.tagName === 'A' && !el.closest('header, footer'))) pill(el, '← View', 'is-view');
      else grow(el);
    });
  })();
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
      /* Native smooth scroll to the section, offset for the fixed header. */
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

  // Mirror About, social links, and Résumé into the sheet
  document.querySelectorAll('.nav-pill-pagelink, .nav-pill-social .extras-item, .nav-pill-resume').forEach(link => {
    const clone = link.cloneNode(true);
    clone.classList.remove('extras-item', 'extras-internal', 'extras-external', 'nav-pill-pagelink', 'nav-pill-resume');
    clone.classList.add('nav-sheet-link');
    clone.removeAttribute('aria-current');
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
    setTimeout(() => { sheet.hidden = true; }, 340);
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

/* Public helper — morph the cursor ring into a labelled pill on hover.
   modeClass: 'is-view' (wide "← View" pill, offsets to the right of the pointer)
   or 'is-ext' (compact ↗ badge). No-op when the custom cursor is disabled
   (touch / reduced-motion), so pages can call it unconditionally.            */
function addCursorLabel(selector, text, modeClass) {
  const ring = document.querySelector('.cursor-ring');
  if (!ring) return;
  const label = ring.querySelector('.cursor-label');
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (label) label.textContent = text;
      ring.classList.remove('hovering', 'is-view', 'is-ext');
      ring.classList.add('is-label', modeClass);
      window.__cursorWide = true; // both pill types pop to the right of the pointer
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-label', 'is-view', 'is-ext');
      if (label) label.textContent = '';
      window.__cursorWide = false;
    });
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
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return; // let ctrl/cmd/middle-click open new tab natively
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
