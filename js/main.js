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
