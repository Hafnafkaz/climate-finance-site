/**
 * Loads the shared footer component into #footer-placeholder
 * Use with: <div id="footer-placeholder"></div>
 */
(function() {
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  var base = document.querySelector('base');
  var baseUrl = (base && base.href) ? base.href.replace(/\/?$/, '/') : '';
  fetch(baseUrl + 'assets/inc/footer.html')
    .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function(html) {
      el.innerHTML = html;
      if (window.__i18nApplyTranslations) window.__i18nApplyTranslations();
    })
    .catch(function() {});
})();
