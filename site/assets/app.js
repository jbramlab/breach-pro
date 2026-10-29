// Breach Pro · small interactivity layer. The pages work without it.
(function () {
  var KEY = 'bn-prefs';
  var NOTES = { solo: 'You plus four randoms', duo: 'You and a friend, three randoms', trio: 'Three of you, two randoms', four: 'Four of you, one random', five: 'Full team, full plan' };
  function get(k) { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) { return {}; } }
  function put(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Site pages: side, view (squad plans / operators) and squad size
  var plans = document.querySelector('[data-plans]');
  if (plans) {
    var pref = get(KEY);
    var side = pref.side === 'def' ? 'def' : 'atk';
    var squad = NOTES[pref.squad] ? pref.squad : 'solo';
    var view = pref.view === 'ops' ? 'ops' : 'plans';
    var h = (location.hash || '').slice(1).split('-');
    if (h.length === 2 && h[0] === 'ops' && (h[1] === 'atk' || h[1] === 'def')) { view = 'ops'; side = h[1]; }
    else if (h.length === 2 && (h[0] === 'atk' || h[0] === 'def') && NOTES[h[1]]) { view = 'plans'; side = h[0]; squad = h[1]; }
    var pageEl = document.querySelector('[data-page]');
    var apply = function (save) {
      if (pageEl) { pageEl.setAttribute('data-side', side); pageEl.setAttribute('data-view', view); }
      all('[data-plan]').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-plan') === side + '-' + squad); });
      all('[data-pane]').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pane') === view); });
      all('[data-ops-side]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-ops-side') === side); });
      all('[data-side-block]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-side-block') === side); });
      all('[data-set-side]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-side') === side)); });
      all('[data-set-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-view') === view)); });
      all('[data-set-squad]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-squad') === squad)); });
      var note = document.querySelector('[data-squad-note]');
      if (note) note.textContent = NOTES[squad];
      if (save) {
        put(KEY, { side: side, squad: squad, view: view });
        try { history.replaceState(null, '', '#' + (view === 'ops' ? 'ops-' + side : side + '-' + squad)); } catch (e) {}
      }
    };
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-set-side],[data-set-squad],[data-set-view]');
      if (!b) return;
      if (b.hasAttribute('data-set-side')) side = b.getAttribute('data-set-side');
      if (b.hasAttribute('data-set-squad')) squad = b.getAttribute('data-set-squad');
      if (b.hasAttribute('data-set-view')) view = b.getAttribute('data-set-view');
      apply(true);
    });
    apply(false);

    // Operators view: point at an operator to light up their spot on the map
    var light = function (card, on) {
      var block = card.closest('[data-ops-side]');
      if (!block) return;
      all('.opm', block).forEach(function (m) { m.classList.toggle('hl', on && m.getAttribute('data-op') === card.getAttribute('data-op')); });
      block.classList.toggle('focus', on);
    };
    all('.opc').forEach(function (c) {
      c.addEventListener('mouseenter', function () { light(c, true); });
      c.addEventListener('mouseleave', function () { light(c, false); });
      c.addEventListener('focusin', function () { light(c, true); });
      c.addEventListener('focusout', function () { light(c, false); });
    });
  }

  // Image checklist
  var boxes = all('[data-shot]');
  if (boxes.length) {
    var CK = 'bn-shots';
    var done = get(CK);
    var bar = document.querySelector('[data-bar]'), count = document.querySelector('[data-count]');
    var tally = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (count) count.textContent = n + ' / ' + boxes.length + ' shots';
      if (bar) bar.style.width = Math.round(n / boxes.length * 100) + '%';
    };
    boxes.forEach(function (b) { if (!b.disabled && done[b.getAttribute('data-shot')]) b.checked = true; });
    document.addEventListener('change', function (e) {
      var b = e.target;
      if (!b.hasAttribute || !b.hasAttribute('data-shot')) return;
      if (b.checked) done[b.getAttribute('data-shot')] = 1; else delete done[b.getAttribute('data-shot')];
      put(CK, done); tally();
    });
    tally();
  }
})();
