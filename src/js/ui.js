// ── Nav scroll shadow ─────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.style.borderBottomColor = scrolled ? 'rgba(26,23,16,0.1)' : 'transparent';
  navbar.style.boxShadow         = scrolled ? '0 4px 24px rgba(26,23,16,0.08)' : 'none';
}, { passive: true });

// ── Mobile menu ───────────────────────────────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// ── Smooth anchor scroll (offset for fixed nav height) ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
  });
});

// ── Scroll-triggered fade-up animations ──────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // fire once, then stop watching
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
