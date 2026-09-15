/**
 * Form handler URL - paste your deployed Google Apps Script Web App URL here.
 * Get it from: https://script.google.com → Deploy → Web app → Copy URL
 */
window.FORM_ACTION_URL = 'https://script.google.com/macros/s/AKfycbxe0vXuSaZJ_37_WHmxS2dntwWLnhxWFZvXWG5Q_8ml3gr7Vw4rbcm1KwPNWxd2wEfuRg/exec';

(function() {
  function init() {
    var url = window.FORM_ACTION_URL;
    if (!url || url.indexOf('http') !== 0) return;
    var forms = document.querySelectorAll('#contactForm, [data-form-handler="gas"]');
    forms.forEach(function(f) { f.action = url; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
