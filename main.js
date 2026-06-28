// ===== MAIN APPLICATION =====

// ─── HIDE LOADER ─────────────────────────────────────
window.addEventListener('load', function() {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);
});

// ─── HERO SLIDER ─────────────────────────────────────
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const counter = document.getElementById('slide-current');
const progress = document.getElementById('slide-progress');
let current = 0, timer = null;
const slideTexts = [
  { eyebrow: '— Where the Night Begins', title: 'Experience<br>the <em>Deep</em><br>Night', sub: 'One platform. Three extraordinary venues. Book your table and live a night to remember.' },
  { eyebrow: '— Feel the Pulse', title: 'Let the<br><em>Music</em><br>Move You', sub: 'OVID CLUB — Non-stop energy, music that cuts through, a night without end.' },
  { eyebrow: '— Coastal Elegance', title: 'Where <em>Ocean</em><br>Meets<br>Night', sub: 'Cosmo Lounge — Refined elegance and calm in one place.' },
  { eyebrow: '— Exclusive Access', title: 'The <em>Private</em><br>World<br>Awaits', sub: 'ECHO Privé — Exclusive, private, for the elite. Where luxury meets privacy.' }
];
function goToSlide(n) {
  slides[current].classList.remove('active'); slides[current].classList.add('prev');
  dots[current].classList.remove('active');
  setTimeout(() => slides[current].classList.remove('prev'), 1800);
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active'); dots[current].classList.add('active');
  counter.textContent = (current + 1).toString().padStart(2, '0');
  document.querySelector('.hero-eyebrow').textContent = slideTexts[current].eyebrow;
  document.querySelector('.hero-title').innerHTML = slideTexts[current].title;
  document.querySelector('.hero-subtitle').textContent = slideTexts[current].sub.replace(/<[^>]+>/g, '');
  progress.style.animation = 'none'; progress.offsetHeight;
  progress.style.animation = 'progressBar 8s linear infinite';
  resetTimer();
}
function resetTimer(){ clearInterval(timer); timer = setInterval(() => goToSlide(current + 1), 8000); }
resetTimer();

// ─── REVEAL OBSERVER ────────────────────────────────
const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
allReveal.forEach(el => obs.observe(el));

// ─── COUNT UP ────────────────────────────────────────
function countUp(el, target, duration = 1600) {
  let start = 0; const step = target / (duration / 16);
  const run = () => { start += step; if (start >= target) { el.textContent = target; return; } el.textContent = Math.floor(start); requestAnimationFrame(run); };
  requestAnimationFrame(run);
}
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(document.getElementById('count1'), 1200);
      countUp(document.getElementById('count2'), 3);
      countUp(document.getElementById('count3'), 98);
      countUp(document.getElementById('count4'), 85);
      statsObs.disconnect();
    }
  });
}, { threshold: 0.3 });
statsObs.observe(document.getElementById('stats'));

// ─── VENUE CARD 3D ──────────────────────────────────
document.querySelectorAll('.venue-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    card.style.transform = `translateY(-8px) perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// ─── CARS SLIDER ─────────────────────────────────────
const track = document.getElementById('carsTrack');
const carCards = document.querySelectorAll('.car-card');
const carDots = document.querySelectorAll('.cars-dot');
const prevBtn = document.getElementById('carsPrev');
const nextBtn = document.getElementById('carsNext');
let carIndex = 0, carsPerView = 3, totalCars = carCards.length;
function updateCarSlider() {
  carsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const maxIndex = Math.max(0, totalCars - carsPerView);
  if (carIndex > maxIndex) carIndex = maxIndex;
  track.style.transform = `translateX(-${carIndex * (100 / carsPerView)}%)`;
  carDots.forEach((d, i) => d.classList.toggle('active', i === carIndex));
}
function nextCar() { const max = Math.max(0, totalCars - carsPerView); carIndex = carIndex < max ? carIndex + 1 : 0; updateCarSlider(); }
function prevCar() { const max = Math.max(0, totalCars - carsPerView); carIndex = carIndex > 0 ? carIndex - 1 : max; updateCarSlider(); }
carDots.forEach((d, i) => d.addEventListener('click', () => { carIndex = i; updateCarSlider(); }));
prevBtn.addEventListener('click', prevCar);
nextBtn.addEventListener('click', nextCar);
window.addEventListener('resize', updateCarSlider);
updateCarSlider();
let carTimer = setInterval(nextCar, 6000);
document.getElementById('cars').addEventListener('mouseenter', () => clearInterval(carTimer));
document.getElementById('cars').addEventListener('mouseleave', () => { carTimer = setInterval(nextCar, 6000); });

// ─── HOW IT WORKS TABS ──────────────────────────────
function switchTab(index) {
  document.querySelectorAll('.how-tab').forEach((t, i) => t.classList.toggle('active', i === index));
  document.querySelectorAll('.how-detail-content').forEach((c, i) => c.classList.toggle('active', i === index));
}