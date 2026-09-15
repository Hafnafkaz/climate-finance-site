/**
 * Homepage motion: hero entrance, count-ups, the capital-thread pipeline,
 * masked reveals, staggered lists, header compaction, ticker pause.
 * Everything degrades to a static page; reduced-motion keeps only
 * opacity/color changes.
 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* ---------- hero: split headline into words for stagger ---------- */
  var h1 = document.querySelector('.hero .h1');
  if (h1 && !reduce) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true" style="--i:' + i + '"><span>' + w + '</span></span>';
    }).join(' ');
  }
  requestAnimationFrame(function () { document.body.classList.add('is-loaded'); });

  /* ---------- count-ups (real figures only) ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var dur = 1400, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var v = target * ease(p);
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    if (reduce) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    requestAnimationFrame(frame);
  }

  /* ---------- generic in-view triggers ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('in-view');
        if (el.dataset.count !== undefined) countUp(el);
        el.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(el);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-count], .arc, .mask-reveal, .stagger').forEach(function (el) { io.observe(el); });
  }

  /* ---------- capital thread: scroll progress through the step flow ---------- */
  var flow = document.querySelector('.step-flow');
  if (flow) {
    var steps = flow.querySelectorAll('.step');
    var ticking = false;
    function update() {
      ticking = false;
      var r = flow.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the flow's top reaches 80% down the viewport, 1 when its bottom reaches 35%
      var startY = vh * 0.8, endY = vh * 0.35;
      var p = (startY - r.top) / (startY - endY + r.height);
      p = Math.max(0, Math.min(1, p));
      flow.style.setProperty('--thread', p.toFixed(3));
      steps.forEach(function (s, i) {
        var threshold = (i + 0.5) / steps.length;
        s.classList.toggle('is-live', p >= threshold - 0.12);
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- header compaction ---------- */
  var lastState = false;
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 40;
    if (scrolled !== lastState) {
      lastState = scrolled;
      var header = document.querySelector('.site-header');
      if (header) header.classList.toggle('is-scrolled', scrolled);
    }
  }, { passive: true });

  /* ---------- ticker: only run while visible ---------- */
  var ticker = document.querySelector('.ticker');
  if (ticker && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { ticker.classList.toggle('is-running', e.isIntersecting); });
    }).observe(ticker);
  }
})();
