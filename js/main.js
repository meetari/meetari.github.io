// Favicon error fallback — replace broken favicons with colored initials
document.querySelectorAll('.mock-favicon').forEach((img) => {
  img.addEventListener('error', function () {
    const domain  = this.alt || 'x';
    const initial = domain.replace('www.', '')[0]?.toUpperCase() || '?';
    const colors  = ['#57755F', '#B96D7E', '#97672E', '#435C4D', '#8AAA97', '#6C6153'];
    let h = 0;
    for (const c of domain) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    const bg = colors[Math.abs(h) % colors.length];

    const span = document.createElement('span');
    span.style.cssText = `
      display:inline-flex;align-items:center;justify-content:center;
      width:14px;height:14px;border-radius:3px;
      background:${bg};color:#fff;font-size:8px;font-weight:700;
      flex-shrink:0;
    `;
    span.textContent = initial;
    this.replaceWith(span);
  });
});

// Pricing plan toggle — swaps the Pro card's displayed price
(function () {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const amountEl = document.getElementById('pricing-amount');
  const periodEl = document.getElementById('pricing-period');
  const PRICES = { monthly: { amount: '$4.99', period: '/mo' }, yearly: { amount: '$49', period: '/yr' } };

  toggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.pricing__toggle-btn');
    if (!btn) return;

    const plan = btn.dataset.plan;
    toggle.querySelectorAll('.pricing__toggle-btn').forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    amountEl.textContent = PRICES[plan].amount;
    periodEl.textContent = PRICES[plan].period;
  });
})();
