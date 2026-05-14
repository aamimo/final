// Wasanii Sanaa — script.js

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mnav = document.getElementById('mnav');
if (menuBtn && mnav) {
  menuBtn.addEventListener('click', () => mnav.classList.toggle('open'));
  mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));
}

// Active section highlight in nav while scrolling
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const setActive = (id) => {
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// Reveal-on-scroll for cards
const revealEls = document.querySelectorAll('.program-card, .timeline-item, .gallery-grid img, .about-card');
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// Contact form -> mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Inquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:wasaniisanaa@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
