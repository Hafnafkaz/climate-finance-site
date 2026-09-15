/**
 * Mobile nav toggle, dropdown expand, back-to-top, and scroll reveal.
 * Vanilla JS, no framework dependency. Uses event delegation throughout
 * so it never races the async header/footer partial fetches.
 */
(function () {
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.nav-toggle');
    var scrim = e.target.closest('.nav-scrim');
    var submenuBtn = e.target.closest('.nav-item.has-dropdown .submenu-toggle');
    var langBtn = e.target.closest('.lang-switch button');

    if (toggle) {
      var nav = document.querySelector('.main-nav');
      var scrimEl = document.querySelector('.nav-scrim');
      if (!nav) return;
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (scrimEl) scrimEl.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      return;
    }

    if (scrim) {
      var navEl = document.querySelector('.main-nav');
      var toggleEl = document.querySelector('.nav-toggle');
      if (navEl) navEl.classList.remove('is-open');
      if (toggleEl) toggleEl.setAttribute('aria-expanded', 'false');
      scrim.classList.remove('is-open');
      document.body.style.overflow = '';
      return;
    }

    if (submenuBtn) {
      if (window.innerWidth > 980) return;
      var item = submenuBtn.closest('.nav-item');
      var expanded = item.classList.toggle('is-expanded');
      submenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      return;
    }

    if (langBtn) {
      document.querySelectorAll('.lang-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
      });
      langBtn.setAttribute('aria-pressed', 'true');
      return;
    }
  });

  window.addEventListener('scroll', function () {
    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  function startReveal() {
    var targets = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!targets.length) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startReveal);
  } else {
    startReveal();
  }
})();
