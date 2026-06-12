/* Piercing & Sign — shared effects */

(function () {
  'use strict';

  /* ── Nav: add .scrolled class when user scrolls down ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll reveal via IntersectionObserver ── */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    /* fallback: show everything */
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── Hero parallax (subtle) ── */
  const heroBg = document.querySelector('.hero__bg, .page-hero__bg');
  if (heroBg) {
    const onParallax = () => {
      const y = window.scrollY * 0.28;
      heroBg.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onParallax, { passive: true });
  }
})();
