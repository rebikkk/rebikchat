(function() {
  'use strict';

  // ── Блок F12 и DevTools горячих клавиш ───
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

  // ── Блок правой кнопки мыши ──────────────
  document.addEventListener('contextmenu', function(e) {
    if (['INPUT','TEXTAREA'].includes(e.target.tagName)) return;
    e.preventDefault();
  });

  // ── Анти-iframe ───────────────────────────
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // ── Детект DevTools по размеру окна ──────
  setInterval(function() {
    const w = window.outerWidth - window.innerWidth;
    const h = window.outerHeight - window.innerHeight;
    if (w > 160 || h > 160) {
      document.querySelectorAll('input[type=password]').forEach(function(el) {
        el.value = '';
      });
    }
  }, 1000);

})();
