(function() {
  'use strict';

  // ── Анти-iframe ───────────────────────────────────────
  // Единственная реально полезная защита в этом файле
  if (window.self !== window.top) {
    try { window.top.location = window.self.location; } catch(e) {
      document.body.innerHTML = '';
    }
  }

  // ── Автовыход при долгом бездействии (30 минут) ───────
  var IDLE_TIMEOUT = 30 * 60 * 1000;
  var _idleTimer = null;
  function resetIdle() {
    clearTimeout(_idleTimer);
    _idleTimer = setTimeout(function() {
      // Только показать предупреждение - не разлогинивать принудительно
      // чтобы не терять несохранённый ввод
      var evt = new CustomEvent('rechat:idle');
      document.dispatchEvent(evt);
    }, IDLE_TIMEOUT);
  }
  ['mousedown','keydown','touchstart','scroll'].forEach(function(ev) {
    document.addEventListener(ev, resetIdle, { passive: true });
  });
  resetIdle();

  // ── Защита от paste очень длинных строк в поля ввода ──
  document.addEventListener('paste', function(e) {
    var target = e.target;
    if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') return;
    var text = (e.clipboardData || window.clipboardData).getData('text');
    if (text && text.length > 3000) {
      e.preventDefault();
      // Вставить первые 2000 символов
      var truncated = text.substring(0, 2000);
      var start = target.selectionStart;
      var end = target.selectionEnd;
      target.value = target.value.substring(0, start) + truncated + target.value.substring(end);
      target.selectionStart = target.selectionEnd = start + truncated.length;
      // Триггер события для обновления счётчика
      target.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

})();
