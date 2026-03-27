// Theme toggle
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if (t === 'dark') {
    themeIcon.textContent = '☀';
    themeLabel.textContent = 'Light';
  } else {
    themeIcon.textContent = '☾';
    themeLabel.textContent = 'Dark';
  }
}
themeToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Case study toggle
function toggleCase(btn) {
  const card = btn.closest('.project-card');
  const cs = card.querySelector('.case-study');
  const arrow = btn.querySelector('.toggle-arrow');
  const isOpen = cs.classList.contains('open');
  // close all
  document.querySelectorAll('.case-study.open').forEach(el => {
    el.classList.remove('open');
    el.closest('.project-card').querySelector('.toggle-arrow').classList.remove('open');
    el.closest('.project-card').querySelector('.project-toggle').childNodes[0].textContent = 'Case Study ';
  });
  if (!isOpen) {
    cs.classList.add('open');
    arrow.classList.add('open');
    btn.childNodes[0].textContent = 'Close ';
  }
}

// Intersection observer for fade-up + skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form AJAX
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = 'Message sent. I will get back to you soon.';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Try emailing directly.';
    }
  } catch {
    status.textContent = 'Network error. Try again.';
  }
});