# Übersetzungen der Website

Die Seiten sind auf Deutsch geschrieben. `i18n.js` ersetzt beim Laden alle Elemente mit `data-i`
(Text), `data-i-aria` (aria-label) und `data-i-content` (meta description) durch den Eintrag aus
`i18n/<code>.js`; als Schlüssel dient der deutsche Originaltext (Leerraum zusammengefasst).
Fehlt ein Eintrag, bleibt der deutsche Text stehen.

* **Text ändern:** deutschen Text in der HTML-Datei ändern und den Schlüssel in allen `i18n/*.js` anpassen.
* **Neuer Text:** `data-i` an das Element schreiben (nur Text und `<strong>`/`<code>`/`<em>` darin) und je Sprache einen Eintrag ergänzen.
* **Neue Sprache:** `i18n/<code>.js` nach dem Muster der vorhandenen anlegen und den Code in `LANGS` in `i18n.js` eintragen.
* Platzhalter `{{VERSION}}`, `{{SETUP_MB}}`, `{{FULL_MB}}` ersetzt `installer\build-installer.ps1 -Website` auch in diesen Dateien.

Die Sprachwahl merkt sich der Browser (`localStorage`, Schlüssel `pn-lang`); ohne Wahl gilt die Browsersprache, ist sie nicht unter den 14 Sprachen, Englisch.
Die Sprachen entsprechen denen des Programms (14).
