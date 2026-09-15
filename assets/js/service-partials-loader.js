/**
 * Injects shared Related Services + CTA blocks on service pages.
 */
(function () {
  var relatedEl = document.getElementById('service-related-placeholder');
  var ctaEl = document.getElementById('service-cta-placeholder');
  if (!relatedEl && !ctaEl) return;

  var base = document.querySelector('base');
  var baseUrl = (base && base.href) ? base.href.replace(/\/?$/, '/') : '';

  function inject(el, path, afterLoad) {
    if (!el) return;
    fetch(baseUrl + path)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function (html) {
        el.innerHTML = html;
        if (afterLoad) afterLoad(el);
      })
      .catch(function () {});
  }

  inject(relatedEl, 'assets/inc/service-related.html', function (el) {
    var current = el.getAttribute('data-current');
    if (!current) return;
    el.querySelectorAll('.service-related-tags a').forEach(function (link) {
      if (link.getAttribute('href') && link.getAttribute('href').indexOf(current) !== -1) {
        link.classList.add('is-current');
        link.setAttribute('aria-current', 'page');
      }
    });
  });

  inject(ctaEl, 'assets/inc/service-cta.html');
})();
