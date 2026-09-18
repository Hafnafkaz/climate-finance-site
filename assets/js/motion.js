/**
 * Homepage motion + interactivity.
 * Everything degrades to a static, readable page; reduced-motion keeps
 * meaning without movement.
 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* ---------- hero: split headline into words for stagger (preserves <em>) ---------- */
  var h1 = document.querySelector('.hero .h1');
  if (h1 && !reduce) {
    var out = document.createDocumentFragment();
    var full = h1.textContent.trim();
    h1.setAttribute('aria-label', full);
    var i = 0;
    Array.from(h1.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (p) {
          if (!p.trim()) { out.appendChild(document.createTextNode(p)); return; }
          var w = document.createElement('span');
          w.className = 'w'; w.setAttribute('aria-hidden', 'true');
          w.style.setProperty('--i', i++);
          var inner = document.createElement('span');
          inner.textContent = p;
          w.appendChild(inner);
          out.appendChild(w);
        });
      } else if (node.nodeType === 1) {
        var w2 = document.createElement('span');
        w2.className = 'w'; w2.setAttribute('aria-hidden', 'true');
        w2.style.setProperty('--i', i++);
        w2.appendChild(node.cloneNode(true));
        out.appendChild(w2);
      }
    });
    h1.innerHTML = '';
    h1.appendChild(out);
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

  /* ---------- generic in-view triggers ----------
     .mask-reveal hides itself via its own clip-path, which clips its
     rendered area to zero — Chromium's IntersectionObserver treats a
     self-clipped element as never-intersecting, so it can never detect
     its own reveal. Observe its parent instead and flag the child. */
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
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-count], .arc, .stagger').forEach(function (el) { io.observe(el); });

    document.querySelectorAll('.mask-reveal').forEach(function (el) {
      var target = el.parentElement || el;
      var maskIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          el.classList.add('in-view');
          maskIo.unobserve(target);
        });
      }, { threshold: 0.2 });
      maskIo.observe(target);
    });
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

  /* ---------- hero cursor spotlight ---------- */
  var spotlight = document.querySelector('.hero-spotlight');
  var heroSection = document.querySelector('.hero--deck');
  if (spotlight && heroSection && !reduce && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('pointermove', function (e) {
      var r = heroSection.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      spotlight.style.setProperty('--sx', x + '%');
      spotlight.style.setProperty('--sy', y + '%');
      spotlight.style.opacity = '1';
    });
    heroSection.addEventListener('pointerleave', function () { spotlight.style.opacity = '0'; });
    spotlight.style.opacity = '0.6';
  }

  /* ---------- draggable deck cards ---------- */
  var cards = document.querySelectorAll('.deck-card');
  if (cards.length && !reduce) {
    cards.forEach(function (card) {
      var startX, startY, dx = 0, dy = 0, dragging = false, pointerId;
      var origTransform = card.style.transform;
      var baseRot = parseFloat(getComputedStyle(card).getPropertyValue('--rot')) || 0;

      card.addEventListener('pointerdown', function (e) {
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true; pointerId = e.pointerId;
        startX = e.clientX; startY = e.clientY;
        card.classList.add('is-dragging');
        card.classList.remove('is-returning');
        try { card.setPointerCapture(pointerId); } catch (_) {}
        e.preventDefault();
      });

      card.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        dx = e.clientX - startX;
        dy = e.clientY - startY;
        var rot = baseRot + dx * 0.04;
        card.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) rotate(' + rot + 'deg)';
      });

      function release() {
        if (!dragging) return;
        dragging = false;
        try { card.releasePointerCapture(pointerId); } catch (_) {}
        card.classList.remove('is-dragging');
        card.classList.add('is-returning');
        card.style.transform = '';
        setTimeout(function () { card.classList.remove('is-returning'); }, 600);
      }
      card.addEventListener('pointerup', release);
      card.addEventListener('pointercancel', release);
      card.addEventListener('pointerleave', function () { if (dragging) release(); });
    });
  }

  /* ---------- side rail: fixed section navigator with progress ---------- */
  var railSections = document.querySelectorAll('[data-rail-label]');
  var rail = document.querySelector('.side-rail');
  if (rail && railSections.length) {
    railSections.forEach(function (sec) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Jump to ' + sec.getAttribute('data-rail-label'));
      var lbl = document.createElement('span');
      lbl.className = 'lbl';
      lbl.textContent = sec.getAttribute('data-rail-label');
      btn.appendChild(lbl);
      btn.addEventListener('click', function () {
        sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
      rail.appendChild(btn);
    });
    setTimeout(function () { rail.classList.add('is-ready'); }, 200);

    var railBtns = rail.querySelectorAll('button');
    var railTick = false;
    function railUpdate() {
      railTick = false;
      var mid = window.scrollY + window.innerHeight * 0.35;
      var activeIdx = 0;
      railSections.forEach(function (sec, i) {
        var top = sec.getBoundingClientRect().top + window.scrollY;
        if (mid >= top) activeIdx = i;
      });
      railBtns.forEach(function (b, i) {
        b.classList.toggle('is-active', i === activeIdx);
        b.classList.toggle('is-past', i < activeIdx);
      });
    }
    window.addEventListener('scroll', function () {
      if (!railTick) { railTick = true; requestAnimationFrame(railUpdate); }
    }, { passive: true });
    railUpdate();
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

  /* ---------- cycling hero word (Tree-of-Life style) ---------- */
  var cycleWrap = document.querySelector('.hero-cycle-wrap');
  if (cycleWrap) {
    var words = cycleWrap.querySelectorAll('.hero-cycle-word');
    var idx = 0;
    setInterval(function () {
      var cur = words[idx];
      cur.classList.remove('is-active');
      cur.classList.add('is-exiting');
      idx = (idx + 1) % words.length;
      words[idx].classList.remove('is-exiting');
      words[idx].classList.add('is-active');
      setTimeout(function () { cur.classList.remove('is-exiting'); }, 500);
    }, 2400);
  }

  /* ---------- ticker: only run while visible ---------- */
  var ticker = document.querySelector('.ticker');
  if (ticker && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { ticker.classList.toggle('is-running', e.isIntersecting); });
    }).observe(ticker);
  }
})();
