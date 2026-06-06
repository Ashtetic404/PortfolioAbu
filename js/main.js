/**
 * ============================================================
 * ABU ZAR — PERSONAL WEBSITE  |  main.js
 *
 * 1. Theme toggle (dark ↔ light)
 * 2. Hide-on-scroll header
 * 3. Active nav link on scroll
 * 4. Scroll reveal (.fade-in → .is-visible)
 * 5. Mobile nav drawer
 * 6. Footer year
 * ============================================================
 */


/* ============================================================
   1. THEME TOGGLE
   Reads system preference, then respects manual toggle.
   ============================================================ */
(function () {
  const root   = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  // Initial theme from system preference
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateIcon(theme);

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    updateIcon(theme);
  });

  function updateIcon(t) {
    // aria-label tells screen readers what clicking will do next
    toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    // Sun icon when in dark mode (clicking → go light)
    // Moon icon when in light mode (clicking → go dark)
    toggle.innerHTML = t === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
           <circle cx="12" cy="12" r="5"/>
           <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
                    M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
         </svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
         </svg>`;
  }
})();


/* ============================================================
   2. HIDE-ON-SCROLL HEADER
   Hides when scrolling down past 80px, shows on scroll up.
   ============================================================ */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastY   = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  function update() {
    const y    = window.scrollY;
    const diff = y - lastY;

    if (y > 80) {
      if (diff > 10)  header.classList.add('is-hidden');
      if (diff < -10) header.classList.remove('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastY   = y;
    ticking = false;
  }
})();


/* ============================================================
   3. ACTIVE NAV LINK
   Highlights the nav link whose section is in view.
   ============================================================ */
(function () {
  const links    = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => obs.observe(s));
})();


/* ============================================================
   4. SCROLL REVEAL
   Adds .is-visible to .fade-in elements when they enter view.
   Hero elements are excluded — they animate via CSS keyframes.
   ============================================================ */
(function () {
  // Exclude hero children — they run CSS @keyframes on load
  const els = document.querySelectorAll('.fade-in:not(.hero .fade-in)');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          o.unobserve(e.target); // no need to keep watching
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => obs.observe(el));
})();


/* ============================================================
   5. MOBILE NAV DRAWER
   Toggle open/close + Escape key support.
   ============================================================ */
(function () {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  let open = false;

  btn.addEventListener('click', toggle);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) close(); });

  // Close when any nav link is tapped
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));

  function toggle() { open ? close() : expand(); }

  function expand() {
    open = true;
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
  }

  function close() {
    open = false;
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
  }
})();


/* ============================================================
   6. FOOTER YEAR — always current
   ============================================================ */
(function () {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
})();
