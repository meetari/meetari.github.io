(function () {
  // ── Scroll reveal ────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Category bar animation ───────────────────────────────────
  // Start bars at 0 and animate to their target width on reveal
  const bars = document.querySelectorAll('.cat-row__fill');
  bars.forEach((bar) => {
    const target = bar.style.width;
    bar.style.width = '0%';
    bar.dataset.target = target;
  });

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          // small delay so it triggers after section reveal
          setTimeout(() => {
            bar.style.width = bar.dataset.target;
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar) => barObserver.observe(bar));

  // ── Mock-bar animation (same treatment for mockup) ───────────
  const mockBars = document.querySelectorAll('.mock-bar__fill');
  mockBars.forEach((bar) => {
    const target = bar.style.width;
    bar.style.width = '0%';
    bar.dataset.target = target;
  });

  const mockBarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          setTimeout(() => { bar.style.width = bar.dataset.target; }, 600);
          mockBarObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  mockBars.forEach((bar) => mockBarObserver.observe(bar));
})();
