(function() {
  'use strict';

  // ── Анти-iframe (полезно — предотвращает clickjacking) ─────────────
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // ── Очистка чувствительных полей при потере фокуса вкладки ─────────
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      document.querySelectorAll('input[type=password]').forEach(function(el) {
        // Не чистим — это раздражает пользователей
        // Только снимаем фокус
        el.blur();
      });
    }
  });

  // ── Блокировка paste паролей из небезопасных источников ─────────────
  // (ничего не делаем — paste паролей это нормально)

  // ── Защита от XSS через location.hash ───────────────────────────────
  if (location.hash && /<[^>]*>/.test(decodeURIComponent(location.hash))) {
    location.hash = '';
  }

})();
