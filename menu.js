(() => {
  const tabs = document.querySelector('.branch-tabs');
  const grid = document.querySelector('.menu-grid');
  const dialog = document.querySelector('.dish-dialog');
  if (!tabs || !grid || !dialog || typeof MENU_BRANCHES === 'undefined') return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const countLabel = n => n === 1 ? '1 TIPO' : `${n} TIPOS`;

  let current = MENU_BRANCHES[0];
  const fromUrl = new URLSearchParams(location.search).get('sucursal');
  if (fromUrl) current = MENU_BRANCHES.find(b => b.id === fromUrl) || current;

  tabs.innerHTML = MENU_BRANCHES.map(b => `
    <button class="branch-tab" type="button" data-branch="${b.id}" aria-pressed="false">
      <span class="branch-tab-number">${esc(b.number)}</span>
      <span class="branch-tab-name">${esc(b.name)}</span>
      <span class="branch-tab-zone">${esc(b.zone)}</span>
    </button>`).join('');

  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.branch-tab');
    if (!btn) return;
    current = MENU_BRANCHES.find(b => b.id === btn.dataset.branch);
    renderGrid();
  });

  function renderGrid() {
    tabs.querySelectorAll('.branch-tab').forEach(t => t.setAttribute('aria-pressed', String(t.dataset.branch === current.id)));

    if (!current.categories.length) {
      grid.innerHTML = `
        <div class="menu-empty">
          <div class="menu-icon">🍽️</div>
          <p class="eyebrow">${esc(current.name)} · ${esc(current.zone)}</p>
          <h3>Menú próximamente</h3>
          <p>Estamos preparando el menú de esta sucursal, con opciones propias de este local.</p>
          <a class="btn btn-primary" href="#contacto">ESCRÍBENOS PARA MÁS INFO</a>
        </div>`;
      return;
    }

    grid.innerHTML = current.categories.map((c, i) => `
      <button class="menu-card${c.featured ? ' featured' : ''}" type="button" data-category="${c.id}" style="--i:${i}">
        <div class="menu-icon">${c.icon}</div>
        <div>
          ${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ''}
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.desc)}</p>
        </div>
        <span class="menu-card-cta">+ ${c.items.length ? `VER ${countLabel(c.items.length)}` : 'VER DETALLE'}</span>
      </button>`).join('') + (current.fullMenu ? `
      <a class="menu-full-link" href="${current.fullMenu}">VER EL MENÚ IMPRESO COMPLETO DE ${esc(current.zone.toUpperCase())} ↗</a>` : '');
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.menu-card');
    if (!card) return;
    openDish(current.categories.find(c => c.id === card.dataset.category));
  });

  function itemMedia(item, icon) {
    if (item.photo) return `<div class="dish-media"><img src="${item.photo}" alt="${esc(item.name)}" loading="lazy"></div>`;
    return `<div class="dish-media dish-media-empty"><span>${icon}</span><small>FOTO PRÓXIMAMENTE</small></div>`;
  }

  function itemPrices(item) {
    if (item.table) {
      return `<table class="dish-table">
        <thead><tr><th></th>${item.table.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${item.table.rows.map(r => `<tr><th>${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>`;
    }
    if (item.options) {
      return `<ul class="dish-options">${item.options.map(([l, p]) => `<li><span>${esc(l)}</span><b>${esc(p)}</b></li>`).join('')}</ul>`;
    }
    return '';
  }

  function openDish(cat) {
    const hero = cat.photo || (cat.items.find(i => i.photo) || {}).photo;
    let body;

    if (!cat.items.length) {
      body = `<div class="dish-soon">
        <span>${cat.icon}</span>
        <h4>Variedades y fotos próximamente</h4>
        <p>Estamos preparando el detalle de este platillo. Pregunta por él en tu sucursal.</p>
      </div>`;
    } else if (cat.compact) {
      body = `<ul class="dish-list">${cat.items.map(i => `
        <li><div><strong>${esc(i.name)}</strong>${i.desc ? `<small>${esc(i.desc)}</small>` : ''}</div><b>${esc(i.price)}</b></li>`).join('')}
      </ul>`;
    } else {
      body = `<div class="dish-grid">${cat.items.map((i, n) => `
        <article class="dish-item" style="--i:${n}">
          ${itemMedia(i, cat.icon)}
          <div class="dish-info">
            <div class="dish-title">
              <h4>${esc(i.name)}</h4>
              ${i.price ? `<span class="dish-price">${esc(i.price)}</span>` : ''}
            </div>
            ${i.desc ? `<p>${esc(i.desc)}</p>` : ''}
            ${itemPrices(i)}
          </div>
        </article>`).join('')}
      </div>`;
    }

    dialog.innerHTML = `
      <div class="dish-sheet">
        <header class="dish-header${hero && cat.compact ? ' has-photo' : ''}">
          <button class="dish-close" type="button" aria-label="Cerrar">✕</button>
          <p class="eyebrow">${esc(current.name)} · ${esc(current.zone)}${cat.items.length ? ` · ${countLabel(cat.items.length)}` : ''}</p>
          <h3 id="dish-title"><span>${cat.icon}</span> ${esc(cat.title)}</h3>
          <p>${esc(cat.desc)}</p>
          ${hero && cat.compact ? `<img class="dish-header-photo" src="${hero}" alt="">` : ''}
        </header>
        ${cat.note ? `<p class="dish-note">${esc(cat.note)}</p>` : ''}
        <div class="dish-body">${body}</div>
      </div>`;

    dialog.showModal();
    dialog.scrollTop = 0;
  }

  dialog.addEventListener('click', e => {
    if (e.target === dialog || e.target.closest('.dish-close')) dialog.close();
  });

  renderGrid();
})();
