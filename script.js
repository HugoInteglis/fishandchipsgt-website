const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const topbar = document.querySelector('.topbar');

function setNavOpen(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

toggle.addEventListener('click', () => setNavOpen(!nav.classList.contains('open')));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => setNavOpen(false));
});

const updateTopbar = () => topbar.classList.toggle('is-compact', window.scrollY > 40);
window.addEventListener('scroll', updateTopbar, { passive: true });
updateTopbar();

document.querySelectorAll('.product-thumbs button').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const card = thumb.closest('.product-card');
    const main = card.querySelector('.product-main');
    main.src = thumb.dataset.src;
    main.alt = thumb.dataset.alt;
    card.querySelectorAll('.product-thumbs button').forEach(b => b.classList.toggle('active', b === thumb));
  });
});

const galleryImages = [...document.querySelectorAll('.menu-gallery img')];
if (galleryImages.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'menu-lightbox';
  lightbox.setAttribute('aria-label', 'Visor del menú');
  lightbox.innerHTML = `
    <div class="lightbox-bar">
      <span class="lightbox-count"></span>
      <div class="lightbox-actions">
        <button type="button" class="lightbox-btn lightbox-zoom">+ ZOOM</button>
        <button type="button" class="lightbox-btn lightbox-close" aria-label="Cerrar">✕</button>
      </div>
    </div>
    <div class="lightbox-stage"><img alt=""></div>
    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Página anterior">‹</button>
    <button type="button" class="lightbox-nav lightbox-next" aria-label="Página siguiente">›</button>`;
  document.body.appendChild(lightbox);

  const stage = lightbox.querySelector('.lightbox-stage');
  const img = stage.querySelector('img');
  const zoomBtn = lightbox.querySelector('.lightbox-zoom');
  const prev = lightbox.querySelector('.lightbox-prev');
  const next = lightbox.querySelector('.lightbox-next');
  let index = 0;

  // fx/fy: punto (0–1) de la imagen hacia el que se acerca el zoom
  const setZoom = (zoomed, fx = 0.5, fy = 0.35) => {
    stage.classList.toggle('is-zoomed', zoomed);
    zoomBtn.textContent = zoomed ? '– ZOOM' : '+ ZOOM';
    if (!zoomed) return stage.scrollTo(0, 0);
    stage.scrollTo(
      img.offsetLeft + img.offsetWidth * fx - stage.clientWidth / 2,
      img.offsetTop + img.offsetHeight * fy - stage.clientHeight / 2
    );
  };

  const show = i => {
    index = Math.max(0, Math.min(galleryImages.length - 1, i));
    img.src = galleryImages[index].currentSrc || galleryImages[index].src;
    img.alt = galleryImages[index].alt;
    lightbox.querySelector('.lightbox-count').textContent = `${index + 1} / ${galleryImages.length}`;
    prev.disabled = index === 0;
    next.disabled = index === galleryImages.length - 1;
    setZoom(false);
  };

  galleryImages.forEach((image, i) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    const open = () => { show(i); lightbox.showModal(); };
    image.addEventListener('click', open);
    image.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  img.addEventListener('click', e => {
    if (stage.classList.contains('is-zoomed')) return setZoom(false);
    const r = img.getBoundingClientRect();
    setZoom(true, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
  zoomBtn.addEventListener('click', () => setZoom(!stage.classList.contains('is-zoomed')));
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
