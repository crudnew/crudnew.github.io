(function () {
  /* ── TEMP KILL-SWITCH (for testing native vs. Lenis scroll) ──────────────
     Toggle from the browser console, no code edits needed:
       lenisOff()  → disable Lenis, reload, use native browser scroll
       lenisOn()   → re-enable Lenis, reload
     The choice persists in localStorage across reloads/pages until you flip
     it back. Delete this block once you're done testing. */
  window.lenisOff = function () { localStorage.setItem('lenisDisabled', '1'); location.reload(); };
  window.lenisOn  = function () { localStorage.removeItem('lenisDisabled');   location.reload(); };
  if (localStorage.getItem('lenisDisabled') === '1') {
    console.log('%cLenis DISABLED — native scroll. Run lenisOn() to re-enable.', 'color:#e67');
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionPref = document.documentElement.getAttribute('data-motion');
  if (prefersReduced || motionPref === 'reduced') return;
  if (typeof Lenis === 'undefined') return;

  document.documentElement.style.scrollBehavior = 'auto';

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });

  /* ── LIVE TUNING (testing only) ──────────────────────────────────────────
     From the console, run e.g.  lenisLerp(0.15)  to feel different smoothing
     instantly — no reload. Higher = snappier (better trackpad, less wheel
     glide). Lower = smoother/draggier. Try 0.1, 0.15, 0.2, 0.3 and report
     which feels buttery on BOTH devices. Delete this once dialed in. */
  window.lenisLerp = function (v) {
    lenis.options.lerp = v;
    console.log('%clerp set to ' + v, 'color:#6c8');
    return v;
  };

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
  }

  window.lenis = lenis;
})();
