// Restore the visitor's saved theme as early as possible.
(function () {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }
})();

// Attach page interactions after the HTML has been parsed.
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu simple toggle (shows jump links in alert for minimal single-file footprint)
    document.getElementById('menuBtn')?.addEventListener('click', () => {
      alert('Quick links:\\n• Methods\\n• FAQ\\n• Get Started');
    });
  
    // Theme toggle
    const themeBtn = document.getElementById('themeBtn');
    themeBtn?.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  
    // Reveal cards on scroll
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); } });
    }, { threshold:.12 });
    document.querySelectorAll('.card').forEach(c => obs.observe(c));
  
    // Back to top
    document.getElementById('backTop')?.addEventListener('click', () => { window.scrollTo({top:0, behavior:'smooth'}); });
  
    // Simple scrollspy to mark nav current
    const anchors = ['methods','faq','cta'].map(id => document.getElementById(id));
    const navLinks = Array.from(document.querySelectorAll('.menu a'));
    const spy = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = navLinks.find(a => a.getAttribute('href') === '#' + id);
        if(link){ link.setAttribute('aria-current', entry.isIntersecting ? 'true' : 'false'); }
      });
    }, { threshold:.33 });
    anchors.forEach(el => el && spy.observe(el));
});
