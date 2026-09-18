(function () {
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  var bound = false;
  function bindToggle() {
    if (bound) return;
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    bound = true;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  document.addEventListener('headerLoaded', bindToggle);
  document.addEventListener('DOMContentLoaded', bindToggle);
  var n = 0;
  var t = setInterval(function () { bindToggle(); if (bound || ++n > 30) clearInterval(t); }, 200);
})();
