const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.querySelectorAll('.product-thumbs button').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const card = thumb.closest('.product-card');
    const main = card.querySelector('.product-main');
    main.src = thumb.dataset.src;
    main.alt = thumb.dataset.alt;
    card.querySelectorAll('.product-thumbs button').forEach(b => b.classList.toggle('active', b === thumb));
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
