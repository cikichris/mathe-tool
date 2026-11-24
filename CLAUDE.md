# CLAUDE.md – Arbeitsanleitung für Claude

Diese Datei liest Claude Code zu Beginn jeder Sitzung. Sie ist das Gedächtnis
des Projekts: Wer hier weiterarbeitet, soll ohne den alten Chatverlauf
wissen, worum es geht, wie gearbeitet wird und was der aktuelle Stand ist.
**Am Ende jeder Arbeitsrunde den Abschnitt „Aktueller Stand“ aktualisieren.**

Weitere Doku: [README.md](README.md) (Funktionen, Einrichtung, Checkliste
„Neue Woche einpflegen“), [KONZEPT.md](KONZEPT.md) (Konzept und Ideen).

## Worum es geht

Persönliche Lern-App für **Mathematik (RE), Ingenieurmathematik, FRA UAS,
Dr. Laura Ostsieker, Wintersemester 26/27**. Klausur im **Februar 2027**,
vor allem Rechenaufgaben, erlaubt ist ein beidseitig beschriebenes A4-Blatt.

Ziel: Vorlesungen und Übungen Woche für Woche einpflegen, täglich mit
Wiederholungsplan lernen, Lösungswege „wie ein privater Mathelehrer“
erklären und bei jedem Rechenschritt zeigen, woher die Formel kommt
(„Woher?“ mit Vorlesung und Folie).

## Zusammenarbeit mit dem Nutzer

- **Sprache: Deutsch**, einfach und freundlich. Fachbegriffe kurz erklären.
  Der Nutzer ist kein Entwickler.
- Er schickt PDFs (Vorlesung mit handschriftlichen Notizen, Übungsblatt
  Aufgaben + Ergebnisse, Präsenzübungen) und Fotos direkt im Chat.
- **Pull Requests:** Arbeit auf einem Arbeitszweig committen, Pull Request
  nach `main` anlegen, kurz auf Deutsch zusammenfassen, was drin ist, und
  fragen, ob gemergt werden soll. Sagt er „mergen“, mergen (GitHub-Werkzeug
  `merge_pull_request`, `expectedHeadSha` = **voller** 40-stelliger Hash).
  Danach ist es nach 1–2 Minuten über GitHub Pages live.
- Bevor gemergt wird, immer prüfen (siehe „Prüfen“).
- Fotos der Übungslösungen: Lösungswege abgleichen und bei der Karte
  `abgleich: { datum, status: 'bestaetigt' | 'abweichung' | 'ergaenzt', text }`
  eintragen. Fotos eigener Lösungen: prüfen und als
  `rueckmeldung: [{ datum, text }]` an der Aufgabe eintragen.
- Spielerisches ist erwünscht (Mission, Skyline, Meilensteine), soll aber
  echtes Lernen belohnen und nicht vom Stoff ablenken.

## Architektur

- Statische Web-App ohne Build: `index.html`, `styles.css`, `js/*.js`
  (ES-Module), KaTeX in `vendor/katex`. Veröffentlicht über **GitHub Pages**
  aus `main`: https://cikichris.github.io/mathe-tool/ (als App auf dem
  Home-Bildschirm des Nutzers).
- **Supabase** (Projekt `tdmywnilquibeqnedqqg`, Zugang in `config.js`, der
  Schlüssel ist bewusst öffentlich) speichert nur den Lernstand:
  Tabellen `card_state`, `reviews`, `user_data` (jsonb pro Schlüssel), alle
  mit Row Level Security „eigene Zeilen“. Schema: `supabase/schema.sql`.
  Neue Daten kommen als neuer Schlüssel in `user_data`, **kein neues SQL**.
  Schlüssel bisher: `settings`, `sheet`, `drill`, `activity`, `prep`,
  `checks`, `badges`, `points`, `walk`.
- Lokal zuerst (`localStorage`), Abgleich in `js/sync.js`; pro Schlüssel
  gewinnt der neuere Stand, Zähler pro Tag werden zusammengeführt.
  Registrierung, Passwort zurücksetzen, Kontowechsel sind eingebaut.
- Fotos eigener Lösungen bleiben im Browser (IndexedDB, `js/photos.js`).
- Wichtige Module: `js/app.js` (Oberfläche, Routen über `#/...`),
  `js/store.js` (Lernstand), `js/srs.js` (Wiederholungsplan),
  `js/streak.js` (Serie, Joker, Wochenziel), `js/progress.js`
  (Klausurreife, Meilensteine), `js/skyline.js` (Punkte und Skyline,
  derzeit 8 Türme), `js/fokus.js` + `js/atmen.js` (Lernmodus, Atemübung),
  `js/plot.js` (Funktionsgraphen als SVG), `js/render.js` (Formeln).
- Lerninhalte in `content/`:
  - `vlXX.js`, `ueXX.js`: Karten (Felder siehe Kommentar in
    `content/index.js`), Wochen in `content/index.js`
  - `durchgang/vlXX.js`: „Vorlesung durchgehen“ mit den handschriftlichen
    Notizen, Folie für Folie
  - `themen.js`: Zuordnung der Themen zu den 8 Klausurthemen
  - `methoden.js`: Schnelltraining „Methode erkennen“
- Formeln immer in `String.raw`-Strings (`r\`...\``), sonst gehen Backslashes
  verloren. `id`s von Karten und Abschnitten nie ändern (Lernstand hängt dran).

## Material

Die PDFs liegen im **privaten** Repository `cikichris/mathe-material`
(`vorlesungen/`, `uebungen/`, `praesenz/`). Neue PDFs dort ablegen und auf
`main` pushen. Falls es in der Sitzung fehlt: mit `add_repo` hinzufügen.
Handschrift lesen: Seiten mit `pdftoppm -r 72 -png` rendern und als Bild
ansehen; `pdftotext -layout` liefert den gedruckten Text.

## Prüfen

```
node tools/check-content.mjs          # Inhalte, Formeln (KaTeX), Verweise
node --test tools/test.mjs            # Logik und Abgleich
python3 -m http.server 8765 &         # im Repository-Ordner
node tools/browser-check.cjs          # alle Seiten im Browser, Abfrage
```

Supabase und das jsdelivr-CDN sind aus der Cloud-Sandbox meist nicht
erreichbar. Login und Abgleich lassen sich dort nicht echt testen (bei
Bedarf Supabase in Playwright nachbauen).

## Aktueller Stand (24.11.2026)

- **Vorlesungen:** VL 1–13 als Karten (VL 8 war Selbststudium per Video).
  „Vorlesung durchgehen“ für VL 1–7 und 9–13 (85 Abschnitte).
- **Übungen:** Blatt 1–6 (Aufgaben + Ergebnisse), Präsenzübungen 1–5.
  Blatt 6 wird am 24. und 27.11. besprochen. Noch keine `abgleich`-Einträge.
- **Funktionen:** Abfrage mit Wiederholungsplan, Tagesmission, Lernserie mit
  Joker und Wochenziel, Klausurreife pro Thema, Fortschrittsseite,
  Meilensteine, Skyline mit Punkten und Extras, Übungsvorbereitung und
  Live-Modus, eigene Lösung mit Foto prüfen, Methode erkennen, Formelblatt
  mit Druck, Vorlesung durchgehen, Lernmodus (Pomodoro) mit Atemübung,
  Konto erstellen.
- **Als Nächstes:** VL 14 (mit Notizen) kommt, danach Übungsblatt 7 und
  weitere Vorlesungen. Woche 7 enthält bisher nur VL 13.

## Vorgemerkte Ideen

- **Klausurmodus**, sobald Altklausuren da sind: Aufgaben mit Zeitlimit,
  Punkten, ohne Tipps. Als Belohnung ein **Villenviertel** in der Skyline:
  eine Villa pro Übungsklausur, jede Aufgabe ein Bauteil, die Punktzahl
  bestimmt die Ausstattung. Bis dahin evtl. Mini-Klausur aus vorhandenen
  Aufgaben.
- Kommen neue Klausurthemen dazu (z. B. Kurvendiskussion, Integrale): in
  `content/themen.js` eintragen und die Skyline auf mehr Türme erweitern.
- Aufgaben mit neuen Zahlen, Fehlertagebuch aus „Fehlt/falsch“ beim Prüfen
  eigener Lösungen, Export des Lernstands als Datei.
