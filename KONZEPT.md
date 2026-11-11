# Mathe-Tool – Konzept

Ziel: Vorlesungs- und Übungsinhalte Woche für Woche einpflegen und mit
regelmäßigen Abfragen (Spaced Repetition) so wiederholen, dass zur Klausur
alles sicher sitzt.

**Fach:** Ingenieurmathematik. Die Klausur besteht hauptsächlich aus
Rechenaufgaben, deshalb liegt der Schwerpunkt auf Aufgaben mit geführten
Lösungswegen und nicht auf reinem Karteikarten-Lernen.

## 1. Grundprinzip: Inhalte in Git, Lernfortschritt in Supabase

| Was | Wo | Warum |
|---|---|---|
| App-Code + Lerninhalte (`content/`) | Repo `mathe-tool` (öffentlich) | wird über GitHub Pages ausgeliefert, wie beim Wochenendplaner |
| Original-Material (Folien-PDFs, Aufgabenblätter, Fotos der handschriftlichen Lösungen) | eigenes **privates** Repo `mathe-material` | Folien sind urheberrechtlich geschützt und sollen nicht öffentlich im Netz stehen. Claude kann das private Repo in einer Session lesen. |
| Lernfortschritt (wann wiederholt, wie gut gewusst, nächste Fälligkeit) | neues Supabase-Projekt | geräteübergreifend (Handy + Laptop), bleibt bei Content-Updates erhalten |

### Wo läuft was?

```
 Handy / Laptop (Browser)
   │  lädt die Seite von
   ▼
 GitHub Pages  ← baut automatisch aus dem main-Zweig von cikichris/mathe-tool
   │  liest/schreibt Lernfortschritt bei
   ▼
 Supabase (neues Projekt): Login + Tabellen
```

- **Code oder Inhalte ändern** (neue Woche, Bugfix, neue Funktion):
  Claude pusht auf einen Branch → du mergst den Pull Request nach `main` →
  GitHub Pages ist nach ca. 1 Minute aktualisiert.
- **Datenbank-Struktur ändern** (selten): Claude passt `supabase/schema.sql`
  an → du führst sie im SQL-Editor von Supabase aus (wie beim
  Wochenendplaner). Bestehender Fortschritt bleibt erhalten.

## 2. Inhaltsstruktur

```
Woche
 ├─ Vorlesung 1, Vorlesung 2   → Themen
 └─ Übung                      → Aufgaben
Thema (z. B. "Konvergenz von Folgen")
 └─ Karten
```

### Kartentypen

| Typ | Vorderseite | Rückseite / Prüfung |
|---|---|---|
| **Definition** | Begriff | Definition (LaTeX) |
| **Satz** | Name / Situation | Aussage + Voraussetzungen |
| **Verfahren** | „Wie berechne ich …?" | Schritt-für-Schritt-Rezept |
| **Verständnis** | Wahr/Falsch, Multiple Choice | automatisch geprüft + Begründung |
| **Rechenaufgabe** | Aufgabe (aus Übung oder abgewandelt) | geführte Lösung (siehe unten), Endergebnis ggf. automatisch prüfbar |

### „Privater Mathelehrer“: geführte Lösungen

Jede Rechenaufgabe bekommt mehr als nur die Musterlösung:

1. **Gestufte Tipps:** erst ein Denkanstoß („Welcher Typ DGL ist das?“), dann
   ein konkreterer Hinweis, dann der erste Rechenschritt. Du deckst nur so viel
   auf, wie du brauchst.
2. **Kommentierter Lösungsweg:** jeder Schritt mit dem *Warum* („Wir
   substituieren, weil …“) und Verweis auf die Folie mit dem passenden Satz.
3. **Typische Fehler:** wo man bei diesem Aufgabentyp gern Punkte verliert.
4. **Rezept für den Aufgabentyp:** allgemeines Vorgehen, das sich auf
   Klausuraufgaben übertragen lässt.
5. **Ähnliche Aufgaben:** von Claude erstellte Varianten mit anderen Zahlen
   zum Festigen.

Quellen: Aufgabenblätter mit Lösungen, deine handschriftlichen Lösungen aus
der Übung (wo vorhanden) und von Claude erstellte Erklärungen. Jeder Schritt
ist gekennzeichnet (offiziell / Mitschrift / Claude), damit klar ist, was
geprüft ist.

Optional später: ein Live-Tutor-Chat in der App (über die Claude-API per
Supabase Edge Function). Dafür braucht es einen API-Key, und jede Frage
kostet ein paar Cent.

Jede Karte hat: ID, Typ, Thema und Quelle (z. B. „VL 3, Folie 16“ oder
„Übung 1, Aufgabe 2 d“).

Die Inhalte liegen als JavaScript-Dateien in `content/` (eine Datei pro
Vorlesung bzw. Übung, z. B. `content/vl03.js`). Formeln stehen in
LaTeX-Schreibweise zwischen Dollarzeichen. `content/index.js` ordnet die
Dateien den Wochen zu. `node tools/check-content.mjs` prüft alle Dateien.

## 3. Lernmodi

1. **Wochen-Abfrage** (Kern): ~20–30 Karten pro Sitzung – alle *fälligen*
   Karten aus früheren Wochen + neue Karten der aktuellen Woche.
   Selbsteinschätzung „nochmal / schwer / gut / leicht" steuert, wann die
   Karte wiederkommt (Spaced-Repetition-Algorithmus, z. B. SM-2/FSRS).
2. **Themen-Training**: gezielt ein Thema oder eine Woche üben.
3. **Klausur-Simulation**: gemischte Rechenaufgaben über alle Wochen, mit
   Timer, Bewertung am Ende.
4. **Dashboard**: Fortschritt pro Woche/Thema, Schwachstellen, fällige Karten,
   Countdown zur Klausur.
5. **Formelblatt-Builder**: In der Klausur ist ein beidseitig beschriebenes
   A4-Blatt erlaubt. Pro Woche schlägt Claude vor, welche Formeln und Rezepte
   draufgehören. In der App lassen sich Einträge an- und abwählen. Am Ende
   gibt es eine druckfertige, platzsparende Vorlage. Abfragen werden mit dem
   Blatt geübt: Weniger Auswendiglernen von Formeln, mehr Gewicht auf
   „Welches Verfahren passt hier?“ und sauberes Rechnen.

## 4. Technik

- Frontend: statische Web-App ohne Build-Schritt (HTML/JS wie beim
  Wochenendplaner), Hosting über GitHub Pages, auf dem Handy installierbar
- Formeln: KaTeX liegt im Ordner `vendor/` mit im Repo
- Supabase: Login mit E-Mail und Passwort, Tabellen mit Row Level Security
  - `card_state`: aktueller Stand jeder Karte (fällig am, Abstand, Faktor)
  - `reviews`: Verlauf aller Bewertungen
  - `user_data`: Einstellungen und Formelblatt-Auswahl
- Der Lernstand wird immer zuerst im Browser gespeichert und danach mit
  Supabase abgeglichen. Die App funktioniert deshalb auch ohne Login.

## 5. Workflow pro Woche

1. Material der Woche (Folien-PDF, Übungsblatt mit Lösungen, Fotos deiner
   Mitschrift) ins private Repo `mathe-material` unter `woche-XX/` hochladen.
2. Claude erstellt daraus `content/vlXX.js` bzw. `content/ueXX.js`.
3. Kurz durchsehen, ggf. korrigieren → Merge → online.
4. Wochen-Abfrage machen.

## 6. Klausur

- Termin: Februar 2027
- Hilfsmittel: ein A4-Blatt, beidseitig frei beschrieben (siehe Formelblatt-Builder)
- Themenliste/Gliederung ergibt sich aus den Folien

## 7. Stand

Umgesetzt: Abfrage mit Wiederholungsplan, Inhaltsübersicht mit freiem Üben,
Formelblatt mit Druckansicht, Einstellungen, Login und Abgleich.

Noch offen: Klausur-Simulation mit Timer, Statistik über den Lernverlauf,
automatische Prüfung von Zahlenergebnissen.
