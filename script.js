const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
}, { passive: true });

const toggle = document.getElementById('navToggle');
const links  = document.querySelector('.nav__links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

const phrases = [
  'Full-stack разработчик',
  '.NET · Python · React',
  'ML / Computer Vision / NLP',
  'Backend · DevOps · Docker',
];
const el = document.getElementById('typewriter');
let pi = 0, ci = 0, deleting = false;

function type() {
  if (!el) return;
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 75);
}
type();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el      = e.target;
    const target  = +el.dataset.count;
    const suffix  = el.dataset.suffix || '';
    const duration = 1400;
    const start   = performance.now();
    function tick(now) {
      const k = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

const photoImg = document.querySelector('.hero__photo img');
photoImg?.addEventListener('error', () => {
  photoImg.style.display = 'none';
  const parent = photoImg.parentElement;
  parent.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:5rem;color:var(--accent);opacity:.6;">
      <i class="fa-solid fa-user-astronaut"></i>
    </div>`;
});