// ═══════════════════════════════════════════
// SECURITY MODULE — подключается первым
// ═══════════════════════════════════════════
(function() {
  'use strict';

  // ── 1. Заглушить консоль ──────────────────
  const noop = function() {};
  const consoleMethods = ['log','warn','info','debug','dir','table','trace','group','groupEnd','time','timeEnd','assert','count','profile','profileEnd'];
  consoleMethods.forEach(m => { try { console[m] = noop; } catch(e) {} });

  // Переопределить через дескриптор (защита от восстановления)
  try {
    Object.defineProperty(window, 'console', {
      get: function() {
        return {
          log: noop, warn: noop, info: noop, error: noop, debug: noop,
          dir: noop, table: noop, trace: noop, group: noop, groupEnd: noop,
          time: noop, timeEnd: noop, assert: noop, count: noop,
          clear: noop, profile: noop, profileEnd: noop
        };
      },
      set: function() {},
      configurable: false
    });
  } catch(e) {}

  // ── 2. Анти-DevTools ─────────────────────
  // Метод через размер окна (срабатывает когда открыто dock)
  let devtoolsOpen = false;
  const threshold = 160;

  function checkDevTools() {
    const widthDiff  = window.outerWidth  - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        onDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  // Метод через debugger timing
  let devtoolsTimer = setInterval(function() {
    const start = performance.now();
    (function() {}['toString']['call']());
    if (performance.now() - start > 100) {
      onDevToolsOpen();
    }
  }, 1000);

  setInterval(checkDevTools, 500);
  window.addEventListener('resize', checkDevTools);

  function onDevToolsOpen() {
    // Очистить чувствительные данные из DOM
    try {
      document.querySelectorAll('input[type=password]').forEach(el => el.value = '');
    } catch(e) {}
    // Перенаправить на главную (не ломаем работу, просто сбрасываем состояние)
    // Можно включить жёсткий редирект:
    // window.location.href = 'index.html';
  }

  // ── 3. Блок правой кнопки и выделения ────
  document.addEventListener('contextmenu', function(e) {
    // Разрешить в input/textarea для UX
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
  });

  // Блок F12, Ctrl+Shift+I/J/C/U, Ctrl+U
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') { e.preventDefault(); return false; }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) {
      e.preventDefault(); return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault(); return false;
    }
    // Cmd+Option+I (Mac)
    if (e.metaKey && e.altKey && e.key.toUpperCase() === 'I') {
      e.preventDefault(); return false;
    }
  });

  // ── 4. Анти-iframe embedding ──────────────
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // prototype freeze removed — breaks Firebase SDK

})();
