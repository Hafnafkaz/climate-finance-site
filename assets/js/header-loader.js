/**
 * Loads shared header into #header-placeholder and sets active nav state.
 */
(function() {
  var el = document.getElementById('header-placeholder');
  if (!el) return;

  var active = el.getAttribute('data-active') || '';
  var base = document.querySelector('base');
  var baseUrl = (base && base.href) ? base.href.replace(/\/?$/, '/') : '';

  fetch(baseUrl + 'assets/inc/header.html')
    .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function(html) {
      el.outerHTML = html;
      var header = document.querySelector('.header-wrap');
      if (!header || !active) return;

      var map = {
        home: ['home'],
        about: ['about'],
        team: ['insights'],
        insights: ['insights'],
        'climate-policy': ['insights'],
        cop: ['insights', 'cop'],
        beneficiaries: ['impact'],
        testimonials: ['impact'],
        'women-empowerment': ['impact'],
        'loan-program': ['impact'],
        contact: ['contact'],
        donate: ['donate'],
        faq: ['faq'],
        'what-we-do': ['services'],
        services: ['services'],
        'market-analysis': ['services'],
        'financial-modelling': ['services'],
        microfinance: ['services'],
        'gender-assessment': ['services'],
        'stakeholders-engagement': ['services'],
        'scientific-assessment': ['services'],
        'climate-risk': ['services']
      };

      var groups = map[active] || [active];
      groups.forEach(function(group) {
        var item = header.querySelector('[data-nav="' + group + '"]');
        if (item) {
          var link = item.querySelector(':scope > .nav-link, :scope > .nav-link-row > .nav-link');
          if (link) link.classList.add('active');
        }
      });

      var direct = header.querySelector('a[href*="' + active + '"]');
      if (direct && direct.classList.contains('nav-link')) {
        direct.classList.add('active');
      }

      if (window.__i18nApplyTranslations) window.__i18nApplyTranslations();
      if (window.__i18nInitLanguageSwitcher) window.__i18nInitLanguageSwitcher();
      document.dispatchEvent(new CustomEvent('headerLoaded'));
    })
    .catch(function() {});
})();
