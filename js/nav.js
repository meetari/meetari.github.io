(function () {
  const nav    = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');

  if (!nav || !toggle) return;

  // Sticky styling
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Anchor-scroll offset — drive scroll-padding-top from the header's real
  // height so #section jumps land flush under the nav instead of leaving a
  // gap (or a sliver of the previous section) when its height changes.
  const setNavHeight = () => {
    document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
  };
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  if (document.fonts) document.fonts.ready.then(setNavHeight);

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close on nav link click
  nav.querySelectorAll('.nav__links a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
