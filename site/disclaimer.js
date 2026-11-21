/* Hinweisfenster vor dem Download: Der Installer wird erst nach "Akzeptieren" heruntergeladen, bei "Ablehnen" passiert nichts.
 * Texte kommen aus den Übersetzungen (window.PN_T aus i18n.js, Schlüssel = deutscher Text). Ohne JavaScript funktioniert der Link direkt. */
(function () {
  'use strict';
  function t(de) { return window.PN_T ? window.PN_T(de) : de; }

  function ask(onAccept) {
    var dlg = document.createElement('dialog');
    dlg.className = 'disclaimer';
    dlg.setAttribute('aria-labelledby', 'disclaimer-title');
    var title = document.createElement('h2');
    title.id = 'disclaimer-title';
    title.textContent = t('Wichtiger Hinweis');
    var p1 = document.createElement('p');
    p1.innerHTML = '<strong></strong>';
    p1.firstChild.textContent = t('SigmaNotes wurde vollständig mit KI programmiert.');
    var p2 = document.createElement('p');
    p2.textContent = t('Das Programm wird ohne jede Gewähr bereitgestellt. Für Schäden, Datenverlust oder sonstige Folgen der Nutzung kann keine Haftung übernommen werden.');
    var row = document.createElement('div');
    row.className = 'disclaimer-actions';
    var decline = document.createElement('button');
    decline.type = 'button'; decline.className = 'btn secondary'; decline.textContent = t('Ablehnen');
    var accept = document.createElement('button');
    accept.type = 'button'; accept.className = 'btn'; accept.textContent = t('Akzeptieren');
    row.appendChild(decline); row.appendChild(accept);
    dlg.appendChild(title); dlg.appendChild(p1); dlg.appendChild(p2); dlg.appendChild(row);
    document.body.appendChild(dlg);

    var accepted = false;
    function close() { if (dlg.open) dlg.close(); }
    decline.addEventListener('click', close);
    accept.addEventListener('click', function () { accepted = true; close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });   // Klick neben das Fenster = Ablehnen
    dlg.addEventListener('close', function () {
      dlg.remove();
      if (accepted) onAccept();   // Esc und Ablehnen: nichts passiert
    });
    dlg.showModal();
    decline.focus();
  }

  var bypass = false;   // der Klick auf den Download-Link nach "Akzeptieren" soll das Fenster nicht erneut öffnen

  document.addEventListener('click', function (e) {
    if (bypass) return;
    var a = e.target.closest && e.target.closest('a[href$="SigmaNotes-Setup.exe"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (typeof HTMLDialogElement === 'undefined') return;   // alter Browser: Link direkt
    e.preventDefault();
    ask(function () {
      var d = document.createElement('a');
      d.href = a.href; d.download = ''; d.style.display = 'none';
      document.body.appendChild(d);
      bypass = true;
      try { d.click(); } finally { bypass = false; d.remove(); }
    });
  });
})();
