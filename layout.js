/* ============================================================
   layout.js — shared header, footer, and site-wide behaviour
   Usage in HTML:
     <header-component></header-component>
     <footer-component></footer-component>
   Then load this script before your page scripts:
     <script src="./layout.js"></script>
============================================================ */

/* ---- Header HTML ---- */
const HEADER_HTML = `
<header>
  <a href="/" class="header-name" aria-label="Chris Rudnew — home">Chris Rudnew</a>
  <div class="header-right">
    <nav class="header-links" aria-label="Primary navigation">
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
        </button>
        <button class="settings-bubble" role="switch" aria-checked="false"
          id="contrast-toggle-btn" aria-label="Toggle high contrast mode" data-tooltip="High Contrast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 3v18" stroke-width="1.5"/>
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>`;

/* ---- Footer HTML ---- */
const FOOTER_HTML = `
<footer>
  <a href="/about.html">About Me</a>
  <p class="footer-copyright">&copy; 2026 Chris Rudnew</p>
</footer>`;

/* ---- Inject components + initialise everything ---- */
function initLayout() {

  /* Replace <header-component> */
  document.querySelectorAll('header-component').forEach(el => {
    el.outerHTML = HEADER_HTML;
  });

  /* Typewriter — type name in on every page load */
  const _nameEl = document.querySelector('.header-name');
  if (_nameEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    _twIn(_nameEl);
  }

  /* Replace <footer-component> */
  document.querySelectorAll('footer-component').forEach(el => {
    el.outerHTML = FOOTER_HTML;
  });

  /* ---- Settings & Accessibility ---- */
  const darkToggle     = document.getElementById('dark-toggle-btn');
  const contrastToggle = document.getElementById('contrast-toggle-btn');

  if (!darkToggle || !contrastToggle) return; // guard if header wasn't injected

  // Sync button state with current attribute (set early in <head>)
  if (document.documentElement.getAttribute('data-theme')    === 'dark')   darkToggle.setAttribute('aria-checked', 'true');
  if (document.documentElement.getAttribute('data-contrast') === 'high')   contrastToggle.setAttribute('aria-checked', 'true');

  darkToggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    this.setAttribute('aria-checked', String(!isDark));
  });

  contrastToggle.addEventListener('click', function () {
    const isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
    const next = isHigh ? 'normal' : 'high';
    document.documentElement.setAttribute('data-contrast', next);
    localStorage.setItem('contrast', next);
    this.setAttribute('aria-checked', String(!isHigh));
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
    dx += (mx - dx) * 0.18;
    dy += (my - dy) * 0.18;
    dot.style.cssText  = `left:${mx - 4}px;top:${my - 4}px`;
    ring.style.cssText = `left:${dx - 18}px;top:${dy - 18}px`;
    requestAnimationFrame(tick);
  })();

  // Base hover targets — pages can add more via addCursorHover()
  addCursorHover('a, button');

  if ('ontouchstart' in window) { dot.style.display = 'none'; ring.style.display = 'none'; }
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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  e.preventDefault();
  const dest = link.href;
  const nameEl = document.querySelector('.header-name');
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
  const nameEl = document.querySelector('.header-name');
  if (nameEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    _twIn(nameEl);
  }
});
