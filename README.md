# Mathe-Tool

Lern-App für **Mathematik (RE), Wintersemester 26/27**. Vorlesungen und Übungen werden Woche für Woche eingepflegt und als Karten und Aufgaben abgefragt. Ein Wiederholungsplan sorgt dafür, dass alles bis zur Klausur regelmäßig wiederkommt.

- **Heute:** Lernserie mit Wochenleiste, Wochenziel und Joker (ein verpasster Tag pro Woche wird überbrückt). Dazu die **Tagesmission** für etwa 10 Minuten: 8 Karten wiederholen, eine Aufgabe des Tages auf Papier rechnen, 5× Methode erkennen. Außerdem Klausurreife auf einen Blick, Abfrage aller fälligen Karten, Schwachstellen.
- **Vorlesung durchgehen:** jede Vorlesung Folie für Folie, mit den handschriftlichen Zwischenschritten aus der Vorlesung zum schrittweisen Aufdecken und erklärt. Pro Abschnitt „Verstanden“ oder „Noch unklar“ (mit Notiz), dazu eine kurze Selbstkontrolle und passende Karten. Unklares lässt sich gesammelt an Claude schicken. Inhalte in `content/durchgang/`.
- **Lernmodus und Atemübung:** Pomodoro-Timer (z. B. 20 Minuten Fokus, 5 Minuten Pause, lange Pause nach 4 Blöcken), der über alle Seiten weiterläuft. In der Pause startet eine Atemübung (4 ein · 6 aus, 4 · 4, Box-Atmung, 4-7-8). Die Atemübung gibt es auch einzeln gegen Prüfungsstress.
- **Skyline:** Lernpunkte für Karten, Aufgaben, Missionen und Meilensteine. Jedes Klausurthema ist ein Hochhaus, das mit dem Lernen wächst. Die Fenster leuchten je nach Klausurreife. Mit den Punkten baust du Extras wie Fluss, Brücke, Kran oder Feuerwerk.
- **Fortschritt:** Klausurreife gesamt und pro Thema (mit „Üben“ pro Thema), Prognose bis zur Klausur, Lernaktivität der letzten 12 Wochen, Stand jeder Einheit, Trefferquote bei „Methode erkennen“, eigene Lösungen und Meilensteine.
- **Inhalte:** alle Karten nach Woche, Vorlesung und Übung. Jede Einheit lässt sich frei üben.
- **Aufgaben** mit gestuften Tipps, kommentiertem Lösungsweg, typischen Fehlern und dem Rezept für den Aufgabentyp.
- **Übung:** Besprechungs- und Präsenzaufgaben mit Lösungsweg zum Aufdecken. Vorher markierst du pro Aufgabe „Selbst gelöst“, „Mit Hilfe“ oder „Offen“ und notierst Fragen. In der Übung zeigt der Live-Modus eine Aufgabe nach der anderen mit großen Knöpfen, und der Bildschirm bleibt an.
- **Eigene Lösung prüfen:** bei jeder Rechenaufgabe. Du rechnest auf Papier, fotografierst deine Lösung und gehst den Lösungsweg Schritt für Schritt durch: „Wie hier“, „Anders, aber richtig“ oder „Fehlt / falsch“. Danach gibt es eine Auswertung, einen Vorschlag für den Wiederholungsplan und die Möglichkeit, die Fotos für eine genauere Prüfung an Claude zu teilen. Die Fotos bleiben auf dem Gerät, die Ergebnisse werden mitgespeichert.
- **Formelblatt:** Sammlung für das erlaubte A4-Blatt, mit Druckansicht.
- **Optionen:** Konto erstellen, anmelden, Passwort zurücksetzen; Klausurtermin, neue Karten pro Tag, Tages- und Wochenziel.

Das Konzept steht in [KONZEPT.md](KONZEPT.md).

## Aktueller Inhalt

| Woche | Vorlesungen | Übung |
|---|---|---|
| 1 | 1 Grundbegriffe und Funktionsbegriff, 2 Affin-lineare Funktionen | 1 Terme, Gleichungen und Geraden |
| 2 | 3 Polynomfunktionen, 4 Substitution, Polynomdivision, Linearfaktoren | 2 Nullstellen von Polynomfunktionen |
| 3 | 5 Exponential- und Logarithmusfunktionen, 6 Exponentialgleichungen | 3 Logarithmen und Exponentialgleichungen |
| 4 | 7 Logarithmengleichungen, 8 Selbststudium: Winkel und Dreiecke | 4 Logarithmen, Winkel und Dreiecke |
| 5 | 9 Sinus, Cosinus, Tangens, 10 Allgemeine Winkelfunktionen | 5 Periodische Funktionen und Sinusgleichungen |
| 6 | 11 Cosinus-/Tangensgleichungen und Ableitungsbegriff, 12 Ableitungsregeln | 6 Winkelfunktionen und erste Ableitungen |
| 7 | 13 Ableitung von Logarithmus- und Arkusfunktionen, Kettenregel, Produktregel | |

Insgesamt 268 Karten, davon 141 Rechenaufgaben, plus 88 Aufgaben im Schnelltraining „Methode erkennen“. Zu den Vorlesungen 1–7 und 9–13 gibt es den Durchgang mit den handschriftlichen Notizen (85 Abschnitte). Präsenzübungen 1 bis 5 sind bei den Übungsblättern eingetragen.

Bei jeder Aufgabe steht, woher die Lösung stammt: aus der offiziellen Lösung, aus der Vorlesung oder von Claude (dann noch nicht mit einer Musterlösung abgeglichen).

## Wo läuft was?

| Teil | Aufgabe |
|---|---|
| Dieses Repository | App und Lerninhalte (`content/`) |
| GitHub Pages | veröffentlicht den Zweig `main` als Webseite |
| Supabase | speichert den Lernstand, damit er auf allen Geräten gleich ist |
| Repository `mathe-material` (privat) | Folien, Übungsblätter und Mitschriften |

Ohne Supabase-Zugangsdaten in `config.js` speichert die App den Lernstand nur im jeweiligen Browser.

## Einrichten

### 1. GitHub Pages einschalten

1. Den Zweig mit der App per Pull Request nach `main` übernehmen.
2. Im Repository **Settings → Pages** öffnen.
3. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, dann **Save**.
4. Nach etwa einer Minute ist die App unter `https://cikichris.github.io/mathe-tool/` erreichbar.

### 2. Supabase verbinden

1. Im Supabase-Projekt den **SQL Editor** öffnen, den kompletten Inhalt von [`supabase/schema.sql`](supabase/schema.sql) einfügen und **Run** klicken. Unten muss „Success. No rows returned“ stehen.
2. Unter **Authentication → Users → Add user → Create new user** einen Nutzer mit E-Mail und Passwort anlegen und dabei **Auto Confirm User** anhaken.
3. Damit sich andere selbst registrieren können: Unter **Authentication → Sign In / Providers** bei „Email“ die Option **Allow new users to sign up** eingeschaltet lassen (und **Confirm email** an). Wer das nicht möchte, schaltet sie aus; dann klappt nur noch die Anmeldung mit angelegten Nutzern.
4. Unter **Authentication → URL Configuration** als **Site URL** `https://cikichris.github.io/mathe-tool/` eintragen und unter **Redirect URLs** `https://cikichris.github.io/mathe-tool/**` hinzufügen. Dorthin führen die Links in den Bestätigungs- und Passwort-E-Mails.
5. Unter **Project Settings → API Keys** die **Project URL** und den **Publishable Key** kopieren und in [`config.js`](config.js) eintragen.
6. In der App unter **Optionen** anmelden oder ein Konto erstellen.

Jedes Konto sieht nur den eigenen Lernstand (Row Level Security). Meldet sich auf einem Gerät ein anderes Konto an, wird der Lernstand des vorherigen Kontos dort entfernt; er bleibt in dessen Konto gespeichert. Was ohne Login gelernt wurde, wird beim ersten Anmelden ins Konto übernommen.

Hinweis: Der eingebaute E-Mail-Versand von Supabase schickt nur wenige E-Mails pro Stunde. Für ein paar Freunde reicht das.

Die Datei `supabase/schema.sql` kann beliebig oft ausgeführt werden. Vorhandene Daten bleiben erhalten.

## Neue Woche einpflegen

1. Material ins private Repository `mathe-material` legen oder im Chat hochladen (Vorlesung am besten mit Notizen).
2. **Vorlesung:**
   - `content/vlXX.js` mit Karten anlegen: Definitionen, Sätze, Formeln, Verständnisfragen und Rechenaufgaben mit Tipps, Lösungsweg (`schritte` mit „Woher?“ in `q`), Ergebnis, typischen Fehlern und `herkunft`.
   - `content/durchgang/vlXX.js`: Vorlesung durchgehen, Folie für Folie mit den handschriftlichen Zwischenschritten (`notizen`), `kern`, `check` und passenden `karten`. In `content/durchgang/index.js` eintragen.
   - `formelblatt`-Einträge für das A4-Blatt ergänzen.
3. **Übungsblatt:** `content/ueXX.js` mit allen Aufgaben. Aufgaben, die in der Übung besprochen werden, bekommen `teil: 'besprechung'` (Präsenzaufgaben `teil: 'praesenz'`) und `nr`, das Blatt bekommt `besprechung: [Daten]`. Sie erscheinen dann unter „Übung“ und im Live-Modus.
4. Neue Einheiten in `content/index.js` in die passende Woche eintragen.
5. Neue Themen (Feld `thema`) in `content/themen.js` einem Klausurthema zuordnen. Kommt ein ganz neues Klausurthema dazu, bekommt es dort einen Eintrag mit `kurz`; die Skyline (`js/skyline.js`, derzeit auf 8 Türme ausgelegt) muss dann angepasst werden.
6. Neue Aufgabentypen ins Schnelltraining `content/methoden.js` aufnehmen.
7. Fotos aus der Übung: Lösungswege abgleichen (`abgleich`), Rückmeldungen zu eigenen Lösungen als `rueckmeldung` eintragen.
8. Prüfen: `node tools/check-content.mjs` und `node --test tools/test.mjs`, dann im Browser durchklicken.
9. Pull Request nach `main` mergen. Kurz darauf ist die neue Woche online.

Die `id` einer Karte oder eines Durchgang-Abschnitts darf nachträglich nicht mehr geändert werden. Daran hängt der gespeicherte Lernstand.

## Entwicklung

Die App kommt ohne Build-Schritt aus. Zum lokalen Ansehen genügt ein einfacher Webserver:

```
python3 -m http.server 8000
```

Prüfungen:

```
node tools/check-content.mjs    # Inhalte und Formeln
node --test tools/test.mjs      # Wiederholungsplan und Abgleich
node tools/browser-check.cjs    # alle Seiten im Browser (Server auf Port 8765)
```

Hinweise für Claude Code stehen in [CLAUDE.md](CLAUDE.md).
