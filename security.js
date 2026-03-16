(function() {
  'use strict';

  // ── Блок консоли ──────────────────────────
  const noop = function() {};
  try {
/*    Object.defineProperty(window, 'console', {
      get: function() {
        return {
          log: noop, warn: noop, info: noop, error: noop,
          debug: noop, dir: noop, table: noop, trace: noop,
          group: noop, groupEnd: noop, time: noop, timeEnd: noop,
          assert: noop, count: noop, clear: noop
        };
      },
      set: function() {},
      configurable: false
    });
  } catch(e) {}

  // ── Блок DevTools клавиш ──────────────────
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) {
      e.preventDefault(); return false;
    }
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault(); return false;
    }
    if (e.metaKey && e.altKey && e.key.toUpperCase() === 'I') {
      e.preventDefault(); return false;
    }
  });

  // ── Блок правой кнопки ────────────────────
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
  });

  // ── Анти-iframe ───────────────────────────
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // ── Детект открытых DevTools ──────────────
  setInterval(function() {
    const w = window.outerWidth - window.innerWidth;
    const h = window.outerHeight - window.innerHeight;
    if (w > 160 || h > 160) {
      document.querySelectorAll('input').forEach(el => el.value = '');
    }
  }, 1000);
*/
})();
