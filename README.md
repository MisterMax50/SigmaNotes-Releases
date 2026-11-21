# SigmaNotes

*English below · [Deutsch weiter unten](#sigmanotes-deutsch)*

A lightweight Windows editor for **annotating PDFs by hand** – with pen, shapes and measuring tools. Your notes are saved directly in the PDF file, not in a proprietary format, so any PDF viewer can still display them.

**Windows 10/11 (64-bit)**

🌐 **Website:** <https://mistermax50.github.io/SigmaNotes-Releases/>

## Download

[**Download SigmaNotes-Setup.exe**](https://github.com/MisterMax50/SigmaNotes-Releases/releases/download/installer/SigmaNotes-Setup.exe)

1. Run `SigmaNotes-Setup.exe`.
2. Choose the install folder and the add-ons you want.
3. Done – the installer downloads everything it needs (internet connection required).

If Windows shows a warning when opening it, that is normal: click "More info" and then "Run anyway".

Older versions are available under [Releases](https://github.com/MisterMax50/SigmaNotes-Releases/releases); the installer offers them in its version picker.

## Features

- **Pen & eraser** – write and draw with mouse, pen and touch; pen presets, color palettes, hatching
- **Shape recognition** – draw roughly, SigmaNotes turns it into clean lines, circles and polygons; ruler and template for snapping
- **Measure & dimension** – measure distances, angles and slopes and place them as dimensions on the page
- **Search & text recognition** – full-text search and OCR for scanned pages
- **Multiple documents** – tabs, library, recent files, bookmarks, page preview
- **Page templates** – lined, grid, dotted, millimeter, music staff, isometric paper and more

## Add-ons

Extra modules for specific fields – pick only what you need, add or remove them at any time:

| Add-on | Contents |
|---|---|
| **Math** | Formulas (LaTeX), 2D/3D coordinate systems with functions, surfaces and space curves |
| **Electrical engineering** | IEC/DIN and ANSI circuit symbols, wires with junctions, searchable component catalog |
| **Music** | Clefs, notes, rests, accidentals, time signatures – they snap to the staff lines |

## Building from source

Requires the .NET SDK (target `net11.0-windows10.0.22621.0`).

```powershell
dotnet build SigmaNotes\SigmaNotes.csproj
```

| Folder | Contents |
|---|---|
| `SigmaNotes/` | the application (WPF) |
| `addons/` | the Math, Electrical and Music add-ons |
| `installer/` | installer and release scripts |
| `website/` | static project website |
| `docs/` | architecture decisions and notes |

## Feedback & support

- Report bugs and suggest ideas: [GitHub Issues](https://github.com/MisterMax50/SigmaNotes-Releases/issues)
- Like SigmaNotes? [Support it on Ko-fi](https://ko-fi.com/H3A22B1FM8)

---

# SigmaNotes (Deutsch)

*[English above](#sigmanotes)*

Ein schlanker Windows-Editor, um **PDFs mit der Hand zu beschriften** – mit Stift, Formen und Messwerkzeugen. Deine Notizen werden direkt in der PDF-Datei gespeichert, nicht in einem eigenen Format. Jeder PDF-Betrachter kann sie weiter anzeigen.

**Windows 10/11 (64 Bit)**

🌐 **Website:** <https://mistermax50.github.io/SigmaNotes-Releases/>

## Download

[**SigmaNotes-Setup.exe herunterladen**](https://github.com/MisterMax50/SigmaNotes-Releases/releases/download/installer/SigmaNotes-Setup.exe)

1. `SigmaNotes-Setup.exe` starten.
2. Installationsordner und gewünschte Addons wählen.
3. Fertig – der Installer lädt alle benötigten Dateien herunter (Internetverbindung nötig).

Zeigt Windows beim Öffnen eine Warnung, ist das normal: auf „Weitere Informationen“ und dann „Trotzdem ausführen“ klicken.

Ältere Versionen findest du unter [Releases](https://github.com/MisterMax50/SigmaNotes-Releases/releases); der Installer bietet sie in der Versionsauswahl an.

## Funktionen

- **Stift & Radierer** – schreiben und zeichnen mit Maus, Stift und Touch; Stiftvorgaben, Farbpaletten, Schraffur
- **Formen erkennen** – grob zeichnen, SigmaNotes macht saubere Linien, Kreise und Vielecke daraus; Lineal und Schablone zum Einrasten
- **Messen & Bemaßen** – Strecken, Winkel und Neigungen messen und als Bemaßung in die Seite setzen
- **Suchen & Texterkennung** – Volltextsuche und OCR für eingescannte Seiten
- **Mehrere Dokumente** – Tabs, Bibliothek, zuletzt geöffnete Dateien, Lesezeichen, Seitenvorschau
- **Seitenvorlagen** – liniert, kariert, Punktraster, Millimeter-, Noten-, Isometrie-Papier u. a.

## Addons

Zusatzmodule für Fachgebiete – einzeln wählbar, jederzeit nachinstallierbar:

| Addon | Inhalt |
|---|---|
| **Mathe** | Formeln (LaTeX), 2D-/3D-Koordinatensysteme mit Funktionen, Flächen und Raumkurven |
| **Elektrotechnik** | Schaltzeichen nach IEC/DIN und ANSI, Leitungen mit Knotenpunkten, Bauteil-Katalog |
| **Musik** | Notenschlüssel, Noten, Pausen, Vorzeichen, Taktarten – rasten auf den Notenlinien ein |

## Aus dem Quelltext bauen

Voraussetzung: .NET SDK (Ziel `net11.0-windows10.0.22621.0`).

```powershell
dotnet build SigmaNotes\SigmaNotes.csproj
```

| Ordner | Inhalt |
|---|---|
| `SigmaNotes/` | das Programm (WPF) |
| `addons/` | die Addons Mathe, Elektrotechnik, Musik |
| `installer/` | Installer und Veröffentlichungs-Skripte |
| `website/` | statische Projektseite |
| `docs/` | Architekturentscheidungen und Hinweise |

## Feedback & Unterstützung

- Fehler melden und Ideen vorschlagen: [GitHub Issues](https://github.com/MisterMax50/SigmaNotes-Releases/issues)
- Gefällt dir SigmaNotes? [Auf Ko-fi unterstützen](https://ko-fi.com/H3A22B1FM8)
