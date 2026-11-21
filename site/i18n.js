/* Sprachumschaltung der Website.
 * Quelltext der Seiten ist Deutsch. Elemente mit data-i werden anhand ihres (Whitespace-normalisierten) deutschen
 * Inhalts in i18n/<code>.js nachgeschlagen; data-i-aria = aria-label, data-i-content = meta content.
 * Fehlt ein Eintrag, bleibt der deutsche Text stehen. Die Wahl steht in localStorage ("pn-lang"); ohne Wahl gilt die Browsersprache, sonst Englisch.
 * Neue Sprache: Code in LANGS eintragen und i18n/<code>.js anlegen (siehe i18n/README.md). */
(function () {
  'use strict';
  var LANGS = [
    ['de', 'Deutsch'], ['en', 'English'], ['cs', 'Čeština'], ['es', 'Español'], ['fr', 'Français'],
    ['it', 'Italiano'], ['ja', '日本語'], ['ko', '한국어'], ['pl', 'Polski'], ['pt-BR', 'Português (Brasil)'],
    ['ru', 'Русский'], ['tr', 'Türkçe'], ['zh-Hans', '简体中文'], ['zh-Hant', '繁體中文']
  ];
  var KEY = 'pn-lang';
  var root = document.documentElement;
  window.PN_I18N = window.PN_I18N || {};

  function known(c) { return LANGS.some(function (l) { return l[0] === c; }); }

  function fromBrowser() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase();
      if (l.indexOf('zh') === 0) return /tw|hk|mo|hant/.test(l) ? 'zh-Hant' : 'zh-Hans';
      if (l.indexOf('pt') === 0) return 'pt-BR';
      var base = l.split('-')[0];
      if (known(base)) return base;
    }
    return 'en'; // Browsersprache nicht unterstützt → Englisch
  }

  function stored() {
    try { var s = localStorage.getItem(KEY); return s && known(s) ? s : null; } catch (e) { return null; }
  }

  var current = stored() || fromBrowser();
  if (current !== 'de') root.classList.add('i18n-wait'); // bis die Übersetzung da ist, nichts Deutsches aufblitzen lassen

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  // Text in der aktuellen Sprache (für Skripte, z. B. das Download-Hinweisfenster); Schlüssel = deutscher Text
  window.PN_T = function (de) { var d = current === 'de' ? null : window.PN_I18N[current]; return (d && d[norm(de)]) || de; };

  function apply(code) {
    var dict = code === 'de' ? null : window.PN_I18N[code] || {};
    root.lang = code;
    each('[data-i]', function (el) {
      if (el.__de === undefined) el.__de = el.tagName.toLowerCase() === 'title' ? el.textContent : el.innerHTML;
      var t = dict && dict[norm(el.__de)];
      if (el.tagName.toLowerCase() === 'title') el.textContent = t || el.__de;
      else el.innerHTML = t || el.__de;
    });
    each('[data-i-aria]', function (el) {
      if (el.__deAria === undefined) el.__deAria = el.getAttribute('aria-label');
      el.setAttribute('aria-label', (dict && dict[norm(el.__deAria)]) || el.__deAria);
    });
    each('[data-i-content]', function (el) {
      if (el.__deContent === undefined) el.__deContent = el.getAttribute('content');
      el.setAttribute('content', (dict && dict[norm(el.__deContent)]) || el.__deContent);
    });
    // Nur wenn die Seite direkt aus website\ geöffnet wird (ohne Build): Platzhalter nicht roh anzeigen
    var fallback = { VERSION: '1.0.0', SETUP_MB: '70', FULL_MB: '150' };
    each('[data-i]', function (el) {
      if (el.tagName.toLowerCase() === 'title' || el.innerHTML.indexOf('{{') < 0) return;
      el.innerHTML = el.innerHTML.replace(/\{\{(\w+)\}\}/g, function (m, k) { return fallback[k] || m; });
    });
    root.classList.remove('i18n-wait');
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function load(code, done) {
    if (code === 'de' || window.PN_I18N[code]) return done();
    var s = document.createElement('script');
    s.src = 'i18n/' + code + '.js';
    s.onload = s.onerror = done;
    document.head.appendChild(s);
  }

  function set(code, remember) {
    current = code;
    if (remember) { try { localStorage.setItem(KEY, code); } catch (e) { } }
    load(code, function () { apply(code); });
  }

  function buildSwitcher() {
    var nav = document.querySelector('header.nav nav');
    if (!nav) return;
    var sel = document.createElement('select');
    sel.className = 'lang';
    sel.setAttribute('aria-label', 'Language / Sprache');
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l[0]; o.textContent = l[1]; o.lang = l[0];
      sel.appendChild(o);
    });
    sel.value = current;
    sel.addEventListener('change', function () { set(sel.value, true); });
    // Sprachwechsel in einem anderen Tab/Fenster der Website sofort übernehmen
    window.addEventListener('storage', function (e) {
      if (e.key !== KEY || !e.newValue || !known(e.newValue) || e.newValue === current) return;
      sel.value = e.newValue;
      set(e.newValue, false);
    });
    nav.insertBefore(sel, nav.querySelector('.btn') || null);
  }

  function start() {
    buildSwitcher();
    set(current, false);
  }

  setTimeout(function () { root.classList.remove('i18n-wait'); }, 2500); // Notausgang, falls die Datei nicht lädt
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
