/**
 * Lightweight contact-form validation + submission to the Google Apps
 * Script endpoint set in form-config.js (window.FORM_ACTION_URL).
 */
(function () {
  function init() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = form.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field') || input.closest('.consent');
        var ok = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
        if (field && field.classList.contains('field')) field.classList.toggle('has-error', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        if (status) { status.textContent = 'Please fill in the required fields.'; status.dataset.state = 'error'; }
        return;
      }

      var action = form.action;
      if (!action || action.indexOf('http') !== 0) {
        if (status) { status.textContent = 'This form is not yet connected — email hello@climatefinance.co.tz directly.'; status.dataset.state = 'error'; }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (status) { status.textContent = 'Sending…'; status.dataset.state = ''; }

      fetch(action, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
        .then(function () {
          if (status) { status.textContent = 'Thank you — we respond within 24 hours.'; status.dataset.state = 'success'; }
          form.reset();
        })
        .catch(function () {
          if (status) { status.textContent = 'Something went wrong. Please email hello@climatefinance.co.tz.'; status.dataset.state = 'error'; }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
