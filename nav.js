(function () {
  /* Mobile menu toggle */
  const tgl = document.getElementById('navToggle');
  const nl  = document.getElementById('navList');
  if (tgl && nl) {
    tgl.addEventListener('click', () => {
      const o = nl.classList.toggle('open');
      tgl.setAttribute('aria-expanded', o);
    });
    nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nl.classList.remove('open');
      tgl.setAttribute('aria-expanded', false);
    }));
  }

  /* Scroll class on nav */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () =>
    nav?.classList.toggle('scrolled', scrollY > 40), { passive: true });

  /* Cart badge */
  function updateCartBadge() {
    const n = JSON.parse(localStorage.getItem('cart') || '[]').reduce((s, c) => s + c.qty, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = n > 0 ? n : '';
      badge.classList.toggle('visible', n > 0);
    }
    /* also update any inline cart count spans */
    const cc = document.getElementById('cartCount');
    if (cc) cc.textContent = n > 0 ? n : '';
  }
  updateCartBadge();
  window.addEventListener('storage', updateCartBadge);

  /* Search overlay */
  const searchBtn   = document.getElementById('navSearchBtn');
  const searchPanel = document.getElementById('navSearch');
  const searchInput = document.getElementById('navSearchInput');
  const searchClose = document.getElementById('navSearchClose');

  function closeSearch() {
    searchPanel?.classList.remove('open');
    if (searchInput) searchInput.value = '';
    if (typeof filterBySearch === 'function') filterBySearch('');
  }

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener('click', () => {
      const opening = !searchPanel.classList.contains('open');
      searchPanel.classList.toggle('open');
      if (opening) searchInput?.focus();
      else closeSearch();
    });
    searchClose?.addEventListener('click', closeSearch);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

    searchInput?.addEventListener('input', e => {
      if (typeof filterBySearch === 'function') filterBySearch(e.target.value);
    });
    searchInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (!q) return;
        if (typeof filterBySearch === 'function') {
          filterBySearch(q);
          searchPanel.classList.remove('open');
        } else {
          window.location.href = 'jewelry.html?q=' + encodeURIComponent(q);
        }
      }
    });
  }

  /* On jewelry.html, read ?q= param from URL and pre-fill search */
  if (typeof filterBySearch === 'function') {
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
      if (searchInput) searchInput.value = q;
      searchPanel?.classList.add('open');
      filterBySearch(q);
    }
  }

  /* Admin: custom announcement bar */
  try {
    const disc = JSON.parse(localStorage.getItem('ps_discount') || 'null');
    if (disc && disc.active && disc.announce) {
      const bar = document.querySelector('.announce-bar');
      if (bar) bar.innerHTML = disc.announce;
    }
  } catch(e) {}

  /* Admin: custom hero image (for pages that don't apply it in their own script) */
  try {
    const heroes = JSON.parse(localStorage.getItem('ps_heroImages') || '{}');
    const page = location.pathname.replace(/.*\//, '').replace('.html', '') || 'index';
    if (page !== 'jewelry' && heroes[page]) {
      const bg = document.querySelector('.page-hero__bg');
      if (bg) bg.style.backgroundImage = `url('${heroes[page]}')`;
    }
  } catch(e) {}
})();
