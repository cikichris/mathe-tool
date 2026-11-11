# Mathe-Tool – Konzept

Ziel: Vorlesungs- und Übungsinhalte Woche für Woche einpflegen und mit
regelmäßigen Abfragen (Spaced Repetition) so wiederholen, dass zur Klausur
alles sicher sitzt.

## 1. Grundprinzip: Inhalte in Git, Lernfortschritt in Supabase

| Was | Wo | Warum |
|---|---|---|
| Lerninhalte (Definitionen, Sätze, Aufgaben, Lösungen) | Dateien im Repo (`content/`) | versioniert, leicht korrigierbar, Claude kann neue Wochen per Commit ergänzen |
| Original-Material (PDFs, Fotos) | `material/` im Repo (Repo **privat** halten) | Quelle, auf die jede Karte zurückverweist |
| Lernfortschritt (wann wiederholt, wie gut gewusst, nächste Fälligkeit) | Supabase | geräteübergreifend (Handy + Laptop), bleibt bei Content-Updates erhalten |

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
| **Rechenaufgabe** | Aufgabe (aus Übung oder abgewandelt) | Lösungsweg schrittweise aufdeckbar, Endergebnis ggf. automatisch prüfbar |

Jede Karte hat: ID, Woche, Quelle (z. B. „VL 7, Folie 12" / „Übung 4, A2"),
Thema, Schwierigkeit.

Beispiel einer Datei `content/woche-05.yaml`:

```yaml
woche: 5
vorlesungen: [9, 10]
uebung: 5
karten:
  - id: w05-def-cauchy
    typ: definition
    thema: Folgen
    quelle: "VL 9, S. 4"
    frage: "Was ist eine Cauchy-Folge?"
    antwort: |
      $(a_n)$ heißt Cauchy-Folge, wenn
      $\forall \varepsilon > 0\ \exists N\ \forall m,n \ge N: |a_m - a_n| < \varepsilon$.
  - id: w05-ue-a2
    typ: aufgabe
    thema: Grenzwerte
    quelle: "Übung 5, A2"
    frage: "Berechne $\lim_{n\to\infty} \frac{3n^2+1}{n^2-n}$."
    schritte:
      - "Durch höchste Potenz $n^2$ teilen."
      - "$\frac{3 + 1/n^2}{1 - 1/n}$"
    ergebnis: "3"
```

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

## 4. Technik

- Frontend: statische Web-App (wie beim Wochenendplaner), Hosting über
  GitHub Pages / Vercel
- Formeln: KaTeX
- Supabase: Auth (Magic Link per E-Mail) + Tabellen mit Row Level Security
  - `card_state` (user, card_id, fällig_am, intervall, ease, wiederholungen)
  - `reviews` (user, card_id, bewertung, zeitpunkt) – Verlauf für Statistik
  - `exam_sessions` (Klausur-Simulationen mit Ergebnis)

## 5. Workflow pro Woche

1. Material der Woche (Folien/Skript-PDF, Übungsblatt, Lösungen bzw. eigene
   Mitschrift) nach `material/woche-XX/` hochladen oder im Chat schicken.
2. Claude erstellt daraus `content/woche-XX.yaml` (Karten + Aufgaben).
3. Kurz durchsehen, ggf. korrigieren → Merge → online.
4. Wochen-Abfrage machen.

## 6. Offene Fragen

- Welches Fach genau (Analysis, Lineare Algebra, Mathe für Ingenieure/BWL …)?
- Klausurtermin und -format (Rechenaufgaben, Beweise, Verständnisfragen,
  Hilfsmittel)?
- Form des Materials: PDF-Folien, Skript, handschriftlich/Fotos?
- Gibt es Musterlösungen zu den Übungen?
- Gleiches Supabase-Projekt wie Wochenendplaner (eigene Tabellen) oder ein
  neues Projekt?
